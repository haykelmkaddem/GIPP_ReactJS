import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
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
        setCommande(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div>
      <Header />
      {!isLoading && (
        <div className="my-main mt-5 mb-5">
          <div className="container ">
            <div className="row ">
              <div className="col-md-2"></div>
              <div className="col-md-8 p-0">
                <h5>Liste Des Commandes</h5>
                {commande.map((c, index) => (
                  <>
                    <span class="accordion-header" id={`headingOne${index}`}>
                      <button
                        onClick={() => setVisibleA(!visibleA)}
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
                        <h5 style={{ color: "white" }}>
                          GIPP029c2649414005929235
                        </h5>
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
                      className="container"
                      id={`collapseOne${index}`}
                      class="accordion-collapse collapse"
                      aria-labelledby={`headingOne${index}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row" style={{ marginTop: 15 }}>
                        <div className="col-md-8">
                          <p style={{ fontSize: 18, color: "#0e204d" }}>
                            GIPP029c2649414005929235
                          </p>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-2">
                          <p
                            style={{
                              fontSize: 20,
                              color: "green",
                              fontWeight: "bold",
                            }}
                          >
                            Accepté
                          </p>
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
                                Haykel Mkaddem
                              </p>
                              <p
                                style={{
                                  fontSize: 15,
                                  marginTop: -15,
                                  color: "#0e204d",
                                }}
                              >
                                mkaddemhaykel@gmail.com
                              </p>
                              <p
                                style={{
                                  fontSize: 15,
                                  marginTop: -15,
                                  color: "#0e204d",
                                }}
                              >
                                28 176 222
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
                                ITfirst
                              </p>
                              <p
                                style={{
                                  fontSize: 15,
                                  marginTop: -15,
                                  color: "#0e204d",
                                }}
                              >
                                65A Cite Essaada Bardo, Tunis
                              </p>
                              <p
                                style={{
                                  fontSize: 15,
                                  marginTop: -15,
                                  color: "#0e204d",
                                }}
                              >
                                2000 Tunisie
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
                            cash on delivery
                          </p>
                        </div>
                        <div className="col-md-4" style={{ marginTop: 20 }}>
                          <p
                            style={{
                              fontSize: 20,
                              color: "#0e204d",
                            }}
                          >
                            18-04-2022 21:29
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
                              <tr>
                                <th scope="row">Sardine1 Sardine1 </th>
                                <td>300</td>
                                <td>29 Dt</td>
                                <td>8700 Dt</td>
                              </tr>
                              <tr>
                                <th scope="row">Sardine1 Sardine1 </th>
                                <td>300</td>
                                <td>29 Dt</td>
                                <td>8700 Dt</td>
                              </tr>
                              <tr>
                                <th scope="row">Sardine1 Sardine1 </th>
                                <td>300</td>
                                <td>29 Dt</td>
                                <td>8700 Dt</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-8">
                          <h5>Total : 13600 Dt</h5>
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

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default MesCommandes;
