import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const Product = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [DATA, setDATA] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3001/products').then(res=>setDATA(res.data))
    
      
    }, []);
    const cardItem = (item) => {
    return (
        <div className="card my-5 py-4" key={item.id} style={{ width: '18rem' }}>
        <img src={item.img} className="card-img-top" alt={item.title} />
        <div className="card-body text-center">
            <h5 className="card-title">{item.title}</h5>
            <p className="lead">{item.price}dt</p>
            <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary">
            Buy Now
            </NavLink>
        </div>
        </div>
    );
};

const handleSearch = () => {
    const filteredItems = DATA.filter((item) => {
        const categoryMatch =
        selectedCategory === 'all' || item.category === selectedCategory;
        const searchTermMatch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return categoryMatch && searchTermMatch;
    });
    setFilteredData(filteredItems);
};

return (
    <div>
        <div className="container py-5">
        <div className="row justify-content-between mb-3">
            <div className="col-md-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="col-md-4">
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
            >
            <option value="all">All Categories</option>
            <option value="pc">pc</option>
            <option value="phone">phone</option>
            <option value="kit">airpods</option>
            <option value="watch-smart">smartwtch</option>
            </select>
            </div>
            <div className="col-md-2">
            <button
                className="btn btn-primary"
                onClick={handleSearch}
            >
                Search
            </button>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row justify-content-around">
            {filteredData.length > 0
            ? filteredData.map(cardItem)
            : DATA.map(cardItem)}
        </div>
        </div>
    </div>
);
};

export default Product;