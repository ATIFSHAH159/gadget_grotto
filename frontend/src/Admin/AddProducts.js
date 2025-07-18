import React, { useState } from "react";
import "../Admin/Assets/AddProducts.css";
import { AddProd } from "../Services/api";

function AddProducts() {
  const [addproduct, setaddProduct] = useState({
    category: "",
    name: "",
    price: "",
    discription: "",
    pic: null,
    stock: "",
    costPrice: "",
    sellingPrice: ""
  });
  const { name, pic, price, category, discription, stock, costPrice, sellingPrice } = addproduct;

  const handlechange = (e) => {
    const { name, value } = e.target;
    if (["price", "stock", "costPrice", "sellingPrice"].includes(name)) {
      if (/[^0-9.]/.test(value)) {
        alert("Please enter numbers only for price, stock, and cost fields");
        return;
      }
    }
    setaddProduct({ ...addproduct, [name]: value });
  };

  const handleimage = (e) => {
    setaddProduct({ ...addproduct, [e.target.name]: e.target.files[0] });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!category || !name || !price || !discription || !pic) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("category", category);
      formdata.append("price", price);
      formdata.append("discription", discription);
      formdata.append("pic", pic);
      formdata.append("stock", stock);
      formdata.append("costPrice", costPrice);
      formdata.append("sellingPrice", sellingPrice);

      await AddProd(formdata);
      alert("Data is saved successfully!");
      // Optional: Reset form here
      setaddProduct({
        category: "",
        name: "",
        price: "",
        discription: "",
        pic: null,
        stock: "",
        costPrice: "",
        sellingPrice: ""
      });
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handlesubmit}>
      <h2>Add Product</h2>

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={category}
        onChange={handlechange}
        required
      >
        <option value="" disabled>Select a category</option>
        <option value="PowerBank">PowerBank</option>
        <option value="Bluetooth_Speaker">Bluetooth Speakers</option>
        <option value="Fitness Bands">Fitness Bands</option>
        <option value="Phone Cases & Covers">Phone Cases & Covers</option>
        <option value="Gaming Headsets">Gaming Headsets</option>
        <option value="EarBuds">EarBuds</option>
        <option value="Drone Cameras">Drone Cameras</option>
        <option value="Hard Drives & SSDs">Hard Drives & SSDs</option>
        <option value="Mobile Skins">Mobile Skins</option>
        <option value="Charging Cables">Charging Cables</option>
      </select>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={name}
        onChange={handlechange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={price}
        onChange={handlechange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={stock}
        onChange={handlechange}
        required
      />
      <input
        type="number"
        name="costPrice"
        placeholder="Cost Price"
        value={costPrice}
        onChange={handlechange}
        required
      />
      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        value={sellingPrice}
        onChange={handlechange}
        required
      />
      <textarea
        name="discription"
        placeholder="Description"
        value={discription}
        onChange={handlechange}
        required
      />

      <input
        type="file"
        id="pic"
        name="pic"
        onChange={handleimage}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProducts;
