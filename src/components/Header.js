import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/FrontOffice/images/favicon.png";
import "../assets/FrontOffice/css/bootstrap.min.css";
import "../assets/FrontOffice/css/animate.css";
import "../assets/FrontOffice/css/font-awesome.css";
import "../assets/FrontOffice/css/flaticon.css";
import "../assets/FrontOffice/css/themify-icons.css";
import "../assets/FrontOffice/css/slick.css";
import "../assets/FrontOffice/css/prettyPhoto.css";
import "../assets/FrontOffice/css/shortcodes.css";
import "../assets/FrontOffice/css/main.css";
import "../assets/FrontOffice/css/megamenu.css";
import "../assets/FrontOffice/css/responsive.css";
import "../assets/FrontOffice/css/product-cart.css";
import "../assets/FrontOffice/css/marketplace.css";
import "../assets/FrontOffice/css/productdetails.css";
import "../assets/FrontOffice/css/salon.css";
import "../assets/FrontOffice/css/cartgipp.css";

// import "../assetsFrontOffice/js/jquery-3.6.0.min.js";
// import "../assetsFrontOffice/js/jquery-migrate-3.3.2.min.js";
// import "../assetsFrontOffice/js/bootstrap.min.js";
// import "../assetsFrontOffice/js/jquery.easing.js";
// import "../assetsFrontOffice/js/jquery-waypoints.js";
// import "../assetsFrontOffice/js/jquery-validate.js";
// import "../assetsFrontOffice/js/jquery.prettyPhoto.js";
// import "../assetsFrontOffice/js/slick.min.js";
// import "../assetsFrontOffice/js/numinate.min.js";
// import "../assetsFrontOffice/js/imagesloaded.min.js";
// import "../assetsFrontOffice/js/jquery-isotope.js";
// import "../assetsFrontOffice/js/main.js";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import Swal from "sweetalert2";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const CART_URL = "http://127.0.0.1:8000/panier/showall";

const Header = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [run, setRun] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selected_language")
  );

  function fetchCart() {
    axios
      .post(CART_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        localStorage.setItem("cart", response.data.length);
      })
      .finally(() => {
        setRun(!run);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("id")) {
      fetchCart();
    }
  }, [run]);

  return (
    <header
      id="masthead"
      className="header ttm-bgcolor-darkgrey ttm-header-style-02"
    >
      <div
        id="site-header-menu"
        className="site-header-menu ttm-bgcolor-darkgrey"
      >
        <div className="site-header-menu-inner ttm-stickable-header-1 fixed-header ">
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
                            src="/assets/FrontOffice/images/1-aqvo-logo.png"
                            alt="logo-img"
                          />
                        </div>
                        <div className="col-xl-6">
                          <h3 style={{ marginTop: "43%", marginLeft: "-47%" }}>
                            GIPP
                          </h3>
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
                        <ul className="menu">
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              {!localStorage.getItem("selected_language") && (
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
                                  style={{ fontSize: 18, fontWeight: "bold" }}
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
                              {!localStorage.getItem("selected_language") && (
                                <NavLink to="/marketplace">Marketplace</NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Français" && (
                                <NavLink to="/marketplace">Marketplace</NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Anglais" && (
                                <NavLink to="/marketplace">Marketplace</NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Arabe" && (
                                <div
                                  style={{ fontSize: 18, fontWeight: "bold" }}
                                >
                                  <NavLink to="/marketplace">المتجر</NavLink>
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
                              {!localStorage.getItem("selected_language") && (
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
                                  style={{ fontSize: 18, fontWeight: "bold" }}
                                >
                                  <NavLink to="/salonListe"> المعارض </NavLink>
                                </div>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Italien" && (
                                <NavLink to="/salonListe"> Soggiorno </NavLink>
                              )}
                            </a>
                          </li>
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              {!localStorage.getItem("selected_language") && (
                                <NavLink to="/actualite">Actualités</NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Français" && (
                                <NavLink to="/actualite">Actualités</NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Anglais" && (
                                <NavLink to="/actualite">News</NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Arabe" && (
                                <div
                                  style={{ fontSize: 18, fontWeight: "bold" }}
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
                              {!localStorage.getItem("selected_language") && (
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
                                <NavLink to="/contactUs"> Contact Us </NavLink>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Arabe" && (
                                <div
                                  style={{ fontSize: 18, fontWeight: "bold" }}
                                >
                                  <NavLink to="/contactUs"> اتصل بنا </NavLink>
                                </div>
                              )}
                              {localStorage.getItem("selected_language") ==
                                "Italien" && (
                                <NavLink to="/contactUs"> Contattaci </NavLink>
                              )}
                            </a>
                          </li>
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              {selectedLanguage == "Français" && (
                                <span className="d-flex align-items-center justify-content-center text-center">
                                  <img
                                    src="/assets/FrontOffice/images/fr.jpg"
                                    style={{ width: 20, height: 13 }}
                                  />{" "}
                                  &nbsp; FR
                                </span>
                              )}
                              {selectedLanguage == "Anglais" && (
                                <span className="d-flex align-items-center justify-content-center text-center">
                                  <img
                                    src="/assets/FrontOffice/images/an.png"
                                    style={{ width: 20, height: 13 }}
                                  />{" "}
                                  &nbsp; EN
                                </span>
                              )}
                              {selectedLanguage == "Arabe" && (
                                <span className="d-flex align-items-center justify-content-center text-center">
                                  <img
                                    src="/assets/FrontOffice/images/art.png"
                                    style={{ width: 20, height: 13 }}
                                  />{" "}
                                  &nbsp; AR
                                </span>
                              )}
                              {selectedLanguage == "Italien" && (
                                <span className="d-flex align-items-center justify-content-center text-center">
                                  <img
                                    src="/assets/FrontOffice/images/it.jpg"
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
                      style={{ backgroundColor: "#13c6dd", borderWidth: 0 }}
                    >
                      <div className="row">
                        <div className="col-xl-3">
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
                            sclassName="col-xl-9"
                            style={{ marginLeft: "-1%", marginTop: "5%" }}
                          >
                            Se connecter
                          </div>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Français" && (
                          <div
                            className="col-xl-9"
                            style={{ marginLeft: "-1%", marginTop: "5%" }}
                          >
                            Se connecter
                          </div>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Anglais" && (
                          <div
                            className="col-xl-9"
                            style={{ marginLeft: "-1%", marginTop: "5%" }}
                          >
                            Login
                          </div>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Arabe" && (
                          <div
                            className="col-xl-9"
                            style={{ marginLeft: "-1%", marginTop: "5%" }}
                          >
                            تسجيل الدخول
                          </div>
                        )}
                        {localStorage.getItem("selected_language") ==
                          "Italien" && (
                          <div
                            className="col-xl-9"
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
                                <NavLink to="/settings"> Paramétre </NavLink>
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
                                <NavLink to="/settings"> Impostazioni</NavLink>
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
                                <NavLink to="/mesCommandes">My Orders</NavLink>
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
                                <NavLink to="/mesSalons"> Mes Salons </NavLink>
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
                                  <span>{localStorage.getItem("cart")}</span>
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
  );
};

export default Header;
