import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ACTUALITE_DETAILS_URL = "http://127.0.0.1:8000/actualite/show";

const ActualiteDetails = ({ route, navigation }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actualiteDetails, setActualiteDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActualiteDetails();
  }, [actualiteDetails]);

  function fetchActualiteDetails() {
    axios
      .post(ACTUALITE_DETAILS_URL, {
        actualiteId: id,
      })
      .then((response) => {
        setActualiteDetails(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Header />
      {!isLoading && (
        <div className="container my-main mb-5 mt-5">
          <h1>{actualiteDetails.data.titre}</h1>
          <p>
            Publier le : {actualiteDetails.data.createdAt.substr(0, 10)}{" "}
            {actualiteDetails.data.createdAt.substr(11, 5)}
          </p>
          <img
            src="/assets/FrontOffice/images/actualites/act2.png"
            alt="image"
            style={{ width: "100%", marginBottom: 50, maxHeight: 500 }}
          />
          <p style={{ fontSize: 18, color: "#0e204d" }}>
            {actualiteDetails.data.description}
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ActualiteDetails;
