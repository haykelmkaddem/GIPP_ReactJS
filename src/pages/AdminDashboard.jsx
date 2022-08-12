import React from "react";
import AdminHeader from "../components/AdminHeader";
import Chart from "react-apexcharts";
import ImageUploading from "react-images-uploading";
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
// import { moveFile } from "move-file";
// const moveFile = require("@npmcli/move-file");
// const cpFile = require("cp-file");
const COMMANDES_URL = "http://127.0.0.1:8000/commande/showall";
const USERS_URL = "http://127.0.0.1:8000/user/showallUsers";
const STAT_URL = "http://127.0.0.1:8000/produit/produitstat";

const AdminDashboard = () => {
  var height = window.innerHeight;
  var width = window.innerWidth;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(false);
  const [users, setUsers] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [total, setTotal] = useState(0);
  const [totallast, setTotallast] = useState(0);
  const [stat, setStat] = useState([]);
  const [categoriesstat, setCategoriesstat] = useState([]);
  const [labels, setLabels] = useState([]);
  const [donutOptions, setDonutOptions] = useState({});
  const [donutSeries, setDonutSeries] = useState([]);
  const [dataforstat, setDataforstat] = useState([]);
  const [vu, setVu] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Statistique de produit",
      data: [],
    },
  ]);

  function fetchCommandes() {
    axios
      .post(COMMANDES_URL)
      .then((response) => {
        setCommandes(response.data);
        let i = 0;
        for (let index = 0; index < response.data.length; index++) {
          i = i + response.data[index].totale;
          if (index == response.data.length - 1) {
            setTotallast(response.data[index].totale);
          }
        }
        setTotal(i);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function fetchUsers() {
    axios
      .post(USERS_URL)
      .then((response) => {
        setUsers(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const piee = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  function fetchStat() {
    axios
      .post(STAT_URL)
      .then((response) => {
        setStat(response.data);
        response.data.map((data) => {
          categoriesstat.push(data.produit.nom);
          dataforstat.push(data.qt);
          vu.push(data.produit.vu);
          console.log(data.produit.vu);
          console.log(data.produit.nom);
        });
      })
      .finally(() => {
        setIsLoading(false);
        setOptions({
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: categoriesstat,
          },
        });
        setSeries([
          {
            name: "product Statistic",
            data: dataforstat,
          },
        ]);
        // setLabels(categoriesstat);
        setDonutSeries(vu);
        setDonutOptions({
          labels: categoriesstat,
          chart: {
            type: "donut",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        });
      });
  }

  useEffect(() => {
    if (!playOnce) {
      fetchCommandes();
      fetchUsers();
      fetchStat();
      setPlayOnce(true);
    }
  }, [commandes, playOnce, users]);

  return (
    <div className="my-admin-1">
      <AdminHeader />
      <div class="main-content">
        <div class="page-content">
          <div class="page-title-box">
            <div class="container-fluid">
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div class="page-title">
                    <h4>Dashboard</h4>
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <NavLink to="/admindashboard">
                          <a>GIPP</a>
                        </NavLink>
                      </li>
                      <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                </div>
                <div class="col-sm-6">
                  <NavLink to="/admincommandlist">
                    <div class="float-end d-none d-sm-block">
                      <a class="btn btn-success" style={{ color: "white" }}>
                        Commandes
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
                <div class="col-xl-8">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title mb-2">Résumé rapide</h4>
                      <div class="row align-items-center">
                        <div class="col-xl-12">
                          <div className="mixed-chart">
                            <Chart
                              options={options}
                              series={series}
                              type="bar"
                              width="630"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title mb-4">
                        les produits les plus consultés sur notre plateforme
                      </h4>
                      <div className="donut d-flex align-items-center justify-content-center">
                        {vu.length > 0 && donutOptions != {} && (
                          <Chart
                            options={donutOptions}
                            series={donutSeries}
                            type="donut"
                            width="450"
                          />
                        )}
                        {(vu.length == 0 || donutOptions == {}) && (
                          <div
                            style={{ height: 150 }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <CircularProgress color="primary" size={80} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {labels.length > 0 &&
                    donutOptions.labels.map((label) => (
                      <div class="donut-text">
                        <h5>{label}</h5>
                      </div>
                    ))}
                </div>

                <div class="col-xl-4">
                  <div class="row">
                    <div class="col-xl-6 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="text-center">
                            <p class="font-size-16">Commandes</p>
                            <div class="mini-stat-icon mx-auto mb-4 mt-3">
                              <span class="avatar-title rounded-circle bg-soft-primary">
                                <i class="mdi mdi-cart-outline text-primary font-size-20"></i>
                              </span>
                            </div>
                            <h5 class="font-size-22">{commandes.length}</h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-6 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="text-center">
                            <p class="font-size-16">Utilisateurs</p>
                            <div class="mini-stat-icon mx-auto mb-4 mt-3">
                              <span class="avatar-title rounded-circle bg-soft-success">
                                <i class="mdi mdi-account-outline text-success font-size-20"></i>
                              </span>
                            </div>
                            <h5 class="font-size-22">{users.length}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="header-title mb-4">Gain total</h4>

                        <div class="mt-2 text-center">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="mt-4 mt-sm-0">
                                <div
                                  id="list-chart-1"
                                  class="apex-charts"
                                  dir="ltr"
                                ></div>
                                <p class="text-muted mb-2 mt-2 pt-1">
                                  Gain total:
                                </p>
                                <h5 class="font-size-18 mb-1">
                                  TND <br />
                                  {total}
                                </h5>
                              </div>
                            </div>

                            <div class="col-md-6 dash-goal">
                              <div class="mt-4 mt-sm-0">
                                <div
                                  id="list-chart-2"
                                  class="apex-charts"
                                  dir="ltr"
                                ></div>

                                <p class="text-muted mb-2 mt-2 pt-1">
                                  Dernier gain :
                                </p>
                                {!isLoading && (
                                  <h5 class="font-size-18 mb-1">
                                    TND <br />
                                    {totallast}
                                  </h5>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
