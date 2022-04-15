import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LOGIN_URL = "http://127.0.0.1:8000/loginUser";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userdata, setUserdata] = useState("");
  const [roleuser, setRoleuser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [runuseeffect, setRunuseeffect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log("message -> " + message);
    if (message == "ok") {
      distributionData();
    }
  }, [message]);

  useEffect(() => {
    if (!isLoading) {
      messageResult();
    }
    if (message == "ok") {
      console.log("message -> " + message);
      console.log("role -> " + roleuser);
      console.log("isAdmin -> " + isAdmin);

      localStorage.setItem("email", email);
      localStorage.setItem("nom", response.data.user.nom);
      localStorage.setItem("prenom", response.data.user.prenom);
      localStorage.setItem("id", response.data.user.id);

      if (isAdmin) {
        navigate("/adminavislist");
      } else {
        navigate("/");
      }
    }
  }, [email, password, isLoading, runuseeffect]);

  function fetchUser(email, password) {
    axios
      .post(LOGIN_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setResponse(response);
      })
      .finally(() => {
        setIsLoading(false);
        setRunuseeffect(!runuseeffect);
      });
  }
  function messageResult() {
    setMessage(response.data.message);
  }

  function distributionData() {
    setUserdata(response.data.user);
    setRoleuser(response.data.user.roles);
    for (let i = 0; i < response.data.user.roles.length; i++) {
      if (response.data.user.roles[i] == "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    }
    setIsLoading(true);
  }

  return (
    <div>
      <div className="page">
        <div className="row" style={{ marginTop: "4%" }}>
          <div className="col-lg-6">
            <img
              src={"assets/FrontOffice/images/login_page.jpg"}
              style={{ width: "100%", height: 616, marginTop: "-9%" }}
            />
          </div>
          <div className="col-lg-6">
            <div className="ttm-bgcolor-white p-40 padding_top35 border-rad_5 margin_top15">
              <a
                className="home-link"
                href="index.html"
                title="Aqovo"
                rel="home"
              >
                <div className="row">
                  <div className="col-xl-6">
                    <img
                      id="logo-img"
                      className="img-fluid auto_size"
                      src={"assets/FrontOffice/images/1-aqvo-logo.png"}
                      alt="logo-img"
                      style={{ marginLeft: "87%" }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <h3 style={{ marginTop: "10%", marginLeft: "0%" }}>GIPP</h3>
                  </div>
                </div>
              </a>
              <br />
              <div className="row">
                <div className="col-md-3">
                  <span className="text-input">Email</span>
                </div>
                <div className="col-md-9">
                  <span className="text-input">
                    <input
                      type="text"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                      required
                    />
                  </span>
                </div>
                <div className="col-md-3">
                  <span className="text-input">Mot de passe</span>
                </div>
                <div className="col-md-9">
                  <span className="text-input">
                    <input
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Votre Mot de passe"
                      required
                    />
                  </span>
                </div>
                {message != "ok" && message != "" && (
                  <>
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                      <p style={{ color: "red" }}>{message}</p>
                    </div>
                  </>
                )}

                <div className="col-lg-12">
                  <button
                    className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 margin_top5"
                    onClick={() => fetchUser(email, password)}
                  >
                    Se Connecter
                  </button>
                </div>
                <div className="col-lg-12">
                  <br />
                  <br />
                </div>

                <div className="col-lg-12" style={{ textAlign: "center" }}>
                  <div className="social-icons d-inline-block margin_top10 margin_bottom10">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          className="tooltip-top"
                          href="#"
                          rel="noopener"
                          aria-label="facebook"
                          data-tooltip="Facebook"
                        >
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className="tooltip-top"
                          href="#"
                          rel="noopener"
                          aria-label="twitter"
                          data-tooltip="Twitter"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          className="tooltip-top"
                          href="#"
                          rel="noopener"
                          aria-label="instagram"
                          data-tooltip="Instagram"
                        >
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
