import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PRODUCT_DETAILS_URL = "http://127.0.0.1:8000/produit/show";
const ADD_CART_URL = "http://127.0.0.1:8000/panier/new";

const DetailProduit = ({ route, navigation }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState("");
  const [qt, setQt] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = React.useState([]);

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
    fetchProductDeatils();
  }, [productDetails]);

  useEffect(() => {
    if (!isLoading) {
      setQt(productDetails.min);
    }
  }, [isLoading]);

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
      {!isLoading && (
        <section className="ttm-row conatact-section mb_20 clearfix mt-5">
          <div className="container">
            <div className="row ttm-boxes-spacing-30px">
              <div className="col-md-6 col-sm-6 ttm-box-col-wrapper">
                <div className="ttm_single_image-wrapper border-rad_5">
                  <div className="preview">
                    <div className="preview-pic tab-content">
                      <div
                        className="tab-pane product-detail-image w-100 active"
                        id="pic-1"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                      <div
                        className="tab-pane product-detail-image w-100"
                        id="pic-2"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                      <div
                        className="tab-pane product-detail-image w-100"
                        id="pic-3"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                      <div
                        className="tab-pane product-detail-image w-100"
                        id="pic-4"
                      >
                        <img src="https://picsum.photos/200/300" />
                      </div>
                      <div
                        className="tab-pane product-detail-image w-100"
                        id="pic-5"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                    </div>
                    <ul className="preview-thumbnail nav nav-tabs">
                      <li className="active">
                        <a data-target="#pic-1" data-toggle="tab">
                          <img src="http://placekitten.com/200/126" />
                        </a>
                      </li>
                      <li>
                        <a data-target="#pic-2" data-toggle="tab">
                          <img src="http://placekitten.com/200/126" />
                        </a>
                      </li>
                      <li>
                        <a data-target="#pic-3" data-toggle="tab">
                          <img src="http://placekitten.com/200/126" />
                        </a>
                      </li>
                      <li>
                        <a data-target="#pic-4" data-toggle="tab">
                          <img src="https://picsum.photos/200/300" />
                        </a>
                      </li>
                      <li>
                        <a data-target="#pic-5" data-toggle="tab">
                          <img src="http://placekitten.com/200/126" />
                        </a>
                      </li>
                    </ul>
                  </div>
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
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <p> (5 Customer Reviews)</p>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default DetailProduit;
