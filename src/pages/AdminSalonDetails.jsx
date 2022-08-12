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
const RESERVATION_UPDATE_URL = "http://127.0.0.1:8000/reservation/edit";

const AdminSalonDetails = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [salonDetails, setSalonDetails] = useState("");
  const [invitations, setInvitations] = useState(0);
  const options = ["En Cours", "Acceptée", "Annulée"];

  function fetchSalonDetails() {
    axios
      .post(SALON_DETAILS_URL, {
        salonId: id,
      })
      .then((response) => {
        setSalonDetails(response.data);
        let i = 0;
        for (let j = 0; j < response.data.reservation.length; j++) {
          if (response.data.reservation[j].statut_reservation == "Acceptée") {
            i = i + 1;
          }
        }
        setInvitations(i);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchSalonDetails();
      setPlayOnce(true);
    }
  }, [salonDetails, playOnce]);

  function fetchUpdateReservation(id, status) {
    axios
      .post(RESERVATION_UPDATE_URL, {
        reservationId: id,
        statut_reservation: status,
      })
      .finally(() => {
        setPlayOnce(false);
      });
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
                    <h4>Détails du salon</h4>
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
                      <li className="breadcrumb-item active">
                        Détails du salon
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-sm-6">
                  <NavLink to="/admindashboard">
                    <div className="float-end d-none d-sm-block">
                      <a className="btn btn-success" style={{ color: "white" }}>
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
                  {isLoading && (
                    <div
                      style={{ height: height - 100 }}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <CircularProgress color="primary" size={80} />
                    </div>
                  )}
                  {!isLoading && (
                    <>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <h5
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  fontSize: 28,
                                  marginBottom: 50,
                                }}
                              >
                                {salonDetails.titre}
                              </h5>
                            </div>
                            <div className="col-md-4">
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <BiTimeFive
                                  style={{
                                    color: "#7B83EA",
                                    fontSize: 80,
                                    marginBottom: 15,
                                  }}
                                />
                                <h4>Temps</h4>
                                <p>
                                  {salonDetails.temps_debut.substr(11, 5)}
                                  {"-"}
                                  {salonDetails.temps_fin.substr(11, 5)}
                                </p>
                              </span>
                            </div>
                            <div className="col-md-4">
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <MdOutlineDateRange
                                  style={{
                                    color: "#7B83EA",
                                    fontSize: 80,
                                    marginBottom: 15,
                                  }}
                                />
                                <h4>Date</h4>
                                <p>{salonDetails.date.substr(0, 10)}</p>
                              </span>
                            </div>
                            <div className="col-md-4">
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <ImLocation
                                  style={{
                                    color: "#7B83EA",
                                    fontSize: 80,
                                    marginBottom: 15,
                                  }}
                                />
                                <h4>Lieu</h4>
                                <p>{salonDetails.lieu}</p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="col-md-12"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <h3 style={{ fontSize: 30 }}>
                            Invitations Acceptées
                          </h3>
                          <p style={{ fontSize: 18 }}>
                            {invitations}/{salonDetails.max_invitation}
                          </p>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{ marginTop: 30 }}
                            >
                              <h3>Description :</h3>
                              <p>{salonDetails.description}</p>
                            </div>
                            {salonDetails.reservation.length == 0 ? (
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "red",
                                  fontSize: 25,
                                }}
                              >
                                Pas de réservations
                              </p>
                            ) : (
                              <div className="table-responsive mt-3">
                                <table
                                  className="table table-centered datatable dt-responsive nowrap "
                                  style={{
                                    borderCollapse: "collapse",
                                    borderSpacing: "0",
                                    width: "100%",
                                  }}
                                >
                                  <thead className="thead-light">
                                    <tr>
                                      <th>Nom</th>
                                      <th>Prénom</th>
                                      <th>Email</th>
                                      <th>Téléphone</th>
                                      <th>Entreprise</th>
                                      <th>Statut</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {salonDetails.reservation.map(
                                      (reservation, index) => (
                                        <>
                                          {reservation.statut_reservation ==
                                            "En Cours" && (
                                            <tr key={index}>
                                              <td>{reservation.user.nom}</td>
                                              <td>{reservation.user.prenom}</td>
                                              <td>{reservation.user.email}</td>
                                              <td>
                                                {reservation.user.telephone}
                                              </td>
                                              <td>
                                                {
                                                  reservation.user.entreprise
                                                    .nom
                                                }
                                              </td>
                                              <td>
                                                <select
                                                  id="country"
                                                  name="country"
                                                  onChange={(e) =>
                                                    fetchUpdateReservation(
                                                      reservation.id,
                                                      e.target.value
                                                    )
                                                  }
                                                  value={
                                                    reservation.statut_reservation
                                                  }
                                                  style={{
                                                    backgroundColor: "orange",
                                                    color: "white",
                                                    borderColor: "orange",
                                                  }}
                                                >
                                                  {options.map((o) => (
                                                    <option key={o} value={o}>
                                                      {o}
                                                    </option>
                                                  ))}
                                                </select>
                                              </td>
                                            </tr>
                                          )}
                                        </>
                                      )
                                    )}
                                    {salonDetails.reservation.map(
                                      (reservation, index) => (
                                        <>
                                          {reservation.statut_reservation ==
                                            "Acceptée" && (
                                            <tr key={index}>
                                              <td>{reservation.user.nom}</td>
                                              <td>{reservation.user.prenom}</td>
                                              <td>{reservation.user.email}</td>
                                              <td>
                                                {reservation.user.telephone}
                                              </td>
                                              <td>
                                                {
                                                  reservation.user.entreprise
                                                    .nom
                                                }
                                              </td>
                                              <td>
                                                <select
                                                  id="country"
                                                  name="country"
                                                  onChange={(e) =>
                                                    fetchUpdateReservation(
                                                      reservation.id,
                                                      e.target.value
                                                    )
                                                  }
                                                  value={
                                                    reservation.statut_reservation
                                                  }
                                                  style={{
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    borderColor: "green",
                                                  }}
                                                >
                                                  {options.map((o) => (
                                                    <option key={o} value={o}>
                                                      {o}
                                                    </option>
                                                  ))}
                                                </select>
                                              </td>
                                            </tr>
                                          )}
                                        </>
                                      )
                                    )}
                                    {salonDetails.reservation.map(
                                      (reservation, index) => (
                                        <>
                                          {reservation.statut_reservation ==
                                            "Annulée" && (
                                            <tr key={index}>
                                              <td>{reservation.user.nom}</td>
                                              <td>{reservation.user.prenom}</td>
                                              <td>{reservation.user.email}</td>
                                              <td>
                                                {reservation.user.telephone}
                                              </td>
                                              <td>
                                                {
                                                  reservation.user.entreprise
                                                    .nom
                                                }
                                              </td>
                                              <td>
                                                <select
                                                  id="country"
                                                  name="country"
                                                  onChange={(e) =>
                                                    fetchUpdateReservation(
                                                      reservation.id,
                                                      e.target.value
                                                    )
                                                  }
                                                  value={
                                                    reservation.statut_reservation
                                                  }
                                                  style={{
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    borderColor: "red",
                                                  }}
                                                >
                                                  {options.map((o) => (
                                                    <option key={o} value={o}>
                                                      {o}
                                                    </option>
                                                  ))}
                                                </select>
                                              </td>
                                            </tr>
                                          )}
                                        </>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSalonDetails;
