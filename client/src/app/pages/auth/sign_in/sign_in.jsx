import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sign_in.css";
import "../sign_up/sign_up.css";
import axios from "axios";
import photo from "../../../assets/photo.png";
import google_icon from "../../../assets/google.png";
import Mask_group from "../../../assets/Mask_group.png";
import Tafi_logo_white from "../../../assets/Tafi_logo_white.png";
import { Link } from "react-router-dom";
import Header from "../../header/header";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

var token;

const SignIn = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [path, setPath] = useState(id);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (id) {
      setPath(id);
    }
  }, [id]);

  const [formField, setFormField] = useState({
    phone: "",
    otp: "",
    name: "",
    checkbox: 0
  });

  const handleChangeFormField = (e) => {
    console.log(token);
    if (e.target.name === "phone" || e.target.name === "otp") {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
    setFormField({ ...formField, [e.target.name]: e.target.value });
  
}

  const onSendOtp = async (event) => {
    try {
      event.preventDefault();
      if (formField.phone.length == 10) {
        const { data } = await axios.post("http://localhost:8080/auth/sendOtp", {
          phone: formField.phone,
        });
        token = data.token;
        if (data.success) {
          toast.success("OTP Sent successfully", {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      } else {
        toast.error("Please enter a valid phone number", {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const onSignUp = async (event) => {
    try {
      event.preventDefault();
      if (token) {
        const { data } = await axios.post(
          "http://localhost:8080/auth/verifyOtp",
          {
            otp: formField.otp,
            token: token,
          }
        );
        if (data.success) {
          const { data } = await axios.post("http://localhost:8080/auth/signup", {
            phone: formField.phone,
            userName: formField.name,
            email: formField.email,
          });
          if (data.success) {
            localStorage.setItem("auth_token", token);
            localStorage.setItem("user_id", data.data._id);
            if (formField.checkbox == 0) {
              forgotOnClose();
            }
            navigate("/");
          } else {
            toast.error(data.message, {
              position: "bottom-right",
              autoClose: 8000,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        } else {
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      } else {
        toast.error("Please enter a valid OTP", {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const forgotOnClose = () => {
    window.onbeforeunload = function (e) {
      localStorage.clear();
    }
  }

  const onTogglePage = (path) => {
    setPath(path);
  };

  const onLogin = async (event) => {
    try {
      event.preventDefault();
      if (token) {
        const { data } = await axios.post("http://localhost:8080/auth/login", {
          phone: formField.phone,
          otp: formField.otp,
          token: token,
        });
        if (data.success) {
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("user_id", data.data._id);
          if (formField.checkbox == 0) {
            forgotOnClose();
          }
          navigate("/");
        } else {
          toast.error(data.message, {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      }
      else{
        toast.error("Please enter a valid phone number", {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    setFormField({ ...formField, [value]: checked ? 1 : 0 });
  };

  return (
    <>
      <Header />
      {path === 'login' && (
        <div className="div sign_in">
          <div className="div-8">
            <div className="div-9">
              <div className="column">
                <div className="div-10">
                  <div className="div-11">
                    <img loading="lazy" src={Mask_group} className="img-2" />
                    <span className="span-4">
                      <img
                        loading="lazy"
                        src={Tafi_logo_white}
                        className="img-3"
                      />
                      <div className="div-12">
                        <div>
                          <span className="welcome-text">Welcome</span>
                        </div>
                        <div>
                          <span className="back-text">Back!</span>
                        </div>
                      </div>
                    </span>
                    <img loading="lazy" src={photo} className="img-4" />
                  </div>
                </div>
              </div>
              <div className="column-2">
                <span className="span-5">
                  <div className="div-13">Login Account</div>

                  <span className="span-6">
                    <div className="div-14" />

                    <div className="div-15">
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleChangeFormField}
                        placeholder="Enter your phone number"
                      />
                      <button className="button_otp" onClick={onSendOtp}>
                        Generate otp
                      </button>
                    </div>
                  </span>
                  {/* <div className="input-phone">
                  <input type="tel" placeholder="Enter phone number" />
                </div> */}
                  <span className="span-7">
                    <div className="div-16" />
                    <div className="div-17">
                      <input
                        type="tel"
                        name="otp"
                        onChange={handleChangeFormField}
                        placeholder="Enter OTP"
                      />
                    </div>
                  </span>
                  <div className="checkbox">
                    <input type="checkbox" value="checkbox" onChange={handleCheckBox} style={{ marginRight: "5px" }} />
                    Keep me signed in
                  </div>
                  <button className="span-9" onClick={onLogin}>
                    Login
                  </button>

                  <div className="div-20">
                    <span className="register-text">
                      Haven’t registered yet?{" "}
                    </span>
                    <Link
                      onClick={(e) => onTogglePage('register')}
                      className="create-account-text"
                    >
                      Create an account
                    </Link>
                  </div>
                  <div className="div-21">
                    <div className="div-22">
                      {/* <img loading="lazy" src={google_icon} className="img-5" /> */}
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {path === 'register' && (
        <div className="div sign_up">
          <div className="div-8">
            <div className="div-9">
              <div className="column-2">
                <span className="span-5">
                  <div className="div-13">Register</div>

                  <span className="span-6">
                    <div className="div-14" />

                    <div className="div-15">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChangeFormField}
                        placeholder="Enter your username"
                      />
                    </div>
                  </span>

                  <span className="span-6">
                    <div className="div-14" />

                    <div className="div-15">
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleChangeFormField}
                        placeholder="Enter your phone number"
                      />
                      <button className="button_otp" onClick={onSendOtp}>
                        Generate otp
                      </button>
                    </div>
                  </span>

                  <span className="span-7">
                    <div className="div-16" />
                    <div className="div-17">
                      <input
                        type="tel"
                        name="otp"
                        onChange={handleChangeFormField}
                        placeholder="Enter OTP"
                      />
                    </div>
                  </span>
                  <div className="checkbox">
                    <input type="checkbox" onChange={handleCheckBox} style={{ marginRight: "5px" }} />
                    Keep me signed in
                  </div>
                  <div className="register">
                    <button className="span-9" onClick={onSignUp}>
                      Register
                    </button>
                  </div>

                  <div className="div-20">
                    <span className="register-text">Already a user? </span>
                    <Link
                      onClick={(e) => onTogglePage('login')}
                      className="create-account-text"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="div-21">
                    <div className="div-22">
                      <img loading="lazy" src={google_icon} className="img-5" />
                    </div>
                  </div>
                </span>
              </div>
              <div className="column">
                <div className="div-10">
                  <div className="div-11">
                    <img loading="lazy" src={Mask_group} className="img-2" />
                    <span className="span-4">
                      <img
                        loading="lazy"
                        src={Tafi_logo_white}
                        className="img-3"
                      />
                      <div className="div-12">
                        {/* <span className="welcome-text">Welcome</span> */}
                        <br />
                      </div>
                    </span>
                    <img loading="lazy" src={photo} className="img-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SignIn;
