import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../assets/FrontOffice/css/settings.css";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const USER_URL = "http://127.0.0.1:8000/user/show";
const UPDATE_USER_URL = "http://127.0.0.1:8000/user/edit";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState(0);
  const [codePostale, setCodePostale] = useState(0);
  const [mail, setMail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [adresse, setAdresse] = useState("");
  const [pays, setPays] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const options = ["Tunisie", "Italie", "France", "Espagne"];

  const UpdateAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Les données ont été modifiées avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  useEffect(() => {
    if (!playOnce) {
      fetchUser();
      setPlayOnce(true);
    }
  }, [user]);

  function fetchUser() {
    axios
      .post(USER_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setUser(response.data);
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setTel(response.data.telephone);
        setMail(response.data.email);
        setEntreprise(response.data.entreprise.nom);
        setAdresse(response.data.entreprise.adresse);
        setPays(response.data.entreprise.pays);
        setCodePostale(response.data.entreprise.code_postal);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function fetchUpdateUser() {
    axios
      .post(UPDATE_USER_URL, {
        userId: localStorage.getItem("id"),
        nom: nom,
        prenom: prenom,
        telephone: tel,
        nomentreprise: entreprise,
        adresse: adresse,
        pays: pays,
        code_postal: codePostale,
      })
      .then((response) => {
        localStorage.removeItem("nom");
        localStorage.removeItem("prenom");
        localStorage.setItem("nom", nom);
        localStorage.setItem("prenom", prenom);
      })
      .finally(() => {
        fetchUser();
      });
  }

  return (
    <div>
      <Header />
      {isLoading && (
        <div class="scene my-main mb-5">
          <div class="plane">
            <div class="cube cube--0">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--0"></div>
            <div class="cube cube--1">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--1"></div>
            <div class="cube cube--2">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--2"></div>
            <div class="cube cube--3">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--3"></div>
            <div class="cube cube--4">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--4"></div>
            <div class="cube cube--5">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--5"></div>
            <div class="cube cube--6">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--6"></div>
            <div class="cube cube--7">
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
              <div class="cube__side"></div>
            </div>
            <div class="shadow shadow--7"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="my-main mt-5 mb-5">
          <div className="container ">
            <div className="row ">
              <div className="col-md-8 p-0">
                <h5>Mon Compte</h5>

                <div class="container">
                  <div class="row">
                    <div class="col-25">
                      <label for="fname">Nom </label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="fname"
                        name="firstname"
                        defaultValue={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-25">
                      <label for="lname">Prenom</label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        defaultValue={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-25">
                      <label for="subject">Téléphone</label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        defaultValue={tel}
                        onChange={(e) => setTel(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-25">
                      <label for="subject">Email</label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        defaultValue={mail}
                        readOnly
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="subject">Entreprise</label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        defaultValue={entreprise}
                        onChange={(e) => setEntreprise(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="subject">Adresse</label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        defaultValue={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="country">Pays</label>
                    </div>
                    <div class="col-75">
                      <select
                        id="country"
                        name="country"
                        onChange={(e) => setPays(e.target.value)}
                        value={pays}
                      >
                        {options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-25">
                      <label for="subject">Code Postal</label>
                    </div>
                    <div class="col-75">
                      <input
                        type="text"
                        id="lname"
                        name="lastname"
                        defaultValue={codePostale}
                        onChange={(e) => setCodePostale(e.target.value)}
                      />
                    </div>
                  </div>

                  <br />
                  <div class="row">
                    <div class="col-60">
                      <button
                        className="btn-lg rounded-pill float-right"
                        style={{
                          backgroundColor: "rgb(19, 198, 221)",
                          color: "white",
                        }}
                        onClick={() => {
                          fetchUpdateUser();
                          UpdateAlert();
                        }}
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <p style={{ fontSize: 18, cursor: "pointer" }}>
                  <NavLink to="/updatePassword">Modifier Mot De Passe</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Settings;
