import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { AiOutlineUnorderedList, AiOutlineCalendar } from "react-icons/ai";
import { ImBlocked } from "react-icons/im";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { styled } from "@mui/material/styles";
import Popup from "reactjs-popup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
const SALON_URL = "http://127.0.0.1:8000/salon/showMySalons";

const MesSalons = () => {
  const navigate = useNavigate();
  const [salon, setSalon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [calendar, setCalendar] = useState(true);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));
  const today = new Date();
  useEffect(() => {
    if (!playOnce) {
      fetchSalon();
      setPlayOnce(true);
    }
  }, [salon]);

  function fetchSalon() {
    axios
      .post(SALON_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setSalon(response.data);

        console.log("today: " + today);
        let data = [];
        response.data.map((salon) => {
          data.push({
            id: salon.id,
            title: salon.titre,
            date: Date.parse(
              salon.date.substr(0, 10) +
                "T" +
                salon.temps_debut.substr(11, 5) +
                ":00+00:00"
            ),
          });
          setEvents(data);
          // <td>{sal.date.substr(0, 10)}</td>
          //                             <td>{sal.lieu}</td>
          //                             <td>
          //                               {sal.temps_debut.substr(11, 5)}
          //                               {"-"}
          //                               {sal.temps_fin.substr(11, 5)
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Header />
      {isLoading && (
        <div class="scene my-main mb-5 mt-5">
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
      )}
      {!isLoading && (
        <>
          {salon.length === 0 ? (
            <div
              className="container my-main mt-5 mb-5"
              style={{ textAlign: "center", paddingBottom: 20 }}
            >
              <ImBlocked
                style={{ fontSize: 80, color: "#0e204d", marginBottom: 20 }}
              />
              <h1 className="text-center">Vous n'avez pas de salon</h1>
            </div>
          ) : (
            <>
              <div className="my-main">
                <div className="container ">
                  <div className="row ">
                    <div className="col-md-12 p-0">
                      <div className="row">
                        <div className="col-md-5"></div>
                        <div
                          className="col-md-2"
                          style={{ textAlign: "center" }}
                        >
                          {/* <AiOutlineCalendar style={{ fontSize: 25 }} />
                            <AiOutlineUnorderedList style={{ fontSize: 25 }} /> */}

                          <FormControlLabel
                            control={
                              <MaterialUISwitch
                                sx={{ m: 1 }}
                                checked={calendar}
                                onChange={() => setCalendar(!calendar)}
                              />
                            }
                          />
                        </div>
                        <div className="col-md-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {calendar ? (
                <div className="col-md-12" style={{ paddingBottom: 50 }}>
                  <div className="App">
                    <FullCalendar
                      defaultView="dayGridMonth"
                      header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                      }}
                      plugins={[dayGridPlugin]}
                      events={events}
                      eventClick={(info) => {
                        // setSalonId(info.event.id);
                        // setSalon(info.event.title);
                        // setCalendar(false);
                        navigate("/salonDelails/" + info.event.id);
                      }}
                      // onClick={() => setOpen((o) => !o)}
                    />
                  </div>
                </div>
              ) : (
                <div className="col-md-12 mb-5">
                  <div style={{ paddingBottom: 120 }}>
                    <table class="table mb-5">
                      <thead
                        style={{
                          backgroundColor: "#0e204d",
                          color: "#FFFFFF",
                        }}
                      >
                        <tr>
                          <th scope="col">Titre</th>
                          <th scope="col">Description</th>
                          <th scope="col">Date</th>
                          <th scope="col">Lieu</th>
                          <th scope="col">Heure</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salon.map((sal, index) => (
                          <tr key={index}>
                            <th
                              scope="row"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                navigate("/salonDelails/" + sal.id);
                              }}
                            >
                              {" "}
                              {sal.titre}{" "}
                            </th>
                            <td>{sal.description}</td>
                            <td>{sal.date.substr(0, 10)}</td>
                            <td>{sal.lieu}</td>
                            <td>
                              {sal.temps_debut.substr(11, 5)}
                              {"-"}
                              {sal.temps_fin.substr(11, 5)}
                            </td>
                            <td>
                              {sal.reservation.map((r, indexR) => (
                                <>
                                  {r.user.id == localStorage.getItem("id") && (
                                    <>
                                      {r.statut_reservation == "Acceptée" && (
                                        <span
                                          style={{
                                            color: "green",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {r.statut_reservation}
                                        </span>
                                      )}
                                      {r.statut_reservation == "En Cours" && (
                                        <span
                                          style={{
                                            color: "orange",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {r.statut_reservation}
                                        </span>
                                      )}
                                      {r.statut_reservation == "Annulée" && (
                                        <span
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {r.statut_reservation}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default MesSalons;
