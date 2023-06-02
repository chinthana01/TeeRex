
import React, { useState, useEffect, useContext } from 'react';
import './ProductListingPage.css';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    color: '',
    priceRange: '',
    type:'',
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];

      if (searchQuery !== '') {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filters.color !== '') {
        filtered = filtered.filter(
          (product) => product.color.toLowerCase() === filters.color.toLowerCase()
        );
      }

      if (filters.gender !== '') {
        filtered = filtered.filter(
          (product) => product.gender.toLowerCase() === filters.gender.toLowerCase()
        );
      }

      if (filters.type !== '') {
        filtered = filtered.filter(
          (product) => product.type.toLowerCase() === filters.type.toLowerCase()
        );
      }
      if (filters.priceRange !== '') {
        switch (filters.priceRange) {
          case 'low':
            filtered = filtered.filter((product) => product.price === 250);
            break;
          case 'medium':
            filtered = filtered.filter((product) => product.price === 300);
            break;
          case 'high':
            filtered = filtered.filter((product) => product.price >= 350);
            break;
           
          default:
            break;
        }
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, filters, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart'); // Redirect to the cart page
  };


  

  return (
    <div className="product-listing">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="filters">
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        <select name="color" value={filters.color} onChange={handleFilterChange}>
          <option value="">All Colors</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="white">white</option>
          <option value="purple">Purple</option>
        </select>
        <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
          <option value="">All Prices</option>
          <option value="low">Low ($250)</option>
          <option value="medium">Medium ($300)</option>
          <option value="high">High ({'>'}$350)</option>
        </select>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All types</option>
          <option value="polo">Polo</option>
          <option value="hoodie">Hoodie</option>
          <option value="round">Round</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-image">
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="product-card-details">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;


