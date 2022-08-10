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
  const [controlRole, setControlRole] = useState(false);

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
      localStorage.setItem("selected_language", "Français");
      localStorage.setItem("playonce", 0);

      if (roleuser.length > 0 && controlRole == true && response != "") {
        let admintest = false;
        for (let i = 0; i < response.data.user.roles.length; i++) {
          if (response.data.user.roles[i] == "ROLE_ADMIN") {
            admintest = true;
            break;
          }
        }

        if (admintest) {
          console.log("hethi hia s7i7a" + admintest);
          navigate("/admindashboard");
        } else {
          console.log("hethi hia s7i7a" + admintest);
          navigate("/");
        }

        // if (isAdmin) {
        //   // navigate("/adminavislist");
        // } else {
        //   // navigate("/");
        // }
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
    setControlRole(true);
    setIsLoading(true);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        backgroundColor: "#1D2A4D",
      }}
    >
      <div className="page">
        <div
          className="row"
          style={{
            //backgroundColor: "#13C6DD",
            //background: "linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%)",
            backgroundImage:
              "url(/assets/FrontOffice/images/bg-image/col-bgimage-5.jpg)",
            backgroundSize: "cover",
            padding: 45,
            paddingBottom: 120,
          }}
        >
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="card p-5">
              <div className="col-md-12 d-flex align-items-center justify-content-center">
                <a className="home-link" title="Aqovo" rel="home">
                  <div className="row">
                    <img
                      id="logo-img"
                      className="img-fluid auto_size"
                      src={"/assets/FrontOffice/images/1-aqvo-logo.png"}
                      alt="logo-img"
                    />
                    <div style={{ position: "relative" }}>
                      <h1
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 10,
                          fontSize: 38,
                          fontWeight: "bold",
                        }}
                      >
                        GIPP
                      </h1>
                    </div>
                  </div>
                </a>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3 d-flex align-items-center">
                  <span className="text-input">Email</span>
                </div>
                <div className="col-md-9">
                  <span className="text-input w-100">
                    <input
                      style={{ backgroundColor: "#EFF3FF", border: "none" }}
                      type="text"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre email"
                    />
                  </span>
                </div>
                <br />
                <br />
                <br />
                <div className="col-md-3 d-flex align-items-center">
                  <span className="text-input">Mot de passe</span>
                </div>
                <div className="col-md-9">
                  <span className="text-input w-100">
                    <input
                      style={{ backgroundColor: "#EFF3FF", border: "none" }}
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Votre Mot de passe"
                      required
                    />
                  </span>
                </div>
                <br />
                <br />
                <br />
                {message != "ok" && message != "" && (
                  <>
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                      <p style={{ color: "red" }}>{message}</p>
                    </div>
                  </>
                )}
                <div className="col-md-3"></div>
                <div className="col-md-9">
                  <p>
                    Vous n'avez pas de compte ?{" "}
                    <span
                      style={{
                        cursor: "pointer",
                        color: "#0e204d",
                      }}
                      onClick={() => navigate("/inscription")}
                    >
                      Inscription
                    </span>
                  </p>
                </div>

                <div className="col-lg-12">
                  <button
                    style={{ borderRadius: 15 }}
                    className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 margin_top5"
                    onClick={() => fetchUser(email, password)}
                  >
                    Se Connecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer widget-footer ttm-bgcolor-darkgrey ttm-textcolor-white">
          <div
            className="second-footer"
            style={{ backgroundColor: "#1D2A4D" }}
          ></div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
