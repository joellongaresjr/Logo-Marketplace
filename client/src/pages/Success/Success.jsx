import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from './../../utils/mutations';
import Auth from '../../utils/auth';

const Success = () => {
  const { id } = useParams(); 
  const token = localStorage.getItem('id_token');
  const decodedToken = Auth.getProfile(token);
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  const [addOrderMutation] = useMutation(ADD_ORDER);

  const user_id = decodedToken.data._id;

  const handleAddOrder = async () => {
    try {
      const response = await addOrderMutation({
        variables: { userId: user_id, products: cart },
      });
      console.log(response);
    } catch (error) {
      console.error('GraphQL Error:', error.message);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      handleAddOrder();
    }
  }, [cart]); 

  return (
    <div className="success-page">
      <h2>Thank you for your purchase!</h2>
      <h3>Your order number is: {id}</h3>
      <h3>You will receive an email confirmation shortly.</h3>
      <div className="item-grid">
        {/* Render the products in the cart */}
        {cart.map((product) => (
          <div key={product._id}>
            {/* Render your product details here */}
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            {/* Add more product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Success;
