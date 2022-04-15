import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  return (
    <div>
      <Header />

      <div className="my-main mt-5 mb-5">
        <div className="container ">
          <div className="row ">
            <div className="col-md-8 p-0">
              <h5>Panier</h5>
              <div className="container cart-left-container">
                <div className="row">
                  <div className="col-md-2 cart-item cart-product-image">
                    <img src="assets/FrontOffice/images/portfolio/portfolio-02-770x770.jpg" />
                  </div>
                  <div className="col-md-4 cart-item">
                    <div className="cart-product-description">
                      <p>Nom complet de notre Produit gipp</p>
                      <h6 className="cart-price">
                        <span className="new-price px-2">156.0$</span>
                        <span className="old-price px-2"> 250.6$ </span>
                        <span className="badge badge-dark">-50%</span>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-3  cart-item ">
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
                            defaultValue={5}
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
                  <div className="col-md-2  cart-item ">
                    <div className="cart-product-price">29,00 $</div>
                  </div>
                  <div className="col-md-1 cart-item  ">
                    <AiFillDelete className="cart-delete-icon" />
                  </div>
                </div>
              </div>
              <div className="container cart-left-container">
                <div className="row">
                  <div className="col-md-2 cart-item cart-product-image">
                    <img src="assets/FrontOffice/images/portfolio/portfolio-02-770x770.jpg" />
                  </div>
                  <div className="col-md-4 cart-item">
                    <div className="cart-product-description">
                      <p>Nom complet de notre Produit gipp</p>
                      <h6 className="cart-price">
                        <span className="new-price px-2">156.0$</span>
                        <span className="old-price px-2"> 250.6$ </span>
                        <span className="badge badge-dark">-50%</span>
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-3  cart-item ">
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
                            defaultValue={5}
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
                  <div className="col-md-2  cart-item ">
                    <div className="cart-product-price">29,00 $</div>
                  </div>
                  <div className="col-md-1 cart-item  ">
                    <AiFillDelete className="cart-delete-icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 h-100">
              <div className="cart-right-container my-bg-color-primary container-fluid">
                <div className="row">
                  <div className="col-md-6">3 Articles</div>
                  <div className="col-md-6 text-right">1500.50 $</div>
                  <div className="col-md-6">Livraison</div>
                  <div className="col-md-6 text-right">0 $</div>
                  <span
                    style={{
                      height: 1,
                      width: "92%",
                      marginLeft: "4%",
                      backgroundColor: "#fff",
                      opacity: 0.5,
                      marginBottom: 25,
                      marginTop: 10,
                    }}
                  ></span>
                  <div className="col-md-12"> Adresse De Livraison :</div>
                  <div className="col-md-12">
                    <p>bloc 65A rue 4159 Cité Essaada Bardo</p>
                  </div>
                  <div className="col-md-12"> Entreprise :</div>
                  <div className="col-md-12">
                    <p>EL Moradi Palace</p>
                  </div>
                  <div className="col-md-12"> Représentant Entreprise :</div>
                  <div className="col-md-12">
                    <p>Haykel Mkaddem</p>
                  </div>
                  <span
                    style={{
                      height: 1,
                      width: "92%",
                      marginLeft: "4%",
                      backgroundColor: "#fff",
                      opacity: 0.5,
                      marginBottom: 25,
                      marginTop: 10,
                    }}
                  ></span>
                  <div className="col-md-6">Total</div>
                  <div className="col-md-6 text-right">2600.50 $</div>
                  <span
                    style={{
                      height: 1,
                      width: "92%",
                      marginLeft: "4%",
                      backgroundColor: "#fff",
                      opacity: 0.5,
                      marginBottom: 25,
                      marginTop: 10,
                    }}
                  ></span>
                  <div className="d-flex align-items-center justify-content-center w-100">
                    <button className="btn-lg bg-white my-text-primary commande-btn">
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
