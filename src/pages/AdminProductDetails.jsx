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
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "react-switch";
const PRODUCT_DETAILS_URL = "http://127.0.0.1:8000/produit/show";
const PRODUCT_DELETE_URL = "http://127.0.0.1:8000/produit/delete";
const AVIS_URL = "http://127.0.0.1:8000/avis/avisofproduct";
const PRODUCT_updateVisibilite_URL =
  "http://127.0.0.1:8000/produit/updateVisibilite";

const AdminProductDetails = ({ route, navigation }) => {
  var height = window.innerHeight;
  var width = window.innerWidth;

  const [checked, setChecked] = useState(false);
  // this.state = { checked: false };
  // this.handleChange = this.handleChange.bind(this);

  // handleChange(checked) {
  //   this.setState({ checked });
  // }

  const handleChange = (checked) => {
    setChecked(checked);
    axios.post(PRODUCT_updateVisibilite_URL, {
      produitId: id,
    });
  };

  const [basicActive, setBasicActive] = useState("tab0");
  const [commentList, setCommentList] = React.useState([]);
  const [moyenRating, setMoyenRating] = React.useState(0);
  const [moyenCusmers, setMoyenCusmers] = React.useState(0);
  // const handleChange = () => {
  //   setChecked(!checked);
  // };

  const handleBasicClick = (value, index) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
    setIndexGlobale(index);
  };
  const nobold = {
    fontWeight: "500",
    fontSize: 20,
    height: "auto",
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [indexGlobale, setIndexGlobale] = useState(0);
  const [isLoadingAvis, setIsLoadingAvis] = useState(true);

  function fetchAvisList() {
    axios
      .post(AVIS_URL, {
        produitId: id,
      })
      .then((response) => {
        setCommentList(response.data);
        let moy = 0;
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          moy = moy + element.etoile_nb;
        }
        setMoyenRating(moy / response.data.length);
        setMoyenCusmers(response.data.length);
      })
      .finally(() => {
        setIsLoadingAvis(false);
      });
  }

  const AlertSupp = (pId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are You Sure ?",
        text: "You can't go back!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchDeleteProduct(pId);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Product Deleted !",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Deletion has been canceled :)",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    if (!playOnce) {
      fetchProductDetails();
      fetchAvisList();
      setPlayOnce(true);
    }
  }, [productDetails]);

  function fetchProductDetails() {
    axios
      .post(PRODUCT_DETAILS_URL, {
        produitId: id,
      })
      .then((response) => {
        setProductDetails(response.data);
        setChecked(response.data.visibilite);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchDeleteProduct() {
    axios
      .post(PRODUCT_DELETE_URL, {
        produitId: id,
      })
      .then((response) => {
        setIsLoading(false);
      })
      .finally(() => {
        navigate("/adminproducts");
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
                    <h4>Détails du produit</h4>
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
                        Détails du produit
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-sm-6">
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

          <div className="container-fluid">
            <div className="page-content-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        {isLoading && (
                          <div
                            style={{ height: height - 100 }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <CircularProgress color="primary" size={80} />
                          </div>
                        )}
                        {!isLoading && (
                          <>
                            <div className="col-xl-5">
                              <div className="product-detail">
                                <div className="row">
                                  <div className="col-3">
                                    <div
                                      className="nav flex-column nav-pills"
                                      id="v-pills-tab"
                                      role="tablist"
                                      aria-orientation="vertical"
                                    >
                                      {productDetails.image.map(
                                        (img, index) => (
                                          <a
                                            key={index}
                                            onClick={() =>
                                              handleBasicClick(
                                                "tab" + index,
                                                index
                                              )
                                            }
                                            active={
                                              basicActive === "tab" + index
                                            }
                                            style={{ marginBottom: 5 }}
                                          >
                                            <img
                                              src={`http://127.0.0.1:8000/uploads/${img.imageURL}`}
                                              alt=""
                                              className="img-fluid mx-auto d-block tab-img rounded"
                                            />
                                          </a>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-8 col-9">
                                    <div
                                      className="tab-content"
                                      id="v-pills-tabContent"
                                    >
                                      <div
                                        className="tab-pane fade show active"
                                        //className={`tab-pane fade show active${index}`}
                                        //id="product-1"
                                        //id={`product-${index}`}
                                        role="tabpanel"
                                      >
                                        <div
                                          className="product-img"
                                          show={
                                            basicActive === "tab" + indexGlobale
                                          }
                                        >
                                          <img
                                            src={`http://127.0.0.1:8000/uploads/${productDetails.image[indexGlobale].imageURL}`}
                                            alt=""
                                            className="img-fluid mx-auto d-block"
                                            data-zoom="assets/images/product/img-1.png"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-7">
                              <div className="mt-4 mt-xl-3">
                                {/* fssr */}
                                <div
                                  className="toggle-switch"
                                  style={{ color: "red" }}
                                >
                                  {checked ? (
                                    <span
                                      style={{
                                        color: "white",
                                        backgroundColor: "green",
                                        fontSize: 14,
                                        fontWeight: "bold",
                                        borderRadius: 15,
                                        padding: 2,
                                        marginBottom: 15,
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
                                  <div style={{ marginTop: 5 }}>
                                    <Switch
                                      onChange={handleChange}
                                      checked={checked}
                                    />
                                  </div>
                                  {/* {productDetails.visibilite} */}
                                </div>
                                <a className="text-primary">
                                  {productDetails.categorie.nom}
                                </a>
                                <h5 className="mt-1" style={nobold}>
                                  {productDetails.nom}
                                </h5>
                                <div className="d-inline-flex">
                                  <div className="text-muted me-3">
                                    <span className="mdi mdi-star text-warning"></span>
                                    <span className="mdi mdi-star text-warning"></span>
                                    <span className="mdi mdi-star text-warning"></span>
                                    <span className="mdi mdi-star text-warning"></span>
                                    <span className="mdi mdi-star-half text-warning"></span>
                                  </div>
                                </div>

                                <h5 className="mt-2" style={nobold}>
                                  {productDetails.discount !== null && (
                                    <del className="text-muted me-2">
                                      {productDetails.prix}Dt
                                    </del>
                                  )}

                                  {productDetails.discount == null ? (
                                    <>{productDetails.prix}TND </>
                                  ) : (
                                    <>{productDetails.discount}TND</>
                                  )}

                                  {productDetails.discount !== null && (
                                    <span className="text-danger font-size-12 ms-2">
                                      {(
                                        100 -
                                        (productDetails.discount * 100) /
                                          productDetails.prix
                                      ).toFixed(2)}
                                      % Off
                                    </span>
                                  )}
                                </h5>

                                <hr className="my-4" />

                                <div className="mt-4">
                                  <h6>Description :</h6>

                                  <div className="mt-4">
                                    <p className="text-muted mb-2">
                                      <i className="mdi mdi-check-bold text-success me-2"></i>
                                      {productDetails.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <button
                                    type="button"
                                    className="btn btn-primary waves-effect waves-light mt-2"
                                    onClick={() => AlertSupp()}
                                  >
                                    <i className="mdi mdi-delete me-2"></i>{" "}
                                    Supprimer ce produit
                                  </button>
                                </div>

                                <div className="row mt-4">
                                  <div className="col-md-3">
                                    <h5
                                      className="font-size-14"
                                      style={{ height: "auto" }}
                                    >
                                      Stock :
                                    </h5>
                                    <p>{productDetails.stock}</p>
                                  </div>
                                  <div className="col-md-3">
                                    <h5
                                      className="font-size-14"
                                      style={{ height: "auto" }}
                                    >
                                      Prix :
                                    </h5>
                                    <p>{productDetails.prix}</p>
                                  </div>
                                  <div className="col-md-3">
                                    <h5
                                      className="font-size-14"
                                      style={{ height: "auto" }}
                                    >
                                      Minimum :
                                    </h5>
                                    <p>{productDetails.min}</p>
                                  </div>
                                  <div className="col-md-3">
                                    <h5
                                      className="font-size-14"
                                      style={{ height: "auto" }}
                                    >
                                      Maximum :
                                    </h5>
                                    <p>{productDetails.max}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <h4 className="header-title mb-4">Avis : </h4>
                      {isLoadingAvis && (
                        <div
                          style={{ height: 300 }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <CircularProgress color="primary" size={80} />
                        </div>
                      )}
                      {!isLoadingAvis && (
                        <div className="d-inline-flex mb-3">
                          <div className="text-muted me-3">
                            <Rating
                              name="half-rating-read"
                              defaultValue={moyenRating}
                              precision={0.1}
                              readOnly
                            />
                          </div>
                          <div className="text-muted">
                            ( {moyenCusmers} Avis client)
                          </div>
                        </div>
                      )}
                      {!isLoadingAvis && (
                        <div className="border pr-4 pl-4 pt-2 pb-2 rounded">
                          {commentList.map((comm, index) => (
                            <div
                              className="media border-bottom pb-3 pt-3"
                              key={index}
                            >
                              <div className="media-body">
                                <p className="text-muted mb-2">
                                  {comm.commentaire}
                                </p>
                                <h4 className="font-size-15">
                                  {comm.user.prenom} {comm.user.nom}
                                </h4>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={comm.etoile_nb}
                                  precision={0.1}
                                  size="small"
                                  readOnly
                                />
                              </div>
                              <p className="float-sm-right font-size-12 text-center">
                                {comm.created_at
                                  .split("T")[0]
                                  .split("-")
                                  .reverse()
                                  .join("/")}
                                <br />
                                {comm.created_at.split("T")[1].split(":")[0] +
                                  ":" +
                                  comm.created_at
                                    .split("T")[1]
                                    .split(":")[1]
                                    .split(".")[0]}
                              </p>
                            </div>
                          ))}
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

export default AdminProductDetails;
