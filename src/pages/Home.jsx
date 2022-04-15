import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  useEffect(() => {}, []);
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
                          href="index.html"
                          title="Aqovo"
                          rel="home"
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
                              <h3
                                style={{ marginTop: "33%", marginLeft: "-47%" }}
                              >
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
                                  <NavLink to="/marketplace">
                                    Marketplace
                                  </NavLink>
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
                                    src="assets/FrontOffice/images/globe3.png"
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
                                {localStorage.getItem("prenom")}
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
                            B2B MarketPlace aux poissons et fruits de mer
                            méditerranéens
                          </h2>
                          <p
                            data-animation="fadeInDown"
                            className="padding_right40"
                          >
                            Notre objectif est de faciliter l'exportation et la
                            mise en contact entre les acheteurs et les vendeurs
                            méditerranéens des produits de la péche
                          </p>
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
                            B2B MarketPlace aux poissons et fruits de mer
                            méditerranéens
                          </h2>
                          <p
                            data-animation="fadeInDown"
                            className="padding_right40"
                          >
                            Notre objectif est de faciliter l'exportation et la
                            mise en contact entre les acheteurs et les vendeurs
                            méditerranéens des produits de la péche
                          </p>
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
                        <h3>À propos</h3>
                        <h2 className="title">Pourquoi GIPP Marketplace?</h2>
                      </div>
                      <div className="title-desc">
                        <p>
                          <span
                            style={{ color: "#005cbf", fontWeight: "bold" }}
                          >
                            1. Confidentialité de paiements
                          </span>
                          <br />
                          Assurer des paiements sécurisés et réduire les risques
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
                      </div>
                    </div>
                    <div className="ttm-horizontal_sep width-100 margin_top40 margin_bottom30"></div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="ttm-fid inside ttm-fid-view-lefticon style1">
                          <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-pond"></i>
                          </div>
                          <div className="ttm-fid-contents">
                            <h6 className="ttm-fid-inner">Prix Convenable</h6>
                            <h3 className="ttm-fid-title">
                              Vendre à un prix en moyenne inférieur au prix du
                              marché vu l’absence de frais de négociation
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="ttm-fid inside ttm-fid-view-lefticon style1">
                          <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-pond"></i>
                          </div>
                          <div className="ttm-fid-contents">
                            <h6 className="ttm-fid-inner">
                              Accès Au Marché International
                            </h6>
                            <h3 className="ttm-fid-title">
                              Étendre le commerce à l’échelle mondiale
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="ttm-fid inside ttm-fid-view-lefticon style1">
                          <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                            <i className="flaticon-pond-1"></i>
                          </div>
                          <div className="ttm-fid-contents">
                            <h6 className="ttm-fid-inner">
                              Contrôle Documents
                            </h6>
                            <h3 className="ttm-fid-title">
                              Créer une seule base de données pour toutes vos
                              transactions
                            </h3>
                          </div>
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
                  <div className="section-title title-style-center_text">
                    <div className="title-header">
                      <h3>Actualités</h3>
                      <h2 className="title">Nos actualités</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ttm-row padding_top_zero-section ttm-bgcolor-grey clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="ttm-bg ttm-col-bgcolor-yes ttm-bgcolor-white spacing-5">
                    <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                    <div className="layer-content">
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="featured-imagebox featured-imagebox-procedure">
                            <div className="featured-thumbnail">
                              <img
                                className="img-fluid"
                                src="assets/FrontOffice/images/actualites/act1.png"
                                alt="image"
                                style={{ width: 262.5, height: 180.66 }}
                              />
                              <div className="process-num"></div>
                            </div>
                            <div className="featured-content">
                              <div className="featured-desc">
                                <p>
                                  ENTRETIEN. « Nous voulons valoriser la petite
                                  pêche de qualité »
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="featured-imagebox featured-imagebox-procedure">
                            <div className="featured-thumbnail">
                              <img
                                className="img-fluid"
                                src="assets/FrontOffice/images/actualites/act2.png"
                                alt="image"
                                style={{ width: 262.5, height: 180.66 }}
                              />
                              <div className="process-num"></div>
                            </div>
                            <div className="featured-content">
                              <div className="featured-desc">
                                <p>
                                  Loire-Atlantique. Grâce au poulpe, les bons
                                  chiffres des criées*
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="featured-imagebox featured-imagebox-procedure">
                            <div className="featured-thumbnail">
                              <img
                                className="img-fluid"
                                src="assets/FrontOffice/images/actualites/act3.png"
                                alt="image"
                                style={{ width: 262.5, height: 180.66 }}
                              />
                              <div className="process-num"></div>
                            </div>
                            <div className="featured-content">
                              <div className="featured-desc">
                                <p>
                                  Loire-Atlantique. Le salon de la pêche en mer
                                  prévu début février est reporté en 2023
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="featured-imagebox featured-imagebox-procedure">
                            <div className="featured-thumbnail">
                              <img
                                className="img-fluid"
                                src="assets/FrontOffice/images/actualites/act4.png"
                                alt="image"
                                style={{ width: 262.5, height: 180.66 }}
                              />
                              <div className="process-num"></div>
                            </div>
                            <div className="featured-content">
                              <div className="featured-desc">
                                <p>
                                  Des thons transportés dans un marché à
                                  Istanbul (Turquie) Moins de pêche
                                </p>
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
          <section className="ttm-row service-section ttm-bgcolor-grey clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title title-style-center_text">
                    <div className="title-header">
                      <h3>Produits</h3>
                      <h2 className="title">Nouveaux produits</h2>
                    </div>
                    <div className="title-desc">
                      <p>Voici tous nos nouveaux produits</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row slick_slider"
                data-slick='{"slidesToShow": 3, "slidesToScroll": 3, "arrows":false, "autoplay":true, "infinite":true, "responsive": [{"breakpoint":1100,"settings":{"slidesToShow": 3}} , {"breakpoint":940,"settings":{"slidesToShow": 2}}, {"breakpoint":575,"settings":{"slidesToShow": 1}}]}'
              >
                <div className="col-md-4 col-sm-6">
                  <div className="featured-imagebox featured-imagebox-services style2">
                    <div className="featured-thumbnail">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src="assets/FrontOffice/images/produits/karouss.PNG"
                          alt="image"
                          style={{ width: 360, height: 214.92 }}
                        />
                      </a>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <a href="#">Bar Poisson</a>
                        </h3>
                      </div>

                      <div className="bottom-footer">
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-icon-btn-right ttm-btn-color-dark btn-inline"
                          href="#"
                        >
                          voir plus<i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="featured-imagebox featured-imagebox-services style2">
                    <div className="featured-thumbnail">
                      <a href="#" tabindex="-1">
                        <img
                          className="img-fluid"
                          src="assets/FrontOffice/images/produits/dourade.jpg"
                          alt="image"
                          style={{ width: 360, height: 214.92 }}
                        />
                      </a>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <a href="#">Daurade Poisson</a>
                        </h3>
                      </div>

                      <div className="bottom-footer">
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-icon-btn-right ttm-btn-color-dark btn-inline"
                          href="#"
                        >
                          voir plus<i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="featured-imagebox featured-imagebox-services style2">
                    <div className="featured-thumbnail">
                      <a href="#" tabindex="-1">
                        <img
                          className="img-fluid"
                          src="assets/FrontOffice/images/produits/chelba.jpg"
                          alt="image"
                          style={{ width: 360, height: 214.92 }}
                        />
                      </a>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <a href="#">Saupe Poisson</a>
                        </h3>
                      </div>

                      <div className="bottom-footer">
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-icon-btn-right ttm-btn-color-dark btn-inline"
                          href="#"
                        >
                          voir plus<i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="featured-imagebox featured-imagebox-services style2">
                    <div className="featured-thumbnail">
                      <a href="#" tabindex="-1">
                        <img
                          className="img-fluid"
                          src="assets/FrontOffice/images/produits/karnit.jpg"
                          alt="image"
                          style={{ width: 360, height: 214.92 }}
                        />
                      </a>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <a href="#">Pieuvre Poisson</a>
                        </h3>
                      </div>

                      <div className="bottom-footer">
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-icon-btn-right ttm-btn-color-dark btn-inline"
                          href="#"
                        >
                          voir plus<i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="featured-imagebox featured-imagebox-services style2">
                    <div className="featured-thumbnail">
                      <a href="#" tabindex="-1">
                        <img
                          className="img-fluid"
                          src="assets/FrontOffice/images/produits/morjan.webp"
                          alt="image"
                          style={{ width: 360, height: 214.92 }}
                        />
                      </a>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <a href="#">Corail Poisson</a>
                        </h3>
                      </div>

                      <div className="bottom-footer">
                        <a
                          className="ttm-btn ttm-btn-size-md ttm-icon-btn-right ttm-btn-color-dark btn-inline"
                          href="#"
                        >
                          voir plus<i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                          data-from="0"
                          data-to="100"
                          data-interval="1"
                          data-before=""
                          data-before-style="sup"
                          data-after="+"
                          data-after-style="sub"
                          className="numinate"
                        >
                          9462
                        </span>
                      </h4>
                      <h3 className="ttm-fid-title">Clients</h3>
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
                          data-from="0"
                          data-to="50"
                          data-interval="1"
                          data-before=""
                          data-before-style="sup"
                          data-after="+"
                          data-after-style="sub"
                          className="numinate"
                        >
                          1589
                        </span>
                      </h4>
                      <h3 className="ttm-fid-title">Produits/ jour</h3>
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
                          data-from="0"
                          data-to="1000"
                          data-interval="4"
                          data-before=""
                          data-before-style="sup"
                          data-after="+"
                          data-after-style="sub"
                          className="numinate"
                        >
                          46
                        </span>
                      </h4>
                      <h3 className="ttm-fid-title">Livraisons/ mois</h3>
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
                  <div className="section-title style2">
                    <div className="title-header">
                      <h3>Notre CLIENTS</h3>
                      <h2 className="title">Écoutez, ce qu'ils disent!</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row slick_slider"
                data-slick='{"slidesToShow": 2, "slidesToScroll": 1, "arrows":false, "centerMode":false, "centerPadding":0, "autoplay":false, "dots":false, "infinite":true, "responsive":[{"breakpoint":992,"settings":{"slidesToShow": 2}},{"breakpoint":840,"settings":{"slidesToShow": 2}},{"breakpoint":650,"settings":{"slidesToShow": 1}}]}'
              >
                <div className="col-lg-12">
                  <div className="testimonials ttm-testimonial-box-view-style2">
                    <div className="testimonial-content">
                      <blockquote className="testimonial-text">
                        Bien bonnes ces crevettes accompagnent bien les salades
                        ou comme ça avec un peu de mayonnaise ou sauce cocktail
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
                          <h3>Mövenpick Hotel du Lac Tunis</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="testimonials ttm-testimonial-box-view-style2">
                    <div className="testimonial-content">
                      <blockquote className="testimonial-text">
                        FRAICHES mais je n'ai pas retrouvé le bon goût de
                        noisette. Je pense prendre n° 2 ou 1 la prochaine fois
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
                          <h3>Hôtel El mouradi Sousse</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="testimonials ttm-testimonial-box-view-style2">
                    <div className="testimonial-content">
                      <blockquote className="testimonial-text">
                        Une seule pièce bien pesée ,top,merci
                        <br />
                        <br />
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
                          <h3>Medina Solaria And Thalasso Hammamet</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ttm-row padding_zero-section bg-layer-equal-height clearfix">
            <div className="container">
              <div className="row no-gutters">
                <div className="col-lg-8 col-md-12">
                  <div className="ttm-bg ttm-col-bgcolor-yes ttm-bgcolor-grey ttm-left-span spacing-9 res-1199-padding_left15">
                    <div className="ttm-col-wrapper-bg-layer ttm-bg-layer">
                      <div className="ttm-col-wrapper-bg-layer-inner"></div>
                    </div>
                    <div className="layer-content">
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
