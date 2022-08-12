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
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import Switch from "react-switch";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PRODUCT_DETAILS_URL = "http://127.0.0.1:8000/produit/show";
const DELETE_IMAGE_URL = "http://127.0.0.1:8000/produit/deleteImage";
const UPDATE_PRODUCT_URL = "http://127.0.0.1:8000/produit/modifierProduit";

const AdminProductEdit = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const [images, setImages] = React.useState([]);
  const [dataF, setDataF] = React.useState([]);
  const maxNumber = 69;

  const navigate = useNavigate();
  const [imageBack, setImageBack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [playOnce, setPlayOnce] = useState(false);
  const [formdatastate, setFormdatastate] = useState(new FormData());

  const [checked, setChecked] = useState(false);
  const [nom, setNom] = useState("");
  const [nomAr, setNomAr] = useState("");
  const [nomEn, setNomEn] = useState("");
  const [nomIt, setNomIt] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionIt, setDescriptionIt] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [imagesData, setImagesData] = useState([]);
  const [categorie, setCategorie] = useState(0);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");

  const deleteImageAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Image deleted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const data = new FormData();
  let formData = new FormData();
  const onChange = (imageList, addUpdateIndex) => {
    const fileObjects = imageList.map((file) => {
      formData.append("assets[]", file.file, file.file.name);
    });
    setImages(imageList);
    setFormdatastate(formData);
  };

  useEffect(() => {
    if (!playOnce) {
      fetchProductDetails();
      setPlayOnce(true);
    }
  }, [
    nom,
    nomAr,
    nomEn,
    nomIt,
    description,
    descriptionAr,
    descriptionEn,
    descriptionIt,
    stock,
    discount,
    price,
    min,
    max,
  ]);

  function fetchProductDetails() {
    axios
      .post(PRODUCT_DETAILS_URL, {
        produitId: id,
      })
      .then((response) => {
        setNom(response.data.nom);
        setNomAr(response.data.nomAr);
        setNomEn(response.data.nomEn);
        setNomIt(response.data.nomIt);
        setDescription(response.data.description);
        setDescriptionAr(response.data.descriptionAr);
        setDescriptionEn(response.data.descriptionEn);
        setDescriptionIt(response.data.descriptionIt);
        setStock(response.data.stock);
        if (response.data.discount === null) {
          setDiscount("");
        } else {
          setDiscount(response.data.discount);
        }
        setPrice(response.data.prix);
        setMin(response.data.min);
        setMax(response.data.max);
        setImagesData(response.data.image);

        setChecked(response.data.visibilite);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchDeleteImage(id, index) {
    setIsLoadingImage(true);
    axios
      .post(DELETE_IMAGE_URL, {
        imageId: id,
      })
      .then((response) => {
        imagesData.splice(index, 1);
      })
      .finally(() => {
        setIsLoadingImage(false);
      });
  }

  function fetchUpdateProduit() {
    formdatastate.append("produitId", id);
    formdatastate.append("nom", nom);
    formdatastate.append("nomAr", nomAr);
    formdatastate.append("nomEn", nomEn);
    formdatastate.append("nomIt", nomIt);
    formdatastate.append("description", description);
    formdatastate.append("descriptionAr", descriptionAr);
    formdatastate.append("descriptionEn", descriptionEn);
    formdatastate.append("descriptionIt", descriptionIt);
    formdatastate.append("stock", stock);
    formdatastate.append("discount", discount);
    formdatastate.append("prix", price);
    formdatastate.append("min", min);
    formdatastate.append("max", max);
    formdatastate.append("visibilite", checked);
    axios.post(UPDATE_PRODUCT_URL, formdatastate).finally(() => {
      navigate("/adminproducts");
    });
  }

  return (
    <div className="my-admin-1">
      {isLoadingImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 100000,
            height: height,
          }}
        >
          <CircularProgress color="primary" size={80} />
        </div>
      )}
      <AdminHeader />
      <div className="main-content">
        <div className="page-content">
          <div className="page-title-box">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="page-title">
                    <h4>Modifier le produit</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item">
                        <NavLink to="/adminproducts">
                          <a>Produits</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">
                        Modifier le produit
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
                            <div
                              className="toggle-switch-admin row d-flex align-items-center justify-content-center"
                              style={{ color: "red" }}
                            >
                              {/* {productDetails.visibilite} */}
                              {checked ? (
                                <span
                                  style={{
                                    color: "white",
                                    backgroundColor: "green",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    borderRadius: 15,
                                    padding: 2,
                                    marginBottom: 5,
                                    textAlign: "center",
                                  }}
                                >
                                  Visible
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "white",
                                    backgroundColor: "red",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    borderRadius: 15,
                                    padding: 2,
                                    marginBottom: 5,
                                    textAlign: "center",
                                  }}
                                >
                                  Invisible
                                </span>
                              )}
                              <Switch
                                onChange={handleChange}
                                checked={checked}
                              />
                            </div>
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
                                    Nom de Produit (Français)
                                  </label>
                                  <input
                                    id="productname"
                                    name="productname"
                                    type="text"
                                    defaultValue={nom}
                                    onChange={(e) => {
                                      setNom(e.target.value);
                                      console.log(nom);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productname"
                                  >
                                    Nom de Produit (Arabic)
                                  </label>
                                  <input
                                    id="productname"
                                    name="productname"
                                    type="text"
                                    defaultValue={nomAr}
                                    onChange={(e) => {
                                      setNomAr(e.target.value);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productname"
                                  >
                                    Nom de Produit (English)
                                  </label>
                                  <input
                                    id="productname"
                                    name="productname"
                                    type="text"
                                    defaultValue={nomEn}
                                    onChange={(e) => {
                                      setNomEn(e.target.value);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productname"
                                  >
                                    Nom de Produit (Italien)
                                  </label>
                                  <input
                                    id="productname"
                                    name="productname"
                                    type="text"
                                    defaultValue={nomIt}
                                    onChange={(e) => {
                                      setNomIt(e.target.value);
                                    }}
                                    className="form-control"
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="manufacturername"
                                      >
                                        Stock
                                      </label>
                                      <input
                                        id="manufacturername"
                                        name="manufacturername"
                                        type="number"
                                        defaultValue={stock}
                                        onChange={(e) => {
                                          setStock(e.target.value);
                                          formData.append(
                                            "stock",
                                            e.target.value
                                          );
                                          console.log(stock);
                                        }}
                                        className="form-control"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="manufacturerbrand"
                                      >
                                        Prix
                                      </label>
                                      <input
                                        id="manufacturerbrand"
                                        name="manufacturerbrand"
                                        type="number"
                                        defaultValue={price}
                                        onChange={(e) => {
                                          setPrice(e.target.value);
                                          formData.append(
                                            "price",
                                            e.target.value
                                          );
                                          console.log(price);
                                        }}
                                        className="form-control"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="manufacturername"
                                      >
                                        Quantité Minimum
                                      </label>
                                      <input
                                        id="manufacturername"
                                        name="manufacturername"
                                        type="number"
                                        defaultValue={min}
                                        onChange={(e) => {
                                          setMin(e.target.value);
                                          formData.append(
                                            "min",
                                            e.target.value
                                          );
                                          console.log(min);
                                        }}
                                        className="form-control"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="manufacturerbrand"
                                      >
                                        Quantité Maximale
                                      </label>
                                      <input
                                        id="manufacturerbrand"
                                        name="manufacturerbrand"
                                        type="number"
                                        defaultValue={max}
                                        onChange={(e) => {
                                          setMax(e.target.value);
                                          formData.append(
                                            "max",
                                            e.target.value
                                          );
                                          console.log(max);
                                        }}
                                        className="form-control"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-5">
                                    <div className="mb-3">
                                      <label
                                        className="form-label"
                                        htmlFor="manufacturername"
                                      >
                                        Réduction
                                      </label>
                                      <input
                                        id="manufacturername"
                                        name="manufacturername"
                                        type="number"
                                        defaultValue={discount}
                                        onChange={(e) => {
                                          setDiscount(e.target.value);
                                          formData.append(
                                            "discount",
                                            e.target.value
                                          );
                                          console.log(discount);
                                        }}
                                        className="form-control"
                                        min={0}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productdesc"
                                  >
                                    Description du produit (Français)
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="productdesc"
                                    defaultValue={description}
                                    onChange={(e) => {
                                      setDescription(e.target.value);
                                    }}
                                    rows="5"
                                  ></textarea>
                                </div>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productdesc"
                                  >
                                    Description du produit (Arabic)
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="productdesc"
                                    defaultValue={descriptionAr}
                                    onChange={(e) => {
                                      setDescriptionAr(e.target.value);
                                    }}
                                    rows="5"
                                  ></textarea>
                                </div>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productdesc"
                                  >
                                    Description du produit (English)
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="productdesc"
                                    defaultValue={descriptionEn}
                                    onChange={(e) => {
                                      setDescriptionEn(e.target.value);
                                    }}
                                    rows="5"
                                  ></textarea>
                                </div>
                                <div className="mb-3">
                                  <label
                                    className="form-label"
                                    htmlFor="productdesc"
                                  >
                                    Description du produit (Italien)
                                  </label>
                                  <textarea
                                    className="form-control"
                                    id="productdesc"
                                    defaultValue={descriptionIt}
                                    onChange={(e) => {
                                      setDescriptionIt(e.target.value);
                                    }}
                                    rows="5"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                            <div className="tab-pane" id="product-img">
                              <h4 className="header-title">
                                Images de produit
                              </h4>
                              <p className="card-title-desc">
                                Importer des Images de Produit
                              </p>
                            </div>
                            <div className="App">
                              <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
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
                                        isDragging
                                          ? { color: "red" }
                                          : undefined
                                      }
                                    >
                                      <div className="dz-message needsclick">
                                        <div className="mb-3">
                                          <i className="display-4 text-muted mdi mdi-cloud-download-outline"></i>
                                        </div>

                                        <h4>
                                          Déposez les fichiers ici ou cliquez
                                          pour télécharger.
                                        </h4>
                                      </div>
                                    </div>
                                    {imageList.length !== 0 && (
                                      <button
                                        className="btn link text-danger"
                                        onClick={onImageRemoveAll}
                                      >
                                        X Supprimer toutes les images ajoutés
                                      </button>
                                    )}

                                    <div className="selected-images-container text-center w-100  d-flex p-3">
                                      <div className="row">
                                        {imageList.map((image, index) => (
                                          <div className="col-md-2" key={index}>
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
                                        {imagesData.map((image, index) => (
                                          <div className="col-md-2" key={index}>
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
                                                  fetchDeleteImage(
                                                    image.id,
                                                    index
                                                  )
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
                                                  src={`http://127.0.0.1:8000/uploads/${image.imageURL}`}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </ImageUploading>
                            </div>
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              errors,
                            }) =>
                              errors && (
                                <div>
                                  {errors.maxNumber && (
                                    <span>
                                      Number of selected images exceed maxNumber
                                    </span>
                                  )}
                                  {errors.acceptType && (
                                    <span>
                                      Your selected file type is not allow
                                    </span>
                                  )}
                                  {errors.maxFileSize && (
                                    <span>
                                      Selected file size exceed maxFileSize
                                    </span>
                                  )}
                                  {errors.resolution && (
                                    <span>
                                      Selected file is not match your desired
                                      resolution
                                    </span>
                                  )}
                                </div>
                              )
                            }
                            <div
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              {message}
                            </div>
                            <div
                              className="tab-pane"
                              id="metadata"
                              style={{ cursor: "pointer" }}
                            >
                              <ul className="pager wizard twitter-bs-wizard-pager-link">
                                <li
                                  className="float-end"
                                  style={{ cursor: "pointer" }}
                                >
                                  <a
                                    onClick={() => {
                                      fetchUpdateProduit();
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

export default AdminProductEdit;
