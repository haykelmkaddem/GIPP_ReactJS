import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const CommandDetails = () => {
  const { isLoaded } = useJsApiLoader({
    //googleMapsApiKey: "AIzaSyCvEOL7jnq5ic6PpL7MXLCl8YYmdMAUNtg",
    googleMapsApiKey: "AIzaSyC7FWABDaJOgCTkZkUr2qqKDwX5ocTe__E&language=fr",
  });
  if (!isLoaded) {
    return <Header />;
  }
  return (
    <div>
      <Header />
      <div className="container my-main mb-5 mt-5">
        <div className="row mb-5">
          <div className="col-md-6">
            <h5>Référence : 1458MKHGIPP</h5>
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  <h6 style={{ display: "inline" }}>État :</h6>
                </div>
                <div
                  className="col-md-10"
                  style={{ marginLeft: -25, fontSize: 18, color: "#0e204d" }}
                >
                  <p>En Cours</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  <h6 style={{ display: "inline" }}>Date :</h6>
                </div>
                <div
                  className="col-md-10"
                  style={{ marginLeft: -25, fontSize: 18, color: "#0e204d" }}
                >
                  <p>23-06-2022</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h6>Transporteur :</h6>
                </div>
                <div
                  className="col-md-8"
                  style={{ marginLeft: -40, fontSize: 18, color: "#0e204d" }}
                >
                  <p>Livraison à domicile</p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <h6>Méthode de paiement :</h6>
                </div>
                <div
                  className="col-md-7"
                  style={{ marginLeft: -12, fontSize: 18, color: "#0e204d" }}
                >
                  <p>Paiement à la livraison</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6>Adresse de Livraison :</h6>{" "}
            <p style={{ fontSize: 18, color: "#0e204d" }}>Musée Bardo, Tunis</p>
            <GoogleMap
              center={{ lat: 36.80746315955567, lng: 10.137114639251674 }}
              zoom={15}
              mapContainerStyle={{
                width: "100%",
                height: 150,
                borderRadius: 15,
              }}
            >
              <Marker
                position={{ lat: 36.80746315955567, lng: 10.137114639251674 }}
              />
            </GoogleMap>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <table
                  class="table shadow mb-5 pb-5 mt-3"
                  style={{ borderRadius: 15 }}
                >
                  <thead
                    style={{
                      borderRadius: 15,
                      backgroundColor: "#0e204d",
                      color: "#fff",
                    }}
                  >
                    <tr>
                      <th
                        scope="col"
                        style={{ textAlign: "center", width: "50%" }}
                      >
                        Nom de Produit
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Quantité
                      </th>
                      <th scope="col" style={{ textAlign: "center" }}>
                        Prix
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          color: "#0e204d",
                          padding: 18,
                          fontSize: 18,
                        }}
                      >
                        Mon Premiére Produit GIPP
                      </th>
                      <td
                        style={{
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          color: "#0e204d",
                          padding: 18,
                          fontSize: 18,
                        }}
                      >
                        200
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          color: "green",
                          padding: 18,
                          fontSize: 18,
                        }}
                      >
                        350$
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-4"></div>
              <div
                className="col-md-4 mb-5 pb-5"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <h5>Total : 5550$</h5>
                <button
                  className="btn rounded-pill"
                  style={{
                    backgroundColor: "rgb(19, 198, 221)",
                    color: "white",
                  }}
                >
                  Télécharger Votre Facture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommandDetails;
