import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ACTUALITE_URL = "http://127.0.0.1:8000/actualite/showall";

const Actualite = () => {
  const navigate = useNavigate();
  const [actualiteList, setActualiteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActualiteList();
  }, [actualiteList]);

  function fetchActualiteList() {
    axios
      .get(ACTUALITE_URL)
      .then((response) => {
        setActualiteList(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Header />
      <div class="container my-main mb-5 mt-5">
        <div class="row mt-5">
          <div class="col-lg-12 mt-5">
            <div class="ttm-bg ttm-col-bgcolor-yes ttm-bgcolor-white spacing-5">
              <div class="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
              <div class="layer-content">
                <div class="row">
                  {actualiteList.map((actualite, index) => (
                    <div class="col-lg-3 col-md-6 col-sm-6" key={index}>
                      <div class="featured-imagebox featured-imagebox-procedure">
                        <div class="featured-thumbnail">
                          <img
                            class="img-fluid"
                            src="assets/FrontOffice/images/actualites/act1.png"
                            alt="image"
                            style={{ width: 262.5, height: 180.66 }}
                          />
                          <div class="process-num"></div>
                        </div>
                        <div
                          class="featured-content"
                          onClick={() => {
                            navigate("/actualiteDetails/" + actualite.id);
                          }}
                        >
                          <div class="featured-desc">
                            <p>{actualite.titre}</p>
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
      </div>
      <Footer />
    </div>
  );
};

export default Actualite;
