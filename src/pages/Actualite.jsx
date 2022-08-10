import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ACTUALITE_URL = "http://127.0.0.1:8000/actualite/showall";

const Actualite = () => {
  const navigate = useNavigate();
  const [actualiteList, setActualiteList] = useState([]);
  const [playOnce, setPlayOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!playOnce) {
      setPlayOnce(true);
      fetchActualiteList();
    }
  }, [actualiteList]);

  function fetchActualiteList() {
    axios
      .get(ACTUALITE_URL)
      .then((response) => {
        setActualiteList(response.data.slice().reverse());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function Actualites({ itemsPerPage }) {
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
        setCurrentItems(actualiteList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(actualiteList.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % actualiteList.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        {currentItems != null &&
          currentItems.map((actualite, index) => (
            <div class="col-lg-3 col-md-6 col-sm-6" key={index}>
              <div class="featured-imagebox featured-imagebox-procedure">
                <div class="featured-thumbnail">
                  <img
                    class="img-fluid"
                    src={`http://127.0.0.1:8000/uploads/${actualite.image}`}
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
                  <div class="featured-desc" style={{ cursor: "pointer" }}>
                    <p>{actualite.titre}</p>
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
    );
  }

  return (
    <div>
      <Header />
      <div class="container my-main mb-5 mt-5">
        <div class="row mt-5">
          <div class="col-lg-12 mt-5">
            <div class="ttm-bg ttm-col-bgcolor-yes spacing-5">
              <div class="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
              <div class="layer-content">
                <div class="row">
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

                  <Actualites itemsPerPage={12} />
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
