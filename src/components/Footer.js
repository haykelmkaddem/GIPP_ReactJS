import React from "react";

const Footer = () => {
  return (
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
                        src="assets/FrontOffice/images/1-aqvo-logo.png"
                        alt="logo-img"
                      />
                    </div>
                    <div className="col-xl-6">
                      <h3 style={{ marginTop: "33%", marginLeft: "-47%" }}>
                        GIPP
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="textwidget widget-text">
                  <p>
                    Le Groupement Interprofessionnel des Produits de la Pêche
                    (GIPP) fondé en 1995 vous offre une large palette de
                    produits de la mer Méditerranée, de quoi rassasier l’appétit
                    et ravir les papilles gustatives de notre clientèle
                    potentielle
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
                      href="assets/FrontOffice/images/portfolio/portfolio-02-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/portfolio/portfolio-02-150x150.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/FrontOffice/images/blog/blog-02-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/blog/blog-02-150x150.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/FrontOffice/images/blog/blog-01-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/blog/blog-01-150x150.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/FrontOffice/images/portfolio/portfolio-01-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/portfolio/portfolio-01-150x150.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/FrontOffice/images/services/services-05-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/services/services-05-150x150.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/FrontOffice/images/portfolio/portfolio-03-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="assets/FrontOffice/images/portfolio/portfolio-03-150x150.jpg"
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
                <p>Si vous avez des questions ,Vous pouvez nous contacter :</p>
                <div className="d-flex">
                  <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-xs margin_right15 margin_bottom15">
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
                  Copyright © 2022
                  <a
                    href="#"
                    className="ttm-textcolor-skincolor font-weight-500"
                  >
                    GIPP
                  </a>
                  Tous les droits sont réservés.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
