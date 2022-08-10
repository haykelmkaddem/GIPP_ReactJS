import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { ImBlocked } from "react-icons/im";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const COMMANDE_URL = "http://127.0.0.1:8000/commande/showusercommande";

const MesCommandes = () => {
  const [visibleA, setVisibleA] = useState(false);
  const navigate = useNavigate();
  const [commande, setCommande] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);

  useEffect(() => {
    if (!playOnce) {
      fetchCommande();
      setPlayOnce(true);
    }
  }, [commande]);

  function fetchCommande() {
    axios
      .post(COMMANDE_URL, {
        userId: localStorage.getItem("id"),
      })
      .then((response) => {
        setCommande(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div>
      <Header />
      {isLoading && (
        <div class="scene my-main mb-5">
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
      )}
      {!isLoading && (
        <>
          {commande.length === 0 ? (
            <div className=" my-main mt-5 mb-5 d-flex align-items-center justify-content-center">
              <div className="card py-5 w-50">
                <div className="container" style={{ textAlign: "center" }}>
                  <ImBlocked
                    style={{ fontSize: 80, color: "#0e204d", marginBottom: 20 }}
                  />
                  <h1 className="text-center">Vous n'avez pas de commande</h1>
                  <NavLink
                    to="/marketplace"
                    className="btn btn-link "
                    style={{ marginTop: 20 }}
                  >
                    <span>Marketplace</span>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-main mt-5 mb-5">
              <div className="container ">
                <div className="row ">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 p-0">
                    <h5>Liste Des Commandes</h5>
                    {commande.map((comm, index) => (
                      <>
                        <span
                          class="accordion-header"
                          id={`headingOne${index}`}
                          onClick={() => setVisibleA(!visibleA)}
                        >
                          <button
                            style={{
                              width: "100%",
                              height: 50,
                              backgroundColor: "#1D2A4D",
                              border: "0.5px solid white",
                              borderRadius: 15,
                              color: "white",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            class="accordion-button collapsed mb-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseOne${index}`}
                            aria-expanded="true"
                            aria-controls={`collapseOne${index}`}
                          >
                            <h5 style={{ color: "white" }}>{comm.reference}</h5>
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "row-reverse",
                              }}
                            >
                              <BiArrowToBottom
                                style={{
                                  fontSize: 40,
                                  marginTop: -7,
                                }}
                              />
                            </span>
                          </button>
                        </span>

                        <div
                          className="container mb-5"
                          id={`collapseOne${index}`}
                          class="accordion-collapse collapse"
                          aria-labelledby={`headingOne${index}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="row" style={{ marginTop: 15 }}>
                            <div className="col-md-8">
                              <p style={{ fontSize: 18, color: "#0e204d" }}>
                                {comm.reference}
                              </p>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-2">
                              {comm.statut_commande == "Livrée" && (
                                <p
                                  style={{
                                    fontSize: 20,
                                    color: "green",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {comm.statut_commande}
                                </p>
                              )}
                              {comm.statut_commande == "En Cours" && (
                                <p
                                  style={{
                                    fontSize: 20,
                                    color: "orange",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {comm.statut_commande}
                                </p>
                              )}
                              {comm.statut_commande == "Annulée" && (
                                <p
                                  style={{
                                    fontSize: 20,
                                    color: "red",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {comm.statut_commande}
                                </p>
                              )}
                            </div>
                            <div className="container">
                              <div
                                className="row"
                                style={{ justifyContent: "center" }}
                              >
                                <div
                                  className="col-md-5"
                                  style={{
                                    textAlign: "center",
                                    marginTop: 25,
                                    border: "0.5px solid #0e204d",
                                    borderRadius: 15,
                                    padding: 15,
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: 20,
                                      color: "#0e204d",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Représentant Entreprise :
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 15,
                                      marginTop: -12,
                                      color: "#0e204d",
                                    }}
                                  >
                                    {comm.user.prenom} {comm.user.nom}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 15,
                                      marginTop: -15,
                                      color: "#0e204d",
                                    }}
                                  >
                                    {comm.user.email}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 15,
                                      marginTop: -15,
                                      color: "#0e204d",
                                    }}
                                  >
                                    {comm.user.telephone}
                                  </p>
                                </div>
                                <div className="col-md-1"></div>
                                <div
                                  className="col-md-5"
                                  style={{
                                    textAlign: "center",
                                    marginTop: 25,
                                    border: "0.5px solid #0e204d",
                                    borderRadius: 15,
                                    padding: 15,
                                  }}
                                >
                                  <p
                                    style={{
                                      fontSize: 20,
                                      color: "#0e204d",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Entreprise :
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 15,
                                      marginTop: -12,
                                      color: "#0e204d",
                                    }}
                                  >
                                    {comm.user.entreprise.nom}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 15,
                                      marginTop: -15,
                                      color: "#0e204d",
                                    }}
                                  >
                                    {comm.user.entreprise.adresse}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: 15,
                                      marginTop: -15,
                                      color: "#0e204d",
                                    }}
                                  >
                                    {comm.user.entreprise.code_postal}{" "}
                                    {comm.user.entreprise.pays}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-8" style={{ marginTop: 20 }}>
                              <p
                                style={{
                                  fontSize: 20,
                                  color: "#0e204d",
                                  fontWeight: "bold",
                                }}
                              >
                                Methode De Paiement :
                              </p>
                              <p style={{ marginTop: -8, fontSize: 18 }}>
                                {comm.methode_de_paiement}
                              </p>
                            </div>
                            <div className="col-md-4" style={{ marginTop: 20 }}>
                              <p
                                style={{
                                  fontSize: 20,
                                  color: "#0e204d",
                                }}
                              >
                                {comm.created_at.substr(0, 10)}{" "}
                                {comm.created_at.substr(11, 5)}
                              </p>
                            </div>
                            <div className="col-md-12">
                              <table class="table">
                                <thead
                                  style={{
                                    backgroundColor: "#0e204d",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  <tr>
                                    <th scope="col">Nom De Produit</th>
                                    <th scope="col">Quantité</th>
                                    <th scope="col">Prix</th>
                                    <th scope="col">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {comm.produitVendus.map((product, index) => (
                                    <tr key={index}>
                                      <th scope="row"> {product.nom} </th>
                                      <td>{product.quantite}</td>
                                      <td>{product.prix} Dt</td>
                                      <td>{product.totale} Dt</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-6">
                              <h5>Total : {comm.totale} TND</h5>
                            </div>
                            <div className="col-md-6">
                              <button
                                style={{ borderRadius: 15 }}
                                className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 margin_top5 whiteonhpver"
                                type="submit"
                              >
                                For More Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="col-md-2"></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default MesCommandes;
