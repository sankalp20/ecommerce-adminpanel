import React, { useState, useEffect } from 'react';
import sampleProducts from '../data/sampleProducts';
import ProductTable from './ProductTable';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import '../App.css';
import FilterBar from './FilterBar';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = () => {
    const filteredProducts = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);

    // Implement logic to filter products based on applied filters
    const filtered = products.filter((product) => {
      // Filter by price range
      const { priceRange } = filters;
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-');
        const productPrice = parseFloat(product.price);

        if (productPrice < parseFloat(minPrice) || productPrice > parseFloat(maxPrice)) {
          return false;
        }
      }

      // Filter by category
      const { category } = filters;
      if (category && product.category !== category) {
        return false;
      }

      // Add more conditions for other filters

      // If the product passes all filters, return true
      return true;
    });

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () =>{
    navigate('/add-product');
  };

  const handleDelete = (productId) => {
    // Update the state or perform any other actions after deletion
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`);

        const data = await response.json();

        setProducts(data.length > 0 ? data : sampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sampleProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='w-100'>
      <div className="controlsContainer">

        {/* Search Bar */}
        <TextField
          type="text"
          placeholder="Search..."
          className="searchBar"
          value={searchQuery}
          onChange={handleSearchInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleSearch}>
                  <Search />
                </Button>
              </InputAdornment>
            ),
          }}
        />


        {/* Filters (Placeholder) */}
        <FilterBar handleFilter={handleFilter} />

        <Button> Export All</Button>

        {/* Add Product Button (Placeholder) */}
        <Button onClick={handleAddProduct}> Add Product </Button>
      </div>
      <h3>All Products</h3>
      <ProductTable products={filteredProducts.length > 0 ? filteredProducts : products} onDelete={handleDelete} />
    </div>
  );
};

export default ProductList;
