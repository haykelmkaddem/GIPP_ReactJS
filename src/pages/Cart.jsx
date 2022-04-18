import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const CART_URL = "http://127.0.0.1:8000/panier/showall";
const UPDATE_QT_URL = "http://127.0.0.1:8000/panier/editQt";
const USER_URL = "http://127.0.0.1:8000/user/show";
const DELETE_CART_URL = "http://127.0.0.1:8000/panier/delete";
const COMMANDE_URL = "http://127.0.0.1:8000/commande/new";

const Cart = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadinguser, setIsLoadinguser] = useState(true);
  const [palyOnce, setPalyOnce] = useState(false);
  const [total, setTotal] = useState(0);
  const AlertSupp = (prodId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchDeleteCart(prodId);
          swalWithBootstrapButtons.fire(
            "Supprimé!",
            "Le Produit a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "La Supprission a été annulé :)",
            "error"
          );
        }
      });
  };

  useEffect(() => {
    if (!palyOnce) {
      fetchCart();
      fetchUser();
      setPalyOnce(true);
    }
  }, [productList]);

  useEffect(() => {
    if (!isLoading) {
      let newTotal = 0;
      productList.map((cl) => {
        if (cl.produit.discount !== null) {
          newTotal = newTotal + cl.produit.discount * cl.quantite;
        } else {
          newTotal = newTotal + cl.produit.prix * cl.quantite;
        }
      });
      setTotal(newTotal);
    }
  }, [isLoading]);

  function updateQt(newQt, id) {
    let newProductList = [];
    productList.map((cl) => {
      if (cl.id == id) {
        if (newQt >= cl.produit.min && newQt <= cl.produit.max) {
          cl.quantite = newQt;
          console.log(newQt);
          fetchUpdateQt(id, newQt);
        }
      }
      newProductList.push(cl);
    });
    setProductList(newProductList);
    let newTotal = 0;
    productList.map((cl) => {
      if (cl.produit.discount !== null) {
        newTotal = newTotal + cl.produit.discount * cl.quantite;
      } else {
        newTotal = newTotal + cl.produit.prix * cl.quantite;
      }
    });
    setTotal(newTotal);
  }

  function fetchCart() {
    axios
      .post(CART_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setProductList(response.data);
        console.log(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function fetchCommande() {
    axios
      .post(COMMANDE_URL, {
        userId: localStorage.getItem("id"),
        statutCommande: "En Cours",
        totale: total,
        commentaire: "",
        methodeDePaiement: "cash on delivery",
      })
      .finally(() => {
        setIsLoading(false);
        fetchCart();
      });
  }

  const AlertCommande = () => {
    fetchCommande();
    Swal.fire(
      "Succés!",
      "Vérifier Votre Mail Pour Consulter La Facture :)",
      "success"
    );
  };

  function fetchDeleteCart(id) {
    axios
      .post(DELETE_CART_URL, {
        panierId: id,
      })
      .finally(() => {
        setIsLoading(false);
        fetchCart();
      });
  }

  function fetchUser() {
    axios
      .post(USER_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoadinguser(false);
      });
  }

  function fetchUpdateQt(panierId, qt) {
    axios.post(UPDATE_QT_URL, {
      panierId: panierId,
      quantite: qt,
    });
  }
  return (
    <div>
      <Header />
      {!isLoading && (
        <>
          {productList.length > 0 ? (
            <div className="my-main mt-5 mb-5">
              <div className="container ">
                <div className="row ">
                  <div className="col-md-8 p-0">
                    <h5>Panier</h5>

                    {productList.map((product, index) => (
                      <div
                        className="container cart-left-container"
                        key={index}
                      >
                        <div className="row">
                          <div className="col-md-2 cart-item cart-product-image">
                            <img src="assets/FrontOffice/images/portfolio/portfolio-02-770x770.jpg" />
                          </div>
                          <div className="col-md-4 cart-item">
                            <div className="cart-product-description">
                              <p>{product.produit.nom}</p>
                              <h6 className="cart-price">
                                {product.produit.discount == null ? (
                                  <span className="new-price px-2">
                                    {product.produit.prix} Dt
                                  </span>
                                ) : (
                                  <span className="new-price px-2">
                                    {product.produit.discount} Dt
                                  </span>
                                )}
                                {product.produit.discount !== null && (
                                  <>
                                    <span className="old-price px-2">
                                      {product.produit.prix} Dt
                                    </span>
                                    <span className="badge badge-dark">
                                      {(
                                        100 -
                                        (product.produit.discount * 100) /
                                          product.produit.prix
                                      ).toFixed(2)}
                                      %
                                    </span>
                                  </>
                                )}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-3  cart-item ">
                            <table>
                              <tr>
                                <td>
                                  <button
                                    className="btn product-price-btn moin"
                                    onClick={() =>
                                      updateQt(product.quantite - 1, product.id)
                                    }
                                  >
                                    -
                                  </button>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="product-price-input d-flex justify-content-center align-items-center text-center"
                                    // value={product.quantite}
                                    // onChange={(e) =>
                                    //   this.setState({ inputValue: e.target.value })
                                    // }
                                    defaultValue={product.quantite}
                                    key={product.quantite}
                                  />
                                  {/* <span className="product-price-input d-flex justify-content-center align-items-center text-center">
                                {product.quantite}
                              </span> */}
                                </td>
                                <td>
                                  <button
                                    className="btn product-price-btn plus"
                                    onClick={() =>
                                      updateQt(product.quantite + 1, product.id)
                                    }
                                  >
                                    +
                                  </button>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div className="col-md-2  cart-item ">
                            {product.produit.discount == null ? (
                              <div className="cart-product-price">
                                {product.quantite * product.produit.prix} Dt
                              </div>
                            ) : (
                              <div className="cart-product-price">
                                {product.quantite * product.produit.discount} Dt
                              </div>
                            )}
                          </div>
                          <div
                            className="col-md-1 cart-item"
                            onClick={() => AlertSupp(product.id)}
                          >
                            <AiFillDelete className="cart-delete-icon" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-4 h-100">
                    <div className="cart-right-container my-bg-color-primary container-fluid">
                      <div className="row">
                        <div className="col-md-6">
                          {productList.length} Articles
                        </div>
                        <div className="col-md-6 text-right">{total} Dt</div>
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
                          {!isLoadinguser && <p>{user.entreprise.adresse}</p>}
                        </div>
                        <div className="col-md-12"> Entreprise :</div>
                        <div className="col-md-12">
                          <p>
                            {!isLoadinguser && <p>{user.entreprise.nom}</p>}
                          </p>
                        </div>
                        <div className="col-md-12">
                          Représentant Entreprise :
                        </div>
                        <div className="col-md-12">
                          {!isLoadinguser && (
                            <p>
                              {user.prenom} {user.nom}
                            </p>
                          )}
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
                        <div className="col-md-6 text-right">{total} Dt</div>
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
                          <button
                            className="btn-lg bg-white my-text-primary commande-btn"
                            onClick={() => AlertCommande()}
                          >
                            Commander
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-main mt-5 mb-5">
              <div className="container ">
                <div className="row ">
                  <div className="col-md-8 p-0">
                    <h5>Panier</h5>
                    <p>panier Vide !</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
