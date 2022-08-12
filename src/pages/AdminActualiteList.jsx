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
const ACTUALITIES_URL = "http://127.0.0.1:8000/actualite/showall";
const DELETE_ACTUALITY_URL = "http://127.0.0.1:8000/actualite/delete";

const AdminActualiteList = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [actualities, setActualities] = useState([]);

  const AlertSupp = (actualiteId) => {
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
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchdeleteActuality(actualiteId);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Actuality Deleted !",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Canceled",
            "Deletion has been canceled :)",
            "error"
          );
        }
      });
  };

  function fetchdeleteActuality(actualiteId) {
    axios
      .post(DELETE_ACTUALITY_URL, {
        actualiteId: actualiteId,
      })
      .then((response) => {
        setPlayOnce(false);
      });
  }

  function fetchActulities() {
    axios
      .post(ACTUALITIES_URL)
      .then((response) => {
        setActualities(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchActulities();
      setPlayOnce(true);
    }
  }, [actualities, playOnce]);

  function Actualities({ itemsPerPage }) {
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
        setCurrentItems(actualities.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(actualities.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % actualities.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div class="main-content">
        <div class="page-content">
          <div class="page-title-box">
            <div class="container-fluid">
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div class="page-title">
                    <h4>Actualités</h4>
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li class="breadcrumb-item active">Actualités</li>
                    </ol>
                  </div>
                </div>
                <div class="col-sm-6">
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

          <div class="container-fluid">
            <div class="page-content-wrapper">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div>
                        <NavLink to="/adminactualiteadd">
                          <a
                            className="btn btn-success mb-2"
                            style={{ color: "white" }}
                          >
                            <i className="mdi mdi-plus me-2"></i> Ajouter
                            Actualité
                          </a>
                        </NavLink>
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
                        <div class="table-responsive mt-3">
                          <table
                            class="table table-centered datatable dt-responsive nowrap "
                            style={{
                              borderCollapse: "collapse",
                              borderSpacing: "0",
                              width: "100%",
                            }}
                          >
                            <thead class="thead-light">
                              <tr>
                                <th>Image de couverture</th>
                                <th>Titre</th>
                                <th>Date</th>
                                <th style={{ width: 120 }}>Action</th>
                                <th style={{ width: 120 }}>Détails</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems != null &&
                                currentItems.map((actuality, index) => (
                                  <tr key={index}>
                                    <td style={{ width: 160 }}>
                                      <img
                                        src={`http://127.0.0.1:8000/uploads/${actuality.image}`}
                                        style={{ height: 80, width: 120 }}
                                      />
                                    </td>
                                    <td>{actuality.titre}</td>
                                    <td>
                                      {actuality.createdAt.substr(0, 10)}{" "}
                                      {actuality.createdAt.substr(11, 5)}
                                    </td>
                                    <td id="tooltip-container11">
                                      <a
                                        class="me-3 text-primary"
                                        title="Edit"
                                        onClick={() => {
                                          navigate(
                                            "/adminactualityedit/" +
                                              actuality.id
                                          );
                                        }}
                                      >
                                        <i class="mdi mdi-pencil font-size-18"></i>
                                      </a>
                                      <a
                                        class="text-danger"
                                        title="Delete"
                                        onClick={() => AlertSupp(actuality.id)}
                                      >
                                        <i class="mdi mdi-trash-can font-size-18"></i>
                                      </a>
                                    </td>
                                    <td id="tooltip-container11">
                                      <span
                                        style={{
                                          color: "#7B83EA",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          navigate(
                                            "/adminactualitedetails/" +
                                              actuality.id
                                          );
                                        }}
                                      >
                                        Détails
                                      </span>
                                    </td>
                                  </tr>
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
      <Actualities itemsPerPage={10} />
    </div>
  );
};

export default AdminActualiteList;
