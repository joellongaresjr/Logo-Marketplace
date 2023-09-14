import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
        console.log(addOrderMutation);
      }
    }
 
    saveOrder();
  }, [addOrderMutation]);

  return (
    <div className="success-page">
      <div className="summary">
    <div className="title">
      <h2>Thank you for your purchase!</h2>
      {/* <h3>Your order number is: {id}</h3> */}
      <h3>You will receive an email confirmation shortly.</h3>
    </div>
      <div className="summary-grid">
      <h3> Order Summary:</h3>


      {cart
      .filter((product) => product._id !== 'shippingInfo')
      .map((product) => (
          <div className="ordered-items">
          <div key={product._id}>
          <p>{product.name}</p>
            <img src={product.imgUrl} alt="deez" />
            
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.purchaseQuantity}</p>
            <Link to={`/products/${product._id}`}>
            <button className="reorder-btn" type="submit">
                <a href="/pro">Purchase Again!</a>
              </button>
            </Link>
            <button> </button>
          </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Success;
