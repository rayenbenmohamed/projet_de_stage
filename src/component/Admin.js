import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    desc: '',
    img: '',
    category: '',
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    };

    fetchData();

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const addProductHandler = async () => {
    try {
      const response = await axios.post('http://localhost:3001/products', newProduct);
      const addedProduct = response.data;
      setProducts([...products, addedProduct]);
      setNewProduct({
        title: '',
        price: 0,
        desc: '',
        img: '',
        category: '',
      });
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout du produit:', error);
    }
  };

  const updateProductHandler = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:3001/products/${id}`, updatedProduct);
      const updatedProducts = products.map(product => (product.id === id ? updatedProduct : product));
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la mise à jour du produit:', error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression du produit:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Management</h2>

      {currentUser && (
        <div className="mb-4">
          <p className="lead">Utilisateur Connecté: {currentUser.username}</p>
        </div>
      )}

      <form>
        <h3>Add New Product</h3>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description:</label>
          <textarea
            id="desc"
            className="form-control"
            value={newProduct.desc}
            onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image URL:</label>
          <input
            type="text"
            id="img"
            className="form-control"
            value={newProduct.img}
            onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={addProductHandler}>
          Add Product
        </button>
      </form>

      <h3 className="mt-4">Product List</h3>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.title} - {product.price} dt{' '}
            <div>
              <button type="button" className="btn btn-warning btn-sm mx-2" onClick={() => updateProductHandler(product.id, { ...product, price: product.price + 10 })}>
                Update
              </button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProductHandler(product.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
