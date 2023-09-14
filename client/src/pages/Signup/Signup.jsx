import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    address: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);
  const [apolloErrorText, setApolloErrorText] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track whether the form is submitted

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (formState.password !== formState.confirmPassword) {
      setApolloErrorText("Passwords do not match");
      return;
    }

    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
          address: formState.address,
        },
      });

      const token = mutationResponse.data.addUser.token;

      Auth.login(token);
      Auth.getProfile(token).then((data) => {
        dispatch({
          type: "LOGIN",
          payload: data.data,
        });
      });
      navigate("/");
    } catch (e) {
      if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        const errorMessages = e.graphQLErrors.map((error) => error.message);
        console.log(errorMessages);

        let apolloErrorText = "An error occurred while signing up. Please try again.";

        errorMessages.forEach((msg) => {
          if (msg.includes("E11000 duplicate key error")) {
            if (msg.includes("email")) {
              apolloErrorText = `An account with the email ${formState.email} already exists. Please use a different email address.`;
            } else if (msg.includes("username")) {
              apolloErrorText = `The username "${formState.username}" is already taken. Please choose a different username.`;
            }
          }
        });

        setApolloErrorText(apolloErrorText);
      }
    }
  };

  return (
    <section className="form-section">
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
            <label htmlFor="address">Shipping Address</label>
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
            <label htmlFor="confirmPwd">Confirm Password</label>
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              id="confirmPwd"
              onChange={handleChange}
            />
          </div>
          {apolloErrorText && (
            <div>
              <p className="error-text">{apolloErrorText}</p>
            </div>
          )}
          <div className="">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
