import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { useDispatch,useSelector } from 'react-redux';
import { addQuantity } from '../../Redux/Reducers/tasks.reducer';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  const [quantities, setQuantities] = useState({}); // State to track quantities
  const [totalPrice, setTotalPrice] = useState(0);
  
  const store=useSelector((state)=>{
    console.log(state.prices)
  })

  useEffect(() => {
    // Calculate total price when products or their quantities change
    const calculateTotalPrice = () => {
      const totalPrice = Object.keys(quantities).reduce(
        (acc, productId) => {
          const product = products.find(p => p.id === parseInt(productId));
          return acc + (product ? product.price * quantities[productId] : 0);
        },
        0
      );
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [products, quantities]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
    const task=quantity
    if(task){
      dispatcher(addQuantity({ productId, quantity }));
    }
    
  };
  const taskInputRef=useRef(null)
  
  const dispatcher=useDispatch();

  return (
    
    <div className="products">
      <h1 className="product-list">Cart</h1>
      <ul className="" style={{ listStyleType: 'none' }}>
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div className='details'>
            <img className='images' src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Description: {product.description}</p>
            
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Discount: {product.discountPercentage}%</p>
            </div>
            <div className='order'>

            <h3 className="prices">Price: ${product.price}</h3>
            <select ref={taskInputRef}
              value={quantities[product.id] || 0}
              onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
            >
              {/* Generate options based on stock */}
              {Array.from({ length: Math.min(product.stock, 5) + 1 }, (_, index) => index).map(quantity => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
            </div>
            {/* Button to add to cart or perform other actions */}
          </li>
        ))}
      </ul>
      <div className="summary">
          <div><h2>Shipping : Free</h2></div>
          <div className='price' >Total Price: ${totalPrice}</div>
      </div>
      
    </div>
  );
};

export default ProductList;
