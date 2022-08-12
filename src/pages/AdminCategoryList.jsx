import React from "react";
import AdminHeader from "../components/AdminHeader";
import { AiFillDelete } from "react-icons/ai";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CATEGORY_URL = "http://127.0.0.1:8000/categorie/showall";
const CATEGORY_DELETE_URL = "http://127.0.0.1:8000/categorie/delete";

const AdminCategoryList = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [categories, setCategories] = useState([]);

  const AlertSupp = (catId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas récupérer cette catégorie!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-la!",
        cancelButtonText: "Non, annulez!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetchdeleteCategory(catId);
          swalWithBootstrapButtons.fire(
            "Supprimée!",
            "Catégorie Supprimée !",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulée",
            "Suppression annulée :)",
            "error"
          );
        }
      });
  };

  function fetchdeleteCategory(categorieId) {
    axios
      .post(CATEGORY_DELETE_URL, {
        categorieId: categorieId,
      })
      .then((response) => {
        fetchCategories();
      });
  }

  function fetchCategories() {
    axios
      .post(CATEGORY_URL)
      .then((response) => {
        setCategories(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchCategories();
      setPlayOnce(true);
    }
  }, [categories]);

  function Categories({ itemsPerPage }) {
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
        setCurrentItems(categories.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(categories.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % categories.length;
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
                    <h4>Liste des Categories</h4>
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li class="breadcrumb-item active">
                        Liste des Categories
                      </li>
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

          <div
            class="card-body"
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              marginTop: -90,
              marginLeft: 12,
              marginRight: 12,
            }}
          >
            <div>
              <NavLink to="/admincategoryadd">
                <a class="btn btn-success mb-2" style={{ color: "white" }}>
                  <i class="mdi mdi-plus me-2"></i> Ajouter une catégorie
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
                    width: "90%",
                  }}
                >
                  <thead class="thead-light">
                    <tr>
                      <th>Nom de catégorie</th>
                      <th style={{ width: 180 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems != null &&
                      currentItems.map((categorie, index) => (
                        <tr key={index}>
                          <td>{categorie.nom}</td>
                          <td id="tooltip-container11">
                            <a
                              class="me-3 text-primary"
                              title="Edit"
                              onClick={() =>
                                navigate("/admincategoryadit/" + categorie.id)
                              }
                            >
                              <i class="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a
                              class="text-danger"
                              title="Delete"
                              onClick={() => AlertSupp(categorie.id)}
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
    );
  }

  return (
    <div className="my-admin-1">
      <AdminHeader />
      <Categories itemsPerPage={10} />
    </div>
  );
};

export default AdminCategoryList;
