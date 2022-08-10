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
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
const USERS_URL = "http://127.0.0.1:8000/user/showallUsers";
const DELETE_USER_URL = "http://127.0.0.1:8000/user/delete";
const BLOCKED_USER_URL = "http://127.0.0.1:8000/user/blocked";
const NOTBLOCKED_USER_URL = "http://127.0.0.1:8000/user/notblocked";

const AdminUsers = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [users, setUsers] = useState([]);

  const AlertSupp = (userId) => {
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
          fetchDeleteUser(userId);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "User Deleted !",
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

  const AlertBloked = (userId) => {
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
        confirmButtonText: "Block",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchBlockedUser(userId);
          swalWithBootstrapButtons.fire("Block !", "User Block !", "success");
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

  const AlertNotBlocked = (userId) => {
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
        confirmButtonText: "Unblock",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchNotBlockedUser(userId);
          swalWithBootstrapButtons.fire(
            "Unblock !",
            "User Unblock !",
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

  function fetchUsers() {
    axios
      .post(USERS_URL)
      .then((response) => {
        setUsers(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchDeleteUser(userId) {
    axios
      .post(DELETE_USER_URL, {
        userId: userId,
      })
      .finally(() => {
        setPlayOnce(false);
      });
  }
  function fetchBlockedUser(userId) {
    setIsLoading(true);
    axios
      .post(BLOCKED_USER_URL, {
        userId: userId,
      })
      .then((response) => {
        if (response.data.message === "success") {
          fetchUsers();
        }
      })
      .finally(() => {});
  }
  function fetchNotBlockedUser(userId) {
    setIsLoading(true);
    axios
      .post(NOTBLOCKED_USER_URL, {
        userId: userId,
      })
      .then((response) => {
        if (response.data.message === "success") {
          fetchUsers();
        }
      })
      .finally(() => {});
  }

  useEffect(() => {
    if (!playOnce) {
      fetchUsers();
      setPlayOnce(true);
    }
  }, [users, playOnce]);

  function Users({ itemsPerPage }) {
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
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % users.length;
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
                    <h4>Users</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li className="breadcrumb-item active">Users</li>
                    </ol>
                  </div>
                </div>
                <div className="col-sm-6">
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

          <div className="container-fluid">
            <div className="page-content-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
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
                                <th>Document</th>
                                <th>LastName</th>
                                <th>FirstName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company Name</th>
                                <th>Address</th>
                                <th>Country</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems != null &&
                                currentItems.map((user, index) => (
                                  <tr key={index}>
                                    <td>
                                      <a
                                        href={`http://127.0.0.1:8000/uploads/${user.entreprise.document_de_reference}`}
                                        target="_blank"
                                      >
                                        <img
                                          src="/assets/BackOffice/images/pdfUser.png"
                                          style={{ width: 50, height: 50 }}
                                        />
                                      </a>
                                    </td>
                                    <td>{user.nom}</td>
                                    <td>{user.prenom}</td>
                                    <td>{user.email}</td>
                                    <td>{user.telephone}</td>
                                    <td>{user.entreprise.nom}</td>
                                    <td>{user.entreprise.adresse}</td>
                                    <td>{user.entreprise.pays}</td>
                                    <td id="tooltip-container8">
                                      <a
                                        className="text-danger"
                                        title="Delete"
                                        onClick={() => AlertSupp(user.id)}
                                      >
                                        <i className="mdi mdi-trash-can font-size-22"></i>
                                      </a>
                                      {user.is_blocked && (
                                        <a
                                          className="text-danger"
                                          title="Delete"
                                          onClick={() =>
                                            AlertNotBlocked(user.id)
                                          }
                                        >
                                          <i className="mdi mdi-account-off font-size-22"></i>
                                        </a>
                                      )}
                                      {!user.is_blocked && (
                                        <a
                                          className="text-success"
                                          title="Delete"
                                          onClick={() => AlertBloked(user.id)}
                                        >
                                          <i className="mdi mdi-account font-size-22"></i>
                                        </a>
                                      )}
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
      <Users itemsPerPage={10} />
    </div>
  );
};

export default AdminUsers;
