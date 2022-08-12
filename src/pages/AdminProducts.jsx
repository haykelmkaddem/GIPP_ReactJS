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
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPaginate from "react-paginate";
import Rating from "@mui/material/Rating";
// import { moveFile } from "move-file";
// const moveFile = require("@npmcli/move-file");
// const cpFile = require("cp-file");
const PRODUCTS_URL = "http://127.0.0.1:8000/produit/showall";

const AdmProducts = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [produits, setProduits] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedcat, setCheckedcateg] = useState(false);
  const [var2, setVar2] = useState(false);
  const [value, setValue] = React.useState([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [var1, setVar1] = useState(false);
  const [priceChanged, setPriceChanged] = useState(false);
  const [checkList1, setCheckList1] = useState(["oui", "non"]);
  const [checked1, setChecked1] = useState([]);
  const [checkedPromotion, setCheckedPromotion] = useState(false);
  const [var3, setVar3] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [moyenRating, setMoyenRating] = React.useState([]);

  const filterPromotion = (array) => {
    if (checked1.length == 1) {
      console.log("am here ! 1");
      if (checked1[0] == "oui") {
        return array.filter((item) => item.discount != null);
      }
      if (checked1[0] == "non") {
        return array.filter((item) => item.discount == null);
      }
    }
    if (checked1.length == 2) {
      console.log("am here ! 2");
      return array;
    }
    return array;
  };

  const filterPrix = (array) => {
    if (priceChanged) {
      return array.filter(
        (item) => item.prix >= value[0] && item.prix <= value[1]
      );
    } else {
      return array;
    }
  };

  const filterCategories = (array) => {
    if (checkedcat) {
      let newArray = [];
      array.forEach((item) => {
        for (let i = 0; i < checked.length; i++) {
          if (item.categorie.nom == checked[i]) {
            newArray.push(item);
          }
        }
      });
      return newArray;
      // for (let i = 0; i < checked.length; i++) {
      //   productList.filter((item) => item.categorie.nom.includes(checked[i]));
      // }
      // return array;
      // return array.filter((item) => item.categorie.nom.includes(checked));
      // checked.map((item) => {
      //   return array.filter((product) => product.categorie.nom == item);
      // });
    } else {
      return array;
    }
  };

  const allFilters = () => {
    //Filter options updated so apply all filters here
    let result = produits;
    result = filterPrix(result);
    result = filterCategories(result);
    result = filterPromotion(result);
    console.log("resultat : " + result);
    setFilteredList(result);
  };
  useEffect(() => {
    allFilters();
  }, [priceChanged, checkedcat, checkedPromotion, var1, var2, var3]);

  const clear = () => {
    setChecked1([]);
    setChecked([]);
    setValue([priceMin, priceMax]);
    setCheckedPromotion(false);
    setCheckedcateg(false);
    setPriceChanged(false);
  };
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue[0] == priceMin && newValue[1] == priceMax) {
      setPriceChanged(false);
    } else {
      setPriceChanged(true);
      setVar1(!var1);
    }
  };

  function fetchProducts() {
    axios
      .post(PRODUCTS_URL)
      .then((response) => {
        setProduits(response.data.slice().reverse());
        let max = 0;
        let min = 0;
        if (response.data[0].discount == null) {
          max = response.data[0].prix;
          min = response.data[0].prix;
        } else {
          max = response.data[0].discount;
          min = response.data[0].discount;
        }
        console.log("max : " + max, "min : " + min);
        let k = 0;
        for (let index = 0; index < response.data.length - 1; index++) {
          k = k + 1;
          console.log("index : " + index);
          if (max < response.data[index + 1].prix) {
            max = response.data[index + 1].prix;
          }
          if (min > response.data[index + 1].prix) {
            min = response.data[index + 1].prix;
          }
        }
        console.log("max : " + max, "min : " + min);
        console.log("k : " + k);
        setPriceMax(max);
        setPriceMin(min);
        setValue([min, max]);
        let categories = [];
        response.data.map((product) => {
          if (categories.includes(product.categorie.nom) === false) {
            categories.push(product.categorie.nom);
          }
        });
        setCheckList(categories);

        let avisProduits = [];
        response.data.map((product) => {
          if (product.length == 0) {
            let i = { id: product.id, moy: 0 };
            avisProduits.push(i);
          } else {
            let moyenne = 0;
            product.avis.map((avis) => {
              moyenne = moyenne + avis.etoile_nb;
            });
            let i = { id: product.id, moy: moyenne / product.avis.length };
            avisProduits.push(i);
          }
        });
        setMoyenRating(avisProduits);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    if (updatedList.length > 0) {
      setCheckedcateg(true);
      setVar2(!var2);
    } else {
      setCheckedcateg(false);
    }
  };
  const handleCheckPromotion = (event) => {
    var updatedList = [...checked1];
    if (event.target.checked) {
      updatedList = [...checked1, event.target.value];
    } else {
      updatedList.splice(checked1.indexOf(event.target.value), 1);
    }
    setChecked1(updatedList);
    if (updatedList.length > 0) {
      setCheckedPromotion(true);
      setVar3(!var3);
    } else {
      setCheckedPromotion(false);
    }
  };
  const isCheckedPromotion = (item) =>
    checked1.includes(item) ? "checked-item" : "not-checked-item";

  // Generate string of checked items
  var checkedItemsPromotion = checked1.length
    ? checked1.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
  useEffect(() => {
    if (!playOnce) {
      fetchProducts();
      setPlayOnce(true);
    }
  }, [produits]);

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
        setCurrentItems(produits.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(produits.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % produits.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        {isLoading && (
          <div class="col-lg-9">
            <div class="row">
              <div
                style={{ height: height - 100 }}
                className="d-flex align-items-center justify-content-center"
              >
                <CircularProgress color="primary" size={80} />
              </div>
            </div>
          </div>
        )}

        {!isLoading && (
          <div class="col-lg-9">
            <div class="row">
              {search == "" &&
                !priceChanged &&
                !checkedcat &&
                !checkedPromotion && (
                  <>
                    {currentItems != null &&
                      currentItems.map((product, index) => (
                        <div class="col-xl-4 col-sm-6" key={index}>
                          <div
                            class="card"
                            style={{ height: 350, borderRadius: 15 }}
                          >
                            <div class="card-body" style={{ padding: 0 }}>
                              <div class="product-img">
                                {product.discount !== null && (
                                  <div
                                    class="product-ribbon  bg-primary"
                                    style={{ margin: 10 }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 12,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {(
                                        100 -
                                        (product.discount * 100) / product.prix
                                      ).toFixed(2)}
                                      %
                                    </span>
                                    Off
                                  </div>
                                )}
                                <img
                                  src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                                  alt=""
                                  class="img-fluid mx-auto d-block"
                                  style={{
                                    height: 180,
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    marginBottom: 20,
                                  }}
                                />
                              </div>

                              <div class="text-center">
                                <a
                                  class="text-dark"
                                  onClick={() => {
                                    navigate(
                                      "/adminproductdetails/" + product.id
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <h5
                                    style={{
                                      fontWeight: "500",
                                      fontSize: 25,
                                    }}
                                  >
                                    {product.nom}
                                  </h5>
                                </a>

                                {product.discount !== null && (
                                  <h4 class="mt-3 mb-0">
                                    {product.discount}TND
                                    <span class="font-size-14 text-muted me-2">
                                      <del> {product.prix} TND</del>
                                    </span>
                                  </h4>
                                )}
                                {product.discount == null && (
                                  <h4 class="mt-3 mb-0">{product.prix}TND</h4>
                                )}

                                {moyenRating.map((avis) => {
                                  if (avis.id == product.id) {
                                    return (
                                      <div>
                                        <Rating
                                          name="half-rating-read"
                                          value={avis.moy}
                                          precision={0.5}
                                          readOnly
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                  </>
                )}
              {search != "" &&
                !priceChanged &&
                !checkedcat &&
                !checkedPromotion && (
                  <>
                    {produits
                      .filter((product) => {
                        return (
                          product.nom
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          product.description
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        );
                      })
                      .map((product, index) => (
                        <div class="col-xl-4 col-sm-6" key={index}>
                          <div
                            class="card"
                            style={{ height: 350, borderRadius: 15 }}
                          >
                            <div class="card-body" style={{ padding: 0 }}>
                              <div class="product-img">
                                {product.discount !== null && (
                                  <div
                                    class="product-ribbon  bg-primary"
                                    style={{ margin: 10 }}
                                  >
                                    <span
                                      style={{
                                        fontSize: 12,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {(
                                        100 -
                                        (product.discount * 100) / product.prix
                                      ).toFixed(2)}
                                      %
                                    </span>
                                    Off
                                  </div>
                                )}
                                <img
                                  src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                                  alt=""
                                  class="img-fluid mx-auto d-block"
                                  style={{
                                    height: 180,
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                    marginBottom: 20,
                                  }}
                                />
                              </div>

                              <div class="text-center">
                                <a
                                  class="text-dark"
                                  onClick={() => {
                                    navigate(
                                      "/adminproductdetails/" + product.id
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <h5
                                    style={{
                                      fontWeight: "500",
                                      fontSize: 25,
                                    }}
                                  >
                                    {product.nom}
                                  </h5>
                                </a>

                                {product.discount !== null && (
                                  <h4 class="mt-3 mb-0">
                                    {product.discount}Dt
                                    <span class="font-size-14 text-muted me-2">
                                      <del> {product.prix} Dt</del>
                                    </span>
                                  </h4>
                                )}
                                {product.discount == null && (
                                  <h4 class="mt-3 mb-0">{product.prix}Dt</h4>
                                )}

                                {moyenRating.map((avis) => {
                                  if (avis.id == product.id) {
                                    return (
                                      <div>
                                        <Rating
                                          name="half-rating-read"
                                          value={avis.moy}
                                          precision={0.5}
                                          readOnly
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              {(priceChanged || checkedcat || checkedPromotion) && (
                <>
                  {filteredList.length > 0 &&
                    filteredList.map((product, index) => (
                      <div class="col-xl-4 col-sm-6" key={index}>
                        <div
                          class="card"
                          style={{ height: 350, borderRadius: 15 }}
                        >
                          <div class="card-body" style={{ padding: 0 }}>
                            <div class="product-img">
                              {product.discount !== null && (
                                <div
                                  class="product-ribbon  bg-primary"
                                  style={{ margin: 10 }}
                                >
                                  <span
                                    style={{
                                      fontSize: 12,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {(
                                      100 -
                                      (product.discount * 100) / product.prix
                                    ).toFixed(2)}
                                    %
                                  </span>
                                  Off
                                </div>
                              )}
                              <img
                                src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                                alt=""
                                class="img-fluid mx-auto d-block"
                                style={{
                                  height: 180,
                                  borderTopLeftRadius: 15,
                                  borderTopRightRadius: 15,
                                  marginBottom: 20,
                                }}
                              />
                            </div>

                            <div class="text-center">
                              <a
                                class="text-dark"
                                onClick={() => {
                                  navigate(
                                    "/adminproductdetails/" + product.id
                                  );
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <h5
                                  style={{
                                    fontWeight: "500",
                                    fontSize: 25,
                                  }}
                                >
                                  {product.nom}
                                </h5>
                              </a>

                              {product.discount !== null && (
                                <h4 class="mt-3 mb-0">
                                  {product.discount}TND
                                  <span class="font-size-14 text-muted me-2">
                                    <del> {product.prix} TND</del>
                                  </span>
                                </h4>
                              )}
                              {product.discount == null && (
                                <h4 class="mt-3 mb-0">{product.prix}TND</h4>
                              )}

                              {moyenRating.map((avis) => {
                                if (avis.id == product.id) {
                                  return (
                                    <div>
                                      <Rating
                                        name="half-rating-read"
                                        value={avis.moy}
                                        precision={0.5}
                                        readOnly
                                      />
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="my-admin-1">
      <div id="layout-wrapper">
        <AdminHeader />
        <div class="main-content">
          <div class="page-content">
            <div class="page-title-box">
              <div class="container-fluid">
                <div class="row align-items-center">
                  <div class="col-sm-6">
                    <div class="page-title">
                      <h4>Liste des Produits</h4>
                      <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item">
                          <NavLink to="/admindashboard">
                            <a>GIPP</a>
                          </NavLink>
                        </li>
                        <li class="breadcrumb-item active">
                          Liste des Produits
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <NavLink to="/adminaddproduct">
                      <div class="float-end d-none d-sm-block">
                        <a class="btn btn-success" style={{ color: "white" }}>
                          Ajouter un produits
                        </a>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <div class="container-fluid">
              <div class="page-content-wrapper" style={{ minHeight: 500 }}>
                <div class="row">
                  {!isLoading && (
                    <div class="col-xl-3 col-lg-4">
                      <div class="card">
                        <div class="card-body">
                          <h4 class="header-title">Filtres</h4>

                          <div class="border p-3 rounded mt-4">
                            <h5
                              class="font-size-16"
                              style={{
                                height: 25,
                              }}
                            >
                              rechercher
                            </h5>

                            <div class="search-box me-2 mt-1">
                              <div class="position-relative">
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="rechercher..."
                                  defaultValue={search}
                                  onChange={(e) => {
                                    setSearch(e.target.value);
                                  }}
                                />
                                <i class="ti-search search-icon"></i>
                              </div>
                            </div>
                          </div>

                          <div class="border p-3 rounded mt-4">
                            <h5
                              class="font-size-16 custom-accordion"
                              style={{
                                height: 25,
                              }}
                            >
                              <a
                                href="#collapseExample3"
                                class="text-dark d-block"
                                data-bs-toggle="collapse"
                              >
                                Categories
                                <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                              </a>
                            </h5>
                            <div class="collapse show" id="collapseExample3">
                              <div class="mt-4">
                                {checkList.map((item, index) => (
                                  <div
                                    key={index}
                                    className="checklist-marketplace"
                                  >
                                    <Typography id="range-slider" gutterBottom>
                                      <input
                                        value={item}
                                        type="checkbox"
                                        onChange={handleCheck}
                                        id={"chkcat" + index}
                                        checked={checked.includes(item)}
                                      />
                                      <label
                                        className="label-chkcat"
                                        htmlFor={"chkcat" + index}
                                      >
                                        <span className={isChecked(item)}>
                                          &nbsp;{item}
                                        </span>
                                      </label>
                                    </Typography>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {`Items checked are: ${checkedItems}`}

                            {/* <div
                          id="accordion"
                          class="custom-accordion categories-accordion"
                        >
                          <div class="categories-group-card">
                            <a
                              href="#collapseOne"
                              class="categories-group-list collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="false"
                              aria-controls="collapseOne"
                            >
                              <i class="ti-desktop font-size-16 align-middle me-2"></i>
                              Electronic
                              <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                            </a>

                            <div
                              id="collapseOne"
                              class="collapse"
                              data-parent="#accordion"
                            >
                              <div>
                                <ul class="list-unstyled categories-list mb-0">
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Mobile
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Cemera
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Mobile accessories
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Computers
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Laptops
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Speakers
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div class="categories-group-card">
                            <a
                              href="#collapseTwo"
                              class="categories-group-list"
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              aria-controls="collapseTwo"
                            >
                              <i class="ti-archive font-size-16 align-middle me-2"></i>
                              Furniture
                              <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                            </a>
                            <div
                              id="collapseTwo"
                              class="collapse show"
                              data-parent="#accordion"
                            >
                              <div>
                                <ul class="list-unstyled categories-list mb-0">
                                  <li class="active">
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Chairs
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Tables
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Beds
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Seating
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div class="categories-group-card">
                            <a
                              href="#collapseThree"
                              class="categories-group-list collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              <i class="mdi mdi-pinwheel-outline font-size-16 align-middle me-2"></i>
                              Baby & Kids
                              <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                            </a>
                            <div
                              id="collapseThree"
                              class="collapse"
                              data-parent="#accordion"
                            >
                              <div>
                                <ul class="list-unstyled categories-list mb-0">
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Clothing
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Footwear
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Toys
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Baby care
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div class="categories-group-card">
                            <a
                              href="#collapseFour"
                              class="categories-group-list collapsed"
                              data-bs-toggle="collapse"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              <i class="mdi mdi-dumbbell font-size-16 align-middle me-2"></i>
                              Fitness
                              <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                            </a>
                            <div
                              id="collapseFour"
                              class="collapse"
                              data-parent="#accordion"
                            >
                              <div>
                                <ul class="list-unstyled categories-list mb-0">
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Gym equipment
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Yoga mat
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Dumbbells
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i class="mdi mdi-circle-medium me-1"></i>
                                      Protein supplements
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div> */}
                          </div>

                          <div class="border p-3 rounded mt-4">
                            <h5
                              class="font-size-16 custom-accordion"
                              style={{
                                height: 25,
                              }}
                            >
                              <a
                                href="#collapseExample2"
                                class="text-dark d-block"
                                data-bs-toggle="collapse"
                              >
                                Prix
                                <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                              </a>
                            </h5>
                            <div class="collapse show" id="collapseExample2">
                              <div class="mt-4">
                                <h6>Sélectionnez la gamme de prix</h6>
                                <div className="d-flex justify-content-center align-items-center text-center">
                                  <div
                                    style={{
                                      width: "90%",
                                    }}
                                  >
                                    <Slider
                                      value={value}
                                      onChange={rangeSelector}
                                      valueLabelDisplay="auto"
                                      max={priceMax}
                                      min={priceMin}
                                    />
                                    <div className="slider-bottom">
                                      <span>{value[0]}</span>
                                      <span>{value[1]}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div class="border p-3 rounded mt-4">
                        <h5
                          class="font-size-16 mb-4"
                          style={{
                            height: 25,
                          }}
                        >
                          Price
                        </h5>

                        <input type="text" id="pricerange" />
                      </div> */}

                          <div class="border p-3 rounded mt-4">
                            <h5
                              class="font-size-16 custom-accordion"
                              style={{
                                height: 25,
                              }}
                            >
                              <a
                                href="#collapseExample1"
                                class="text-dark d-block"
                                data-bs-toggle="collapse"
                              >
                                Promotion
                                <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                              </a>
                            </h5>
                            <div class="collapse show" id="collapseExample1">
                              <div class="mt-4">
                                {checkList1.map((item, index) => (
                                  <div
                                    key={index}
                                    className="checklist-marketplace"
                                  >
                                    <Typography id="range-slider" gutterBottom>
                                      <input
                                        value={item}
                                        type="checkbox"
                                        onChange={handleCheckPromotion}
                                        id={"chkcatProm" + index}
                                        checked={checked1.includes(item)}
                                      />
                                      <label
                                        className="label-chkcat"
                                        htmlFor={"chkcatProm" + index}
                                      >
                                        <span
                                          className={isCheckedPromotion(item)}
                                        >
                                          &nbsp;{item}
                                        </span>
                                      </label>
                                    </Typography>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* {`Items checked are: ${checkedItemsPromotion}`} */}
                            {/* <div class="collapse show" id="collapseExample1">
                          <div class="mt-4">
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productdiscountRadio6"
                                name="productdiscountRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productdiscountRadio6"
                              >
                                50% or more
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productdiscountRadio5"
                                name="productdiscountRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productdiscountRadio5"
                              >
                                40% or more
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productdiscountRadio4"
                                name="productdiscountRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productdiscountRadio4"
                              >
                                30% or more
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productdiscountRadio3"
                                name="productdiscountRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productdiscountRadio3"
                              >
                                25% or more
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productdiscountRadio2"
                                name="productdiscountRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productdiscountRadio2"
                              >
                                10% or more
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productdiscountRadio1"
                                name="productdiscountRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productdiscountRadio1"
                              >
                                Less than 10%
                              </label>
                            </div>
                          </div>
                        </div> */}
                          </div>

                          {/* <div class="border p-3 rounded mt-4">
                        <h5
                          class="font-size-16 mb-0 custom-accordion"
                          style={{
                            height: 25,
                          }}
                        >
                          <a
                            href="#collapseExample3"
                            class="text-dark d-block"
                            data-bs-toggle="collapse"
                          >
                            Customer Rating
                            <i class="mdi mdi-minus float-end accor-plus-icon"></i>
                          </a>
                        </h5>

                        <div class="collapse show" id="collapseExample3">
                          <div class="mt-4">
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productratingRadio5"
                                name="productratingRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productratingRadio5"
                              >
                                5 <i class="mdi mdi-star text-warning"></i> &
                                Above
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productratingRadio1"
                                name="productratingRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productratingRadio1"
                              >
                                4 <i class="mdi mdi-star text-warning"></i> &
                                Above
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productratingRadio2"
                                name="productratingRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productratingRadio2"
                              >
                                3 <i class="mdi mdi-star text-warning"></i> &
                                Above
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productratingRadio3"
                                name="productratingRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productratingRadio3"
                              >
                                2 <i class="mdi mdi-star text-warning"></i> &
                                Above
                              </label>
                            </div>
                            <div class="form-check mt-2">
                              <input
                                type="radio"
                                id="productratingRadio4"
                                name="productratingRadio1"
                                class="form-check-input"
                              />
                              <label
                                class="custom-control-label"
                                htmlFor="productratingRadio4"
                              >
                                1 <i class="mdi mdi-star text-warning"></i>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                  <Categories itemsPerPage={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmProducts;
