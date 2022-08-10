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
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
// import { moveFile } from "move-file";
// const moveFile = require("@npmcli/move-file");
// const cpFile = require("cp-file");
const COMMANDES_URL = "http://127.0.0.1:8000/commande/showall";
const UPDATE_COMMANDES_URL = "http://127.0.0.1:8000/commande/edit";

const AdminCommandList = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const options = ["En Cours", "Livrée", "Annulée"];

  function fetchCommandes() {
    axios
      .post(COMMANDES_URL)
      .then((response) => {
        let tab = [];
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].statut_commande == "En Cours") {
            tab.push(response.data[index]);
          }
        }
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].statut_commande == "Livrée") {
            tab.push(response.data[index]);
          }
        }
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].statut_commande == "Annulée") {
            tab.push(response.data[index]);
          }
        }
        setCommandes(tab);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchUpdateCommandes(id, status) {
    axios
      .post(UPDATE_COMMANDES_URL, {
        commandeId: id,
        statutCommande: status,
      })
      .finally(() => {
        setPlayOnce(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchCommandes();
      setPlayOnce(true);
    }
  }, [commandes, playOnce]);

  function Commandes({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    useEffect(() => {
      if (!isLoading) {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(commandes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(commandes.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % commandes.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div className="main-content">
        <div className="page-content">
          <div className="page-title-box">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="page-title">
                    <h4>Orders</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">Orders</li>
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
                      <div>
                        <div>
                          <NavLink to="/admindashboard">
                            <a
                              className="btn btn-success mb-2"
                              style={{ color: "white" }}
                            >
                              Dashboard
                            </a>
                          </NavLink>
                        </div>
                      </div>
                      {isLoading && (
                        <div
                          style={{ height: height - 100 }}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <CircularProgress color="primary" size={80} />
                        </div>
                      )}

                      {!isLoading && (
                        <div className="table-responsive mt-3">
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
                                <th>Reference</th>
                                <th>Created At</th>
                                <th>Total</th>
                                <th>Modified At</th>
                                <th>Status</th>
                                <th>Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems != null &&
                                currentItems.map((commande, index) => (
                                  <>
                                    {commande.statut_commande == "En Cours" && (
                                      <tr key={index}>
                                        <td>{commande.reference}</td>
                                        <td>{commande.created_at}</td>
                                        <td>{commande.totale} Dt</td>

                                        <td>{commande.date_modification}</td>
                                        <td>
                                          <select
                                            id="country"
                                            name="country"
                                            onChange={(e) =>
                                              fetchUpdateCommandes(
                                                commande.id,
                                                e.target.value
                                              )
                                            }
                                            value={commande.statut_commande}
                                            style={{
                                              backgroundColor: "orange",
                                              color: "white",
                                              borderColor: "orange",
                                            }}
                                          >
                                            {options.map((o) => (
                                              <option key={o} value={o}>
                                                {o}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td id="tooltip-container11">
                                          <a
                                            className="me-3 text-primary"
                                            data-bs-placement="top"
                                            style={{
                                              marginLeft: 14,
                                            }}
                                            onClick={() => {
                                              navigate(
                                                "/admincommanddetails/" +
                                                  commande.id
                                              );
                                            }}
                                          >
                                            <i className="mdi mdi-details font-size-22"></i>
                                          </a>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                ))}
                              {currentItems != null &&
                                currentItems.map((commande, index) => (
                                  <>
                                    {commande.statut_commande == "Livrée" && (
                                      <tr key={index}>
                                        <td>{commande.reference}</td>
                                        <td>{commande.created_at}</td>
                                        <td>{commande.totale} Dt</td>

                                        <td>{commande.date_modification}</td>
                                        <td>
                                          <select
                                            id="country"
                                            name="country"
                                            onChange={(e) =>
                                              fetchUpdateCommandes(
                                                commande.id,
                                                e.target.value
                                              )
                                            }
                                            value={commande.statut_commande}
                                            style={{
                                              backgroundColor: "green",
                                              color: "white",
                                              borderColor: "green",
                                            }}
                                          >
                                            {options.map((o) => (
                                              <option key={o} value={o}>
                                                {o}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td id="tooltip-container11">
                                          <a
                                            className="me-3 text-primary"
                                            data-bs-placement="top"
                                            style={{
                                              marginLeft: 14,
                                            }}
                                            onClick={() => {
                                              navigate(
                                                "/admincommanddetails/" +
                                                  commande.id
                                              );
                                            }}
                                          >
                                            <i className="mdi mdi-details font-size-22"></i>
                                          </a>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                ))}
                              {currentItems != null &&
                                currentItems.map((commande, index) => (
                                  <>
                                    {commande.statut_commande == "Annulée" && (
                                      <tr key={index}>
                                        <td>{commande.reference}</td>
                                        <td>{commande.created_at}</td>
                                        <td>{commande.totale} Dt</td>

                                        <td>{commande.date_modification}</td>
                                        <td>
                                          <select
                                            id="country"
                                            name="country"
                                            onChange={(e) =>
                                              fetchUpdateCommandes(
                                                commande.id,
                                                e.target.value
                                              )
                                            }
                                            value={commande.statut_commande}
                                            style={{
                                              backgroundColor: "red",
                                              color: "white",
                                              borderColor: "red",
                                            }}
                                          >
                                            {options.map((o) => (
                                              <option key={o} value={o}>
                                                {o}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td id="tooltip-container11">
                                          <a
                                            className="me-3 text-primary"
                                            style={{
                                              marginLeft: 14,
                                            }}
                                            onClick={() => {
                                              navigate(
                                                "/admincommanddetails/" +
                                                  commande.id
                                              );
                                            }}
                                          >
                                            <i className="mdi mdi-details font-size-22"></i>
                                          </a>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                ))}
                            </tbody>
                          </table>
                          <div className="container">
                            <ReactPaginate
                              className="pagination justify-content-center"
                              previousLabel={"<previous"}
                              nextLabel={"next>"}
                              breakLabel={"..."}
                              breakClassName={"break-me"}
                              pageCount={pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageClick}
                              containerClassName={"pagination"}
                              subContainerClassName={"pages pagination"}
                              activeClassName={"active"}
                              pageClassName={"page-item"}
                              pageLinkClassName={"page-link"}
                              previousClassName={"page-item"}
                              nextClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextLinkClassName={"page-link"}
                              disabledClassName={"disabled"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-admin-1">
      <AdminHeader />
      <Commandes itemsPerPage={10} />
    </div>
  );
};

export default AdminCommandList;
