import React from "react";

const Footer = () => {
  return (
    <footer className="footer widget-footer ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
      <div className="second-footer" style={{ backgroundColor: "#1D2A4D" }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 widget-area">
              <div className="widget widget_text clearfix">
                <div className="footer-logo">
                  <div className="row">
                    <div className="col-xl-6">
                      <img
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
                </div>
                <div className="textwidget widget-text">
                  {!localStorage.getItem("selected_language") && (
                    <p>
                      Le Groupement Interprofessionnel des Produits de la Pêche
                      (GIPP) fondé en 1995 vous offre une large palette de
                      produits de la mer Méditerranée, de quoi rassasier
                      l’appétit et ravir les papilles gustatives de notre
                      clientèle potentielle
                    </p>
                  )}
                  {localStorage.getItem("selected_language") == "Français" && (
                    <p>
                      Le Groupement Interprofessionnel des Produits de la Pêche
                      (GIPP) fondé en 1995 vous offre une large palette de
                      produits de la mer Méditerranée, de quoi rassasier
                      l’appétit et ravir les papilles gustatives de notre
                      clientèle potentielle
                    </p>
                  )}
                  {localStorage.getItem("selected_language") == "Anglais" && (
                    <p>
                      The Interprofessional Grouping of Fishery Products (GIPP)
                      founded in 1995 offers you a wide range of products from
                      the Mediterranean Sea, enough to satiate the appetite and
                      delight the taste buds of our potential customers.
                    </p>
                  )}
                  {localStorage.getItem("selected_language") == "Arabe" && (
                    <p>
                      تقدم لك مجموعة Interprofessional Group of Fishery Products
                      (GIPP) التي تأسست في عام 1995 مجموعة واسعة من منتجات
                      المأكولات البحرية المتوسطية ، بما يكفي لإشباع شهية عملائنا
                      المحتملين وإسعادهم.
                    </p>
                  )}
                  {localStorage.getItem("selected_language") == "Italien" && (
                    <p>
                      Il Gruppo Interprofessionale dei Prodotti della Pesca
                      (GIPP) fondato nel 1995 vi offre una vasta gamma di
                      prodotti ittici mediterranei, sufficienti a soddisfare
                      l'appetito e deliziare le papille gustative dei nostri
                      potenziali clienti.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-2 widget-area">
              {!localStorage.getItem("selected_language") && (
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">Apprenez à nous connaître</h3>
                  <ul id="menu-footer-quick-links" className="menu">
                    <li>
                      <a href="/apropos">À propos de GIPP Marketplace</a>
                    </li>
                    <li>
                      <a href="#">Conditions d’utilisation</a>
                    </li>
                    <li>
                      <a href="#">Politique de confidentialité</a>
                    </li>
                  </ul>
                </div>
              )}
              {localStorage.getItem("selected_language") == "Français" && (
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">Apprenez à nous connaître</h3>
                  <ul id="menu-footer-quick-links" className="menu">
                    <li>
                      <a href="/apropos">À propos de GIPP Marketplace</a>
                    </li>
                    <li>
                      <a href="#">Conditions d’utilisation</a>
                    </li>
                    <li>
                      <a href="#">Politique de confidentialité</a>
                    </li>
                  </ul>
                </div>
              )}
              {localStorage.getItem("selected_language") == "Anglais" && (
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">Get to know us</h3>
                  <ul id="menu-footer-quick-links" className="menu">
                    <li>
                      <a href="/apropos">About GIPP Marketplace</a>
                    </li>
                    <li>
                      <a href="#">Terms of use</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              )}
              {localStorage.getItem("selected_language") == "Arabe" && (
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">تعرف علينا</h3>
                  <ul id="menu-footer-quick-links" className="menu">
                    <li>
                      <a href="/apropos">حول سوق GIPP</a>
                    </li>
                    <li>
                      <a href="#">شروط الاستعمال</a>
                    </li>
                    <li>
                      <a href="#">سياسة الخصوصية</a>
                    </li>
                  </ul>
                </div>
              )}
              {localStorage.getItem("selected_language") == "Italien" && (
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">Vieni a conoscerci</h3>
                  <ul id="menu-footer-quick-links" className="menu">
                    <li>
                      <a href="/apropos">Informazioni sul mercato GIPP</a>
                    </li>
                    <li>
                      <a href="#">Termini di utilizzo</a>
                    </li>
                    <li>
                      <a href="#">politica sulla riservatezza</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
              <div className="widget widget_img_gellary clearfix">
                {!localStorage.getItem("selected_language") && (
                  <h3 className="widget-title">Galerie</h3>
                )}
                {localStorage.getItem("selected_language") == "Français" && (
                  <h3 className="widget-title">Galerie</h3>
                )}
                {localStorage.getItem("selected_language") == "Anglais" && (
                  <h3 className="widget-title">Gallery</h3>
                )}
                {localStorage.getItem("selected_language") == "Arabe" && (
                  <h3 className="widget-title">معرض الصور</h3>
                )}
                {localStorage.getItem("selected_language") == "Italien" && (
                  <h3 className="widget-title">Galleria</h3>
                )}

                <ul>
                  <li>
                    <a
                      href="assets/FrontOffice/images/portfolio/portfolio-02-1200x800.jpg"
                      rel="prettyPhoto[coregallery]"
                      data-rel="prettyPhoto"
                    >
                      <img
                        className="img-fluid"
                        src="/assets/FrontOffice/images/portfolio/portfolio-02-150x150.jpg"
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
                        src="/assets/FrontOffice/images/blog/blog-02-150x150.jpg"
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
                        src="/assets/FrontOffice/images/blog/blog-01-150x150.jpg"
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
                        src="/assets/FrontOffice/images/portfolio/portfolio-01-150x150.jpg"
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
                        src="/assets/FrontOffice/images/services/services-05-150x150.jpg"
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
                        src="/assets/FrontOffice/images/portfolio/portfolio-03-150x150.jpg"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 widget-area">
              <div className="widget widget_cta clearfix">
                {!localStorage.getItem("selected_language") && (
                  <h3 className="widget-title">Contact</h3>
                )}
                {localStorage.getItem("selected_language") == "Français" && (
                  <h3 className="widget-title">Contact</h3>
                )}
                {localStorage.getItem("selected_language") == "Anglais" && (
                  <h3 className="widget-title">Contact</h3>
                )}
                {localStorage.getItem("selected_language") == "Arabe" && (
                  <h3 className="widget-title">اتصل بنا</h3>
                )}
                {localStorage.getItem("selected_language") == "Italien" && (
                  <h3 className="widget-title">Contattaci</h3>
                )}

                {!localStorage.getItem("selected_language") && (
                  <p>
                    Si vous avez des questions ,Vous pouvez nous contacter :
                  </p>
                )}
                {localStorage.getItem("selected_language") == "Français" && (
                  <p>
                    Si vous avez des questions ,Vous pouvez nous contacter :
                  </p>
                )}
                {localStorage.getItem("selected_language") == "Anglais" && (
                  <p>If you have any questions, you can contact us :</p>
                )}
                {localStorage.getItem("selected_language") == "Arabe" && (
                  <p>إذا كان لديك أي أسئلة ، يمكنك الاتصال بنا:</p>
                )}
                {localStorage.getItem("selected_language") == "Italien" && (
                  <p>Se hai domande, puoi contattarci :</p>
                )}

                <div className="d-flex">
                  <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-xs margin_right15 margin_bottom15">
                    <i className="flaticon flaticon-call"></i>
                  </div>
                  <h4>71 786 976</h4>
                </div>
                {localStorage.getItem("selected_language") == "Arabe" ? (
                  <p>37 نهج النيجر 1002، تونس بلفيدير، تونس</p>
                ) : (
                  <p>37, R. du Niger 1002, TUNIS BELVEDERE TUNIS Tunisie.</p>
                )}

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
                {!localStorage.getItem("selected_language") && (
                  <span className="cpy-text">
                    Copyright © 2022
                    <a
                      href="#"
                      className="ttm-textcolor-skincolor font-weight-500"
                    >
                      GIPP
                    </a>
                    Tous droits réservés
                  </span>
                )}
                {localStorage.getItem("selected_language") == "Français" && (
                  <span className="cpy-text">
                    Copyright © 2022
                    <a
                      href="#"
                      className="ttm-textcolor-skincolor font-weight-500"
                    >
                      GIPP
                    </a>
                    Tous droits réservés
                  </span>
                )}
                {localStorage.getItem("selected_language") == "Arabe" && (
                  <span className="cpy-text">
                    حقوق الطبع والنشر © 2022
                    <a
                      href="#"
                      className="ttm-textcolor-skincolor font-weight-500"
                    >
                      GIPP
                    </a>
                    جميع الحقوق محفوظة
                  </span>
                )}
                {localStorage.getItem("selected_language") == "Anglais" && (
                  <span className="cpy-text">
                    حقوق الطبع والنشر © 2022
                    <a
                      href="#"
                      className="ttm-textcolor-skincolor font-weight-500"
                    >
                      GIPP
                    </a>
                    all rights are save
                  </span>
                )}
                {localStorage.getItem("selected_language") == "Italien" && (
                  <span className="cpy-text">
                    Diritto d'autore © 2022
                    <a
                      href="#"
                      className="ttm-textcolor-skincolor font-weight-500"
                    >
                      GIPP
                    </a>
                    Tutti i diritti riservati
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
