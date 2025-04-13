import { createContext, useState, useContext } from "react";

const context = createContext(); 

export const ContextProvider = ({ children }) => {
  const [sliderValue, setSliderValue] = useState(1000);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Slider change logic
  const handleSliderChange = (e) => {
    const value = e.target.value;
    setSliderValue(value);

    const range = e.target;
    const max = range.max;
    const min = range.min;
    const val = value;

    range.style.background = `linear-gradient(to right, #00ffe5 0%, #00ffe5 ${(val - min) / (max - min) * 100}%, #ccc ${(val - min) / (max - min) * 100}%, #ccc 100%)`;
  };

  // Search function
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Add to Cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const incrementQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const decrementQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  
  

  // Optional: Remove item
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Optional: Clear cart
  const clearCart = () => setCart([]);

  return (
    <context.Provider
      value={{
        sliderValue,
        handleSliderChange,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        decrementQty,
        incrementQty,
        searchQuery,
        handleSearch
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useContextData = () => useContext(context);
