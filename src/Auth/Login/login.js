import "../auth.css";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../Hooks/useAxios";
import { useAuth } from "../auth-context";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const guestLogin = () => {
    setUserData((prev) => ({
      ...prev,
      email: "guestuser@test.com",
      password: "guestuser123",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData({
      method: "post",
      url: "/api/auth/login/",
      data: {
        email: userData.email,
        password: userData.password,
      },
    });
  };

  const { response, error, fetchData } = useAxios();

  useEffect(() => {
    if (response !== undefined && response.foundUser) {
      setIsLoggedIn(true);
      localStorage.setItem("userToken", response.encodedToken);
      toast.success("Sucessfully Login!", {
        id: "login-success",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/notes", { replace: true });
    } else {
      console.log("error ", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className="flex p-1 flex-space-center align-item-center h-100 form-auth">
      <div className="input-container w-50">
        <h2 className="form-heading">Login</h2>
        {error && <p className="error"> {error}</p>}
        <form onSubmit={handleSubmit} className="form-container">
          <label for="email">Email</label>
          <input
            value={userData.email}
            className={error ? "error" : ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            name="email"
            placeholder="yourname@mail.com"
          />
          <label for="password">Password </label>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            name="password"
            placeholder="********"
          />

          <button type="submit" className="btn btn-primary mb-1 ">
            Login
          </button>

            <button type="submit"
              onClick={() => guestLogin()}
              className="btn btn-secondary "
            >
              Guest Login
            </button>

          <h4>
            <Link to="/signUp" className="link color-primary">
              Create A New Account <i className="fa fa-arrow-right fa-x"></i>
            </Link>
          </h4>
        </form>
      </div>
    </div>
  );
}

export { Login };
