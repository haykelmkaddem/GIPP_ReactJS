import React from "react";
import AdminHeader from "../components/AdminHeader";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
const EDIT_CATEGORY_URL = "http://127.0.0.1:8000/categorie/edit";
const SHOW_CATEGORY_URL = "http://127.0.0.1:8000/categorie/show";

const AdminCategoryEdit = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageBack, setImageBack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);

  const [nom, setNom] = useState("");

  function fetchShowCategory() {
    axios
      .post(SHOW_CATEGORY_URL, {
        categorieId: id,
      })
      .then((response) => {
        setNom(response.data.nom);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function fetchEditCategory() {
    axios
      .post(EDIT_CATEGORY_URL, {
        categorieId: id,
        nom: nom,
      })
      .then((response) => {
        setNom(response.data.nom);
        if (response.data.nom != null && response.data.nom != undefined) {
          navigate("/admincategorylist");
        }
      })
      .finally(() => {
        navigate("/admincategorylist");
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchShowCategory();
      setPlayOnce(true);
    }
  }, [nom]);
  return (
    <div className="my-admin-1">
      <AdminHeader />
      <div className="main-content">
        <div className="page-content">
          <div className="page-title-box">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="page-title">
                    <h4>Modifier la catégorie</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item">
                        <NavLink to="/admincategorylist">
                          <a>Categories</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">
                        Modifier la catégorie
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-sm-6">
                  <NavLink to="/admindashboard">
                    <div class="float-end d-none d-sm-block">
                      <a class="btn btn-success" style={{ color: "white" }}>
                        Dashboard
                      </a>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="page-content-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div
                        id="addproduct-nav-pills-wizard"
                        className="twitter-bs-wizard"
                      >
                        <div className=" twitter-bs-wizard-tab-content">
                          <div className="tab-pane" id="basic-info">
                            <h4 className="header-title">
                              Informations de base
                            </h4>
                            <p className="card-title-desc">
                              Remplissez toutes les informations ci-dessous
                            </p>
                            {isLoading && (
                              <div
                                style={{ height: height - 300 }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <CircularProgress color="primary" size={80} />
                              </div>
                            )}

                            {!isLoading && (
                              <form>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productname"
                                  >
                                    Nom de catégorie
                                  </label>
                                  <input
                                    id="productname"
                                    name="productname"
                                    type="text"
                                    defaultValue={nom}
                                    onChange={(e) => {
                                      setNom(e.target.value);
                                    }}
                                  />
                                </div>
                              </form>
                            )}
                          </div>
                          {!isLoading && (
                            <div className="tab-pane" id="metadata">
                              <ul className="pager wizard twitter-bs-wizard-pager-link">
                                <li
                                  className="float-end"
                                  style={{ cursor: "pointer" }}
                                >
                                  <a
                                    onClick={() => {
                                      fetchEditCategory();
                                    }}
                                  >
                                    Sauvegarder les modifications{" "}
                                    <i className="mdi mdi-arrow-right ml-1"></i>
                                  </a>
                                </li>
                              </ul>
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
      </div>
    </div>
  );
};

export default AdminCategoryEdit;
