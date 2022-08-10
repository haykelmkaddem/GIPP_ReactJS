import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ImLocation, ImPrinter } from "react-icons/im";
import { HiOutlineTicket } from "react-icons/hi";
import { BiTimeFive, BiCalendar } from "react-icons/bi";
import { MdChair, MdCardMembership } from "react-icons/md";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Popup from "reactjs-popup";
import QRCode from "react-qr-code";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const SALON_DETAILS_URL = "http://127.0.0.1:8000/salon/show";
const USER_DETAILS_URL = "http://127.0.0.1:8000/user/show";
const ADD_RESERVATION_URL = "http://127.0.0.1:8000/reservation/new";
const ANNULER_RESERVATION_URL =
  "http://127.0.0.1:8000/reservation/annulerReservation";
const VERIF_RESERVATION_URL =
  "http://127.0.0.1:8000/reservation/verifierStatut";

const SalonDelails = ({ route, navigation }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salonDetails, setSalonDetails] = useState("");
  const [user, setUser] = useState("");
  const [verifReservation, setVerifReservation] = useState("");
  const [nbSalon, setNbSalon] = useState(0);
  const [playOnce, setPlayOnce] = useState(false);
  const [playOnceU, setPlayOnceU] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isLoadingU, setIsLoadingU] = useState(true);
  const [isLoadingV, setIsLoadingV] = useState(true);
  const [run, setRun] = useState(true);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const CancelAlert = () => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Annuler Votre Réservation!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setButtonLoading(true);
        fetchAnnulerReservation();
      }
    });
  };
  const ReservationAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Votre demande de réservation a été envoyée avec succés",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  useEffect(() => {
    if (!isLoading && !playOnce) {
      for (
        let index = 0;
        index < salonDetails.data.reservation.length;
        index++
      ) {
        if (
          salonDetails.data.reservation[index].statut_reservation == "Acceptée"
        ) {
          setNbSalon(nbSalon + 1);
        }
      }
      setPlayOnce(true);
    }
  }, [isLoading]);
  useEffect(() => {
    fetchSalonDetails();
    fetchVerifReservation();
  }, [run]);

  useEffect(() => {
    if (!playOnceU) {
      fetchUserDetails();
      setPlayOnceU(true);
    }
  }, [user]);

  function fetchSalonDetails() {
    axios
      .post(SALON_DETAILS_URL, {
        salonId: id,
      })
      .then((response) => {
        setSalonDetails(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function print() {
    window.print();
  }

  function fetchUserDetails() {
    axios
      .post(USER_DETAILS_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoadingU(false);
      });
  }

  function fetchAddReservation() {
    axios
      .post(ADD_RESERVATION_URL, {
        salonId: id,
        userId: localStorage.getItem("id"),
        statut_reservation: "En Cours",
      })
      .finally(() => {
        setRun(!run);
      });
  }
  function fetchAnnulerReservation() {
    axios
      .post(ANNULER_RESERVATION_URL, {
        salonId: id,
        userId: localStorage.getItem("id"),
      })
      .finally(() => {
        setRun(!run);
      });
  }
  function fetchVerifReservation() {
    axios
      .post(VERIF_RESERVATION_URL, {
        salonId: id,
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setVerifReservation(response);
      })
      .finally(() => {
        setIsLoadingV(false);
        setButtonLoading(false);
      });
  }
  return (
    <div className="perso-badge">
      <Header />
      {isLoading && (
        <div className="container my-main mb-5">
          <div class="scene">
            <div class="plane">
              <div class="cube cube--0">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--0"></div>
              <div class="cube cube--1">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--1"></div>
              <div class="cube cube--2">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--2"></div>
              <div class="cube cube--3">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--3"></div>
              <div class="cube cube--4">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--4"></div>
              <div class="cube cube--5">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--5"></div>
              <div class="cube cube--6">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--6"></div>
              <div class="cube cube--7">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--7"></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="ttm-page-title-row ttm-bg ttm-bgimage-yes ttm-bgcolor-darkgrey clearfix my-main mp-5">
            <div className="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="ttm-page-title-row-inner">
                    <div className="page-title-heading">
                      <h2 className="title">{salonDetails.data.titre}</h2>
                    </div>
                    {!buttonLoading &&
                      !isLoadingV &&
                      verifReservation.data.message === "no" && (
                        <div className="breadcrumb-wrapper">
                          <button
                            className="btn-lg rounded-pill"
                            style={{
                              backgroundColor: "rgb(19, 198, 221)",
                              color: "white",
                            }}
                            onClick={() => {
                              setButtonLoading(true);
                              fetchAddReservation();
                              ReservationAlert();
                            }}
                          >
                            Réserver Votre Place
                          </button>
                        </div>
                      )}
                    {buttonLoading && <CircularProgress />}
                    {!isLoadingV &&
                      verifReservation.data.message === "En Cours" && (
                        <div className="breadcrumb-wrapper">
                          <button
                            className="btn-lg rounded-pill"
                            style={{
                              backgroundColor: "orange",
                              color: "white",
                            }}
                          >
                            En Cours
                          </button>
                        </div>
                      )}
                    {!buttonLoading &&
                      !isLoadingV &&
                      verifReservation.data.message === "Acceptée" && (
                        <div className="breadcrumb-wrapper">
                          <button
                            className="btn-lg rounded-pill"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                            onClick={() => {
                              CancelAlert();
                            }}
                          >
                            Annuler
                          </button>
                        </div>
                      )}
                    {!isLoadingV &&
                      verifReservation.data.message === "Annulée" && (
                        <div className="breadcrumb-wrapper">
                          <button
                            className="btn-lg rounded-pill"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            Reservation Réfusé
                          </button>
                        </div>
                      )}
                  </div>
                </div>
                <div className="container shadow bg-white mb-5 card-detail-salon">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="salon-card-detail">
                        <div>
                          <ImLocation className="localisation-icon-salon" />
                          <h6>Localisation</h6>
                          <p>{salonDetails.data.lieu}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="salon-card-detail middle">
                        <div>
                          <BiTimeFive className="localisation-icon-salon" />
                          <h6>Date et Heure</h6>
                          <p>
                            {salonDetails.data.date.substr(0, 10)} <br />
                            {salonDetails.data.temps_debut.substr(11, 5)}
                            {"-"}
                            {salonDetails.data.temps_fin.substr(11, 5)}
                          </p>
                          <p></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="salon-card-detail">
                        <div>
                          <HiOutlineTicket className="localisation-icon-salon" />
                          <h6>Inscription</h6>
                          <p>
                            <MdCardMembership /> {nbSalon} participants <br />{" "}
                            <MdChair /> {salonDetails.data.max_invitation}{" "}
                            places
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mobile-p">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="row mb-5 pb-5">
              <div className="col-md-12">
                {!isLoadingV && verifReservation.data.message === "Acceptée" && (
                  <div
                    className="breadcrumb-wrapper d-flex align-items-center justify-content-center"
                    style={{ marginTop: 10, marginBottom: 20 }}
                  >
                    <button
                      className="btn-lg rounded-pill"
                      style={{
                        backgroundColor: "rgb(19, 198, 221)",
                        color: "white",
                      }}
                      onClick={() => setOpen((o) => !o)}
                    >
                      Badge
                    </button>
                  </div>
                )}
              </div>
              <div className="col-md-1 mb-5"></div>
              <div className="col-md-10">
                <p style={{ marginBottom: 50, color: "#0e204d", fontSize: 18 }}>
                  {salonDetails.data.description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        {!isLoadingU && (
          <div
            className="modal-badge-perso"
            style={{ color: "white", backgroundColor: "#1D2A4D" }}
          >
            <div class="ribbon">
              <span class="ribbon__content">Guest</span>
            </div>
            <a
              className="close"
              onClick={closeModal}
              style={{ cursor: "pointer" }}
            >
              &times;
            </a>
            {!isLoading && (
              <div className="row">
                <div className="col-md-11">
                  <h1 style={{ color: "white" }}>
                    {user.entreprise.nom} <p>{salonDetails.data.titre}</p>
                  </h1>
                </div>
                <div className="col-md-8">
                  <h3 style={{ color: "white" }}>
                    {salonDetails.data.temps_debut.substr(11, 5)}
                    {"-"}
                    {salonDetails.data.temps_fin.substr(11, 5)}
                  </h3>
                  <h3 style={{ color: "white" }}>
                    {salonDetails.data.date.substr(0, 10)}
                  </h3>
                  <h3 style={{ color: "white" }}>{salonDetails.data.lieu}</h3>
                  <h3 style={{ color: "white" }}>
                    {user.nom} {user.prenom}
                  </h3>
                  <ImPrinter
                    style={{ color: "white", fontSize: 60, marginLeft: 35 }}
                    className="print"
                    onClick={() => {
                      print();
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <br />
                  <div
                    style={{
                      background: "white",
                      padding: 4,
                      height: 198,
                      width: 198,
                    }}
                  >
                    <QRCode
                      value={
                        user.entreprise.nom +
                        ", " +
                        user.nom +
                        " " +
                        user.prenom +
                        ", Accepted"
                      }
                      size={190}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default SalonDelails;
