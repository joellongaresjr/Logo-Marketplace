// import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Signup = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState);
      const mutationResponse = await addUser({
        variables: { 
          email: formState.email, 
          password: formState.password,
          username: formState.username,
          address: formState.address,
         },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  return (
    <div className="form-container">
      <Link to="/login">Go to Login</Link>
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="hello@example.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="username">Username</label>
          <input
            placeholder="Username"
            name="username"
            type="string"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="Address">Shipping Address</label>
          <input
            placeholder="1234 Main St"
            name="address"
            type="String"
            id="address"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="pwd">Confirm Password</label>
          <input
            placeholder="Confirm Password"
            name="password"
            type="password"
            id="confirmPwd"
            onChange={handleChange}
          />
        </div>

        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
