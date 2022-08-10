import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const CART_URL = "http://127.0.0.1:8000/panier/showall";
const PRODUCT_URL = "http://127.0.0.1:8000/produit/showall";
const ACTUALITE_URL = "http://127.0.0.1:8000/actualite/showall";
const AVIS_URL = "http://127.0.0.1:8000/avis/showall";
const CLIENTS_URL = "http://127.0.0.1:8000/user/showallUsers";
const COMMANDE_URL = "http://127.0.0.1:8000/commande/showall";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [isLoadingProduts, setisLoadingProduts] = useState(true);
  const [isLoadingActualities, setisLoadingActualities] = useState(true);
  const [isLoadingAvis, setisLoadingAvis] = useState(true);
  const [isLoadingClients, setisLoadingAClients] = useState(true);
  const [isLoadingCommande, setisLoadingCommande] = useState(true);
  const [playOnceAll, setPlayOnceAll] = useState(false);
  const [actualiteList, setActualiteList] = useState([]);
  const [avisList, setAvisList] = useState([]);
  const [clientsList, setClientsList] = useState([]);
  const [commandeList, setCommandeList] = useState([]);

  function fetchCommande() {
    axios
      .get(COMMANDE_URL)
      .then((response) => {
        setCommandeList(response.data.slice().reverse());
      })
      .finally(() => {
        setisLoadingCommande(false);
      });
  }

  function fetchClients() {
    axios
      .get(CLIENTS_URL)
      .then((response) => {
        setClientsList(response.data.slice().reverse());
      })
      .finally(() => {
        setisLoadingAClients(false);
      });
  }

  function fetchProduis() {
    axios
      .get(PRODUCT_URL)
      .then((response) => {
        let prod = [];
        response.data
          .slice()
          .reverse()
          .map((item) => {
            if (item.visibilite == true) {
              prod.push(item);
            }
          });
        setProductList(prod);
      })
      .finally(() => {
        setisLoadingProduts(false);
      });
  }

  function fetchActualiteList() {
    axios
      .get(ACTUALITE_URL)
      .then((response) => {
        setActualiteList(response.data.slice().reverse());
      })
      .finally(() => {
        setisLoadingActualities(false);
      });
  }

  function fetchAvisList() {
    axios
      .get(AVIS_URL)
      .then((response) => {
        setAvisList(response.data.slice().reverse());
      })
      .finally(() => {
        setisLoadingAvis(false);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("playonce") == 0) {
      setPlayOnce(true);
      localStorage.setItem("playonce", 1);
      window.location.reload(false);
    }
  }, []);

  function fetchCart() {
    axios
      .post(CART_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        localStorage.setItem("cart", response.data.length);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchCart();
  }, [productList]);

  useEffect(() => {
    if (!playOnceAll) {
      fetchCommande();
      fetchClients();
      fetchProduis();
      fetchActualiteList();
      fetchAvisList();
    }
  }, []);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selected_language")
  );
  return (
    <div>
      <div className="Home">
        <div id="preloader" className="blobs-wrapper">
          <div className="ttm-bgcolor-skincolor loader-blob"></div>
        </div>
        <header
          id="masthead"
          className="header ttm-bgcolor-darkgrey ttm-header-style-02"
        >
          <div id="site-header-menu" className="site-header-menu">
            <div className="site-header-menu-inner ttm-stickable-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="site-navigation d-flex align-items-center justify-content-between">
                      <div className="site-branding">
                        <a
                          className="home-link"
                          title="Aqovo"
                          rel="home"
                          onClick={() => {
                            localStorage.setItem("playonce", 0);
                            navigate("/");
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="row">
                            <div className="col-xl-6">
                              <img
                                id="logo-img"
                                className="img-fluid auto_size"
                                src="assets/FrontOffice/images/1-aqvo-logo.png"
                                alt="logo-img"
                              />
                            </div>
                            <div className="col-xl-6">
                              <h3 className="gipp-logo">GIPP</h3>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="border-box-block">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="btn-show-menu-mobile menubar menubar--squeeze">
                            <span className="menubar-box">
                              <span className="menubar-inner"></span>
                            </span>
                          </div>
                          <nav className="main-menu menu-mobile" id="menu">
                            <ul className="menu" style={{ margin: -16 }}>
                              <li className="mega-menu-item">
                                <a className="mega-menu-link">
                                  {!localStorage.getItem(
                                    "selected_language"
                                  ) && (
                                    <NavLink to="/apropos">À propos</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/apropos">À propos</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/apropos">About Us</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <NavLink to="/apropos">من نحن</NavLink>
                                    </div>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/apropos">Chi Siamo</NavLink>
                                  )}
                                </a>
                              </li>
                              <li className="mega-menu-item">
                                <a className="mega-menu-link">
                                  {!localStorage.getItem(
                                    "selected_language"
                                  ) && (
                                    <NavLink to="/marketplace">
                                      Marketplace
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/marketplace">
                                      Marketplace
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/marketplace">
                                      Marketplace
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <NavLink to="/marketplace">
                                        المتجر
                                      </NavLink>
                                    </div>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/marketplace">Mercato</NavLink>
                                  )}
                                </a>
                              </li>
                              <li className="mega-menu-item">
                                <a className="mega-menu-link">
                                  {!localStorage.getItem(
                                    "selected_language"
                                  ) && (
                                    <NavLink to="/salonListe"> Salons </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/salonListe"> Salons </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/salonListe">
                                      {" "}
                                      Trade Exposition{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <NavLink to="/salonListe">
                                        {" "}
                                        المعارض{" "}
                                      </NavLink>
                                    </div>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/salonListe">
                                      {" "}
                                      Soggiorno{" "}
                                    </NavLink>
                                  )}
                                </a>
                              </li>
                              <li className="mega-menu-item">
                                <a className="mega-menu-link">
                                  {!localStorage.getItem(
                                    "selected_language"
                                  ) && (
                                    <NavLink to="/actualite">
                                      Actualités
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/actualite">
                                      Actualités
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/actualite">News</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <NavLink to="/actualite">الاخبار</NavLink>
                                    </div>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/actualite">Notizia</NavLink>
                                  )}
                                </a>
                              </li>

                              <li className="mega-menu-item">
                                <a>
                                  {!localStorage.getItem(
                                    "selected_language"
                                  ) && (
                                    <NavLink to="/contactUs">
                                      {" "}
                                      Contactez nous{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/contactUs">
                                      {" "}
                                      Contactez nous{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/contactUs">
                                      {" "}
                                      Contact Us{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <div
                                      style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <NavLink to="/contactUs">
                                        {" "}
                                        اتصل بنا{" "}
                                      </NavLink>
                                    </div>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/contactUs">
                                      {" "}
                                      Contattaci{" "}
                                    </NavLink>
                                  )}
                                </a>
                              </li>
                              <li className="mega-menu-item">
                                <a className="mega-menu-link">
                                  {!localStorage.getItem(
                                    "selected_language"
                                  ) && (
                                    <span className="d-flex align-items-center justify-content-center text-center">
                                      <img
                                        src="assets/FrontOffice/images/fr.jpg"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; FR
                                    </span>
                                  )}
                                  {selectedLanguage == "Français" && (
                                    <span className="d-flex align-items-center justify-content-center text-center">
                                      <img
                                        src="assets/FrontOffice/images/fr.jpg"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; FR
                                    </span>
                                  )}
                                  {selectedLanguage == "Anglais" && (
                                    <span className="d-flex align-items-center justify-content-center text-center">
                                      <img
                                        src="assets/FrontOffice/images/an.png"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; EN
                                    </span>
                                  )}
                                  {selectedLanguage == "Arabe" && (
                                    <span className="d-flex align-items-center justify-content-center text-center">
                                      <img
                                        src="assets/FrontOffice/images/art.png"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; AR
                                    </span>
                                  )}
                                  {selectedLanguage == "Italien" && (
                                    <span className="d-flex align-items-center justify-content-center text-center">
                                      <img
                                        src="assets/FrontOffice/images/it.jpg"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; IT
                                    </span>
                                  )}
                                </a>

                                <ul className="mega-submenu">
                                  <li>
                                    <a
                                      onClick={() => {
                                        setSelectedLanguage("Français");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        localStorage.setItem(
                                          "selected_language",
                                          "Français"
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        src="/assets/FrontOffice/images/fr.jpg"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; Français
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        setSelectedLanguage("Anglais");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        localStorage.setItem(
                                          "selected_language",
                                          "Anglais"
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        src="/assets/FrontOffice/images/an.png"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; Anglais
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        setSelectedLanguage("Arabe");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        localStorage.setItem(
                                          "selected_language",
                                          "Arabe"
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        src="/assets/FrontOffice/images/art.png"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; Arabe
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      onClick={() => {
                                        setSelectedLanguage("Italien");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        localStorage.setItem(
                                          "selected_language",
                                          "Italien"
                                        );
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        src="/assets/FrontOffice/images/it.jpg"
                                        style={{ width: 20, height: 13 }}
                                      />{" "}
                                      &nbsp; Italien
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>

                      {localStorage.getItem("nom") == null && (
                        <a
                          id="login"
                          className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-blue login"
                          href="login"
                          style={{
                            backgroundColor: "#13c6dd",
                            borderWidth: 0,
                            width: 215,
                          }}
                        >
                          <div className="row">
                            <div className="col-xl-2">
                              <svg
                                style={{
                                  height: 27,
                                  marginTop: "-13%",
                                  marginLeft: "-42%",
                                }}
                                className="svg-inline--fa fa-user fa-w-14"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fa"
                                data-icon="user"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                data-fa-i2svg=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                ></path>
                              </svg>
                            </div>
                            {!localStorage.getItem("selected_language") && (
                              <div
                                className="col-xl-10"
                                style={{ marginLeft: "-1%", marginTop: "5%" }}
                              >
                                Se connecter
                              </div>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Français" && (
                              <div
                                className="col-xl-10"
                                style={{ marginLeft: "-1%", marginTop: "5%" }}
                              >
                                Se connecter
                              </div>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Anglais" && (
                              <div
                                className="col-xl-10"
                                style={{ marginLeft: "-1%", marginTop: "5%" }}
                              >
                                Login
                              </div>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Arabe" && (
                              <div
                                className="col-xl-10"
                                style={{ marginLeft: "-1%", marginTop: "5%" }}
                              >
                                تسجيل الدخول
                              </div>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Italien" && (
                              <div
                                className="col-xl-10"
                                style={{ marginLeft: "-1%", marginTop: "5%" }}
                              >
                                Accedi
                              </div>
                            )}
                          </div>
                        </a>
                      )}
                      {localStorage.getItem("nom") != null && (
                        <nav className="main-menu menu-mobile" id="menu">
                          <ul className="menu">
                            <li className="mega-menu-item">
                              <a className="mega-menu-link">
                                {localStorage.getItem("prenom")}{" "}
                                {localStorage.getItem("nom")}
                              </a>
                              <ul className="mega-submenu">
                                <li>
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/settings">
                                      {" "}
                                      Paramétre{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/settings"> Settings</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <NavLink to="/settings"> الإعدادات</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/settings">
                                      {" "}
                                      Impostazioni
                                    </NavLink>
                                  )}
                                </li>
                                <li>
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/mesCommandes">
                                      Mes Commandes
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/mesCommandes">
                                      My Orders
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <NavLink to="/mesCommandes">طلباتي</NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/mesCommandes">
                                      I miei ordini
                                    </NavLink>
                                  )}
                                </li>
                                <li>
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/cart"> Panier </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/cart"> Cart </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <NavLink to="/cart"> سلة الشراء </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/cart"> Cestino </NavLink>
                                  )}
                                </li>
                                <li>
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <NavLink to="/mesSalons">
                                      {" "}
                                      Mes Salons{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <NavLink to="/mesSalons">
                                      {" "}
                                      My Trade Exposition{" "}
                                    </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <NavLink to="/mesSalons"> معارضي </NavLink>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <NavLink to="/mesSalons">
                                      {" "}
                                      La mia esposizione commerciale{" "}
                                    </NavLink>
                                  )}
                                </li>
                                <li>
                                  {localStorage.getItem("selected_language") ==
                                    "Français" && (
                                    <a
                                      onClick={() => {
                                        localStorage.removeItem("email");
                                        localStorage.removeItem("nom");
                                        localStorage.removeItem("prenom");
                                        localStorage.removeItem("id");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        navigate("/login");
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Déconnexion
                                    </a>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Anglais" && (
                                    <a
                                      onClick={() => {
                                        localStorage.removeItem("email");
                                        localStorage.removeItem("nom");
                                        localStorage.removeItem("prenom");
                                        localStorage.removeItem("id");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        navigate("/login");
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Logout
                                    </a>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Arabe" && (
                                    <a
                                      onClick={() => {
                                        localStorage.removeItem("email");
                                        localStorage.removeItem("nom");
                                        localStorage.removeItem("prenom");
                                        localStorage.removeItem("id");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        navigate("/login");
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      تسجيل الخروج
                                    </a>
                                  )}
                                  {localStorage.getItem("selected_language") ==
                                    "Italien" && (
                                    <a
                                      onClick={() => {
                                        localStorage.removeItem("email");
                                        localStorage.removeItem("nom");
                                        localStorage.removeItem("prenom");
                                        localStorage.removeItem("id");
                                        localStorage.removeItem(
                                          "selected_language"
                                        );
                                        navigate("/login");
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      disconnettersi
                                    </a>
                                  )}
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-item">
                              <div
                                class="header_cart"
                                onClick={() => {
                                  navigate("/cart");
                                }}
                              >
                                <a class="cart_btn">
                                  <div class="cart_icon">
                                    <i class="fa fa-shopping-cart"></i>
                                  </div>
                                  <div class="cart_count ttm-bgcolor-skincolor">
                                    {!localStorage.getItem("cart") && (
                                      <span>0</span>
                                    )}
                                    {localStorage.getItem("cart") && (
                                      <span>
                                        {localStorage.getItem("cart")}
                                      </span>
                                    )}
                                  </div>
                                </a>
                              </div>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="banner_slider_wrapper">
          <div className="banner_slider banner_slider_3 banner_slider_3_overlay">
            <div className="slide">
              <div
                className="slide_img"
                /* style="background-image: url(images/slides/accueil.png)" */
                style={{
                  backgroundImage: `url(${"assets/FrontOffice/images/slides/accueil.png"})`,
                }}
              ></div>
              <div className="slide__content padding_top90 res-1199-padding_top0">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="slide__content--headings ttm-textcolor-white">
                        <div className="left-content">
                          <h2 data-animation="fadeInDown">
                            {!localStorage.getItem("selected_language") && (
                              <span>
                                B2B MarketPlace aux poissons et fruits de mer
                                méditerranéens
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Français" && (
                              <span>
                                B2B MarketPlace aux poissons et fruits de mer
                                méditerranéens
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Anglais" && (
                              <span>
                                B2B MarketPlace for Mediterranean fish and
                                seafood
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Arabe" && (
                              <span>
                                B2B ماركت بيس للأسماك والمأكولات البحرية في
                                منطقة البحر الأبيض المتوسط
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Italien" && (
                              <span>
                                MarketPlace B2B per pesce e frutti di mare
                                mediterranei
                              </span>
                            )}
                          </h2>
                          <p
                            data-animation="fadeInDown"
                            className="padding_right40"
                          >
                            {!localStorage.getItem("selected_language") && (
                              <span>
                                Notre objectif est de faciliter l'exportation et
                                la mise en contact entre les acheteurs et les
                                vendeurs méditerranéens des produits de la péche
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Français" && (
                              <span>
                                Notre objectif est de faciliter l'exportation et
                                la mise en contact entre les acheteurs et les
                                vendeurs méditerranéens des produits de la péche
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Anglais" && (
                              <span>
                                Our objective is to facilitate the export and
                                the connection between Mediterranean buyers and
                                sellers of fishery products
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Arabe" && (
                              <span>
                                {" "}
                                هدفنا هو تسهيل التصدير والتواصل بين المشترين
                                والبائعين في البحر الأبيض المتوسط ​​للمنتجات
                                السمكية{" "}
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Italien" && (
                              <span>
                                Il nostro obiettivo è facilitare l'esportazione
                                e mettere in contatto tra acquirenti e venditori
                                mediterranei di prodotti della pesca
                              </span>
                            )}
                          </p>
                          {localStorage.getItem("nom") == null && (
                            <div
                              className="d-inline-block margin_top30"
                              data-animation="fadeInUp"
                              data-delay="1.4"
                            >
                              <a
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                href="inscription.html"
                              >
                                S'inscrire
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide">
              <div
                className="slide_img"
                /* style="background-image: url(images/slides/fishing1.jpg)" */
                style={{
                  backgroundImage: `url(${"assets/FrontOffice/images/slides/fishing1.jpg"})`,
                }}
              ></div>
              <div className="slide__content padding_top90 res-1199-padding_top0">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="slide__content--headings ttm-textcolor-white">
                        <div className="left-content">
                          <h2 data-animation="fadeInDown">
                            {!localStorage.getItem("selected_language") && (
                              <span>
                                B2B MarketPlace aux poissons et fruits de mer
                                méditerranéens
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Français" && (
                              <span>
                                B2B MarketPlace aux poissons et fruits de mer
                                méditerranéens
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Anglais" && (
                              <span>
                                B2B MarketPlace for Mediterranean fish and
                                seafood
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Arabe" && (
                              <span>
                                B2B ماركت بيس للأسماك والمأكولات البحرية في
                                منطقة البحر الأبيض المتوسط
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Italien" && (
                              <span>
                                MarketPlace B2B per pesce e frutti di mare
                                mediterranei
                              </span>
                            )}
                          </h2>
                          <p
                            data-animation="fadeInDown"
                            className="padding_right40"
                          >
                            {!localStorage.getItem("selected_language") && (
                              <span>
                                Notre objectif est de faciliter l'exportation et
                                la mise en contact entre les acheteurs et les
                                vendeurs méditerranéens des produits de la péche
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Français" && (
                              <span>
                                Notre objectif est de faciliter l'exportation et
                                la mise en contact entre les acheteurs et les
                                vendeurs méditerranéens des produits de la péche
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Anglais" && (
                              <span>
                                Our objective is to facilitate the export and
                                the connection between Mediterranean buyers and
                                sellers of fishery products
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Arabe" && (
                              <span>
                                {" "}
                                هدفنا هو تسهيل التصدير والتواصل بين المشترين
                                والبائعين في البحر الأبيض المتوسط ​​للمنتجات
                                السمكية{" "}
                              </span>
                            )}
                            {localStorage.getItem("selected_language") ==
                              "Italien" && (
                              <span>
                                Il nostro obiettivo è facilitare l'esportazione
                                e mettere in contatto tra acquirenti e venditori
                                mediterranei di prodotti della pesca
                              </span>
                            )}
                          </p>
                          {localStorage.getItem("nom") == null && (
                            <div
                              className="d-inline-block margin_top30"
                              data-animation="fadeInUp"
                              data-delay="1.4"
                            >
                              <a
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                href="inscription.html"
                              >
                                S'inscrire
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-main">
          <section className="ttm-row about-section clearfix">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-7 col-sm-8">
                  <div className="d-flex">
                    <div className="ttm_single_image-wrapper">
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/fishing.jpg"
                        alt="single-01"
                        style={{
                          marginLeft: "-9%",
                          marginTop: "-10%",
                          height: 847,
                          maxWidth: "109%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="margin_top15 res-991-margin_top50">
                    <div className="section-title">
                      <div className="title-header">
                        {!localStorage.getItem("selected_language") && (
                          <h3>À propos</h3>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Français" && <h3>À propos</h3>}
                        {localStorage.getItem("selected_language") ==
                          "Anglais" && <h3>About Us</h3>}
                        {localStorage.getItem("selected_language") ==
                          "Arabe" && <h3>من نحن</h3>}
                        {localStorage.getItem("selected_language") ==
                          "Italien" && <h3>CHI SIAMO</h3>}

                        {!localStorage.getItem("selected_language") && (
                          <h2 className="title">Pourquoi GIPP Marketplace?</h2>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Français" && (
                          <h2 className="title">Pourquoi GIPP Marketplace?</h2>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Anglais" && (
                          <h2 className="title">Why GIPP Marketplace?</h2>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Arabe" && (
                          <h2 className="title">؟ GIPP لماذا سوق </h2>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Italien" && (
                          <h2 className="title">Perché GIPP Marketplace?</h2>
                        )}
                      </div>
                      <div className="title-desc">
                        {!localStorage.getItem("selected_language") && (
                          <p>
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              1. Confidentialité de paiements
                            </span>
                            <br />
                            Assurer des paiements sécurisés et réduire les
                            risques
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              2. Simplification des processus commerciaux
                            </span>
                            <br />
                            Relier les organismes de réglementation
                            <br />
                            Accéder à des services supplémentaires ( assurance,
                            financement …)
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              3. Prix justes et offres variées
                            </span>
                            <br />
                            Offrir une gamme diversifiée des produits de la mer
                          </p>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Français" && (
                          <p>
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              1. Confidentialité de paiements
                            </span>
                            <br />
                            Assurer des paiements sécurisés et réduire les
                            risques
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              2. Simplification des processus commerciaux
                            </span>
                            <br />
                            Relier les organismes de réglementation
                            <br />
                            Accéder à des services supplémentaires ( assurance,
                            financement …)
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              3. Prix justes et offres variées
                            </span>
                            <br />
                            Offrir une gamme diversifiée des produits de la mer
                          </p>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Anglais" && (
                          <p>
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              1. Payment confidentiality
                            </span>
                            <br />
                            Ensure secure payments and reduce risk
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              2. Simplification of business processes
                            </span>
                            <br />
                            Connecting regulatory bodies
                            <br />
                            Access additional services (insurance, financing,
                            etc.)
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              3. Fair prices and varied offers
                            </span>
                            <br />
                            Offer a diversified range of seafood products
                          </p>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Arabe" && (
                          <p>
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              1. سرية الدفع
                            </span>
                            <br />
                            ضمان مدفوعات آمنة وخفض المخاطر
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              2. تبسيط العمليات التجارية
                            </span>
                            <br />
                            ربط الهيئات التنظيمية
                            <br />
                            الوصول إلى خدمات إضافية (التأمين والتمويل وما إلى
                            ذلك)
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              3. أسعار عادلة وعروض متنوعة
                            </span>
                            <br />
                            نقدم مجموعة متنوعة من منتجات المأكولات البحرية
                          </p>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Italien" && (
                          <p>
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              1. Riservatezza dei pagamenti
                            </span>
                            <br />
                            Garantisci pagamenti sicuri e riduci i rischi
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              2. Semplificazione dei processi aziendali
                            </span>
                            <br />
                            Collegamento dei regolatori
                            <br />
                            Accedere a servizi aggiuntivi (assicurazioni,
                            finanziamenti, ecc.)
                            <br />
                            <br />
                            <span
                              style={{ color: "#005cbf", fontWeight: "bold" }}
                            >
                              3. Prezzi onesti e offerte variegate
                            </span>
                            <br />
                            Offrire una gamma diversificata di prodotti ittici
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="ttm-horizontal_sep width-100 margin_top40 margin_bottom30"></div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="ttm-fid inside ttm-fid-view-lefticon style1">
                          <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-pond"></i>
                          </div>
                          {!localStorage.getItem("selected_language") && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">Prix Convenable</h6>
                              <h3 className="ttm-fid-title">
                                Vendre à un prix en moyenne inférieur au prix du
                                marché vu l’absence de frais de négociation
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Français" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">Prix Convenable</h6>
                              <h3 className="ttm-fid-title">
                                Vendre à un prix en moyenne inférieur au prix du
                                marché vu l’absence de frais de négociation
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Anglais" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">Decent Price</h6>
                              <h3 className="ttm-fid-title">
                                Sell at a price on average lower than the market
                                price given the absence of trading costs
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Arabe" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">سعر معقول</h6>
                              <h3 className="ttm-fid-title">
                                البيع بسعر متوسط ​​أقل من سعر السوق نظرًا لغياب
                                تكاليف التداول
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Italien" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">Prezzo decente</h6>
                              <h3 className="ttm-fid-title">
                                Vendi ad un prezzo mediamente inferiore al
                                prezzo di mercato vista l'assenza di costi di
                                negoziazione
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="ttm-fid inside ttm-fid-view-lefticon style1">
                          <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-pond"></i>
                          </div>
                          {!localStorage.getItem("selected_language") && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Accès Au Marché International
                              </h6>
                              <h3 className="ttm-fid-title">
                                Étendre le commerce à l’échelle mondiale
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Français" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Accès Au Marché International
                              </h6>
                              <h3 className="ttm-fid-title">
                                Étendre le commerce à l’échelle mondiale
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Anglais" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                International Market Access
                              </h6>
                              <h3 className="ttm-fid-title">
                                Expanding Trade Globally
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Arabe" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                الوصول إلى الأسواق الدولية
                              </h6>
                              <h3 className="ttm-fid-title">
                                توسيع التجارة عالميا
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Italien" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Accesso al mercato internazionale
                              </h6>
                              <h3 className="ttm-fid-title">
                                Espandi il commercio a livello globale
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="ttm-fid inside ttm-fid-view-lefticon style1">
                          <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-pond-1"></i>
                          </div>
                          {!localStorage.getItem("selected_language") && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Contrôle Documents
                              </h6>
                              <h3 className="ttm-fid-title">
                                Créer une seule base de données pour toutes vos
                                transactions
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Français" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Contrôle Documents
                              </h6>
                              <h3 className="ttm-fid-title">
                                Créer une seule base de données pour toutes vos
                                transactions
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Anglais" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Document control
                              </h6>
                              <h3 className="ttm-fid-title">
                                Create a single database for all your
                                transactions
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Arabe" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">مراقبة الوثائق</h6>
                              <h3 className="ttm-fid-title">
                                قم بإنشاء قاعدة بيانات واحدة لجميع معاملاتك
                              </h3>
                            </div>
                          )}
                          {localStorage.getItem("selected_language") ==
                            "Italien" && (
                            <div className="ttm-fid-contents">
                              <h6 className="ttm-fid-inner">
                                Controllo documenti
                              </h6>
                              <h3 className="ttm-fid-title">
                                Crea un unico database per tutte le tue
                                transazioni
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ttm-row only_title-section clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {!localStorage.getItem("selected_language") && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3 className="home-line-limit-gipp">Actualités</h3>
                        <h2 className="title">Nos actualités</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Français" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3 className="home-line-limit-gipp">Actualités</h3>
                        <h2 className="title">Nos actualités</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Anglais" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3 className="home-line-limit-gipp">News</h3>
                        <h2 className="title">Our news</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Arabe" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3 className="home-line-limit-gipp">الاخبار</h3>
                        <h2 className="title">أخبارنا</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Italien" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3 className="home-line-limit-gipp">Notizia</h3>
                        <h2 className="title">Le nostre novità</h2>
                      </div>
                    </div>
                  )}
                  {isLoadingActualities && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="ttm-row padding_top_zero-section ttm-bgcolor-grey clearfix">
            <div className="container">
              <div className="row">
                {!isLoadingActualities && (
                  <div className="col-lg-12">
                    <div className="ttm-bg ttm-col-bgcolor-yes ttm-bgcolor-white spacing-5">
                      <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                      <div className="layer-content">
                        <div className="row">
                          {actualiteList.slice(0, 4).map((actualite, index) => (
                            <div
                              className="col-lg-3 col-md-6 col-sm-6"
                              key={index}
                            >
                              <div className="featured-imagebox featured-imagebox-procedure">
                                <div className="featured-thumbnail">
                                  <img
                                    className="img-fluid"
                                    src={`http://127.0.0.1:8000/uploads/${actualite.image}`}
                                    alt="image"
                                    style={{ width: 262.5, height: 180.66 }}
                                  />
                                  <div className="process-num"></div>
                                </div>
                                <div
                                  className="featured-content"
                                  onClick={() => {
                                    navigate(
                                      "/actualiteDetails/" + actualite.id
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="featured-desc">
                                    <p>{actualite.titre}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="ttm-row service-section ttm-bgcolor-grey clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {!localStorage.getItem("selected_language") && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3>Produits</h3>
                        <h2 className="title">Nouveaux produits</h2>
                      </div>
                      <div className="title-desc">
                        <p>Voici tous nos nouveaux produits</p>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Français" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3>Produits</h3>
                        <h2 className="title">Nouveaux produits</h2>
                      </div>
                      <div className="title-desc">
                        <p>Voici tous nos nouveaux produits</p>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Anglais" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3>Products</h3>
                        <h2 className="title">New products</h2>
                      </div>
                      <div className="title-desc">
                        <p>Here are all our new products</p>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Arabe" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3>المنتجات</h3>
                        <h2 className="title">منتجات جديدة</h2>
                      </div>
                      <div className="title-desc">
                        <p>هنا جميع منتجاتنا الجديدة</p>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Italien" && (
                    <div className="section-title title-style-center_text">
                      <div className="title-header">
                        <h3>Prodotti</h3>
                        <h2 className="title">Nuovi Prodotti</h2>
                      </div>
                      <div className="title-desc">
                        <p>Ecco tutti i nostri nuovi prodotti</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!isLoadingProduts ? (
                <div
                  className="row slick_slider"
                  data-slick='{"slidesToShow": 3, "slidesToScroll": 3, "arrows":false, "autoplay":true, "infinite":true, "responsive": [{"breakpoint":1100,"settings":{"slidesToShow": 3}} , {"breakpoint":940,"settings":{"slidesToShow": 2}}, {"breakpoint":575,"settings":{"slidesToShow": 1}}]}'
                >
                  {productList.slice(0, 3).map((product, index) => (
                    <div className="col-md-4 col-sm-6" key={index}>
                      <div className="featured-imagebox featured-imagebox-services style2">
                        <div className="featured-thumbnail">
                          <a tabindex="-1">
                            <img
                              className="img-fluid"
                              src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                              alt="image"
                              style={{ width: 360, height: 214.92 }}
                            />
                          </a>
                        </div>
                        <div
                          className="featured-content"
                          onClick={() => {
                            navigate("/detailproduit/" + product.id);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="featured-title">
                            <h3>
                              {!localStorage.getItem("selected_language") && (
                                <a>{product.nom}</a>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Français" && <a>{product.nom}</a>}
                              {localStorage.getItem("selected_language") ==
                                "Anglais" && <a>{product.nomEn}</a>}
                              {localStorage.getItem("selected_language") ==
                                "Arabe" && <a>{product.nomAr}</a>}
                              {localStorage.getItem("selected_language") ==
                                "Italien" && <a>{product.nomIt}</a>}
                            </h3>
                          </div>

                          <div
                            className="bottom-footer"
                            onClick={() => {
                              navigate("/detailproduit/" + product.id);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <a className="ttm-btn ttm-btn-size-md ttm-icon-btn-right ttm-btn-color-dark btn-inline">
                              voir plus<i className="fa fa-angle-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </div>
          </section>
          <section className="ttm-row fid-section ttm-bgcolor-darkgrey clearfix">
            <div className="container">
              <div className="row ttm-vertical_sep">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon style2">
                    <div className="ttm-fid-icon-wrapper ttm-textcolor-skincolor">
                      <svg
                        style={{ height: 50, width: 50 }}
                        className="svg-inline--fa fa-user fa-w-14"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fa"
                        data-icon="user"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ttm-fid-contents">
                      <h4 className="ttm-fid-inner">
                        <span
                          data-appear-animation="animateDigits"
                          className="numinate"
                        >
                          {clientsList.length}
                        </span>
                      </h4>
                      {!localStorage.getItem("selected_language") && (
                        <h3 className="ttm-fid-title">Clients</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Français" && (
                        <h3 className="ttm-fid-title">Clients</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Anglais" && <h3 className="ttm-fid-title">Clients</h3>}
                      {localStorage.getItem("selected_language") == "Arabe" && (
                        <h3 className="ttm-fid-title">عملاء</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Italien" && <h3 className="ttm-fid-title">Clienti</h3>}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon style2">
                    <div className="ttm-fid-icon-wrapper ttm-textcolor-skincolor">
                      <i className="flaticon-pond-1"></i>
                    </div>
                    <div className="ttm-fid-contents">
                      <h4 className="ttm-fid-inner">
                        <span
                          data-appear-animation="animateDigits"
                          className="numinate"
                        >
                          {productList.length}
                        </span>
                      </h4>
                      {!localStorage.getItem("selected_language") && (
                        <h3 className="ttm-fid-title">Produits</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Français" && (
                        <h3 className="ttm-fid-title">Produits</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Anglais" && (
                        <h3 className="ttm-fid-title">Products</h3>
                      )}
                      {localStorage.getItem("selected_language") == "Arabe" && (
                        <h3 className="ttm-fid-title">منتج</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Italien" && (
                        <h3 className="ttm-fid-title">Prodotti</h3>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="ttm-fid inside ttm-fid-with-icon ttm-fid-view-lefticon style2">
                    <div className="ttm-fid-icon-wrapper ttm-textcolor-skincolor">
                      <i className="flaticon-lake-1"></i>
                    </div>
                    <div className="ttm-fid-contents">
                      <h4 className="ttm-fid-inner">
                        <span
                          data-appear-animation="animateDigits"
                          className="numinate"
                        >
                          {commandeList.length}
                        </span>
                      </h4>
                      {!localStorage.getItem("selected_language") && (
                        <h3 className="ttm-fid-title">Livraisons</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Français" && (
                        <h3 className="ttm-fid-title">Livraisons</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Anglais" && (
                        <h3 className="ttm-fid-title">Deliveries</h3>
                      )}
                      {localStorage.getItem("selected_language") == "Arabe" && (
                        <h3 className="ttm-fid-title">عمليات تسليم</h3>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Italien" && (
                        <h3 className="ttm-fid-title">Consegne</h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ttm-row testimonial-section row-map1 clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {!localStorage.getItem("selected_language") && (
                    <div className="section-title style2">
                      <div className="title-header">
                        <h3>Notre CLIENTS</h3>
                        <h2 className="title">Écoutez, ce qu'ils disent!</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Français" && (
                    <div className="section-title style2">
                      <div className="title-header">
                        <h3>Notre CLIENTS</h3>
                        <h2 className="title">Écoutez, ce qu'ils disent!</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Anglais" && (
                    <div className="section-title style2">
                      <div className="title-header">
                        <h3>Our CUSTOMERS</h3>
                        <h2 className="title">Listen, what they say!</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Arabe" && (
                    <div className="section-title style2">
                      <div className="title-header">
                        <h3>عملائنا</h3>
                        <h2 className="title">اسمعوا ماذا يقولون</h2>
                      </div>
                    </div>
                  )}
                  {localStorage.getItem("selected_language") == "Italien" && (
                    <div className="section-title style2">
                      <div className="title-header">
                        <h3>I nostri clienti</h3>
                        <h2 className="title">Ascolta, cosa dicono!</h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {!isLoadingAvis ? (
                <div
                  className="slick_slider"
                  style={{ display: "flex" }}
                  data-slick='{"slidesToShow": 2, "slidesToScroll": 1, "arrows":false, "centerMode":false, "centerPadding":0, "autoplay":false, "dots":false, "infinite":true, "responsive":[{"breakpoint":992,"settings":{"slidesToShow": 2}},{"breakpoint":840,"settings":{"slidesToShow": 2}},{"breakpoint":650,"settings":{"slidesToShow": 1}}]}'
                >
                  {avisList.slice(0, 2).map((avis, index) => (
                    <div className="col-lg-6" key={index}>
                      <div className="testimonials ttm-testimonial-box-view-style2">
                        <div className="testimonial-content">
                          <blockquote className="testimonial-text">
                            {avis.commentaire}
                          </blockquote>
                          <div className="testimonial-bottom">
                            <div className="testimonial-avatar">
                              <div className="testimonial-img">
                                <img
                                  className="img-fluid"
                                  src="assets/FrontOffice/images/hotel_logo.png"
                                  alt="testimonial-img"
                                />
                              </div>
                            </div>
                            <div className="testimonial-caption">
                              <h3>{avis.user.entreprise.nom}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </div>
          </section>

          <section
            className="ttm-row padding_zero-section bg-layer-equal-height clearfix"
            style={{ overflow: "hidden" }}
          >
            <div className="container">
              <div className="row no-gutters">
                <div className="col-lg-8 col-md-12">
                  <div className="ttm-bg ttm-col-bgcolor-yes ttm-bgcolor-grey ttm-left-span spacing-9 res-1199-padding_left15">
                    <div className="ttm-col-wrapper-bg-layer ttm-bg-layer">
                      <div className="ttm-col-wrapper-bg-layer-inner"></div>
                    </div>
                    <div className="layer-content">
                      {!localStorage.getItem("selected_language") && (
                        <div className="section-title">
                          <div className="title-header">
                            <h3>Nos EXPERTS</h3>
                            <h2 className="title">
                              Rencontrez une équipe motivée et experte!
                            </h2>
                          </div>
                          <div className="title-desc">
                            <p>
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Connaissance complète du marché
                              </span>
                              <br />
                              Plus de 25 ans d’expertise dans le secteur de la
                              pêche et de l’aquaculture
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Promotion commerciale
                              </span>
                              <br />
                              Promouvoir la reconnaissance de nos produits
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Livraison en 24h/48h
                              </span>
                              <br />
                              Livrer des produits frais en circuit court
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Service client
                              </span>
                              <br />
                              Réponses claires, précises et immédiates
                            </p>
                          </div>
                        </div>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Français" && (
                        <div className="section-title">
                          <div className="title-header">
                            <h3>Nos EXPERTS</h3>
                            <h2 className="title">
                              Rencontrez une équipe motivée et experte!
                            </h2>
                          </div>
                          <div className="title-desc">
                            <p>
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Connaissance complète du marché
                              </span>
                              <br />
                              Plus de 25 ans d’expertise dans le secteur de la
                              pêche et de l’aquaculture
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Promotion commerciale
                              </span>
                              <br />
                              Promouvoir la reconnaissance de nos produits
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Livraison en 24h/48h
                              </span>
                              <br />
                              Livrer des produits frais en circuit court
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Service client
                              </span>
                              <br />
                              Réponses claires, précises et immédiates
                            </p>
                          </div>
                        </div>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Anglais" && (
                        <div className="section-title">
                          <div className="title-header">
                            <h3>Our EXPERTS</h3>
                            <h2 className="title">
                              Meet a motivated and expert team!
                            </h2>
                          </div>
                          <div className="title-desc">
                            <p>
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Complete knowledge of the market
                              </span>
                              <br />
                              More than 25 years of expertise in the fishing and
                              aquaculture sector
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Commercial promotion
                              </span>
                              <br />
                              Promote recognition of our products
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Delivery in 24h/48h
                              </span>
                              <br />
                              Deliver fresh products in short circuit
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Customer service
                              </span>
                              <br />
                              Clear, precise and immediate answers
                            </p>
                          </div>
                        </div>
                      )}
                      {localStorage.getItem("selected_language") == "Arabe" && (
                        <div className="section-title">
                          <div className="title-header">
                            <h3>خبرائنا</h3>
                            <h2 className="title">
                              تعرف على فريق من الخبراء والمتحمسين!
                            </h2>
                          </div>
                          <div className="title-desc">
                            <p>
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                معرفة كاملة بالسوق
                              </span>
                              <br />
                              أكثر من 25 عامًا من الخبرة في قطاع الصيد وتربية
                              الأحياء المائية
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                الترويج التجاري
                              </span>
                              <br />
                              تعزيز الاعتراف بمنتجاتنا
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                التسليم في 24 ساعة / 48 ساعة
                              </span>
                              <br />
                              تسليم المنتجات الطازجة في دائرة قصر
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                خدمة الزبائن
                              </span>
                              <br />
                              إجابات واضحة ودقيقة وفورية
                            </p>
                          </div>
                        </div>
                      )}
                      {localStorage.getItem("selected_language") ==
                        "Italien" && (
                        <div className="section-title">
                          <div className="title-header">
                            <h3>I nostri ESPERTI</h3>
                            <h2 className="title">
                              Incontra un team motivato ed esperto!
                            </h2>
                          </div>
                          <div className="title-desc">
                            <p>
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Conoscenza completa del mercato
                              </span>
                              <br />
                              Più di 25 anni di esperienza nel settore della
                              pesca e dell'acquacoltura
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Promozione commerciale
                              </span>
                              <br />
                              Promuovere il riconoscimento dei nostri prodotti
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Consegna in 24h/48h
                              </span>
                              <br />
                              Consegnare prodotti freschi in corto circuito
                              <br />
                              <span
                                style={{ color: "#0fb3d0", fontWeight: "bold" }}
                              >
                                Assistenza clienti
                              </span>
                              <br />
                              Risposte chiare, precise e immediate
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="ttm-bg ttm-col-bgcolor-yes ttm-bgcolor-skincolor ttm-right-span padding_top100 padding_bottom200 res-991-p-30 z-index-2 ttm-expandcontent-yes">
                    <div className="ttm-bg ttm-col-wrapper-bg-layer ttm-bg-layer">
                      <div className="ttm-col-wrapper-bg-layer-inner"></div>
                    </div>
                    <div className="layer-content">
                      <div className="ttm-expandcontent_column">
                        <div className="ttm-expandcontent_wrapper spacing-10">
                          <div
                            className="row ttm-boxes-spacing-10px slick_slider"
                            data-slick='{"slidesToShow": 4, "slidesToScroll": 1, "arrows":false, "dots":false, "autoplay":false, "infinite":true, "responsive": [{"breakpoint":992,"settings":{"slidesToShow": 3}} , {"breakpoint":777,"settings":{"slidesToShow": 2}}, {"breakpoint":575,"settings":{"slidesToShow": 1}}]}'
                          >
                            <div className="col-lg-3 col-md-6 col-sm-6 ttm-box-col-wrapper">
                              <div className="featured-imagebox featured-imagebox-team style1 m-0">
                                <div className="ttm-box-view-overlay">
                                  <div className="featured-thumbnail">
                                    <img
                                      className="img-fluid auto_size"
                                      height="450"
                                      width="360"
                                      src="assets/FrontOffice/images/team-member/team-img05.jpg"
                                      alt="image"
                                    />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h5>
                                      <a href="#">Ali Souayah</a>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 ttm-box-col-wrapper">
                              <div className="featured-imagebox featured-imagebox-team style1 m-0">
                                <div className="ttm-box-view-overlay">
                                  <div className="featured-thumbnail">
                                    <img
                                      className="img-fluid auto_size"
                                      height="450"
                                      width="360"
                                      src="assets/FrontOffice/images/team-member/team-img03.jpg"
                                      alt="image"
                                    />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h5>
                                      <a href="#">Mohamed Amine Rtibi</a>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 ttm-box-col-wrapper">
                              <div className="featured-imagebox featured-imagebox-team style1 m-0">
                                <div className="ttm-box-view-overlay">
                                  <div className="featured-thumbnail">
                                    <img
                                      className="img-fluid auto_size"
                                      height="450"
                                      width="360"
                                      src="assets/FrontOffice/images/team-member/team-img01.jpg"
                                      alt="image"
                                    />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h5>
                                      <a href="#">Salah Kochbati</a>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 ttm-box-col-wrapper">
                              <div className="featured-imagebox featured-imagebox-team style1 m-0">
                                <div className="ttm-box-view-overlay">
                                  <div className="featured-thumbnail">
                                    <img
                                      className="img-fluid auto_size"
                                      height="450"
                                      width="360"
                                      src="assets/FrontOffice/images/team-member/team-img04.jpg"
                                      alt="image"
                                    />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h5>
                                      <a href="#">Kais Maalaoui </a>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 ttm-box-col-wrapper">
                              <div className="featured-imagebox featured-imagebox-team style1 m-0">
                                <div className="ttm-box-view-overlay">
                                  <div className="featured-thumbnail">
                                    <img
                                      className="img-fluid auto_size"
                                      height="450"
                                      width="360"
                                      src="assets/FrontOffice/images/team-member/team-img02.jpg"
                                      alt="image"
                                    />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h5>
                                      <a href="#">Mohamed Ben Omor</a>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
