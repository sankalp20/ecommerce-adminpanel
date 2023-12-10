import React from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';


const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProductForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
