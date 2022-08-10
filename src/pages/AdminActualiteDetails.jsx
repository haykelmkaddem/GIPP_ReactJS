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
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const ACTUALITY_DETAILS_URL = "http://127.0.0.1:8000/actualite/show";

const AdminActualiteDetails = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [actualityDetails, setActualityDetails] = useState("");

  useEffect(() => {
    fetchActualityDetails();
  }, [actualityDetails]);

  function fetchActualityDetails() {
    axios
      .post(ACTUALITY_DETAILS_URL, {
        actualiteId: id,
      })
      .then((response) => {
        setActualityDetails(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="my-admin-1">
      <AdminHeader />
      <div class="main-content">
        <div class="page-content">
          <div class="page-title-box">
            <div class="container-fluid">
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div class="page-title">
                    <h4>Actuality Details</h4>
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li class="breadcrumb-item">
                        <NavLink to="/adminactualitelist">
                          <a>Actualities</a>
                        </NavLink>
                      </li>
                      <li class="breadcrumb-item active">Actuality Details</li>
                    </ol>
                  </div>
                </div>
                <div class="col-sm-6">
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

          <div class="container-fluid">
            <div class="page-content-wrapper">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    {isLoading && (
                      <div
                        style={{ height: height - 100 }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <CircularProgress color="primary" size={80} />
                      </div>
                    )}
                    {!isLoading && (
                      <div class="card-body">
                        <div class="row">
                          <h3>{actualityDetails.titre}</h3>
                          <p>
                            {actualityDetails.createdAt.substr(0, 10)}{" "}
                            {actualityDetails.createdAt.substr(11, 5)}
                          </p>
                          <img
                            src={`http://127.0.0.1:8000/uploads/${actualityDetails.image}`}
                            alt="image"
                            style={{
                              width: "100%",
                              marginBottom: 50,
                              maxHeight: 500,
                            }}
                          />
                          <p>{actualityDetails.description}</p>
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
  );
};

export default AdminActualiteDetails;
