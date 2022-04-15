import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CommandList = () => {
  return (
    <div>
      <Header />
      <div className="container my-main mb-5 mt-5">
        <div className="row mb-5">
          <table class="table shadow mb-5 pb-5" style={{ borderRadius: 15 }}>
            <thead
              style={{
                borderRadius: 15,
                backgroundColor: "#0e204d",
                color: "#fff",
              }}
            >
              <tr>
                <th scope="col" style={{ textAlign: "center", width: "20%" }}>
                  Référence Commande
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Date Commande
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  État de Commance
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Détails
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
                  1458MKHGIPP
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
                  20-05-2022
                </td>
                <td
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    color: "orange",
                    padding: 18,
                    fontSize: 18,
                  }}
                >
                  En Cours
                </td>
                <td
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    color: "#0e204d",
                  }}
                >
                  <button
                    className="btn rounded-pill"
                    style={{
                      backgroundColor: "rgb(19, 198, 221)",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Détails
                  </button>
                </td>
              </tr>
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
                  1458MKHGIPP
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
                  20-05-2022
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
                  Livré
                </td>
                <td
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    color: "#0e204d",
                  }}
                >
                  <button
                    className="btn rounded-pill"
                    style={{
                      backgroundColor: "rgb(19, 198, 221)",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Détails
                  </button>
                </td>
              </tr>
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
                  1458MKHGIPP
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
                  20-05-2022
                </td>
                <td
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    color: "red",
                    padding: 18,
                    fontSize: 18,
                  }}
                >
                  Annulé
                </td>
                <td
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    color: "#0e204d",
                  }}
                >
                  <button
                    className="btn rounded-pill"
                    style={{
                      backgroundColor: "rgb(19, 198, 221)",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Détails
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommandList;
