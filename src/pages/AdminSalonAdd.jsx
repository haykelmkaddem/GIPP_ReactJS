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
const ADD_SALON_URL = "http://127.0.0.1:8000/salon/new";

const AdminSalonAdd = () => {
  const navigate = useNavigate();
  const [imageBack, setImageBack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);

  // const [today, setToday] = useState(new Date());
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [place, setPlace] = useState("");
  const [maxInvitation, setMaxInvitation] = useState("");
  const [message, setMessage] = useState("");

  function fetchAddSalon() {
    if (titre === "") {
      setMessage("Please complete the Title");
    } else if (debut === "") {
      setMessage("Please complete the Begin");
    } else if (fin === "") {
      setMessage("Please complete the End");
    } else if (debut >= fin) {
      setMessage("Begin date must be before End date");
    } else if (date === "") {
      setMessage("Please complete the Date");
    } else if (description === "") {
      setMessage("Please complete the Description");
    } else if (place === "") {
      setMessage("Please complete the Place");
    } else if (maxInvitation === "" || maxInvitation < 1) {
      setMessage("Please complete the Max Invitation");
    } else {
      axios
        .post(ADD_SALON_URL, {
          titre: titre,
          description: description,
          date: date,
          temps_debut: debut,
          temps_fin: fin,
          lieu: place,
          max_invitation: maxInvitation,
        })
        .then((response) => {
          if (response.data.titre != null && response.data.titre != undefined) {
            navigate("/adminsalonlist");
          }
        })
        .finally(navigate("/adminsalonlist"));
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
                    <h4>Add Salon</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item">
                        <NavLink to="/adminsalonlist">
                          <a>Salons</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">Add Salon</li>
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
                                  Salon Title
                                </label>
                                <input
                                  className="form-control"
                                  id="productname"
                                  name="productname"
                                  type="text"
                                  defaultValue={titre}
                                  onChange={(e) => {
                                    setTitre(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="manufacturername"
                                    >
                                      Start Time
                                    </label>
                                    <input
                                      className="form-control"
                                      id="manufacturername"
                                      name="manufacturername"
                                      type="time"
                                      defaultValue={debut}
                                      onChange={(e) => {
                                        setDebut(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="manufacturerbrand"
                                    >
                                      End Time
                                    </label>
                                    <input
                                      className="form-control"
                                      id="manufacturerbrand"
                                      name="manufacturerbrand"
                                      type="time"
                                      defaultValue={fin}
                                      onChange={(e) => {
                                        setFin(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="control-label">
                                      Date
                                    </label>
                                    <input
                                      className="form-control"
                                      id="price"
                                      name="price"
                                      type="date"
                                      defaultValue={date}
                                      onChange={(e) => {
                                        setDate(e.target.value);
                                      }}
                                      min={disablePastDate()}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="productdesc"
                                >
                                  Salon Description
                                </label>
                                <textarea
                                  className="form-control"
                                  id="productdesc"
                                  rows="5"
                                  defaultValue={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                            </form>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturerbrand"
                                >
                                  Place
                                </label>
                                <input
                                  className="form-control"
                                  id="manufacturerbrand"
                                  name="manufacturerbrand"
                                  type="text"
                                  defaultValue={place}
                                  onChange={(e) => {
                                    setPlace(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturerbrand"
                                >
                                  Max Invitation
                                </label>
                                <input
                                  className="form-control"
                                  id="manufacturerbrand"
                                  name="manufacturerbrand"
                                  type="number"
                                  defaultValue={maxInvitation}
                                  onChange={(e) => {
                                    setMaxInvitation(e.target.value);
                                  }}
                                  min="1"
                                />
                              </div>
                            </div>
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
                          <div
                            className="tab-pane"
                            id="metadata"
                            style={{ cursor: "pointer" }}
                          >
                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                              <li className="float-end">
                                <a
                                  onClick={() => {
                                    fetchAddSalon();
                                  }}
                                >
                                  Save Changes{" "}
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

export default AdminSalonAdd;
