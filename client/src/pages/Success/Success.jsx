import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from './../../utils/mutations';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import './SuccessStyles.css';

const Success = () => {
  const { id } = useParams(); 
  const token = localStorage.getItem('id_token');
  const decodedToken = Auth.getProfile(token);
  const cart = useSelector((state) => state.cart);


  const [addOrderMutation] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');

      console.log(cart);
      const products = cart.map((item) => item._id);
      console.log(products);

      if (products.length) {
        const { data } = await addOrderMutation({ variables: { products } });

        // productData.forEach((item) => {
        //   idbPromise('cart', 'delete', item);
        // });
        console.log(addOrder)
      }

  
    }
 
    saveOrder();
  }, [addOrderMutation]);

  return (
    <div className="success-page">
      <div className="summary">
    <div className="title">
      <h2>Thank you for your purchase!</h2>
      <h3>Your order number is: {id}</h3>
      <h3>You will receive an email confirmation shortly.</h3>
      <h3> Order Summary:</h3>
    </div>
      <div className="item-grid">
      
        {cart.map((product) => (
          <div className="ordered-items">
          <div key={product._id}>
          <p>{product.name}</p>
            <img src={product.imgUrl} alt="" />
            
            <p>Price: ${product.price}</p>
          </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Success;
