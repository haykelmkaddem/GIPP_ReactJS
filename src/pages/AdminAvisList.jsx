import React from "react";
import AdminHeader from "../components/AdminHeader";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
const AVIS_URL = "http://127.0.0.1:8000/avis/showall";
const DELETE_AVIS_URL = "http://127.0.0.1:8000/avis/delete";

const AdminAvisList = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [avis, setAvis] = useState([]);

  const AlertSupp = (avisId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are You Sure ?",
        text: "You can't go back!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchdeleteAvis(avisId);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Avis Deleted !",
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

  function fetchAvis() {
    axios
      .post(AVIS_URL)
      .then((response) => {
        setAvis(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchAvis();
      setPlayOnce(true);
    }
  }, [avis, playOnce]);

  function fetchdeleteAvis(avisId) {
    axios
      .post(DELETE_AVIS_URL, {
        avisId: avisId,
      })
      .then((response) => {
        setPlayOnce(false);
      });
  }

  function Avis({ itemsPerPage }) {
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
        setCurrentItems(avis.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(avis.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % avis.length;
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
                    <h4>Comments</h4>
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li class="breadcrumb-item active">Comments</li>
                    </ol>
                  </div>
                </div>
                <div class="col-sm-6">
                  <NavLink to="/admindashboard">
                    <div class="float-end d-none d-sm-block">
                      <a class="btn btn-success" style={{ color: "white" }}>
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
                        <NavLink to="/admindashboard">
                          <a
                            class="btn btn-success mb-2"
                            style={{ color: "white" }}
                          >
                            Dashboard
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
                                <th>Product Name</th>
                                <th>User</th>
                                <th>Company</th>
                                <th> NB Stars</th>
                                <th>Comment</th>
                                <th style={{ width: 120 }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems != null &&
                                currentItems.map((av, index) => (
                                  <tr key={index}>
                                    <td>{av.produit.nom}</td>
                                    <td>
                                      {av.user.prenom} {av.user.nom}
                                    </td>
                                    <td>{av.user.entreprise.nom}</td>

                                    <td>{av.etoile_nb}</td>
                                    <td>{av.commentaire}</td>
                                    <td id="tooltip-container11">
                                      <a
                                        class="text-danger"
                                        title="Delete"
                                        onClick={() => AlertSupp(av.id)}
                                      >
                                        <i class="mdi mdi-trash-can font-size-18"></i>
                                      </a>
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
      <Avis itemsPerPage={10} />
    </div>
  );
};

export default AdminAvisList;
