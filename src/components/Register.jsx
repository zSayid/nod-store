import Logo from "../ui/Logo";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserStart,
  registerSuccess,
  signUserFailure,
} from "../slice/auth";
import AuthService from "../service/auth";
import ValidationError from "../utils/validation-error";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitSignUpHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { name, email, password };

    try {
      const response = await AuthService.userRegister(user);
      dispatch(registerSuccess(response.data));
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      dispatch(signUserFailure(error.response));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <main className="form-signin register-box">
        <form className="form-control p-4" onSubmit={submitSignUpHandler}>
          <div className="text-center mb-3">
            <Logo />
          </div>
          <div className="text-center">
            <h3 className="h4 mb-3">Please register</h3>
          </div>

          <Input
            label={"Username"}
            state={name}
            className="gap-3"
            setState={setName}
            required={true}
          />
          <Input
            label={"Email"}
            state={email}
            className="gap-3"
            setState={setEmail}
            required={true}
          />
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            className="gap-3"
            setState={setPassword}
            required={true}
          />

          <ValidationError />

          <button
            className="w-100 btn btn-lg btn-primary mt-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
