import Logo from "../ui/Logo";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUserStart, signUserSuccess, signUserFailure } from "../slice/auth";
import AuthService from "../service/auth";
import ValidationError from "../utils/validation-error";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../slice/cart.slice";
import { setItem } from "../helpers/persistence-storage";

import "../App.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitLoginHandler = async (e) => {
    e.preventDefault();

    dispatch(signUserStart());
    const user = { email, password };

    try {
      const response = await AuthService.userLogin(user);
      const token = response.data.token;
      setItem("token", token);
      dispatch(setUserId(user.email)); 
      dispatch(signUserSuccess(response.data));
      navigate("/");
    } catch (error) {
      console.error("API Error:", error);
      dispatch(
        signUserFailure({
          data: {
            errors: error.response?.data?.errors || [
              "An unexpected error occurred.",
            ],
          },
        })
      );
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin login-box">
        <form className="form-control p-4" onSubmit={submitLoginHandler}>
          <div className="text-center mb-3">
            <Logo />
          </div>
          <div className="text-center">
            <h3 className="h4 mb-3">Please sign in</h3>
          </div>

          <Input
            label={"Email"}
            state={email}
            className="gap-3"
            setState={setEmail}
          />

          <Input
            type={"password"}
            label={"Password"}
            state={password}
            className="gap-3"
            setState={setPassword}
          />

          <ValidationError />

          <button
            className="w-100 btn btn-lg btn-primary mt-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
