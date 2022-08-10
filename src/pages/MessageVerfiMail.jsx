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

const MessageVerfiMail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
              <div className="card w-100 p-5">
                <p>Merci de vérifier Votre Compte !!</p>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessageVerfiMail;
