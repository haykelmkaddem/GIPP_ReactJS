import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PRODUCT_DETAILS_URL = "http://127.0.0.1:8000/produit/show";

const DetailProduit = ({ route, navigation }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProductDeatils();
  }, [productDetails]);

  function fetchProductDeatils() {
    axios
      .post(PRODUCT_DETAILS_URL, {
        produitId: id,
      })
      .then((response) => {
        setProductDetails(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Header />
      {!isLoading && (
        <section class="ttm-row conatact-section mb_20 clearfix mt-5">
          <div class="container">
            <div class="row ttm-boxes-spacing-30px">
              <div class="col-md-6 col-sm-6 ttm-box-col-wrapper">
                <div class="ttm_single_image-wrapper border-rad_5">
                  <div class="preview">
                    <div class="preview-pic tab-content">
                      <div
                        class="tab-pane product-detail-image w-100 active"
                        id="pic-1"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                      <div
                        class="tab-pane product-detail-image w-100"
                        id="pic-2"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                      <div
                        class="tab-pane product-detail-image w-100"
                        id="pic-3"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                      <div
                        class="tab-pane product-detail-image w-100"
                        id="pic-4"
                      >
                        <img src="https://picsum.photos/200/300" />
                      </div>
                      <div
                        class="tab-pane product-detail-image w-100"
                        id="pic-5"
                      >
                        <img src="http://placekitten.com/400/252" />
                      </div>
                    </div>
                    <ul class="preview-thumbnail nav nav-tabs">
                      <li class="active">
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
              <div class="col-md-6 col-sm-6 ttm-box-col-wrapper">
                <div class="ttm_single_image-wrapper border-rad_5">
                  {productDetails.data.stock > 0 ? (
                    <button
                      type="button"
                      class="btn text-success border-2 rounded-pill border-success mb-3"
                    >
                      En Stock
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn text-danger border-2 rounded-pill border-danger mb-3"
                    >
                      Hors Stock
                    </button>
                  )}

                  <h3>{productDetails.data.nom}</h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <p> (5 Customer Reviews)</p>
                  <p>{productDetails.data.description}</p>
                  <h6 className="d-inline">Stock : </h6>
                  <p className="details-p d-inline m-0 p-0 ">
                    {productDetails.data.stock} Kg
                  </p>
                  <p className="details-p m-0 p-0 pl-2 d-inline">
                    <span className="tick">✔</span>
                    <span className="bold"> Min:</span>
                    {productDetails.data.min} Kg
                  </p>
                  <p className="details-p m-0 p-0 pl-2 d-inline">
                    <span className="tick">✔</span>
                    <span className="bold"> Max:</span>
                    {productDetails.data.max} Kg
                  </p>
                  <div className="container ml-0 p-0 mt-5 ">
                    <div className="row">
                      <div className="col-md-4 ">
                        <table>
                          <tr>
                            <td>
                              <button className="btn product-price-btn moin">
                                -
                              </button>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="product-price-input d-flex justify-content-center align-items-center text-center"
                                value="5"
                              />
                            </td>
                            <td>
                              <button className="btn product-price-btn plus">
                                +
                              </button>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-md-8">
                        <button className="btn btn-success product-add-to-cart-btn rounded-pill w-100">
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
