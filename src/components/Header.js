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

const Header = () => {
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
                      href="index.html"
                      title="Aqovo"
                      rel="home"
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
                          <h3 style={{ marginTop: "33%", marginLeft: "-47%" }}>
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
                              <NavLink to="/apropos">À propos</NavLink>
                            </a>
                          </li>
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              <NavLink to="/marketplace">Marketplace</NavLink>
                            </a>
                          </li>
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              <NavLink to="/salonListe"> Salons </NavLink>
                            </a>
                          </li>
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              <NavLink to="/actualite">Actualités</NavLink>
                            </a>
                          </li>

                          <li className="mega-menu-item">
                            <a>
                              <NavLink to="/contactUs"> Contact </NavLink>
                            </a>
                          </li>
                          <li className="mega-menu-item">
                            <a className="mega-menu-link">
                              <img
                                src="/assets/FrontOffice/images/globe3.png"
                                style={{ width: 36.67, height: 32 }}
                              />
                            </a>

                            <ul className="mega-submenu">
                              <li>
                                <a href="#">Français</a>
                              </li>
                              <li>
                                <a href="#">Anglais</a>
                              </li>
                              <li>
                                <a href="#">Arabe</a>
                              </li>
                              <li>
                                <a href="#">Italien</a>
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
                      href="login.html"
                      style={{ backgroundColor: "#13c6dd", borderWidth: 0 }}
                    >
                      <div className="row">
                        <div className="col-xl-6">
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
                        <div
                          className="col-xl-6"
                          style={{ marginLeft: "-24%", marginTop: "5%" }}
                        >
                          Login
                        </div>
                      </div>
                    </a>
                  )}
                  {localStorage.getItem("nom") != null && (
                    <nav className="main-menu menu-mobile" id="menu">
                      <ul className="menu">
                        <li className="mega-menu-item">
                          <a href="#" className="mega-menu-link">
                            {localStorage.getItem("prenom")}{" "}
                            {localStorage.getItem("nom")}
                          </a>
                          <ul className="mega-submenu">
                            <li>
                              <a href="#"> Settings</a>
                            </li>
                            <li>
                              <a href="#">Mes Commandes</a>
                            </li>
                            <li>
                              <a href="#"> Panier </a>
                            </li>
                            <li>
                              <a href="#"> Mes Salons </a>
                            </li>
                            <li>
                              <a href="#"> Déconnexion </a>
                            </li>
                          </ul>
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
