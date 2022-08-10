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
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const ACTUALITY_DETAILS_URL = "http://127.0.0.1:8000/actualite/show";
const ACTUALITY_UPDATE_URL = "http://127.0.0.1:8000/actualite/edit";

const AdminActualiteEdit = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [actualityDetails, setActualityDetails] = useState("");
  const [images, setImages] = React.useState("");

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dataImage, setDataImage] = useState("");
  const [date, setDate] = useState("");

  let formData = new FormData();
  const [formdatastate, setFormdatastate] = useState(formData);
  const onChange = (imageList, addUpdateIndex) => {
    const fileObjects = imageList.map((file) => {
      formData.append("assets", file.file, file.file.name);
    });
    setImages(imageList);
    setFormdatastate(formData);
  };

  useEffect(() => {
    if (!playOnce) {
      fetchActualityDetails();
      setPlayOnce(true);
    }
  }, [actualityDetails]);

  function fetchActualityDetails() {
    axios
      .post(ACTUALITY_DETAILS_URL, {
        actualiteId: id,
      })
      .then((response) => {
        setActualityDetails(response.data);
        setTitre(response.data.titre);
        setDescription(response.data.description);
        setDataImage(response.data.image);
        setDate(response.data.createdAt);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function fetchActualityUpdate() {
    formdatastate.append("id", id);
    formdatastate.append("titre", titre);
    formdatastate.append("description", description);
    axios.post(ACTUALITY_UPDATE_URL, formdatastate).finally(() => {
      navigate("/adminactualitelist");
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
                    <h4>Edit Actuality</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item">
                        <NavLink to="/adminactualitelist">
                          <a>Actualities</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">
                        Edit Actualities
                      </li>
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
                    {isLoading && (
                      <div
                        style={{ height: height - 100 }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <CircularProgress color="primary" size={80} />
                      </div>
                    )}
                    {!isLoading && (
                      <div className="card-body">
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
                                    Actuality Title
                                  </label>
                                  <input
                                    id="productname"
                                    name="productname"
                                    type="text"
                                    defaultValue={titre}
                                    onChange={(e) => {
                                      setTitre(e.target.value);
                                      formData.append("titre", e.target.value);
                                      console.log(titre);
                                    }}
                                  />
                                </div>

                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productdesc"
                                  >
                                    Product Description
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="productdesc"
                                    defaultValue={description}
                                    onChange={(e) => {
                                      setDescription(e.target.value);
                                      formData.append(
                                        "description",
                                        e.target.value
                                      );
                                      console.log(description);
                                    }}
                                    rows="5"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane" id="product-img">
                              <h4 className="header-title">Product Images</h4>
                              <p className="card-title-desc">
                                Upload product image
                              </p>
                              <br />
                            </div>
                            <ImageUploading
                              single
                              value={images}
                              onChange={onChange}
                              dataURLKey="data_url"
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                // write your building UI
                                <>
                                  <div
                                    className="upload__image-wrapper dropzone d-flex justify-content-center align-items-center text-center"
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
                                  >
                                    <div className="dz-message needsclick">
                                      <div className="mb-3">
                                        <i className="display-4 text-muted mdi mdi-cloud-download-outline"></i>
                                      </div>

                                      <h4>
                                        Drop files here or click to upload.
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="selected-images-container text-center w-100  d-flex p-3">
                                    <div className="row">
                                      {imageList.map((image, index) => (
                                        <div className="col-2" key={index}>
                                          <div
                                            className="image-item"
                                            style={{
                                              width: 120,
                                              height: 120,
                                              paddingTop: 10,
                                              position: "relative",
                                            }}
                                          >
                                            <i
                                              className="mdi mdi-progress-close"
                                              style={{
                                                color: "red",
                                                fontSize: 25,
                                                position: "absolute",
                                                right: -12,
                                                top: -11,
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                onImageRemove(index)
                                              }
                                            ></i>
                                            <div className="shake-admin">
                                              <img
                                                className="image-admin-shake"
                                                style={{
                                                  borderRadius: 15,
                                                  width: 100,
                                                  height: 100,
                                                  border: "1px solid red",
                                                }}
                                                src={image["data_url"]}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="selected-images-container text-center w-100  d-flex p-3">
                                    <div className="row">
                                      <div className="col-2">
                                        <div
                                          className="image-item"
                                          style={{
                                            width: 120,
                                            height: 120,
                                            paddingTop: 10,
                                            position: "relative",
                                          }}
                                        >
                                          <i
                                            className="mdi mdi-progress-close"
                                            style={{
                                              color: "red",
                                              fontSize: 25,
                                              position: "absolute",
                                              right: -12,
                                              top: -11,
                                              cursor: "pointer",
                                            }}
                                          ></i>
                                          <div className="shake-admin">
                                            <img
                                              className="image-admin-shake"
                                              style={{
                                                borderRadius: 15,
                                                width: 100,
                                                height: 100,
                                                border: "1px solid red",
                                              }}
                                              src={`http://127.0.0.1:8000/uploads/${dataImage}`}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </ImageUploading>
                            <div className="tab-pane" id="metadata">
                              <ul className="pager wizard twitter-bs-wizard-pager-link">
                                <li className="float-end">
                                  <a
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      fetchActualityUpdate();
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

export default AdminActualiteEdit;
