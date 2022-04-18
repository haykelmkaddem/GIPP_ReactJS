import React from "react";

import "../assets/BackOffice/libs/ion-rangeslider/css/ion.rangeSlider.min.css";
import "../assets/BackOffice/css/bootstrap.min.css";
import "../assets/BackOffice/css/icons.min.css";
import "../assets/BackOffice/css/app.min.css";
// import back from "../assets/BackOffice/css/backOffice.css";

const AdminHeader = () => {
  return (
    <>
      <div className="my-admin-1">
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <a href="index.html" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src="assets/BackOffice/images/logo-sm.png"
                      alt=""
                      height="22"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="assets/BackOffice/images/logo-dark.png"
                      alt=""
                      height="20"
                    />
                  </span>
                </a>

                <a href="index.html" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="assets/BackOffice/images/logo-sm.png"
                      alt=""
                      height="22"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="assets/BackOffice/images/logo-light.png"
                      alt=""
                      height="20"
                    />
                  </span>
                </a>
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 font-size-24 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="mdi mdi-menu"></i>
              </button>

              <div className="topbar-social-icon me-3 d-none d-md-block">
                <ul className="list-inline title-tooltip m-0">
                  <li className="list-inline-item">
                    <a
                      href="email-inbox.html"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="Email"
                    >
                      <i className="mdi mdi-email-outline"></i>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a
                      href="chat.html"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="Chat"
                    >
                      <i className="mdi mdi-tooltip-outline"></i>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a
                      href="calendar.html"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="Calendar"
                    >
                      <i className="mdi mdi-calendar"></i>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a
                      href="pages-invoice.html"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="Printer"
                    >
                      <i className="mdi mdi-printer"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="search-wrap" id="search-wrap">
              <div className="search-bar">
                <input
                  className="search-input form-control"
                  placeholder="Search"
                />
                <a
                  href="#"
                  className="close-search toggle-search"
                  data-target="#search-wrap"
                >
                  <i className="mdi mdi-close-circle"></i>
                </a>
              </div>
            </div>

            <div className="d-flex">
              <div className="dropdown d-none d-lg-inline-block">
                <button
                  type="button"
                  className="btn header-item toggle-search noti-icon waves-effect"
                  data-target="#search-wrap"
                >
                  <i className="mdi mdi-magnify"></i>
                </button>
              </div>

              <div className="dropdown d-none d-md-block ms-2">
                <button
                  type="button"
                  className="btn header-item waves-effect"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="me-2"
                    src="assets/BackOffice/images/flags/us.jpg"
                    alt="Header Language"
                    height="16"
                  />{" "}
                  English <span className="mdi mdi-chevron-down"></span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <img
                      src="assets/BackOffice/images/flags/germany.jpg"
                      alt="user-image"
                      className="me-1"
                      height="12"
                    />{" "}
                    <span className="align-middle"> German </span>
                  </a>

                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <img
                      src="assets/BackOffice/images/flags/italy.jpg"
                      alt="user-image"
                      className="me-1"
                      height="12"
                    />{" "}
                    <span className="align-middle"> Italian </span>
                  </a>

                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <img
                      src="assets/BackOffice/images/flags/french.jpg"
                      alt="user-image"
                      className="me-1"
                      height="12"
                    />{" "}
                    <span className="align-middle"> French </span>
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <img
                      src="assets/BackOffice/images/flags/spain.jpg"
                      alt="user-image"
                      className="me-1"
                      height="12"
                    />{" "}
                    <span className="align-middle"> Spanish </span>
                  </a>

                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item"
                  >
                    <img
                      src="assets/BackOffice/images/flags/russia.jpg"
                      alt="user-image"
                      className="me-1"
                      height="12"
                    />{" "}
                    <span className="align-middle"> Russian </span>
                  </a>
                </div>
              </div>

              <div className="dropdown d-none d-lg-inline-block ms-1">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  data-toggle="fullscreen"
                >
                  <i className="mdi mdi-fullscreen"></i>
                </button>
              </div>

              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-bell-outline bx-tada"></i>
                  <span className="badge bg-danger rounded-pill">3</span>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="p-3">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0"> Notifications </h6>
                      </div>
                      <div className="col-auto">
                        <a href="#!" className="small">
                          {" "}
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                  <div data-simplebar style={{ maxHeight: 230 }}>
                    <a href="#" className="text-reset notification-item">
                      <div className="media">
                        <div className="avatar-xs me-3">
                          <span className="avatar-title bg-primary rounded-circle font-size-16">
                            <i className="mdi mdi-cart text-white"></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="mt-0 mb-1">Your order is placed</h6>
                          <div className="font-size-13 text-muted">
                            <p className="mb-1">
                              If several languages coalesce the grammar
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline"></i> 3 min
                              ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="text-reset notification-item">
                      <div className="media">
                        <img
                          src="assets/BackOffice/images/users/avatar-3.jpg"
                          className="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div className="media-body">
                          <h6 className="mt-0 mb-1">James Lemire</h6>
                          <div className="font-size-13 text-muted">
                            <p className="mb-1">
                              It will seem like simplified English.
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline"></i> 1 hours
                              ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="text-reset notification-item">
                      <div className="media">
                        <div className="avatar-xs me-3">
                          <span className="avatar-title bg-success rounded-circle font-size-16">
                            <i className="mdi mdi-check text-white"></i>
                          </span>
                        </div>
                        <div className="media-body">
                          <h6 className="mt-0 mb-1">Your item is shipped</h6>
                          <div className="font-size-13 text-muted">
                            <p className="mb-1">
                              If several languages coalesce the grammar
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline"></i> 3 min
                              ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>

                    <a href="#" className="text-reset notification-item">
                      <div className="media">
                        <img
                          src="assets/BackOffice/images/users/avatar-4.jpg"
                          className="me-3 rounded-circle avatar-xs"
                          alt="user-pic"
                        />
                        <div className="media-body">
                          <h6 className="mt-0 mb-1">Salena Layfield</h6>
                          <div className="font-size-13 text-muted">
                            <p className="mb-1">
                              As a skeptical Cambridge friend of mine
                              occidental.
                            </p>
                            <p className="mb-0">
                              <i className="mdi mdi-clock-outline"></i> 1 hours
                              ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="p-2 border-top">
                    <a
                      className="btn btn-sm btn-link font-size-14 w-100 text-center"
                      href="javascript:void(0)"
                    >
                      <i className="mdi mdi-arrow-right-circle me-1"></i> View
                      More..
                    </a>
                  </div>
                </div>
              </div>

              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item waves-effect"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="rounded-circle header-profile-user"
                    src="assets/BackOffice/images/users/avatar-7.jpg"
                    alt="Header Avatar"
                  />
                  <span className="d-none d-xl-inline-block ms-1">James</span>
                  <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-account-circle-outline font-size-16 align-middle me-1"></i>{" "}
                    Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-wallet-outline font-size-16 align-middle me-1"></i>{" "}
                    My Wallet
                  </a>
                  <a className="dropdown-item d-block" href="#">
                    <span className="badge badge-success float-end">11</span>
                    <i className="mdi mdi-cog-outline font-size-16 align-middle me-1"></i>{" "}
                    Settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-lock-open-outline font-size-16 align-middle me-1"></i>{" "}
                    Lock screen
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item text-danger" href="#">
                    <i className="mdi mdi-power font-size-16 align-middle me-1 text-danger"></i>{" "}
                    Logout
                  </a>
                </div>
              </div>

              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="btn header-item noti-icon right-bar-toggle waves-effect"
                >
                  <i className="mdi mdi-cog-outline font-size-20"></i>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="vertical-menu">
          <div data-simplebar className="h-100">
            <div className="user-sidebar text-center">
              <div className="dropdown">
                <div className="user-img">
                  <img
                    src="assets/BackOffice/images/users/avatar-7.jpg"
                    alt=""
                    className="rounded-circle"
                  />
                  <span className="avatar-online bg-success"></span>
                </div>
                <div className="user-info">
                  <h5 className="mt-3 font-size-16 text-white">
                    James Raphael
                  </h5>
                  <span className="font-size-13 text-white-50">
                    Administrator
                  </span>
                </div>
              </div>
            </div>

            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">Menu</li>

                <li>
                  <a href="index.html" className="waves-effect">
                    <i className="dripicons-home"></i>
                    <span className="badge rounded-pill bg-info float-end">
                      3
                    </span>
                    <span>Dashboard</span>
                  </a>
                </li>

                <li>
                  <a href="calendar.html" className=" waves-effect">
                    <i className="dripicons-calendar"></i>
                    <span>Calendar</span>
                  </a>
                </li>

                <li>
                  <a href="chat.html" className=" waves-effect">
                    <i className="dripicons-message"></i>
                    <span>Chat</span>
                  </a>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-cart"></i>
                    <span>Ecommerce</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="ecommerce-products.html">Products</a>
                    </li>
                    <li>
                      <a href="ecommerce-product-detail.html">Product Detail</a>
                    </li>
                    <li>
                      <a href="ecommerce-orders.html">Orders</a>
                    </li>
                    <li>
                      <a href="ecommerce-customers.html">Customers</a>
                    </li>
                    <li>
                      <a href="ecommerce-cart.html">Cart</a>
                    </li>
                    <li>
                      <a href="ecommerce-checkout.html">Checkout</a>
                    </li>
                    <li>
                      <a href="ecommerce-shops.html">Shops</a>
                    </li>
                    <li>
                      <a href="ecommerce-add-product.html">Add Product</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-mail"></i>
                    <span>Email</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="email-inbox.html">Inbox</a>
                    </li>
                    <li>
                      <a href="email-read.html">Email Read</a>
                    </li>
                    <li>
                      <a href="email-compose.html">Email Compose</a>
                    </li>
                  </ul>
                </li>

                <li className="menu-title">Components</li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-suitcase"></i>
                    <span>UI Elements</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="ui-alerts.html">Alerts</a>
                    </li>
                    <li>
                      <a href="ui-buttons.html">Buttons</a>
                    </li>
                    <li>
                      <a href="ui-cards.html">Cards</a>
                    </li>
                    <li>
                      <a href="ui-carousel.html">Carousel</a>
                    </li>
                    <li>
                      <a href="ui-dropdowns.html">Dropdowns</a>
                    </li>
                    <li>
                      <a href="ui-grid.html">Grid</a>
                    </li>
                    <li>
                      <a href="ui-images.html">Images</a>
                    </li>
                    <li>
                      <a href="ui-lightbox.html">Lightbox</a>
                    </li>
                    <li>
                      <a href="ui-modals.html">Modals</a>
                    </li>
                    <li>
                      <a href="ui-rangeslider.html">Range Slider</a>
                    </li>
                    <li>
                      <a href="ui-session-timeout.html">Session Timeout</a>
                    </li>
                    <li>
                      <a href="ui-progressbars.html">Progress Bars</a>
                    </li>
                    <li>
                      <a href="ui-sweet-alert.html">Sweet-Alert</a>
                    </li>
                    <li>
                      <a href="ui-tabs-accordions.html">Accordions</a>
                    </li>
                    <li>
                      <a href="ui-typography.html">Typography</a>
                    </li>
                    <li>
                      <a href="ui-video.html">Video</a>
                    </li>
                    <li>
                      <a href="ui-general.html">General</a>
                    </li>
                    <li>
                      <a href="ui-colors.html">Colors</a>
                    </li>
                    <li>
                      <a href="ui-rating.html">Rating</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="javascript: void(0);" className="waves-effect">
                    <i className="dripicons-to-do"></i>
                    <span className="badge rounded-pill bg-danger float-end">
                      6
                    </span>
                    <span>Forms</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="form-elements.html">Form Elements</a>
                    </li>
                    <li>
                      <a href="form-validation.html">Form Validation</a>
                    </li>
                    <li>
                      <a href="form-advanced.html">Form Advanced</a>
                    </li>
                    <li>
                      <a href="form-editors.html">Form Editors</a>
                    </li>
                    <li>
                      <a href="form-uploads.html">Form Upload</a>
                    </li>
                    <li>
                      <a href="form-xeditable.html">Form Xeditable</a>
                    </li>
                    <li>
                      <a href="form-wizard.html">Form Wizard</a>
                    </li>
                    <li>
                      <a href="form-mask.html">Form Mask</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-graph-pie"></i>
                    <span>Charts</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="charts-apex.html">Apex charts</a>
                    </li>
                    <li>
                      <a href="charts-chartist.html">Chartist</a>
                    </li>
                    <li>
                      <a href="charts-chartjs.html">Chartjs Chart</a>
                    </li>
                    <li>
                      <a href="charts-flot.html">Flot Chart</a>
                    </li>
                    <li>
                      <a href="charts-knob.html">Knob Chart</a>
                    </li>
                    <li>
                      <a href="charts-sparkline.html">Sparkline Chart</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-toggles"></i>
                    <span>Tables</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="tables-basic.html">Basic Tables</a>
                    </li>
                    <li>
                      <a href="tables-datatable.html">Data Tables</a>
                    </li>
                    <li>
                      <a href="tables-responsive.html">Responsive Table</a>
                    </li>
                    <li>
                      <a href="tables-editable.html">Editable Table</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-basket"></i>
                    <span>Icons</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="icons-materialdesign.html">Material Design</a>
                    </li>
                    <li>
                      <a href="icons-dripicons.html">Dripicons</a>
                    </li>
                    <li>
                      <a href="icons-fontawesome.html">Font awesome</a>
                    </li>
                    <li>
                      <a href="icons-themify.html">Themify Icons</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-map"></i>
                    <span>Maps</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="maps-google.html">Google Maps</a>
                    </li>
                    <li>
                      <a href="maps-vector.html">Vector Maps</a>
                    </li>
                  </ul>
                </li>

                <li className="menu-title">Extras</li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-device-desktop"></i>
                    <span>Layouts</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <a href="javascript: void(0);" className="has-arrow">
                        Vertical
                      </a>
                      <ul className="sub-menu" aria-expanded="true">
                        <li>
                          <a href="layouts-dark-sidebar.html">Dark Sidebar</a>
                        </li>
                        <li>
                          <a href="layouts-compact-sidebar.html">
                            Compact Sidebar
                          </a>
                        </li>
                        <li>
                          <a href="layouts-icon-sidebar.html">Icon Sidebar</a>
                        </li>
                        <li>
                          <a href="layouts-boxed.html">Boxed Layout</a>
                        </li>
                        <li>
                          <a href="layouts-preloader.html">Preloader</a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a href="javascript: void(0);" className="has-arrow">
                        Horizontal
                      </a>
                      <ul className="sub-menu" aria-expanded="true">
                        <li>
                          <a href="layouts-horizontal.html">Horizontal</a>
                        </li>
                        <li>
                          <a href="layouts-hori-topbar-light.html">
                            Topbar light
                          </a>
                        </li>
                        <li>
                          <a href="layouts-hori-boxed-width.html">
                            Boxed width
                          </a>
                        </li>
                        <li>
                          <a href="layouts-hori-preloader.html">Preloader</a>
                        </li>
                        <li>
                          <a href="layouts-hori-colored-header.html">
                            Colored Header
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-user-group"></i>
                    <span>Authentication</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="auth-login.html">Login</a>
                    </li>
                    <li>
                      <a href="auth-register.html">Register</a>
                    </li>
                    <li>
                      <a href="auth-recoverpw.html">Re-Password</a>
                    </li>
                    <li>
                      <a href="auth-lock-screen.html">Lock Screen</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-copy"></i>
                    <span>Pages</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="false">
                    <li>
                      <a href="pages-timeline.html">Timeline</a>
                    </li>
                    <li>
                      <a href="pages-invoice.html">Invoice</a>
                    </li>
                    <li>
                      <a href="pages-blank.html">Blank Page</a>
                    </li>
                    <li>
                      <a href="pages-404.html">Error 404</a>
                    </li>
                    <li>
                      <a href="pages-500.html">Error 500</a>
                    </li>
                    <li>
                      <a href="pages-pricing.html">Pricing</a>
                    </li>
                    <li>
                      <a href="pages-maintenance.html">Maintenance</a>
                    </li>
                    <li>
                      <a href="pages-comingsoon.html">Coming Soon</a>
                    </li>
                    <li>
                      <a href="pages-faq.html">FAQs</a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="javascript: void(0);"
                    className="has-arrow waves-effect"
                  >
                    <i className="dripicons-checklist"></i>
                    <span>Multi Level</span>
                  </a>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <a href="javascript: void(0);">Level 1.1</a>
                    </li>
                    <li>
                      <a href="javascript: void(0);" className="has-arrow">
                        Level 1.2
                      </a>
                      <ul className="sub-menu" aria-expanded="true">
                        <li>
                          <a href="javascript: void(0);">Level 2.1</a>
                        </li>
                        <li>
                          <a href="javascript: void(0);">Level 2.2</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
