import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;
    
    // Transform items into Stripe line items format
    const lineItems = items.map(item => {
      // Ensure the image URL is properly formatted and valid
      let imageUrl = item.image;
      
      // Decode the URL to check its validity
      try {
        const decodedUrl = decodeURIComponent(imageUrl);
        const url = new URL(decodedUrl);
        
        // Validate URL format and protocol
        if (!url.protocol.startsWith('http')) {
          throw new Error('Image URL must use HTTP or HTTPS protocol');
        }
        
        // Check if the URL points to a valid image file
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const hasValidExtension = validExtensions.some(ext => 
          url.pathname.toLowerCase().endsWith(ext)
        );
        
        if (!hasValidExtension) {
          throw new Error('Image URL must point to a valid image file');
        }
        
        // If all validations pass, use the original encoded URL
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: `Quantity: ${item.quantity}`,
              images: [imageUrl],
              metadata: {
                product_id: item._id,
                quantity: item.quantity.toString()
              }
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
          adjustable_quantity: {
            enabled: false
          }
        };
      } catch (e) {
        console.error('Invalid image URL:', imageUrl, e);
        // If image URL is invalid, create the item without an image
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              description: `Quantity: ${item.quantity}`,
              metadata: {
                product_id: item._id,
                quantity: item.quantity.toString()
              }
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
          adjustable_quantity: {
            enabled: false
          }
        };
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      billing_address_collection: 'required',
      customer_email: req.user?.email, // If you have user email
      metadata: {
        order_id: Date.now().toString(), // Generate a unique order ID
      },
      payment_intent_data: {
        metadata: {
          order_id: Date.now().toString(),
        },
      },
      allow_promotion_codes: true,
      locale: 'auto',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Error creating checkout session',
      details: error.message 
    });
  }
}; 