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
  });
  const { name, pic, price, category, discription } = addproduct;

  const handlechange = (e) => {
    const { name, value } = e.target;

    // Restrict price input to numbers only
    if (name === "price") {
      if (/[^0-9]/.test(value)) {
        alert("Please enter numbers only for price");
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

      await AddProd(formdata);
      alert("Data is saved successfully!");
      // Optional: Reset form here
      setaddProduct({
        category: "",
        name: "",
        price: "",
        discription: "",
        pic: null,
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
        <option value="Bluetooth Speakers">Bluetooth Speakers</option>
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
