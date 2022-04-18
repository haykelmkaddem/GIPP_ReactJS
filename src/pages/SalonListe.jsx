import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ImLocation } from "react-icons/im";
import { BiTimeFive, BiCalendar } from "react-icons/bi";
import { MdChair, MdCardMembership } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SALON_URL = "http://127.0.0.1:8000/salon/showall";

const SalonListe = ({ route, navigation }) => {
  const navigate = useNavigate();
  const [salonList, setSalonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    fetchSalons();
    setValue(80);
  }, [salonList]);

  function fetchSalons() {
    axios
      .get(SALON_URL)
      .then((response) => {
        setSalonList(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Header />
      <div className="my-main mb-5">
        <div className="container">
          <div className="row pt-5">
            {salonList.map((salon, index) => (
              <div className="col-md-12 px-5 mb-5" key={index}>
                <div className="front-card card p-3 mx-5 my-primary my-salon-card">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8">
                        <h5
                          style={{ color: "white", marginBottom: 0 }}
                          onClick={() => {
                            navigate("/salonDelails/" + salon.id);
                          }}
                        >
                          {salon.titre}
                        </h5>
                        <p
                          style={{ fontSize: 12 }}
                          className="d-flex align-items-center"
                        >
                          <BiTimeFive />
                          &nbsp; {salon.temps_debut.substr(11, 5)}
                          {"-"}
                          {salon.temps_fin.substr(11, 5)}
                          &nbsp; &nbsp;
                          <BiCalendar /> &nbsp;{salon.date.substr(0, 10)}
                        </p>
                      </div>
                      <div className="col-md-4 text-right">
                        <p style={{ color: "white" }}>
                          <ImLocation className="localisation-icon" />{" "}
                          {salon.lieu}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="px-5">{salon.description}</p>
                  <div class="progress">
                    <div
                      class={"progress-value width-percentage-" + value}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="mt-2 ml-1">
                    <MdCardMembership /> 42 participants / <MdChair />{" "}
                    {salon.max_invitation} places
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SalonListe;
