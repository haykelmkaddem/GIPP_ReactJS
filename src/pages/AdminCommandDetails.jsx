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
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const COMMANDE_DETAILS_URL = "http://127.0.0.1:8000/commande/show";

const AdminCommandDetails = ({ route, navigation }) => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [commandeDetails, setCommandeDetails] = useState("");

  function fetchCommandesDetails() {
    axios
      .post(COMMANDE_DETAILS_URL, {
        commandeId: id,
      })
      .then((response) => {
        setCommandeDetails(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchCommandesDetails();
  }, [commandeDetails]);

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
                    <h4>Détails de la commande</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item">
                        <NavLink to="/admincommandlist">
                          <a>Liste des commandes</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">
                        Détails de la commande
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
                            {commandeDetails.statut_commande == "Livrée" && (
                              <div
                                className="col-md-12"
                                style={{
                                  color: "green",
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  marginBottom: 22,
                                }}
                              >
                                {commandeDetails.statut_commande}
                              </div>
                            )}
                            {commandeDetails.statut_commande == "En Cours" && (
                              <div
                                className="col-md-12"
                                style={{
                                  color: "orange",
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  marginBottom: 22,
                                }}
                              >
                                {commandeDetails.statut_commande}
                              </div>
                            )}
                            {commandeDetails.statut_commande == "Annulée" && (
                              <div
                                className="col-md-12"
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  marginBottom: 22,
                                }}
                              >
                                {commandeDetails.statut_commande}
                              </div>
                            )}

                            <div
                              className="col-md-12"
                              style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                marginBottom: 32,
                              }}
                            >
                              {commandeDetails.reference}
                            </div>
                            <div className="col-md-6">
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: 25,
                                  border: "0.5px solid #0e204d",
                                  borderRadius: 15,
                                  padding: 15,
                                }}
                              >
                                <h3>Représentant de l'entreprise :</h3>
                                <p>
                                  {commandeDetails.user.prenom}{" "}
                                  {commandeDetails.user.nom}
                                </p>
                                <p>{commandeDetails.user.email}</p>
                                <p>{commandeDetails.user.telephone}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: 25,
                                  border: "0.5px solid #0e204d",
                                  borderRadius: 15,
                                  padding: 15,
                                }}
                              >
                                <h3>Entreprise :</h3>
                                <p>{commandeDetails.user.entreprise.nom}</p>
                                <p>{commandeDetails.user.entreprise.adresse}</p>
                                <p>
                                  {commandeDetails.user.entreprise.code_postal}{" "}
                                  {commandeDetails.user.entreprise.pays}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: 25,
                                  border: "0.5px solid #0e204d",
                                  borderRadius: 15,
                                  padding: 15,
                                }}
                              >
                                <h3>Mode de paiement :</h3>
                                <p>{commandeDetails.methode_de_paiement}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: 25,
                                  border: "0.5px solid #0e204d",
                                  borderRadius: 15,
                                  padding: 15,
                                }}
                              >
                                <h3>Date de création :</h3>
                                <p>
                                  {commandeDetails.created_at.substr(0, 10)}{" "}
                                  {commandeDetails.created_at.substr(11, 5)}
                                </p>
                              </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="col-md-12 mt-5">
                              <table
                                className="table table-centered datatable dt-responsive nowrap "
                                style={{
                                  borderCollapse: "collapse",
                                  borderSpacing: "0",
                                  width: "100%",
                                }}
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th>Nom de produit</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {commandeDetails.produitVendus.map(
                                    (product, index) => (
                                      <tr key={index}>
                                        <td>{product.nom}</td>
                                        <td>{product.quantite}</td>
                                        <td>{product.prix} TND</td>
                                        <td>{product.totale} TND</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-6">
                              <p>Total : {commandeDetails.totale} TND</p>
                            </div>
                          </>
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
    </div>
  );
};

export default AdminCommandDetails;
