import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
const INSCRIPTION_URL = "http://127.0.0.1:8000/register";
const libraries = ["places"];

const Inscription = () => {
  const [images, setImages] = React.useState("");
  const [file, setFile] = React.useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [adresse, setAdresse] = useState("");
  const [pays, setPays] = useState("Tunisie");
  const [codePostal, setCodePostal] = useState("");
  const [messageTest, setMessageTest] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const options = ["Tunisie", "France", "Italie", "Espagne"];
  const [markers, setMarkers] = useState([]);
  const [formdatastate, setFormdatastate] = useState(new FormData());
  const handleFileSelected = function (e) {
    var files = Array.from(e.target.files);
    console.log("files:", files[0]);
    setFile(files[0]);
  };
  let formData = new FormData();
  const onChange = (imageList, addUpdateIndex) => {
    const fileObjects = imageList.map((file) => {
      formData.append("assets", file.file, file.file.name);
    });
    setImages(imageList);
    setFormdatastate(formData);
  };

  const { isLoaded, loadError } = useLoadScript({
    //googleMapsApiKey: "AIzaSyCvEOL7jnq5ic6PpL7MXLCl8YYmdMAUNtg",
    googleMapsApiKey: "AIzaSyC7FWABDaJOgCTkZkUr2qqKDwX5ocTe__E&language=fr",
    libraries,
  });

  if (loadError) return "";
  if (!isLoaded) return "";
  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading Maps";

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  };

  const center = {
    lat: 36.80746315955567,
    lng: 10.137114639251674,
  };

  const optionsMap = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  function fetchAddUser() {
    if (nom == "") {
      setMessageTest("Le nom est obligatoire");
    } else if (prenom == "") {
      setMessageTest("Le prenom est obligatoire");
    } else if (
      email == "" ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setMessageTest("Vérifier votre email");
    } else if (password == "" || password.length < 8) {
      setMessageTest("Le mot de passe est obligatoire");
    } else if (telephone == "" || telephone.length < 8) {
      setMessageTest("Le numero de telephone est obligatoire");
    } else if (entreprise == "") {
      setMessageTest("L'entreprise est obligatoire");
    } else if (adresse == "") {
      setMessageTest("L'adresse est obligatoire");
    } else if (pays == "") {
      setMessageTest("Le pays est obligatoire");
    } else if (codePostal == "") {
      setMessageTest("Le code postal est obligatoire");
    } else if (file.length == 0) {
      setMessageTest("Vous devez uploader un fichier");
    } else if (lat == 0) {
      setMessageTest("Vous devez selectionner un point sur la carte");
    } else {
      formdatastate.append("nom", nom);
      formdatastate.append("prenom", prenom);
      formdatastate.append("email", email);
      formdatastate.append("telephone", telephone);
      formdatastate.append("password", password);
      formdatastate.append("nomentreprise", entreprise);
      formdatastate.append("adresse", adresse);
      formdatastate.append("pays", pays);
      formdatastate.append("code_postal", codePostal);
      formdatastate.append("document", file);
      formdatastate.append("lat", lat);
      formdatastate.append("lng", lng);
      axios
        .post(INSCRIPTION_URL, formdatastate)
        .then((response) => {
          setMessage(response.data.message);
          console.log("Message : " + response.data.message);
        })
        .finally(() => {
          navigate("/messageverifmail");
        });
    }
  }

  return (
    <div>
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
          <div className="col-lg-7">
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
              <div>
                <br />
                <br />
                <div className="row">
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Nom </span>
                  </div>
                  <div className="col-md-9  d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="text"
                        placeholder="Votre nom "
                        defaultValue={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Prenom </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="text"
                        placeholder="Votre Prénom"
                        defaultValue={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Email </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="email"
                        placeholder="exemple@gmail.com"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Telephone </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="number"
                        placeholder="telephone"
                        defaultValue={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Mot de passe </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="password"
                        placeholder="mot de passe"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Nom de l'entreprise </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="text"
                        placeholder="Nom de l'entreprise"
                        defaultValue={entreprise}
                        onChange={(e) => setEntreprise(e.target.value)}
                      />
                    </span>
                  </div>

                  <br />
                  <br />
                  <br />

                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Documents de référence</span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        className="form-control"
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="file"
                        // defaultValue={file}
                        // onChange={(e) => {
                        //   setFile(e.target.value);
                        //   console.log(e.target.value);
                        // }}
                        accept=".pdf"
                        onChange={handleFileSelected}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />

                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">
                      Adresse de siège de société
                    </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="text"
                        placeholder="Adresse de siège de société"
                        defaultValue={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                      />
                    </span>
                  </div>

                  <br />
                  <br />
                  <br />

                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Pays </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <select
                        id="pays"
                        name="pays"
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                      >
                        {options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />

                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input">Code postal </span>
                  </div>
                  <div className="col-md-9 d-flex align-items-center">
                    <span className="text-input w-100">
                      <input
                        style={{ backgroundColor: "#EFF3FF", border: "none" }}
                        type="number"
                        placeholder="Code postal"
                        defaultValue={codePostal}
                        onChange={(e) => setCodePostal(e.target.value)}
                      />
                    </span>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-md-3 d-flex align-items-center">
                    <span className="text-input"> </span>
                  </div>
                  <div
                    className="col-md-9 d-flex align-items-center"
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {messageTest}
                  </div>
                  <div
                    className="col-lg-12 d-flex align-items-center justify-content-center"
                    style={{ marginBottom: 10, marginTop: 50 }}
                    onClick={() => {
                      fetchAddUser();
                      // navigate("/messageverifmail");
                    }}
                  >
                    <button
                      style={{ borderRadius: 15 }}
                      className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 margin_top5 whiteonhpver"
                      type="submit"
                    >
                      S'inscrire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-5"
            style={{ borderRadius: 15, overflow: "hidden" }}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              options={optionsMap}
              onClick={(event) => {
                setMarkers((current) => [
                  ...current,
                  {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
                  },
                ]);
                setLat(event.latLng.lat());
                setLng(event.latLng.lng());
                console.log(lat + ", " + lng);
              }}
            >
              <Marker key={1} position={{ lat: lat, lng: lng }} />
            </GoogleMap>
          </div>
        </div>

        <footer className="footer widget-footer ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
          <div className="second-footer">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 widget-area">
                  <div className="widget widget_text clearfix">
                    <div className="footer-logo">
                      <div className="row">
                        <div className="col-xl-6">
                          <img
                            className="img-fluid auto_size"
                            src={"assets/FrontOffice/images/1-aqvo-logo.png"}
                            alt="logo-img"
                          />
                        </div>
                        <div className="col-xl-6">
                          <h3 style={{ marginTop: "33%", marginLeft: "-47%" }}>
                            GIPP
                          </h3>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="textwidget widget-text">
                      <p>
                        Le Groupement Interprofessionnel des Produits de la
                        Pêche (GIPP) fondé en 1995 vous offre une large palette
                        de produits de la mer Méditerranée, de quoi rassasier
                        l’appétit et ravir les papilles gustatives de notre
                        clientèle potentielle
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-2 widget-area">
                  <div className="widget widget_nav_menu clearfix">
                    <h3 className="widget-title">Apprenez à nous connaître</h3>
                    <ul id="menu-footer-quick-links" className="menu">
                      <li>
                        <a href="#">À propos de GIPP Marketplace</a>
                      </li>
                      <li>
                        <a href="#">Conditions d’utilisation</a>
                      </li>
                      <li>
                        <a href="#">Politique de confidentialité</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
                  <div className="widget widget_img_gellary clearfix">
                    <h3 className="widget-title">Galerie</h3>
                    <ul>
                      <li>
                        <a
                          href="images/portfolio/portfolio-02-1200x800.jpg"
                          rel="prettyPhoto[coregallery]"
                          data-rel="prettyPhoto"
                        >
                          <img
                            className="img-fluid"
                            src={
                              "assets/FrontOffice/images/portfolio/portfolio-02-150x150.jpg"
                            }
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="images/blog/blog-02-1200x800.jpg"
                          rel="prettyPhoto[coregallery]"
                          data-rel="prettyPhoto"
                        >
                          <img
                            className="img-fluid"
                            src={
                              "assets/FrontOffice/images/blog/blog-02-150x150.jpg"
                            }
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="images/blog/blog-01-1200x800.jpg"
                          rel="prettyPhoto[coregallery]"
                          data-rel="prettyPhoto"
                        >
                          <img
                            className="img-fluid"
                            src={
                              "assets/FrontOffice/images/blog/blog-01-150x150.jpg"
                            }
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="images/portfolio/portfolio-01-1200x800.jpg"
                          rel="prettyPhoto[coregallery]"
                          data-rel="prettyPhoto"
                        >
                          <img
                            className="img-fluid"
                            src={
                              "assets/FrontOffice/images/portfolio/portfolio-01-150x150.jpg"
                            }
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="images/services/services-05-1200x800.jpg"
                          rel="prettyPhoto[coregallery]"
                          data-rel="prettyPhoto"
                        >
                          <img
                            className="img-fluid"
                            src={
                              "assets/FrontOffice/images/services/services-05-150x150.jpg"
                            }
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="images/portfolio/portfolio-03-1200x800.jpg"
                          rel="prettyPhoto[coregallery]"
                          data-rel="prettyPhoto"
                        >
                          <img
                            className="img-fluid"
                            src={
                              "assets/FrontOffice/images/portfolio/portfolio-03-150x150.jpg"
                            }
                            alt=""
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 widget-area">
                  <div className="widget widget_cta clearfix">
                    <h3 className="widget-title">Contact</h3>
                    <p>Si vous avez des questions ou besoin d'aide</p>
                    <div className="d-flex">
                      <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-xs margin_right15 margin_bottom15 ">
                        <i className="flaticon flaticon-call"></i>
                      </div>
                      <h4>71 786 976</h4>
                    </div>
                    <p>37, R. du Niger 1002, TUNIS BELVEDERE TUNIS Tunisie.</p>
                    <div className="d-inline-table align-items-center justify-content-between">
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
          <div className="bottom-footer-text copyright">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div style={{ textAlign: "center" }}>
                    <span className="cpy-text">
                      Copyright © 2022{" "}
                      <a
                        href="#"
                        className="ttm-textcolor-skincolor font-weight-500"
                      >
                        GIPP{" "}
                      </a>{" "}
                      Tous les droits sont réservés.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <a id="totop" href="#top">
          <i className="fa fa-angle-up"></i>
        </a>
      </div>
    </div>
  );
};

export default Inscription;
