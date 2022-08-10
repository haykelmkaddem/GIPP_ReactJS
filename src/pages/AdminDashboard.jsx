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
      name: "product Statistic",
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

  // let options = {
  //   chart: {
  //     id: "basic-bar",
  //   },
  //   xaxis: {
  //     categories: categoriesstat,
  //   },
  // };
  // let series = [
  //   {
  //     name: "product Statistic",
  //     data: dataforstat,
  //   },
  // ];

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
                        Orders
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
                      <h4 class="header-title mb-2">Quick Summary</h4>
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
                      <h4 class="header-title mb-4">Products of the Month</h4>
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
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title mb-4">Products of the Month</h4>
                      <div class="table-responsive">
                        <table class="table table-centered table-nowrap mb-0">
                          <thead class="thead-light">
                            <tr>
                              <th>ID</th>
                              <th>Product</th>

                              <th>Customer</th>
                              <th>Price</th>
                              <th>Invoice</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>#2356</td>
                              <td>
                                <img
                                  src="assets/images/product/img-7.png"
                                  width="42"
                                  class="me-3"
                                  alt=""
                                />
                                Green Chair
                              </td>
                              <td>Kenneth Gittens</td>
                              <td>$200.00</td>
                              <td>42</td>
                              <td>
                                <span class="badge badge-pill badge-soft-primary font-size-13">
                                  Pending
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td>#2564</td>
                              <td>
                                <img
                                  src="assets/images/product/img-8.png"
                                  width="42"
                                  class="me-3"
                                  alt=""
                                />
                                Office Chair
                              </td>
                              <td>Alfred Gordon</td>
                              <td>$242.00</td>
                              <td>54</td>
                              <td>
                                <span class="badge badge-pill badge-soft-success font-size-13">
                                  Active
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td>#2125</td>
                              <td>
                                <img
                                  src="assets/images/product/img-10.png"
                                  width="42"
                                  class="me-3"
                                  alt=""
                                />
                                Gray Chair
                              </td>
                              <td>Keena Reyes</td>
                              <td>$320.00</td>
                              <td>65</td>
                              <td>
                                <span class="badge badge-pill badge-soft-success font-size-13">
                                  Active
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td>#8587</td>
                              <td>
                                <img
                                  src="assets/images/product/img-11.png"
                                  width="42"
                                  class="me-3"
                                  alt=""
                                />
                                Steel Chair
                              </td>
                              <td>Timothy Zuniga</td>
                              <td>$342.00</td>
                              <td>52</td>
                              <td>
                                <span class="badge badge-pill badge-soft-primary font-size-13">
                                  Pending
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td>#2354</td>
                              <td>
                                <img
                                  src="assets/images/product/img-12.png"
                                  width="42"
                                  class="me-3"
                                  alt=""
                                />
                                Home Chair
                              </td>
                              <td>Joann Wiliams</td>
                              <td>$320.00</td>
                              <td>25</td>
                              <td>
                                <span class="badge badge-pill badge-soft-primary font-size-13">
                                  Pending
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-4">
                  <div class="row">
                    <div class="col-xl-6 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <div class="text-center">
                            <p class="font-size-16">Orders</p>
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
                            <p class="font-size-16">Users</p>
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
                        <h4 class="header-title mb-4">Total Earning</h4>

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
                                  Total Earning:
                                </p>
                                <h5 class="font-size-18 mb-1">
                                  Dinar <br />
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
                                  Last Earning:
                                </p>
                                {!isLoading && (
                                  <h5 class="font-size-18 mb-1">
                                    Dinar <br />
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

                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title mb-4">Best Selling Product</h4>

                      <div
                        id="carouselExampleIndicators"
                        class="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <div class="carousel-indicators">
                          <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            class="active"
                            aria-current="true"
                            aria-label="Slide 1"
                          ></button>
                          <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                          ></button>
                          <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                          ></button>
                        </div>
                        <div class="carousel-inner">
                          <div class="carousel-item active">
                            <div class="row align-items-center mb-5">
                              <div class="col-md-4">
                                <img
                                  src="assets/images/product/img-3.png"
                                  class="img-fluid me-3"
                                  alt=""
                                />
                              </div>
                              <div class="col-md-7 offset-md-1">
                                <div class="mt-4 mt-sm-0">
                                  <p class="text-muted mb-2">Headphone</p>

                                  <h5 class="text-primary">Blue Headphone</h5>

                                  <div class="row no-gutters mt-4">
                                    <div class="col-4">
                                      <div class="mt-1">
                                        <h4>1200</h4>
                                        <p class="text-muted mb-1">Sold</p>
                                      </div>
                                    </div>
                                    <div class="col-4">
                                      <div class="mt-1">
                                        <h4>450</h4>
                                        <p class="text-muted mb-1">Stock</p>
                                      </div>
                                    </div>

                                    <div class="col-4">
                                      <div class="mt-4 pt-1">
                                        <a
                                          href="#"
                                          class="btn btn-primary btn-sm"
                                        >
                                          Buy Now
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="carousel-item">
                            <div class="row align-items-center mb-5">
                              <div class="col-md-4">
                                <img
                                  src="assets/images/product/img-5.png"
                                  class="img-fluid me-3"
                                  alt=""
                                />
                              </div>
                              <div class="col-md-7 offset-md-1">
                                <div class="mt-4 mt-sm-0">
                                  <p class="text-muted mb-2">T-shirt</p>

                                  <h5 class="text-primary">Blue T-shirt</h5>

                                  <div class="row no-gutters mt-4">
                                    <div class="col-4">
                                      <div class="mt-1">
                                        <h4>800</h4>
                                        <p class="text-muted mb-1">Sold</p>
                                      </div>
                                    </div>
                                    <div class="col-4">
                                      <div class="mt-1">
                                        <h4>250</h4>
                                        <p class="text-muted mb-1">Stock</p>
                                      </div>
                                    </div>

                                    <div class="col-4">
                                      <div class="mt-4 pt-1">
                                        <a
                                          href="#"
                                          class="btn btn-primary btn-sm"
                                        >
                                          Buy Now
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="carousel-item">
                            <div class="row align-items-center mb-5">
                              <div class="col-md-4">
                                <img
                                  src="assets/images/product/img-1.png"
                                  class="img-fluid me-3"
                                  alt=""
                                />
                              </div>
                              <div class="col-md-7 offset-md-1">
                                <div class="mt-4 mt-sm-0">
                                  <p class="text-muted mb-2">Sonic</p>

                                  <h5 class="text-primary">Alarm clock</h5>

                                  <div class="row no-gutters mt-4">
                                    <div class="col-4">
                                      <div class="mt-1">
                                        <h4>600</h4>
                                        <p class="text-muted mb-1">Sold</p>
                                      </div>
                                    </div>
                                    <div class="col-4">
                                      <div class="mt-1">
                                        <h4>150</h4>
                                        <p class="text-muted mb-1">Stock</p>
                                      </div>
                                    </div>

                                    <div class="col-4">
                                      <div class="mt-4 pt-1">
                                        <a
                                          href="#"
                                          class="btn btn-primary btn-sm"
                                        >
                                          Buy Now
                                        </a>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
