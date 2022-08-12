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
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
const SALONS_URL = "http://127.0.0.1:8000/salon/showall";
const SALON_DELETE_URL = "http://127.0.0.1:8000/salon/delete";

const AdminSalonList = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [salons, setSalons] = useState([]);

  const AlertSupp = (salonId) => {
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
          fetchdeleteSalon(salonId);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Salon Deleted !",
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

  function fetchdeleteSalon(salonId) {
    axios
      .post(SALON_DELETE_URL, {
        salonId: salonId,
      })
      .then((response) => {
        setPlayOnce(false);
      });
  }

  function fetchSalons() {
    axios
      .post(SALONS_URL)
      .then((response) => {
        setSalons(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchSalons();
      setPlayOnce(true);
    }
  }, [salons, playOnce]);

  function Salons({ itemsPerPage }) {
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
        setCurrentItems(salons.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(salons.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % salons.length;
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
                    <h4>Salons</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">Salons</li>
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
                        <NavLink to="/adminaddsalon">
                          <a
                            className="btn btn-success mb-2"
                            style={{ color: "white" }}
                          >
                            <i className="mdi mdi-plus me-2"></i> Ajouter un
                            salon
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
                                <th>Titre</th>
                                <th>Date</th>
                                <th>Heure de début</th>
                                <th>Heure de fin</th>
                                <th>Lieu</th>
                                <th>Maximum d'invitations</th>
                                <th>Action</th>
                                <th>Détails</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems != null &&
                                currentItems.map((salon, index) => (
                                  <tr key={index}>
                                    <td>{salon.titre}</td>
                                    <td>{salon.date.substr(0, 10)}</td>
                                    <td>{salon.temps_debut.substr(11, 5)}</td>
                                    <td>{salon.temps_fin.substr(11, 5)}</td>
                                    <td>{salon.lieu}</td>
                                    <td>{salon.max_invitation}</td>
                                    <td id="tooltip-container6">
                                      <a
                                        className="me-3 text-primary"
                                        title="Edit"
                                        onClick={() =>
                                          navigate(
                                            "/adminsalonedit/" + salon.id
                                          )
                                        }
                                      >
                                        <i className="mdi mdi-pencil font-size-18"></i>
                                      </a>
                                      <a
                                        className="text-danger"
                                        title="Delete"
                                        onClick={() => AlertSupp(salon.id)}
                                      >
                                        <i className="mdi mdi-trash-can font-size-18"></i>
                                      </a>
                                    </td>
                                    <td id="tooltip-container6">
                                      <span
                                        style={{
                                          color: "#7B83EA",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          navigate(
                                            "/adminsalondetails/" + salon.id
                                          );
                                        }}
                                      >
                                        Details
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
      <Salons itemsPerPage={10} />
    </div>
  );
};

export default AdminSalonList;
