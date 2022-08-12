import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../assets/BackOffice/libs/ion-rangeslider/css/ion.rangeSlider.min.css";
import "../assets/BackOffice/css/bootstrap.min.css";
import "../assets/BackOffice/css/icons.min.css";
import "../assets/BackOffice/css/app.min.css";
// import back from "../assets/BackOffice/css/backOffice.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="my-admin-1">
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div
                className="navbar-brand-box"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/assets/FrontOffice/images/1-aqvo-logo.png"
                  alt=""
                  height="50"
                />
                <div
                  style={{
                    color: "black",
                    marginLeft: 8,
                    marginTop: 8,
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  GIPP
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 font-size-24 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="mdi mdi-menu"></i>
              </button>
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
                          src="/assets/BackOffice/images/users/avatar-4.jpg"
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
                  <span className="d-none d-xl-inline-block ms-1">
                    {localStorage.getItem("prenom")}
                  </span>
                  <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-account-circle-outline font-size-16 align-middle me-1"></i>
                    Profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item text-danger"
                    onClick={() => {
                      localStorage.removeItem("email");
                      localStorage.removeItem("nom");
                      localStorage.removeItem("prenom");
                      localStorage.removeItem("id");
                      localStorage.removeItem("selected_language");
                      navigate("/login");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="mdi mdi-power font-size-16 align-middle me-1 text-danger"></i>
                    Déconnexion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="vertical-menu">
          <div data-simplebar className="h-100">
            <div className="user-sidebar text-center">
              <div
                className="dropdown"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 124,
                }}
              >
                <div className="user-img" style={{ marginRight: 5 }}>
                  <span className="avatar-online bg-success"></span>
                </div>
                <div className="user-info">
                  <h5 className="mt-3 font-size-16 text-white">
                    {localStorage.getItem("prenom")}{" "}
                    {localStorage.getItem("nom")}
                  </h5>
                  <span className="font-size-13 text-white-50">
                    Administrateur
                  </span>
                </div>
              </div>
            </div>

            <div id="sidebar-menu">
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">Menu</li>

                <NavLink to="/admindashboard">
                  <li>
                    <a className="waves-effect">
                      <i className="dripicons-home"></i>

                      <span>Dashboard</span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/admincategorylist">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-checklist"></i>
                      <span>Categories</span>
                    </a>
                  </li>
                </NavLink>

                <NavLink to="/adminproducts">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-basket"></i>
                      <span>Produits</span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/admincommandlist">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-cart"></i>
                      <span className="badge rounded-pill bg-info float-end">
                        3
                      </span>
                      <span>Commandes</span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/adminusers">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-user-group"></i>
                      <span>Utilisateurs</span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/adminsalonlist">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-calendar"></i>
                      <span>Salons</span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/adminactualitelist">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-to-do"></i>
                      <span>Actualités</span>
                    </a>
                  </li>
                </NavLink>
                <NavLink to="/adminavislist">
                  <li>
                    <a className=" waves-effect">
                      <i class="dripicons-message"></i>
                      <span>Avis</span>
                    </a>
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
