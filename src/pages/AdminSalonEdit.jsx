import React from "react";
import AdminHeader from "../components/AdminHeader";
import ImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineDateRange } from "react-icons/md";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const SALON_DETAILS_URL = "http://127.0.0.1:8000/salon/show";
const SALON_UPDATE_URL = "http://127.0.0.1:8000/salon/edit";

const AdminSalonEdit = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [salonDetails, setSalonDetails] = useState("");

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [place, setPlace] = useState("");
  const [maxInvitation, setMaxInvitation] = useState("");

  function fetchSalonDetails() {
    axios
      .post(SALON_DETAILS_URL, {
        salonId: id,
      })
      .then((response) => {
        setSalonDetails(response.data);
        setTitre(response.data.titre);
        setDescription(response.data.description);
        setDate(response.data.date);
        setDebut(response.data.temps_debut);
        setFin(response.data.temps_fin);
        setPlace(response.data.lieu);
        setMaxInvitation(response.data.max_invitation);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchUpdateSalon() {
    axios
      .post(SALON_UPDATE_URL, {
        salonId: id,
        titre: titre,
        description: description,
        date: date,
        temps_debut: debut,
        temps_fin: fin,
        lieu: place,
        max_invitation: maxInvitation,
      })
      .finally(() => {
        navigate("/adminsalonlist");
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchSalonDetails();
      setPlayOnce(true);
    }
  }, [salonDetails, playOnce]);

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
                      {isLoading && (
                        <div
                          style={{ height: height - 100 }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <CircularProgress color="primary" size={80} />
                        </div>
                      )}
                      {!isLoading && (
                        <div
                          id="addproduct-nav-pills-wizard"
                          className="twitter-bs-wizard"
                        >
                          <div className=" twitter-bs-wizard-tab-content">
                            <div className="tab-pane" id="basic-info">
                              <h4 className="header-title">
                                Basic Information
                              </h4>
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
                                        id="manufacturername"
                                        name="manufacturername"
                                        type="time"
                                        defaultValue={debut.substr(11, 5)}
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
                                        id="manufacturerbrand"
                                        name="manufacturerbrand"
                                        type="time"
                                        defaultValue={fin.substr(11, 5)}
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
                                        id="price"
                                        name="price"
                                        type="date"
                                        defaultValue={date.substr(0, 10)}
                                        onChange={(e) => {
                                          setDate(e.target.value);
                                        }}
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
                                    id="manufacturerbrand"
                                    name="manufacturerbrand"
                                    type="number"
                                    defaultValue={maxInvitation}
                                    onChange={(e) => {
                                      setMaxInvitation(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
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
                                      fetchUpdateSalon();
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
  );
};

export default AdminSalonEdit;
