import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageUploading from "react-images-uploading";
const VERIF_URL = "http://127.0.0.1:8000/verify/email";

const Verification = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);

  useEffect(() => {
    if (!playOnce) {
      fetchVerification();
      setPlayOnce(true);
    }
  }, [playOnce]);

  function fetchVerification() {
    axios
      .post(VERIF_URL, {
        userId: id,
      })
      .then((response) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div
            className="col-md-12 d-flex align-items-center justify-content-center"
            style={{ height: "100vh", width: "100vw" }}
          >
            <div className="text-center">
              {isLoading && (
                <span>
                  <h1>En Cours De Verification</h1>
                  {/* <AiOutlineLoading3Quarters
                      size={30}
                      style={{ fontSize: "bold" }}
                    /> */}
                  <Box size={30} style={{ fontSize: "bold" }}>
                    <CircularProgress />
                  </Box>
                </span>
              )}
              {!isLoading && (
                <div className="card w-100 p-5">
                  <h1>Congratulations!</h1>
                  <p>
                    Votre Compte a été vérifié avec succés, vous pouvez profiter
                    de nos services !!
                  </p>
                  <button
                    className="btn-lg rounded-pill"
                    style={{
                      backgroundColor: "rgb(19, 198, 221)",
                      color: "white",
                    }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                </div>
                // <span>
                //   <h1 style={{ color: "green" }}>
                //     Votre Compte a été vérifié avec succés, vous pouvez profiter
                //     de nos services !!{" "}
                //   </h1>
                //   <button
                //     className="btn-lg rounded-pill"
                //     style={{
                //       backgroundColor: "rgb(19, 198, 221)",
                //       color: "white",
                //     }}
                //     onClick={() => {
                //       navigate("/login");
                //     }}
                //   >
                //     Login
                //   </button>
                // </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verification;
