import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
// import StarIcon from "@mui/material/StarIcon";
// import StarOutlineIcon from "@mui/material/StarOutlineIcon";
import Typography from "@mui/material/Typography";
const PRODUCT_DETAILS_URL = "http://127.0.0.1:8000/produit/show";
const PRODUCT_VU_URL = "http://127.0.0.1:8000/produit/addVu";
const ADD_CART_URL = "http://127.0.0.1:8000/panier/new";
const ADD_AVIS_URL = "http://127.0.0.1:8000/avis/new";
const AVIS_URL = "http://127.0.0.1:8000/avis/avisofproduct";
const SHOW_AVIS_OR_NOT_URL = "http://127.0.0.1:8000/avis/showAvisOrNot";

const DetailProduit = ({ route, navigation }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState("");
  const [qt, setQt] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAvis, setIsLoadingAvis] = useState(true);
  const [isLoadingQT, setIsLoadingQT] = useState(true);
  const [isLoadingIMG, setIsLoadingIMG] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [playOnceVu, setPlayOnceVu] = useState(false);
  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [moyenRating, setMoyenRating] = React.useState("");
  const [moyenCusmers, setMoyenCusmers] = React.useState("");
  const [commentList, setCommentList] = React.useState([]);
  const [indexGlobale, setIndexGlobale] = useState(0);

  const [showAvis, setShowAvis] = React.useState("");

  const [cart, setCart] = React.useState([]);

  const [basicActive, setBasicActive] = useState("tab0");

  const handleBasicClick = (value, index) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
    setIndexGlobale(index);
  };

  const AddAlert = () => {
    fetchAddToCart();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Produit ajouté au panier avec succès!",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  useEffect(() => {
    if (!playOnce) {
      fetchProductDeatils();
      fetchAvisList();
      fetchShowAvisOrNot();
      setPlayOnce(true);
    }
  }, [productDetails, playOnce, commentList, showAvis]);

  useEffect(() => {
    if (!isLoadingQT) {
      setQt(productDetails.min);
    }
  }, [isLoadingQT]);

  useEffect(() => {
    if (!playOnceVu) {
      fetchProductVu();
      setPlayOnceVu(true);
    }
  }, [playOnceVu]);

  function fetchProductDeatils() {
    axios
      .post(PRODUCT_DETAILS_URL, {
        produitId: id,
      })
      .then((response) => {
        setProductDetails(response.data);
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingIMG(false);
        setIsLoadingQT(false);
      });
  }

  function fetchProductVu() {
    axios.post(PRODUCT_VU_URL, {
      produitId: id,
    });
  }

  function fetchShowAvisOrNot() {
    axios
      .post(SHOW_AVIS_OR_NOT_URL, {
        produitId: id,
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setShowAvis(response.data);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

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

  function fetchAddAvis() {
    axios
      .post(ADD_AVIS_URL, {
        produitId: id,
        userId: localStorage.getItem("id"),
        etoileNb: value,
        commentaire: comment,
      })
      .finally(() => {
        setIsLoading(false);
        setValue(0);
        setComment("");
        setPlayOnce(false);
      });
  }

  function fetchAddToCart() {
    axios.post(ADD_CART_URL, {
      produitId: id,
      userId: localStorage.getItem("id"),
      quantite: qt,
    });
  }

  function updateQt(newQt) {
    if (newQt >= productDetails.min && newQt <= productDetails.max) {
      setQt(newQt);
      console.log(newQt);
    }
  }

  return (
    <div>
      <Header />
      {isLoading && isLoadingIMG && isLoadingQT && productDetails == "" && (
        <div className="container my-main mb-5">
          <div class="scene">
            <div class="plane">
              <div class="cube cube--0">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--0"></div>
              <div class="cube cube--1">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--1"></div>
              <div class="cube cube--2">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--2"></div>
              <div class="cube cube--3">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--3"></div>
              <div class="cube cube--4">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--4"></div>
              <div class="cube cube--5">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--5"></div>
              <div class="cube cube--6">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--6"></div>
              <div class="cube cube--7">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--7"></div>
            </div>
          </div>
        </div>
      )}
      {isLoadingAvis && productDetails != "" && !productDetails.stock > 0 && (
        <div className="container my-main mb-5">
          <div class="scene">
            <div class="plane">
              <div class="cube cube--0">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--0"></div>
              <div class="cube cube--1">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--1"></div>
              <div class="cube cube--2">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--2"></div>
              <div class="cube cube--3">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--3"></div>
              <div class="cube cube--4">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--4"></div>
              <div class="cube cube--5">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--5"></div>
              <div class="cube cube--6">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--6"></div>
              <div class="cube cube--7">
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
                <div class="cube__side"></div>
              </div>
              <div class="shadow shadow--7"></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <section
          className="ttm-row conatact-section mb_20 clearfix mt-5"
          style={{ minHeight: 500 }}
        >
          <div className="container">
            <div className="row ttm-boxes-spacing-30px">
              <div className="col-md-6 col-sm-6 ttm-box-col-wrapper">
                <div className="ttm_single_image-wrapper border-rad_5">
                  {!isLoadingIMG && (
                    <div className="preview">
                      <div className="preview-pic tab-content">
                        <div
                          className="tab-pane product-detail-image w-100 active"
                          id="pic-1"
                          show={basicActive === "tab" + indexGlobale}
                        >
                          <img
                            src={`http://127.0.0.1:8000/uploads/${productDetails.image[indexGlobale].imageURL}`}
                          />
                        </div>
                      </div>
                      <ul className="preview-thumbnail nav nav-tabs">
                        {productDetails.image.map((img, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              handleBasicClick("tab" + index, index)
                            }
                            active={basicActive === "tab" + index}
                          >
                            <a data-target="#pic-2" data-toggle="tab">
                              <img
                                src={`http://127.0.0.1:8000/uploads/${img.imageURL}`}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-sm-6 ttm-box-col-wrapper">
                <div className="ttm_single_image-wrapper border-rad_5">
                  {productDetails.stock > 0 ? (
                    <button
                      type="button"
                      className="btn text-success border-2 rounded-pill border-success mb-3"
                    >
                      En Stock
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn text-danger border-2 rounded-pill border-danger mb-3"
                    >
                      Hors Stock
                    </button>
                  )}

                  <h3>{productDetails.nom}</h3>
                  <Rating
                    name="half-rating-read"
                    value={moyenRating}
                    precision={0.1}
                    readOnly
                  />

                  <p> ({moyenCusmers} Customer Reviews)</p>
                  <p>{productDetails.description}</p>
                  <h6 className="d-inline">Stock : </h6>
                  <p className="details-p d-inline m-0 p-0 ">
                    {productDetails.stock} Kg
                  </p>
                  <p className="details-p m-0 p-0 pl-2 d-inline">
                    <span className="tick">✔</span>
                    <span className="bold"> Min:</span>
                    {productDetails.min} Kg
                  </p>
                  <p className="details-p m-0 p-0 pl-2 d-inline">
                    <span className="tick">✔</span>
                    <span className="bold"> Max:</span>
                    {productDetails.max} Kg
                  </p>
                  <h3
                    style={{
                      marginTop: 30,
                      marginBottom: -30,
                      fontWeight: "bold",
                    }}
                  >
                    {productDetails.discount == null ? (
                      <>{productDetails.prix} Dt &nbsp;</>
                    ) : (
                      <>{productDetails.discount} Dt &nbsp;</>
                    )}
                    {productDetails.discount !== null && (
                      <>
                        <span
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: 2,
                            borderRadius: 5,
                            fontWeight: "bold",
                          }}
                        >
                          -
                          {(
                            100 -
                            (productDetails.discount * 100) /
                              productDetails.prix
                          ).toFixed(2)}
                          %
                        </span>
                        <span
                          style={{
                            padding: 2,
                            fontSize: 18,
                            textDecoration: "line-through",
                            fontWeight: "normal",
                          }}
                        >
                          {productDetails.prix} Dt
                        </span>
                      </>
                    )}
                  </h3>

                  {productDetails.stock > 0 && (
                    <div className="container ml-0 p-0 mt-5 ">
                      <div className="row">
                        <div className="col-md-4 ">
                          <table>
                            <tr>
                              <td>
                                <button
                                  className="btn product-price-btn moin"
                                  onClick={() => updateQt(qt - 1)}
                                >
                                  -
                                </button>
                              </td>
                              <td>
                                <input
                                  style={{ backgroundColor: "#F5F7FA" }}
                                  type="text"
                                  className="product-price-input d-flex justify-content-center align-items-center text-center"
                                  defaultValue={qt}
                                  key={qt}
                                />
                              </td>
                              <td>
                                <button
                                  className="btn product-price-btn plus"
                                  onClick={() => updateQt(qt + 1)}
                                >
                                  +
                                </button>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div className="col-md-8">
                          <button
                            className="btn btn-success product-add-to-cart-btn rounded-pill w-100"
                            onClick={() => AddAlert()}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              {commentList.map((comm, index) => (
                <div className="col-lg-12" key={index}>
                  <div className="testimonials ttm-testimonial-box-view-style2">
                    <div className="testimonial-content">
                      <div className="testimonial-bottom">
                        <div className="testimonial-avatar">
                          <div className="testimonial-img">
                            <img
                              className="img-fluid"
                              src="/assets/FrontOffice/images/company.png"
                              alt="testimonial-img"
                            />
                          </div>
                        </div>
                        <div className="testimonial-caption">
                          <h3 style={{ marginBottom: 10 }}>
                            {comm.user.entreprise.nom}
                          </h3>
                          <Rating
                            name="half-rating-read"
                            defaultValue={comm.etoile_nb}
                            precision={0.1}
                            readOnly
                          />
                        </div>
                      </div>
                      <blockquote className="testimonial-text comm">
                        {comm.commentaire}
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
              {showAvis && (
                <div className="col-lg-12">
                  <div class="ttm-blog-classic-box-comment clearfix">
                    <div id="comments" class="comments-area">
                      <div class="comment-respond">
                        <h3 class="comment-reply-title">Leave a Comment</h3>
                        <p class="comment-notes">
                          Your opinion is important to Us.{" "}
                        </p>
                        <Box>
                          <Rating
                            name="size-large"
                            size="large"
                            value={value}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </Box>
                        <p class="comment-form-comment">
                          <textarea
                            id="comment"
                            placeholder="Comment"
                            cols="45"
                            rows="4"
                            style={{ backgroundColor: "white" }}
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          ></textarea>
                        </p>
                        <p
                          class="form-submit margin_top30 margin_bottom0"
                          onClick={() => {
                            fetchAddAvis();
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <button class="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark">
                            Post Comment
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default DetailProduit;
