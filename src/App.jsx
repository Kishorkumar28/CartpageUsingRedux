import React from 'react';
import { ProductProvider } from './contexts/ProductContext';
import ProductList from './assets/Pages/ProductList';
import './App.css';

const App = () => {
  return (
    <div className='parent'>
    <ProductProvider>
      <div className="App">
        
        <ProductList />
      </div>
    </ProductProvider>
    </div>
  );
};

export default App;
