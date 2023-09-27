import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { SAVE_USER } from "../../utils/actions";
import Auth from "../../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });

      const token = mutationResponse.data.login.token;
      const userId = mutationResponse.data.login.user._id;
      console.log(userId)
      dispatch({
        type: SAVE_USER,
        payload: userId,
      });
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  return (
    <section className="login-section">
      <div className="form-container">
        <Link to="/signup">Go to Sign Up</Link>
        <h2>Login</h2>
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
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="Password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>

          {error ? (
            <div>
              <p className="error-text">
                Username or Password is incorrect. Please try again.
              </p>
            </div>
          ) : null}
          <div className="">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
