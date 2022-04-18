import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const UPDATE_URL = "http://127.0.0.1:8000/user/editPassword";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);

  const UpdateAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Mot De Passe a été modifiés avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  useEffect(() => {
    if (message == "updated") {
      UpdateAlert();
    }
  }, [message]);

  function fetchUpdatePass() {
    axios
      .post(UPDATE_URL, {
        userId: localStorage.getItem("id"),
        password: password,
        newpassword: newPassword,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div>
      <Header />
      <div className="my-main mt-5 mb-5">
        <div className="container ">
          <div className="row ">
            <div className="col-md-8 p-0">
              <h5>Mon Compte</h5>
              <div class="container">
                <div class="row">
                  <div class="col-25">
                    <label for="fname">Mot De Passe </label>
                  </div>
                  <div class="col-75">
                    <input
                      type="password"
                      id="fname"
                      name="firstname"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-25">
                    <label for="fname">Nouveau Mot De Passe </label>
                  </div>
                  <div class="col-75">
                    <input
                      type="password"
                      id="fname"
                      name="firstname"
                      defaultValue={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {message != "updated" &&
                      message != "pas de données" &&
                      message != "" && (
                        <>
                          <p style={{ color: "red" }}>{message}</p>
                        </>
                      )}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-60">
                  <button
                    className="btn-lg rounded-pill float-right"
                    style={{
                      backgroundColor: "rgb(19, 198, 221)",
                      color: "white",
                    }}
                    onClick={() => {
                      fetchUpdatePass();
                    }}
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default UpdatePassword;
