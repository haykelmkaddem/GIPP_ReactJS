import React from "react";
import AdminHeader from "../components/AdminHeader";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const ADD_CATEGORY_URL = "http://127.0.0.1:8000/categorie/new";

const AdminCategoryAdd = () => {
  const navigate = useNavigate();
  const [imageBack, setImageBack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [message, setMessage] = useState("");

  const [nom, setNom] = useState("");

  function fetchAddCategory() {
    if (nom === "") {
      setMessage("Please complete the Name");
    } else {
      axios
        .post(ADD_CATEGORY_URL, {
          nom: nom,
        })
        .then((response) => {
          if (response.data.nom != null && response.data.nom != undefined) {
            navigate("/admincategorylist");
          }
        })
        .finally(navigate("/admincategorylist"));
    }
  }

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
                    <h4>Add Category</h4>
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
                      <li className="breadcrumb-item active">Add Category</li>
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
                            <h4 className="header-title">Basic Information</h4>
                            <p className="card-title-desc">
                              Fill all information below
                            </p>

                            <form>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="productname"
                                >
                                  Category Name
                                </label>
                                <input
                                  id="productname"
                                  name="productname"
                                  type="text"
                                  defaultValue={nom}
                                  onChange={(e) => {
                                    setNom(e.target.value);
                                  }}
                                  className="form-control"
                                />
                              </div>
                              <div
                                style={{
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  color: "red",
                                }}
                              >
                                {message}
                              </div>
                            </form>
                          </div>
                          <div className="tab-pane" id="metadata">
                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                              <li
                                className="float-end"
                                style={{ cursor: "pointer" }}
                              >
                                <a
                                  onClick={() => {
                                    fetchAddCategory();
                                  }}
                                >
                                  Save Changes
                                  <i className="mdi mdi-arrow-right ml-1"></i>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryAdd;
