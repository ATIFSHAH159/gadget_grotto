import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { deleteproductbyid, getprod, updateProductById } from "../Services/api";
import '../Admin/Assets/ViewProducts.css';
const categories = [
  "PowerBank", "Bluetooth Speakers", "Fitness Bands", "Phone Cases & Covers",
  "Gaming Headsets", "EarBuds", "Drone Cameras", "Hard Drives & SSDs",
  "Mobile Skins", "Charging Cables"
];

function ViewProducts() {
  const [productdata, setProductdata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [updatedValues, setUpdatedValues] = useState({
    name: "",
    price: 0,
    discription: "",
    pic: null,
    stock: 0,
    costPrice: 0,
    sellingPrice: 0
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProductDetail();
    
    // Add window resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getProductDetail = async () => {
    try {
      const result = await getprod();
      if (result && Array.isArray(result.data)) {
        setProductdata(result.data);
      } else if (result && Array.isArray(result)) {
        setProductdata(result);
      } else {
        setProductdata([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductdata([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteproductbyid(id);
      setProductdata(productdata.filter((product) => product._id !== id));
    } catch (error) {
      console.log("Error in deleting product", error);
    }
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    setUpdatedValues({
      name: product.name,
      price: product.price,
      discription: product.discription,
      pic: product.pic,
      stock: product.stock || 0,
      costPrice: product.costPrice || 0,
      sellingPrice: product.sellingPrice || product.price || 0
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, price, discription, pic, stock, costPrice, sellingPrice } = updatedValues;
    if (!name || !price || !discription || !pic) {
      alert("Please fill in all fields before updating.");
      return;
    }
    try {
      const id = selectedProduct._id;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("discription", discription);
      formData.append("stock", stock);
      formData.append("costPrice", costPrice);
      formData.append("sellingPrice", sellingPrice);
      if (pic) formData.append("pic", pic);
      await updateProductById(id, formData);
      setShowModal(false);
      getProductDetail();
    } catch (error) {
      console.log("Error in updating product", error);
    }
  };
  

  const filteredProducts = productdata
    .filter(p => selectedCategory === "All" ? true : p.category === selectedCategory)
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.discription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Mobile Card View Component
  const ProductCards = () => (
    <div className="product-cards">
      {filteredProducts.map((details, index) => (
        <div className="product-card" key={index}>
          <div className="card-header">
            <img
              src={`http://localhost:5000/${details.pic}`}
              alt={details.name}
              className="product-image"
            />
          </div>
          <div className="card-body">
            <h4 className="product-name">{details.name}</h4>
            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">Price:</span>
                <span className="detail-value">${details.price}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stock:</span>
                <span className="detail-value">{details.stock}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cost Price:</span>
                <span className="detail-value">{details.costPrice}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Selling Price:</span>
                <span className="detail-value">{details.sellingPrice || details.price}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{details.category}</span>
              </div>
              <div className="detail-row description">
                <span className="detail-label">Description:</span>
                <p className="detail-value">{details.discription}</p>
              </div>
            </div>
            <div className="card-actions">
              <button
                onClick={() => deleteProduct(details._id)}
                className="delete-btn"
                style={{ backgroundColor: '#D11A2A' }}
              >
                <RiDeleteBin6Line /> Delete
              </button>
              <button
                onClick={() => handleShow(details)}
                className="edit-btn"
                style={{ backgroundColor: '#008CBA' }}
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop Table View Component
  const ProductTable = () => (
    <div className="table-container">
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Description</th>
            <th>Category</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((details, index) => (
            <tr key={index}>
              <td>
                <img
                  style={{ width: "4rem", height: "5rem" }}
                  src={`http://localhost:5000/${details.pic}`}
                  alt={details.name}
                />
              </td>
              <td>{details.name}</td>
              <td>{details.price}</td>
              <td>{details.stock}</td>
              <td>{details.costPrice}</td>
              <td>{details.sellingPrice || details.price}</td>
              <td>{details.discription}</td>
              <td>{details.category}</td>
              <td className="actions-cell">
                <div className="action-buttons">
                  <button
                    onClick={() => deleteProduct(details._id)}
                    className="delete-btn"
                    style={{
                      backgroundColor: '#D11A2A',
                      border: 'none',
                      padding: '10px'
                    }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    onClick={() => handleShow(details)}
                    className="edit-btn"
                    style={{
                      backgroundColor: '#008CBA',
                      border: 'none',
                      marginLeft: '5px',
                      padding: '10px',
                    }}
                  >
                    <FaEdit />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div className="view-products-container">
      {/* Filter Controls Row */}
      <div className="filter-controls">
        {/* Category Dropdown */}
        <div className="category-filter-container">
          <Form.Select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </div>
        
        {/* Search Input */}
        <div className="search-container">
          <Form.Control
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Conditional Rendering Based on Screen Size */}
      {isMobile ? <ProductCards /> : <ProductTable />}

      {/* Modal for Updating Product */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedValues.name}
                onChange={(e) => setUpdatedValues({ ...updatedValues, name: e.target.value })}
              />
            </Form.Group>
            <Form.Control
  type="text"
  value={updatedValues.price}
  onChange={(e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      alert("Please enter a valid number (digits and optional decimal point)");
      return;
    }
    setUpdatedValues({ ...updatedValues, price: value });
  }}
/>

            <Form.Group controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedValues.discription}
                onChange={(e) => setUpdatedValues({ ...updatedValues, discription: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setUpdatedValues({ ...updatedValues, pic: file });
                  }
                }}
              />
              {updatedValues.pic && (
                typeof updatedValues.pic === "object" ? (
                  <img
                    src={URL.createObjectURL(updatedValues.pic)}
                    alt="Preview"
                    className="preview-image"
                  />
                ) : (
                  <img
                    src={`http://localhost:5000/${updatedValues.pic}`}
                    alt="Existing"
                    className="preview-image"
                  />
                )
              )}
            </Form.Group>
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={updatedValues.stock}
                onChange={e => setUpdatedValues({ ...updatedValues, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductCostPrice">
              <Form.Label>Cost Price</Form.Label>
              <Form.Control
                type="number"
                value={updatedValues.costPrice}
                onChange={e => setUpdatedValues({ ...updatedValues, costPrice: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductSellingPrice">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                value={updatedValues.sellingPrice}
                onChange={e => setUpdatedValues({ ...updatedValues, sellingPrice: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewProducts;
