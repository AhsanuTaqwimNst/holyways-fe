import Icon from "./assets/holywaysicon.png";
import React, { useState, useContext, useEffect } from "react";
import Raise from "./assets/raise.png";
import "./assets/css/navbar.css";
import Register from "./auth/Register";
import Profile from "./assets/profile.png";
import Logout from "./assets/logout 1.png";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";
import LoginPage from "./auth/Login";

function Navbar() {
  const [state] = useContext(UserContext);
  useEffect(() => {
    console.log("this state", state);
  }, [state]);

  return (
    <>
      <div>{state.isLogin === true ? <PrivatePage /> : <GuestPage />}</div>
    </>
  );
}

export default Navbar;

function PrivatePage() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleRaise = () => {
    navigate("/myraisefund");
  };
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const id = state.user.id;
  const { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });

  return (
    // bedaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    <div className="App Container bg-danger">
      <div className="mr-5 ">
        <nav className="container navbar navbar-expand-lg navbar-light">
          <div
            className="justify-content-start"
            onClick={handleHome}
            style={{ cursor: "pointer" }}
          >
            <img src={Icon} alt="" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          {/* this drop */}
          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto "></ul>
            <form class="form-inline my-2 my-lg-0">
              <div className="dropdown ">
                <img
                  width={50}
                  style={{ borderRadius: "5px" }}
                  src={profile?.image ? profile?.image : "-"}
                  alt=""
                  className="dropdown rounded-circle"
                  height={40}
                  type="button"
                  id="dropdownMenu2"
                  data-toggle="dropdown"
                />

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenu2"
                  style={{ position: "absolute", left: 0, right: 20000 }}
                >
                  <li
                    className="dropdown-content  mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white" onClick={handleProfile}>
                      <img
                        src={Profile}
                        className="img fluid mr-3 ml-1"
                        alt="profile"
                      ></img>
                      <span className="title-down font-weight-bold outline-danger">
                        Profile
                      </span>
                    </div>
                  </li>
                  <li
                    className="dropdown-content  mt-1 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="bg-white " onClick={handleRaise}>
                      <img
                        src={Raise}
                        className="img fluid mr-3 ml-1"
                        alt="raise"
                      ></img>
                      <span className="title-down font-weight-bold">
                        Raise Fund
                      </span>
                    </div>
                  </li>
                  <hr />
                  <li
                    className="dropdown-content  mt-1"
                    style={{ cursor: "pointer" }}
                  >
                    <div onClick={logout} className="bg-white ">
                      <img
                        src={Logout}
                        className="img fluid mr-3 "
                        alt="logout"
                      ></img>
                      <span className="title-down font-weight-bold">
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
    //bedaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  );
}

function GuestPage() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="App Container bg-danger  ">
      <div className="container " id="sticky">
        <nav className="container navbar navbar-expand-lg  navbar-light">
          <div
            className="justify-content-start "
            onClick={handleHome}
            style={{ cursor: "pointer" }}
          >
            <img src={Icon} alt="HolyWays" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
              <Button
                className="bg-white text-danger font-weight-bold mr-3"
                style={{ border: "none" }}
                onClick={() => setShowRegister(true)}
              >
                Register
              </Button>
              <div></div>
              <Button
                className="bg-danger text-white font-weight-bold  mr-3"
                style={{ border: "none" }}
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
            </form>
          </div>
        </nav>
      </div>
      <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
      <LoginPage
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
    </div>
  );
}
