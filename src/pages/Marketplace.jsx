import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
const PRODUCT_URL = "http://127.0.0.1:8000/produit/showall";

const Marketplace = ({ route, navigation }) => {
  // Our States
  const [value, setValue] = React.useState([]);
  const [checked, setChecked] = useState([]);
  const [checked1, setChecked1] = useState([]);
  const [checkedPromotion, setCheckedPromotion] = useState(false);
  const [checkedcat, setCheckedcateg] = useState(false);
  const [checkedDispo, setCheckedDispo] = useState([]);
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [checkList, setCheckList] = useState([]);
  const [checkList1, setCheckList1] = useState(["oui", "non"]);
  const [priceChanged, setPriceChanged] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredListLoading, setFilteredListLoading] = useState(true);
  const [filterStateMarketplace, setFilterStateMarketplace] = useState(true);
  const [var1, setVar1] = useState(false);
  const [var2, setVar2] = useState(false);
  const [var3, setVar3] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selected_language")
  );
  const [testLanguage, setTestLanguage] = useState(false);

  useEffect(() => {
    setInterval(() => {
      // if (selectedLanguage != localStorage.getItem("selected_language")) {
      //   setSelectedLanguage(localStorage.getItem("selected_language"));
      // }
      setSelectedLanguage(localStorage.getItem("selected_language"));
      // console.log(selectedLanguage);
    }, 500);
  }, []);
  // useEffect(() => {
  //   window.addEventListener("storage", (e) => {
  //     console.log("storage event");
  //     console.log(e);
  //     if (e.key === "selected_language") {
  //       setSelectedLanguage(e.newValue);
  //     }
  //   });
  // }, []);
  //   console.log("language from useEffect0");
  //   const language = localStorage.getItem("selected_language");
  //   console.log(language);
  //   setSelectedLanguage(language);
  // });
  // console.log("language from useEffect");
  // if (selectedLanguage !== localStorage.getItem("selected_language")) {
  //   setSelectedLanguage(localStorage.getItem("selected_language"));
  //   console.log("differ");
  // }
  // }, []);

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
    } else {
      return array;
    }
  };

  const allFilters = () => {
    //Filter options updated so apply all filters here
    let result = productList;
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
  // Add/Remove checked item from list
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

  // Return classes based on whether item is checked
  const isCheckedPromotion = (item) =>
    checked1.includes(item) ? "checked-item" : "not-checked-item";

  // Generate string of checked items
  var checkedItemsPromotion = checked1.length
    ? checked1.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Add/Remove checked item from list
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
  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  // Changing State when volume increases/decreases
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

  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);

  useEffect(() => {
    if (!playOnce) {
      setPlayOnce(true);
      fetchProduis();
    }
  }, [productList]);

  function fetchProduis() {
    axios
      .get(PRODUCT_URL)
      .then((response) => {
        let prod = [];
        response.data
          .slice()
          .reverse()
          .map((item) => {
            if (item.visibilite == true) {
              prod.push(item);
            }
          });
        setProductList(prod);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function Products({ itemsPerPage }) {
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
        setCurrentItems(productList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(productList.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % productList.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        {/* filterrrrrrrrrr */}
        {(priceChanged || checkedcat || checkedPromotion) && (
          <>
            {isLoading && (
              <div class="scene">
                <div class="plane">
                  <div class="cube cube--0">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--0"></div>
                  <div class="cube cube--1">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--1"></div>
                  <div class="cube cube--2">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--2"></div>
                  <div class="cube cube--3">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--3"></div>
                  <div class="cube cube--4">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--4"></div>
                  <div class="cube cube--5">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--5"></div>
                  <div class="cube cube--6">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--6"></div>
                  <div class="cube cube--7">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--7"></div>
                </div>
              </div>
            )}
            <div className="col-md-9">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title">
                      {selectedLanguage != "Français" &&
                        selectedLanguage != "Anglais" &&
                        selectedLanguage != "Arabe" &&
                        selectedLanguage != "Italien" && (
                          <div className="title-header">
                            <h3>Marketplace</h3>
                            <h2 className="title">
                              Bienvenue Dans Notre Marketplace
                            </h2>
                          </div>
                        )}
                      {selectedLanguage == "Français" && (
                        <div className="title-header">
                          <h3>Marketplace</h3>
                          <h2 className="title">
                            Bienvenue Dans Notre Marketplace
                          </h2>
                        </div>
                      )}
                      {selectedLanguage == "Anglais" && (
                        <div className="title-header">
                          <h3>Marketplace</h3>
                          <h2 className="title">Welcome To Our Marketplace</h2>
                        </div>
                      )}
                      {selectedLanguage == "Arabe" && (
                        <div className="title-header">
                          <h3>المتجر</h3>
                          <h2 className="title">مرحبًا بكم في متجرنا</h2>
                        </div>
                      )}
                      {selectedLanguage == "Italien" && (
                        <div className="title-header">
                          <h3>Mercato</h3>
                          <h2 className="title">
                            Benvenuto nel nostro mercato
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                  {filteredList.length > 0 &&
                    filteredList.map((product, index) => (
                      <div className="col-md-4" key={index}>
                        <div
                          className="front-card card h-90 shadow-sm mb-5"
                          style={{ borderRadius: 10, overflow: "hidden" }}
                        >
                          <div style={{ height: 200 }}>
                            <img
                              src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                              className="card-img-top"
                              alt="..."
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          {selectedLanguage != "Français" &&
                            selectedLanguage != "Anglais" &&
                            selectedLanguage != "Arabe" &&
                            selectedLanguage != "Italien" && (
                              <>
                                {product.stock > 0 ? (
                                  <div className="label-top shadow-sm">
                                    En Stock
                                  </div>
                                ) : (
                                  <div
                                    className="label-top shadow-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    Hors Stock
                                  </div>
                                )}
                              </>
                            )}
                          {selectedLanguage == "Français" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">
                                  En Stock
                                </div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  Hors Stock
                                </div>
                              )}
                            </>
                          )}
                          {selectedLanguage == "Anglais" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">
                                  Available
                                </div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  Out of Stock
                                </div>
                              )}
                            </>
                          )}
                          {selectedLanguage == "Arabe" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">متوفر</div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  غير متوفر
                                </div>
                              )}
                            </>
                          )}
                          {selectedLanguage == "Italien" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">
                                  Disponibile
                                </div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  Non Disponibile
                                </div>
                              )}
                            </>
                          )}

                          <div className="card-body">
                            <div
                              className=" mb-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {product.discount == null ? (
                                <span
                                  className="float-start badge rounded-pill bg-success"
                                  style={{ color: "white" }}
                                >
                                  {selectedLanguage == "Arabe" ? "د.ت" : "TND"}
                                  {product.prix}
                                </span>
                              ) : (
                                <span
                                  className="float-start badge rounded-pill bg-success"
                                  style={{ color: "white" }}
                                >
                                  {selectedLanguage == "Arabe" ? "د.ت" : "TND"}
                                  {product.discount}
                                </span>
                              )}

                              {product.discount !== null && (
                                <span className="float-end">
                                  <span
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: 2,
                                      borderRadius: 5,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    -
                                    {(
                                      100 -
                                      (product.discount * 100) / product.prix
                                    ).toFixed(2)}
                                    %
                                  </span>
                                  &nbsp;&nbsp;
                                  <a className="text-muted">
                                    <span
                                      style={{
                                        textDecoration: "line-through",
                                      }}
                                    >
                                      {selectedLanguage == "Arabe"
                                        ? "د.ت"
                                        : "TND"}
                                      &nbsp;{product.prix} &nbsp;
                                    </span>
                                  </a>
                                </span>
                              )}
                            </div>
                            {selectedLanguage != "Français" &&
                              selectedLanguage != "Anglais" &&
                              selectedLanguage != "Arabe" &&
                              selectedLanguage != "Italien" && (
                                <h5
                                  className="card-title"
                                  style={{ height: 20 }}
                                >
                                  {product.nom}
                                </h5>
                              )}
                            {selectedLanguage == "Français" && (
                              <h5 className="card-title" style={{ height: 20 }}>
                                {product.nom}
                              </h5>
                            )}
                            {selectedLanguage == "Anglais" && (
                              <h5 className="card-title" style={{ height: 20 }}>
                                {product.nomEn}
                              </h5>
                            )}
                            {selectedLanguage == "Arabe" && (
                              <h5 className="card-title" style={{ height: 20 }}>
                                {product.nomAr}
                              </h5>
                            )}
                            {selectedLanguage == "Italien" && (
                              <h5 className="card-title" style={{ height: 20 }}>
                                {product.nomIt}
                              </h5>
                            )}

                            {selectedLanguage != "Français" &&
                              selectedLanguage != "Anglais" &&
                              selectedLanguage != "Arabe" &&
                              selectedLanguage != "Italien" && (
                                <p style={{ height: 65, overflow: "hidden" }}>
                                  {product.description}
                                </p>
                              )}
                            {selectedLanguage == "Français" && (
                              <p style={{ height: 65, overflow: "hidden" }}>
                                {product.description}
                              </p>
                            )}
                            {selectedLanguage == "Anglais" && (
                              <p style={{ height: 65, overflow: "hidden" }}>
                                {product.descriptionEn}
                              </p>
                            )}
                            {selectedLanguage == "Arabe" && (
                              <p style={{ height: 65, overflow: "hidden" }}>
                                {product.descriptionAr}
                              </p>
                            )}
                            {selectedLanguage == "Italien" && (
                              <p style={{ height: 65, overflow: "hidden" }}>
                                {product.descriptionIt}
                              </p>
                            )}

                            <div className="text-center my-2">
                              <button
                                className="btn-lg rounded-pill"
                                style={{
                                  backgroundColor: "#0e204d",
                                  color: "white",
                                }}
                                onClick={() => {
                                  navigate("/detailproduit/" + product.id);
                                }}
                              >
                                {selectedLanguage != "Français" &&
                                  selectedLanguage != "Anglais" &&
                                  selectedLanguage != "Arabe" &&
                                  selectedLanguage != "Italien" && (
                                    <>Consulter le produit</>
                                  )}
                                {selectedLanguage == "Français" && (
                                  <>Consulter le produit</>
                                )}
                                {selectedLanguage == "Anglais" && (
                                  <>view product</>
                                )}
                                {selectedLanguage == "Arabe" && <>عرض المنتج</>}
                                {selectedLanguage == "Italien" && (
                                  <>Vedi il prodotto</>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {search != "" && !priceChanged && !checkedcat && !checkedPromotion && (
          <div className="col-md-9">
            {isLoading && (
              <div class="scene">
                <div class="plane">
                  <div class="cube cube--0">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--0"></div>
                  <div class="cube cube--1">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--1"></div>
                  <div class="cube cube--2">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--2"></div>
                  <div class="cube cube--3">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--3"></div>
                  <div class="cube cube--4">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--4"></div>
                  <div class="cube cube--5">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--5"></div>
                  <div class="cube cube--6">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--6"></div>
                  <div class="cube cube--7">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--7"></div>
                </div>
              </div>
            )}
            {!isLoading && (
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title">
                      {selectedLanguage != "Français" &&
                        selectedLanguage != "Anglais" &&
                        selectedLanguage != "Arabe" &&
                        selectedLanguage != "Italien" && (
                          <div className="title-header">
                            <h3>Marketplace</h3>
                            <h2 className="title">
                              Bienvenue Dans Notre Marketplace
                            </h2>
                          </div>
                        )}
                      {selectedLanguage == "Français" && (
                        <div className="title-header">
                          <h3>Marketplace</h3>
                          <h2 className="title">
                            Bienvenue Dans Notre Marketplace
                          </h2>
                        </div>
                      )}
                      {selectedLanguage == "Anglais" && (
                        <div className="title-header">
                          <h3>Marketplace</h3>
                          <h2 className="title">Welcome To Our Marketplace</h2>
                        </div>
                      )}
                      {selectedLanguage == "Arabe" && (
                        <div className="title-header">
                          <h3>المتجر</h3>
                          <h2 className="title">مرحبًا بكم في متجرنا</h2>
                        </div>
                      )}
                      {selectedLanguage == "Italien" && (
                        <div className="title-header">
                          <h3>Mercato</h3>
                          <h2 className="title">
                            Benvenuto nel nostro mercato
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                  {productList
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
                      <div className="col-md-4" key={index}>
                        <div
                          className="front-card card h-90 shadow-sm mb-5"
                          style={{ borderRadius: 10, overflow: "hidden" }}
                        >
                          <div style={{ height: 200 }}>
                            <img
                              src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                              className="card-img-top"
                              alt="..."
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          {selectedLanguage != "Français" &&
                            selectedLanguage != "Anglais" &&
                            selectedLanguage != "Arabe" &&
                            selectedLanguage != "Italien" && (
                              <>
                                {product.stock > 0 ? (
                                  <div className="label-top shadow-sm">
                                    En Stock
                                  </div>
                                ) : (
                                  <div
                                    className="label-top shadow-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    Hors Stock
                                  </div>
                                )}
                              </>
                            )}
                          {selectedLanguage == "Français" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">
                                  En Stock
                                </div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  Hors Stock
                                </div>
                              )}
                            </>
                          )}
                          {selectedLanguage == "Anglais" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">
                                  Available
                                </div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  Out of Stock
                                </div>
                              )}
                            </>
                          )}
                          {selectedLanguage == "Arabe" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">متوفر</div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  غير متوفر
                                </div>
                              )}
                            </>
                          )}
                          {selectedLanguage == "Italien" && (
                            <>
                              {product.stock > 0 ? (
                                <div className="label-top shadow-sm">
                                  Disponibile
                                </div>
                              ) : (
                                <div
                                  className="label-top shadow-sm"
                                  style={{ backgroundColor: "red" }}
                                >
                                  Non Disponibile
                                </div>
                              )}
                            </>
                          )}

                          <div className="card-body">
                            <div
                              className=" mb-3"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {product.discount == null ? (
                                <span
                                  className="float-start badge rounded-pill bg-success"
                                  style={{ color: "white" }}
                                >
                                  {selectedLanguage == "Arabe" ? "د.ت" : "TND"}
                                  {product.prix}
                                </span>
                              ) : (
                                <span
                                  className="float-start badge rounded-pill bg-success"
                                  style={{ color: "white" }}
                                >
                                  {selectedLanguage == "Arabe" ? "د.ت" : "TND"}
                                  {product.discount}
                                </span>
                              )}

                              {product.discount !== null && (
                                <span className="float-end">
                                  <span
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: 2,
                                      borderRadius: 5,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    -
                                    {(
                                      100 -
                                      (product.discount * 100) / product.prix
                                    ).toFixed(2)}
                                    %
                                  </span>
                                  &nbsp;&nbsp;
                                  <a className="text-muted">
                                    <span
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {selectedLanguage == "Arabe"
                                        ? "د.ت"
                                        : "TND"}
                                      &nbsp;{product.prix} &nbsp;
                                    </span>
                                  </a>
                                </span>
                              )}
                            </div>
                            {selectedLanguage != "Français" &&
                              selectedLanguage != "Anglais" &&
                              selectedLanguage != "Arabe" &&
                              selectedLanguage != "Italien" && (
                                <>
                                  <h5
                                    className="card-title"
                                    style={{ height: 20 }}
                                  >
                                    {product.nom}
                                  </h5>
                                  <p style={{ height: 65, overflow: "hidden" }}>
                                    {product.description}
                                  </p>
                                </>
                              )}
                            {selectedLanguage == "Français" && (
                              <>
                                <h5
                                  className="card-title"
                                  style={{ height: 20 }}
                                >
                                  {product.nom}
                                </h5>
                                <p style={{ height: 65, overflow: "hidden" }}>
                                  {product.description}
                                </p>
                              </>
                            )}
                            {selectedLanguage == "Anglais" && (
                              <>
                                <h5
                                  className="card-title"
                                  style={{ height: 20 }}
                                >
                                  {product.nomEn}
                                </h5>
                                <p style={{ height: 65, overflow: "hidden" }}>
                                  {product.descriptionEn}
                                </p>
                              </>
                            )}
                            {selectedLanguage == "Arabe" && (
                              <>
                                <h5
                                  className="card-title"
                                  style={{ height: 20 }}
                                >
                                  {product.nomAr}
                                </h5>
                                <p style={{ height: 65, overflow: "hidden" }}>
                                  {product.descriptionAr}
                                </p>
                              </>
                            )}
                            {selectedLanguage == "Italien" && (
                              <>
                                <h5
                                  className="card-title"
                                  style={{ height: 20 }}
                                >
                                  {product.nomIt}
                                </h5>
                                <p style={{ height: 65, overflow: "hidden" }}>
                                  {product.descriptionIt}
                                </p>
                              </>
                            )}

                            <div className="text-center my-2">
                              <button
                                className="btn-lg rounded-pill"
                                style={{
                                  backgroundColor: "#0e204d",
                                  color: "white",
                                }}
                                onClick={() => {
                                  navigate("/detailproduit/" + product.id);
                                }}
                              >
                                {selectedLanguage != "Français" &&
                                  selectedLanguage != "Anglais" &&
                                  selectedLanguage != "Arabe" &&
                                  selectedLanguage != "Italien" && (
                                    <>Consulter le produit</>
                                  )}
                                {selectedLanguage == "Français" && (
                                  <>Consulter le produit</>
                                )}
                                {selectedLanguage == "Anglais" && (
                                  <>view product</>
                                )}
                                {selectedLanguage == "Arabe" && <>عرض المنتج</>}
                                {selectedLanguage == "Italien" && (
                                  <>Vedi il prodotto</>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {search == "" && !priceChanged && !checkedcat && !checkedPromotion && (
          <>
            {isLoading && (
              <div class="scene w-100">
                <div class="plane">
                  <div class="cube cube--0">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--0"></div>
                  <div class="cube cube--1">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--1"></div>
                  <div class="cube cube--2">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--2"></div>
                  <div class="cube cube--3">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--3"></div>
                  <div class="cube cube--4">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--4"></div>
                  <div class="cube cube--5">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--5"></div>
                  <div class="cube cube--6">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--6"></div>
                  <div class="cube cube--7">
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                    <div class="cube__side"></div>
                  </div>
                  <div class="shadow shadow--7"></div>
                </div>
              </div>
            )}
            <div className="col-md-9">
              {!isLoading && (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="section-title">
                        {selectedLanguage != "Français" &&
                          selectedLanguage != "Anglais" &&
                          selectedLanguage != "Arabe" &&
                          selectedLanguage != "Italien" && (
                            <div className="title-header">
                              <h3>Marketplace</h3>
                              <h2 className="title">
                                Bienvenue Dans Notre Marketplace
                              </h2>
                            </div>
                          )}
                        {selectedLanguage == "Français" && (
                          <div className="title-header">
                            <h3>Marketplace</h3>
                            <h2 className="title">
                              Bienvenue Dans Notre Marketplace
                            </h2>
                          </div>
                        )}
                        {selectedLanguage == "Anglais" && (
                          <div className="title-header">
                            <h3>Marketplace</h3>
                            <h2 className="title">
                              Welcome To Our Marketplace
                            </h2>
                          </div>
                        )}
                        {selectedLanguage == "Arabe" && (
                          <div className="title-header">
                            <h3>المتجر</h3>
                            <h2 className="title">مرحبًا بكم في متجرنا</h2>
                          </div>
                        )}
                        {selectedLanguage == "Italien" && (
                          <div className="title-header">
                            <h3>Mercato</h3>
                            <h2 className="title">
                              Benvenuto nel nostro mercato
                            </h2>
                          </div>
                        )}
                      </div>
                    </div>
                    {currentItems != null &&
                      currentItems.map((product, index) => (
                        <div className="col-md-4" key={index}>
                          <div
                            className="front-card card h-90 shadow-sm mb-5"
                            style={{ borderRadius: 10, overflow: "hidden" }}
                          >
                            <div style={{ height: 200 }}>
                              <img
                                src={`http://127.0.0.1:8000/uploads/${product.image[0].imageURL}`}
                                className="card-img-top"
                                alt="..."
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            {selectedLanguage != "Français" &&
                              selectedLanguage != "Anglais" &&
                              selectedLanguage != "Arabe" &&
                              selectedLanguage != "Italien" && (
                                <>
                                  {product.stock > 0 ? (
                                    <div className="label-top shadow-sm">
                                      En Stock
                                    </div>
                                  ) : (
                                    <div
                                      className="label-top shadow-sm"
                                      style={{ backgroundColor: "red" }}
                                    >
                                      Hors Stock
                                    </div>
                                  )}
                                </>
                              )}
                            {selectedLanguage == "Français" && (
                              <>
                                {product.stock > 0 ? (
                                  <div className="label-top shadow-sm">
                                    En Stock
                                  </div>
                                ) : (
                                  <div
                                    className="label-top shadow-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    Hors Stock
                                  </div>
                                )}
                              </>
                            )}
                            {selectedLanguage == "Anglais" && (
                              <>
                                {product.stock > 0 ? (
                                  <div className="label-top shadow-sm">
                                    Available
                                  </div>
                                ) : (
                                  <div
                                    className="label-top shadow-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    Out of Stock
                                  </div>
                                )}
                              </>
                            )}
                            {selectedLanguage == "Arabe" && (
                              <>
                                {product.stock > 0 ? (
                                  <div className="label-top shadow-sm">
                                    متوفر
                                  </div>
                                ) : (
                                  <div
                                    className="label-top shadow-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    غير متوفر
                                  </div>
                                )}
                              </>
                            )}
                            {selectedLanguage == "Italien" && (
                              <>
                                {product.stock > 0 ? (
                                  <div className="label-top shadow-sm">
                                    Disponibile
                                  </div>
                                ) : (
                                  <div
                                    className="label-top shadow-sm"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    Non Disponibile
                                  </div>
                                )}
                              </>
                            )}

                            <div className="card-body">
                              <div
                                className=" mb-3"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                {product.discount == null ? (
                                  <span
                                    className="float-start badge rounded-pill bg-success"
                                    style={{ color: "white" }}
                                  >
                                    {selectedLanguage == "Arabe"
                                      ? "د.ت"
                                      : "TND"}
                                    {product.prix}
                                  </span>
                                ) : (
                                  <span
                                    className="float-start badge rounded-pill bg-success"
                                    style={{ color: "white" }}
                                  >
                                    {selectedLanguage == "Arabe"
                                      ? "د.ت"
                                      : "TND"}
                                    {product.discount}
                                  </span>
                                )}

                                {product.discount !== null && (
                                  <span className="float-end">
                                    <span
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: 2,
                                        borderRadius: 5,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      -
                                      {(
                                        100 -
                                        (product.discount * 100) / product.prix
                                      ).toFixed(2)}
                                      %
                                    </span>
                                    &nbsp;&nbsp;
                                    <a className="text-muted">
                                      <span
                                        style={{
                                          textDecoration: "line-through",
                                        }}
                                      >
                                        {selectedLanguage == "Arabe"
                                          ? "د.ت"
                                          : "TND"}
                                        &nbsp;{product.prix} &nbsp;
                                      </span>
                                    </a>
                                  </span>
                                )}
                              </div>
                              {selectedLanguage != "Français" &&
                                selectedLanguage != "Anglais" &&
                                selectedLanguage != "Arabe" &&
                                selectedLanguage != "Italien" && (
                                  <>
                                    <h5
                                      className="card-title"
                                      style={{ height: 20 }}
                                    >
                                      {product.nom}
                                    </h5>
                                    <p
                                      style={{ height: 65, overflow: "hidden" }}
                                    >
                                      {product.description}
                                    </p>
                                  </>
                                )}
                              {selectedLanguage == "Français" && (
                                <>
                                  <h5
                                    className="card-title"
                                    style={{ height: 20 }}
                                  >
                                    {product.nom}
                                  </h5>
                                  <p style={{ height: 65, overflow: "hidden" }}>
                                    {product.description}
                                  </p>
                                </>
                              )}
                              {selectedLanguage == "Anglais" && (
                                <>
                                  <h5
                                    className="card-title"
                                    style={{ height: 20 }}
                                  >
                                    {product.nomEn}
                                  </h5>
                                  <p style={{ height: 65, overflow: "hidden" }}>
                                    {product.descriptionEn}
                                  </p>
                                </>
                              )}
                              {selectedLanguage == "Arabe" && (
                                <>
                                  <h5
                                    className="card-title"
                                    style={{ height: 20 }}
                                  >
                                    {product.nomAr}
                                  </h5>
                                  <p style={{ height: 65, overflow: "hidden" }}>
                                    {product.descriptionAr}
                                  </p>
                                </>
                              )}
                              {selectedLanguage == "Italien" && (
                                <>
                                  <h5
                                    className="card-title"
                                    style={{ height: 20 }}
                                  >
                                    {product.nomIt}
                                  </h5>
                                  <p style={{ height: 65, overflow: "hidden" }}>
                                    {product.descriptionIt}
                                  </p>
                                </>
                              )}

                              <div className="text-center my-2">
                                <button
                                  className="btn-lg rounded-pill"
                                  style={{
                                    backgroundColor: "#0e204d",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    navigate("/detailproduit/" + product.id);
                                  }}
                                >
                                  {selectedLanguage != "Français" &&
                                    selectedLanguage != "Anglais" &&
                                    selectedLanguage != "Arabe" &&
                                    selectedLanguage != "Italien" && (
                                      <>Consulter le produit</>
                                    )}
                                  {selectedLanguage == "Français" && (
                                    <>Consulter le produit</>
                                  )}
                                  {selectedLanguage == "Anglais" && (
                                    <>view product</>
                                  )}
                                  {selectedLanguage == "Arabe" && (
                                    <>عرض المنتج</>
                                  )}
                                  {selectedLanguage == "Italien" && (
                                    <>Vedi il prodotto</>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <Header />

      <main
        className="my-main"
        style={{
          minHeight: "calc(100vh + 700px)",
        }}
      >
        <div
          className="container-fluid bg-trasparent my-4 p-3"
          style={{ position: "relative", marginBottom: 100 }}
        >
          <div className="row">
            {!isLoading && (
              <div className="col-md-3">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="filtre-marketplace">
                    <div class="marketplace-search-position has-search">
                      <span class="fa fa-search form-control-feedback"></span>
                      <input
                        type="text"
                        class="form-control input-search-marketplace"
                        placeholder="Search"
                        defaultValue={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          console.log(search);
                        }}
                      />
                    </div>
                    {/* <div className="filter-header"> */}
                    {!isLoading && (
                      <div className="filter-header-1">
                        {selectedLanguage != "Français" &&
                          selectedLanguage != "Anglais" &&
                          selectedLanguage != "Arabe" &&
                          selectedLanguage != "Italien" && (
                            <div style={{ marginTop: 3 }}>Filtres</div>
                          )}
                        {selectedLanguage == "Français" && (
                          <div style={{ marginTop: 3 }}>Filtres</div>
                        )}
                        {selectedLanguage == "Anglais" && (
                          <div style={{ marginTop: 3 }}>Filters</div>
                        )}
                        {selectedLanguage == "Arabe" && (
                          <div style={{ marginTop: 3 }}>Filters</div>
                        )}
                        {selectedLanguage == "Italien" && (
                          <div style={{ marginTop: 3 }}>Filtri</div>
                        )}

                        {(checkedcat || checkedPromotion || priceChanged) && (
                          <>
                            {selectedLanguage != "Français" &&
                              selectedLanguage != "Anglais" &&
                              selectedLanguage != "Arabe" &&
                              selectedLanguage != "Italien" && (
                                <span
                                  onClick={clear}
                                  className="remove-all-filter"
                                >
                                  <i className="fas fa-times"></i> &nbsp; Remove
                                  All
                                </span>
                              )}
                            {selectedLanguage == "Français" && (
                              <span
                                onClick={clear}
                                className="remove-all-filter"
                              >
                                <i className="fas fa-times"></i> &nbsp; Remove
                                All
                              </span>
                            )}
                            {selectedLanguage == "Anglais" && (
                              <span
                                onClick={clear}
                                className="remove-all-filter"
                              >
                                <i className="fas fa-times"></i> &nbsp; Remove
                                All
                              </span>
                            )}
                            {selectedLanguage == "Arabe" && (
                              <span
                                onClick={clear}
                                className="remove-all-filter"
                              >
                                <i className="fas fa-times"></i> &nbsp; Remove
                                All
                              </span>
                            )}
                            {selectedLanguage == "Italien" && (
                              <span
                                onClick={clear}
                                className="remove-all-filter"
                              >
                                <i className="fas fa-times"></i> &nbsp; Remove
                                All
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {!isLoading && (
                      <>
                        <hr />
                        <div className="filter-content">
                          <div className="prix">
                            <h5 className="filter-section-title">Prix :</h5>
                            <Typography id="range-slider" gutterBottom>
                              Sélectionnez la gamme de prix
                            </Typography>
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
                          <hr />
                          <div className="categories">
                            <h5 className="filter-section-title">
                              Catégories :
                            </h5>
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
                            {/* {`Items checked are: ${checkedItems}`} */}
                          </div>
                          <hr />
                          <div className="categories">Promotion : </div>
                          {checkList1.map((item, index) => (
                            <div key={index} className="checklist-marketplace">
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
                                  <span className={isCheckedPromotion(item)}>
                                    &nbsp;{item}
                                  </span>
                                </label>
                              </Typography>
                            </div>
                          ))}
                          {/* {`Items checked are: ${checkedItemsPromotion}`} */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Products itemsPerPage={9} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marketplace;
