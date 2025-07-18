import ProductModel from '../models/ProductsCollection.js';

export const AddProducts = async (req, res) => {
    const {name, category, discription, price, pic, stock, costPrice, sellingPrice} = req.body;
    
    try {
      // Create a new instance of the Product model and populate it with the data
      const newProduct = new ProductModel({
            name,
            category,
            discription,
            price,
            pic: req.file ? req.file.path : pic,
            stock: stock || 0,
            costPrice: costPrice || 0,
            sellingPrice: sellingPrice || price
      });
  
      // Save the new product to the database
      const savedProduct = await newProduct.save();
      console.log(savedProduct);
      // Send a success response
      res.json({ Response: true, message: 'Product added successfully'});
      console.log('Product added successfully');
    } catch (error) {
      // Handle any errors and send an error response
      console.error(error);
      res.status(500).json({ message: 'Failed to add product' });
    }
  };

export const getproduct=async(req,res)=>{
    try{
        const ProductdData=await ProductModel.find();
         res.json(ProductdData);
         console.log(ProductdData)
    }
    catch (error){
    console.log("Not found in Data")
    
    }
}

export const getproductByCategory=async(req, res)=>{
    const { category } = req.params;
    console.log(category);
    try{
        const ProductdData=await ProductModel.find({category});
         res.json(ProductdData);
         console.log(ProductdData)
    }
    catch (error){
    console.log("Not found in Data")
    
    }
}

export const searchProducts = async (req, res) => {
    const { query } = req.query;
    try {
        const products = await ProductModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { discription: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, discription, stock, costPrice, sellingPrice } = req.body;
  
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { 
        name, 
        price,
        discription,
        stock,
        costPrice,
        sellingPrice,
        pic: req.file ? req.file.path : undefined
      },
      { new: true }
    );

    if (updatedProduct) {
      res.status(204).send();  // Respond with No Content if update successful
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteproduct=async(req , res)=>{
    try{
        const {productid} = req.params;
        console.log("delete products with id",productid);
        await ProductModel.findByIdAndDelete(productid);
        res.json({message:"delete successfully"});
        res.status(500).json({error:"internal server error"})

    }
    catch (error){
        console.error("error delete products",error);
    }
}


