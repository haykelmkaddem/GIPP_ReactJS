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
  const [images, setImages] = React.useState("");

  let formData = new FormData();
  const [formdatastate, setFormdatastate] = useState(formData);
  const onChange = (imageList, addUpdateIndex) => {
    const fileObjects = imageList.map((file) => {
      formData.append("affiche", file.file, file.file.name);
    });
    setImages(imageList);
    setFormdatastate(formData);
  };

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [debut, setDebut] = useState("");
  const [fin, setFin] = useState("");
  const [place, setPlace] = useState("");
  const [maxInvitation, setMaxInvitation] = useState("");
  const [dataImage, setDataImage] = useState("");

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
        setDataImage(response.data.affiche);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchUpdateSalon() {
    formdatastate.append("salonId", id);
    formdatastate.append("titre", titre);
    formdatastate.append("description", description);
    formdatastate.append("date", date);
    formdatastate.append("temps_debut", debut);
    formdatastate.append("temps_fin", fin);
    formdatastate.append("lieu", place);
    formdatastate.append("max_invitation", maxInvitation);
    axios.post(SALON_UPDATE_URL, formdatastate).finally(() => {
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
                    <h4>Modifier Salon</h4>
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
                      <li className="breadcrumb-item active">Modifier Salon</li>
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
                                Informations de base
                              </h4>
                              <p className="card-title-desc">
                                Remplissez toutes les informations ci-dessous
                              </p>

                              <form>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productname"
                                  >
                                    Titre du Salon
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
                                        Heure de début
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
                                        Heure de fin
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
                                    Description du salon
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
                                    Lieu
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
                                    Nombre Maximale des Invités
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
                            <div className="tab-pane" id="product-img">
                              <h4 className="header-title">Affiche</h4>
                              <p className="card-title-desc">
                                Importer l'affiche du salon
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
                                        Déposez les fichiers ici ou cliquez pour
                                        télécharger.
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
                                  {images.length == 0 && (
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
                                  )}
                                </>
                              )}
                            </ImageUploading>
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
                                    Sauvegarder les modifications{" "}
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
