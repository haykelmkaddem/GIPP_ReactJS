import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ImLocation } from "react-icons/im";
import { BiTimeFive, BiCalendar } from "react-icons/bi";
import {
  MdChair,
  MdCardMembership,
  MdSearch,
  MdOutlinePlace,
} from "react-icons/md";
import { BsCalendarPlus } from "react-icons/bs";
import { TiTickOutline } from "react-icons/ti";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SALON_URL = "http://127.0.0.1:8000/salon/showall";

const SalonListe = ({ route, navigation }) => {
  const navigate = useNavigate();
  const [salonList, setSalonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [value, setValue] = React.useState(0);
  const [lieu, setLieu] = React.useState([]);
  const [searchLieu, setSearchLieu] = React.useState("");
  const [searchDate, setSearchDate] = React.useState("");
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    if (!playOnce) {
      setPlayOnce(true);
      fetchSalons();
    }
  }, [salonList]);

  function fetchSalons() {
    axios
      .get(SALON_URL)
      .then((response) => {
        setSalonList(response.data.slice().reverse());
        let l = [];
        for (let index = 0; index < response.data.length; index++) {
          l.push(response.data[index].lieu);
        }
        let lieuList = [];
        for (let index = 0; index < l.length; index++) {
          if (!lieuList.includes(l[index])) {
            lieuList.push(l[index]);
          }
        }
        setLieu(lieuList);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
        setCurrentItems(salonList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(salonList.length / itemsPerPage));
      }
    }, [itemOffset, itemsPerPage, isLoading]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % salonList.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
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
        {!isLoading && (
          <div style={{ paddingBottom: 50 }} className="mt-5">
            {currentItems != null &&
              currentItems.map((salon, index) => (
                <div className="col-md-12 mb-5" key={index}>
                  <div className="front-card card p-3 mx-5 my-primary my-salon-card">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-8">
                          <h5
                            style={{
                              color: "white",
                              marginBottom: 0,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate("/salonDelails/" + salon.id);
                            }}
                          >
                            {salon.titre}
                          </h5>
                          <p
                            style={{ fontSize: 12 }}
                            className="d-flex align-items-center"
                          >
                            <BiTimeFive />
                            &nbsp; {salon.temps_debut.substr(11, 5)}
                            {"-"}
                            {salon.temps_fin.substr(11, 5)}
                            &nbsp; &nbsp;
                            <BiCalendar /> &nbsp;{salon.date.substr(0, 10)}
                          </p>
                        </div>
                        <div className="col-md-4 text-right">
                          <p style={{ color: "white" }}>
                            <ImLocation className="localisation-icon" />{" "}
                            {salon.lieu}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="px-5">{salon.description}</p>
                    {salon.max_invitation == salon.reservation.length && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="salon-full">
                          {/* <span style={{ fontSize: 15 }}>Salon Saturé !</span> */}
                          <TiTickOutline
                            style={{
                              fontSize: 80,
                            }}
                          />
                          <div
                            style={{
                              marginTop: -10,
                              fontWeight: "bold",
                              fontSize: 18,
                            }}
                          >
                            Complet !
                          </div>
                        </div>
                      </div>
                    )}
                    <div class="progress">
                      <div
                        class={
                          "width-percentage-" +
                          Math.ceil(
                            (salon.reservation.length * 100) /
                              salon.max_invitation
                          )
                        }
                        style={{
                          width: `${Math.ceil(
                            (salon.reservation.length * 100) /
                              salon.max_invitation
                          )}%`,
                          BoxShadow: "0 10 40 -10 #fff",
                          borderRadius: 100,
                          backgroundColor:
                            salon.reservation.length == salon.max_invitation
                              ? "red"
                              : "green",
                          height: 15,
                          transition: "1s ease-in-out",
                        }}
                      />
                    </div>
                    <p className="mt-2 ml-1">
                      <MdCardMembership /> {salon.reservation.length}{" "}
                      participants / <MdChair /> {salon.max_invitation} places
                    </p>
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
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="my-main mb-5">
        <div className="container" style={{ minHeight: 500 }}>
          {!isLoading && (
            <div className="row px-5">
              <div
                className="col-md-12 card shadow p-4"
                style={{
                  marginTop: -30,
                  marginBottom: -15,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="exampleFormControlSelect1"
                        className="d-flex align-items-center mb-0"
                      >
                        <MdSearch size={17} className="ml-1" />
                        <span className="ml-2">Rechercher un salon</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Rechercher un salon"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="exampleFormControlSelect1"
                        className="d-flex align-items-center mb-0"
                      >
                        <MdOutlinePlace className="ml-1" size={17} />
                        <span className="ml-2"> Selectionner un lieu</span>
                      </label>
                      <select
                        className="my-form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          setSearchLieu(e.target.value);
                        }}
                      >
                        <option value="">Tout les lieux</option>
                        {lieu.map((lieu, index) => (
                          <option key={index} value={lieu}>
                            {lieu}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        htmlFor="exampleFormControlSelect1"
                        className="d-flex align-items-center mb-0"
                      >
                        <BsCalendarPlus className="ml-1" size={15} />{" "}
                        <span className="ml-2">Selectionner une date</span>
                        {searchDate}
                      </label>
                      <input
                        type="date"
                        className="my-form-control"
                        id="exampleFormControlInput1"
                        onChange={(e) => {
                          setSearchDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {search == "" && searchLieu == "" && searchDate == "" && (
            <Salons itemsPerPage={5} />
          )}
          {search != "" && searchLieu == "" && searchDate == "" && (
            <div style={{ paddingBottom: 50, marginTop: 50 }}>
              {salonList
                .filter((salon) => {
                  return (
                    salon.titre.toLowerCase().includes(search.toLowerCase()) ||
                    salon.description
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  );
                })
                .map((salon, index) => (
                  <div className="col-md-12 mb-5" key={index}>
                    <div className="front-card card p-3 mx-5 my-primary my-salon-card">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-8">
                            <h5
                              style={{
                                color: "white",
                                marginBottom: 0,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                navigate("/salonDelails/" + salon.id);
                              }}
                            >
                              {salon.titre}
                            </h5>
                            <p
                              style={{ fontSize: 12 }}
                              className="d-flex align-items-center"
                            >
                              <BiTimeFive />
                              &nbsp; {salon.temps_debut.substr(11, 5)}
                              {"-"}
                              {salon.temps_fin.substr(11, 5)}
                              &nbsp; &nbsp;
                              <BiCalendar /> &nbsp;{salon.date.substr(0, 10)}
                            </p>
                          </div>
                          <div className="col-md-4 text-right">
                            <p style={{ color: "white" }}>
                              <ImLocation className="localisation-icon" />{" "}
                              {salon.lieu}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="px-5">{salon.description}</p>
                      {salon.max_invitation == salon.reservation.length && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="salon-full">
                            {/* <span style={{ fontSize: 15 }}>Salon Saturé !</span> */}
                            <TiTickOutline
                              style={{
                                fontSize: 80,
                              }}
                            />
                            <div
                              style={{
                                marginTop: -10,
                                fontWeight: "bold",
                                fontSize: 18,
                              }}
                            >
                              Complet !
                            </div>
                          </div>
                        </div>
                      )}
                      <div class="progress">
                        <div
                          class={
                            "width-percentage-" +
                            Math.ceil(
                              (salon.reservation.length * 100) /
                                salon.max_invitation
                            )
                          }
                          style={{
                            width: `${Math.ceil(
                              (salon.reservation.length * 100) /
                                salon.max_invitation
                            )}%`,
                            BoxShadow: "0 10 40 -10 #fff",
                            borderRadius: 100,
                            backgroundColor:
                              salon.reservation.length == salon.max_invitation
                                ? "red"
                                : "green",
                            height: 15,
                            transition: "1s ease-in-out",
                          }}
                        />
                      </div>
                      <p className="mt-2 ml-1">
                        <MdCardMembership /> {salon.reservation.length}{" "}
                        participants / <MdChair /> {salon.max_invitation} places
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {(searchLieu != "" || searchDate != "") && (
            <div style={{ paddingBottom: 50, marginTop: 50 }}>
              {salonList
                .filter((salon) => {
                  return (
                    salon.date.includes(searchDate) &&
                    salon.lieu.includes(searchLieu)
                  );
                })
                .map((salon, index) => (
                  <div className="col-md-12 mb-5" key={index}>
                    <div className="front-card card p-3 mx-5 my-primary my-salon-card">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-8">
                            <h5
                              style={{
                                color: "white",
                                marginBottom: 0,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                navigate("/salonDelails/" + salon.id);
                              }}
                            >
                              {salon.titre}
                            </h5>
                            <p
                              style={{ fontSize: 12 }}
                              className="d-flex align-items-center"
                            >
                              <BiTimeFive />
                              &nbsp; {salon.temps_debut.substr(11, 5)}
                              {"-"}
                              {salon.temps_fin.substr(11, 5)}
                              &nbsp; &nbsp;
                              <BiCalendar /> &nbsp;{salon.date.substr(0, 10)}
                            </p>
                          </div>
                          <div className="col-md-4 text-right">
                            <p style={{ color: "white" }}>
                              <ImLocation className="localisation-icon" />{" "}
                              {salon.lieu}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="px-5">{salon.description}</p>
                      {salon.max_invitation == salon.reservation.length && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div className="salon-full">
                            {/* <span style={{ fontSize: 15 }}>Salon Saturé !</span> */}
                            <TiTickOutline
                              style={{
                                fontSize: 80,
                              }}
                            />
                            <div
                              style={{
                                marginTop: -10,
                                fontWeight: "bold",
                                fontSize: 18,
                              }}
                            >
                              Complet !
                            </div>
                          </div>
                        </div>
                      )}
                      <div class="progress">
                        <div
                          class={
                            "width-percentage-" +
                            Math.ceil(
                              (salon.reservation.length * 100) /
                                salon.max_invitation
                            )
                          }
                          style={{
                            width: `${Math.ceil(
                              (salon.reservation.length * 100) /
                                salon.max_invitation
                            )}%`,
                            BoxShadow: "0 10 40 -10 #fff",
                            borderRadius: 100,
                            backgroundColor:
                              salon.reservation.length == salon.max_invitation
                                ? "red"
                                : "green",
                            height: 15,
                            transition: "1s ease-in-out",
                          }}
                        />
                      </div>
                      <p className="mt-2 ml-1">
                        <MdCardMembership /> {salon.reservation.length}{" "}
                        participants / <MdChair /> {salon.max_invitation} places
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SalonListe;
