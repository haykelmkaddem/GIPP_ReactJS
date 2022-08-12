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
import { useNavigate } from "react-router-dom";
// import { moveFile } from "move-file";
// const moveFile = require("@npmcli/move-file");
// const cpFile = require("cp-file");
const IMAGE_TEST_URL = "http://127.0.0.1:8000/produit/newImage";
const CATEGORIE_URL = "http://127.0.0.1:8000/categorie/showall";
const ADD_PRODUCT_URL = "http://127.0.0.1:8000/produit/new";

const AdminProductAdd = () => {
  const [images, setImages] = React.useState([]);
  const [dataF, setDataF] = React.useState([]);
  const maxNumber = 69;

  const navigate = useNavigate();
  const [imageBack, setImageBack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [formdatastate, setFormdatastate] = useState([]);

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
  const [categorie, setCategorie] = useState(0);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");

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

  function fetchImage() {
    axios
      .post(IMAGE_TEST_URL, formdatastate)
      .then((response) => {
        setImageBack(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchAddProduct() {
    if (nom == "" || nomAr == "" || nomEn == "" || nomIt == "") {
      setMessage("Veuillez remplir tous les champs nom");
    } else if (stock == "" || stock < 0) {
      setMessage("Veuillez entrer un stock valide");
    } else if (price == "" || price < 0) {
      setMessage("Veuillez entrer un prix valide");
    } else if (min == "" || min < 0) {
      setMessage("Veuillez entrer un prix minimum valide");
    } else if (max == "" || max < 0) {
      setMessage("Veuillez entrer un prix maximum valide");
    } else if (parseInt(min) > parseInt(max)) {
      setMessage("Le prix minimum doit être inférieur au prix maximum");
    } else if (parseInt(max) > parseInt(stock)) {
      setMessage("Le prix maximum doit être inférieur au stock");
    } else if (discount != "" && discount < 0) {
      setMessage("Veuillez entrer un pourcentage de réduction valide");
    } else if (categorie == 0) {
      setMessage("Veuillez choisir une catégorie");
    } else if (
      description == "" ||
      descriptionAr == "" ||
      descriptionEn == "" ||
      descriptionIt == ""
    ) {
      setMessage("Veuillez remplir tous les champs Description");
    } else if (images.length == 0) {
      setMessage("Veuillez ajouter des images");
    } else {
      formdatastate.append("nom", nom);
      formdatastate.append("nomAr", nomAr);
      formdatastate.append("nomEn", nomEn);
      formdatastate.append("nomIt", nomIt);
      formdatastate.append("stock", stock);
      formdatastate.append("prix", price);
      formdatastate.append("min", min);
      formdatastate.append("max", max);
      if (discount == "") {
        formdatastate.append("discount", "");
      } else {
        formdatastate.append("discount", discount);
      }

      formdatastate.append("categorieId", categorie);
      formdatastate.append("description", description);
      formdatastate.append("descriptionAr", descriptionAr);
      formdatastate.append("descriptionEn", descriptionEn);
      formdatastate.append("descriptionIt", descriptionIt);
      if (checked) {
        formdatastate.append("visibilite", 1);
      } else {
        formdatastate.append("visibilite", 0);
      }
      axios
        .post(ADD_PRODUCT_URL, formdatastate)
        .then((response) => {
          setImageBack(response.data);
        })
        .finally(() => {
          setIsLoading(false);
          navigate("/adminproducts");
        });
    }
  }

  function fetchCategories() {
    axios
      .post(CATEGORIE_URL)
      .then((response) => {
        setOptions(response.data);
        setCategorie(response.data[0].id);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchCategories();
      setPlayOnce(true);
    }
  }, [categorie]);
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
                    <h4>Ajouter un produit</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item">
                        <NavLink to="/adminproducts">
                          <a>Liste des produits</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">
                        Ajouter un produit
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
                            <Switch onChange={handleChange} checked={checked} />
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
                                  Nom du produit (Français)
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
                                  Nom du produit (Arabic)
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
                                  Nom du produit (English)
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
                                  Nom du produit (Italien)
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
                                        formData.append("min", e.target.value);
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
                                      Quantité Maximum
                                    </label>
                                    <input
                                      id="manufacturerbrand"
                                      name="manufacturerbrand"
                                      type="number"
                                      defaultValue={max}
                                      onChange={(e) => {
                                        setMax(e.target.value);
                                        formData.append("max", e.target.value);
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
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="control-label">
                                      Categorie
                                    </label>
                                    <select
                                      id="country"
                                      name="country"
                                      onChange={(e) => {
                                        setCategorie(e.target.value);
                                        formData.append(
                                          "categorieId",
                                          e.target.value
                                        );
                                      }}
                                      value={categorie}
                                    >
                                      {options.map((o) => (
                                        <option key={o.id} value={o.id}>
                                          {o.nom}
                                        </option>
                                      ))}
                                    </select>
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
                            <h4 className="header-title">Images de produit</h4>
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
                                  {imageList.length !== 0 && (
                                    <button
                                      className="btn link text-danger"
                                      onClick={onImageRemoveAll}
                                    >
                                      X Supprimer toutes les images
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
                                    fetchAddProduct();
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

export default AdminProductAdd;
