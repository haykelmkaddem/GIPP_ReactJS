import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const PRODUCT_URL = "http://127.0.0.1:8000/produit/showall";

const Marketplace = ({ route, navigation }) => {
  // Our States
  const [value, setValue] = React.useState([50, 620]);
  const [checked, setChecked] = useState([]);
  const [checkedPromotion, setCheckedPromotion] = useState([]);
  const [checkedDispo, setCheckedDispo] = useState([]);
  const checkList = ["Apple", "Banana", "Tea", "Coffee"];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
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
  };

  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduis();
  }, [productList]);

  function fetchProduis() {
    axios
      .get(PRODUCT_URL)
      .then((response) => {
        setProductList(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Header />

      <main className="my-main mb-5 pb-5">
        <div
          className="container-fluid bg-trasparent my-4 p-3"
          style={{ position: "relative" }}
        >
          <div className="row">
            <div className="col-md-3">
              <div className="filter-header">
                Filtrer <BiFilterAlt />
              </div>
              <div className="filter-content">
                <div className="prix">
                  Prix :
                  <Typography id="range-slider" gutterBottom>
                    Sélectionnez la gamme de prix
                  </Typography>
                  <Slider
                    value={value}
                    onChange={rangeSelector}
                    valueLabelDisplay="auto"
                    max={1000}
                    min={0}
                  />
                  <div className="slider-bottom">
                    <span>{value[0]}</span>
                    <span>{value[1]}</span>
                  </div>
                </div>
                <div className="categories">
                  Catégories :
                  {checkList.map((item, index) => (
                    <div key={index} className="checklist-marketplace">
                      <input
                        value={item}
                        type="checkbox"
                        onChange={handleCheck}
                      />
                      <span className={isChecked(item)}>&nbsp;{item}</span>
                    </div>
                  ))}
                  {`Items checked are: ${checkedItems}`}
                </div>
                <div className="categories">Promotion : </div>
                <div className="categories">Disponibilité :</div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="section-title">
                      <div className="title-header">
                        <h3>Marketplace</h3>
                        <h2 className="title">
                          Bienvenue Dans Notre Marketplace
                        </h2>
                      </div>
                    </div>
                  </div>
                  {productList.map((product, index) => (
                    <div
                      className="col-md-4"
                      style={{ marginBottom: 30 }}
                      key={index}
                    >
                      <div className="card h-90 shadow-sm mb-5">
                        <img
                          src="/assets/FrontOffice/images/produits/chelba.jpg"
                          className="card-img-top"
                          alt="..."
                        />
                        {product.stock > 0 ? (
                          <div className="label-top shadow-sm">En Stock</div>
                        ) : (
                          <div
                            className="label-top shadow-sm"
                            style={{ backgroundColor: "red" }}
                          >
                            Hors Stock
                          </div>
                        )}

                        <div className="card-body">
                          <div className="clearfix mb-3">
                            {product.discount == null ? (
                              <span className="float-start badge rounded-pill bg-success">
                                {product.prix} Dt
                              </span>
                            ) : (
                              <span className="float-start badge rounded-pill bg-success">
                                {product.discount} Dt
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
                                    &nbsp;{product.prix} Dt&nbsp;
                                  </span>
                                </a>
                              </span>
                            )}
                          </div>
                          <h5 className="card-title">{product.nom}</h5>
                          <p style={{ height: 70, overflow: "hidden" }}>
                            {product.description}
                          </p>
                          <div className="text-center my-4">
                            <button
                              className="btn-lg rounded-pill"
                              style={{
                                backgroundColor: "rgb(19, 198, 221)",
                                color: "white",
                              }}
                              onClick={() => {
                                navigate("/detailproduit/" + product.id);
                              }}
                            >
                              check offer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
