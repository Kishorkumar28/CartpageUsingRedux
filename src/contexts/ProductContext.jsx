import React, { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    console.log("products",products)
    useEffect(() => {
      fetchProducts(); // Fetch products when component mounts
    }, []);
  
    const fetchProducts = async () => {
      try {
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setProducts(jsonData[0].products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  return (
    <ProductContext.Provider value={{ products ,fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
