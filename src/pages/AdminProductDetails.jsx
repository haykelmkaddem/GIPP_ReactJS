import React from "react";
import AdminHeader from "../components/AdminHeader";

const AdminProductDetails = () => {
  return (
    <>
      <AdminHeader />
      <div class="main-content">
        <div class="page-content">
          <div class="page-title-box">
            <div class="container-fluid">
              <div class="row align-items-center">
                <div class="col-sm-6">
                  <div class="page-title">
                    <h4>Product Details</h4>
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <a href="javascript: void(0);">Morvin</a>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="javascript: void(0);">Ecommerce</a>
                      </li>
                      <li class="breadcrumb-item active">Product Details</li>
                    </ol>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="float-end d-none d-sm-block">
                    <a href="#" class="btn btn-success">
                      Add Widget
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="page-content-wrapper">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-xl-5">
                          <div class="product-detail">
                            <div class="row">
                              <div class="col-3">
                                <div
                                  class="nav flex-column nav-pills"
                                  id="v-pills-tab"
                                  role="tablist"
                                  aria-orientation="vertical"
                                >
                                  <a
                                    class="nav-link active"
                                    id="product-1-tab"
                                    data-bs-toggle="pill"
                                    href="#product-1"
                                    role="tab"
                                  >
                                    <img
                                      src="assets/BackOffice/images/product/img-7.png"
                                      alt=""
                                      class="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </a>
                                  <a
                                    class="nav-link"
                                    id="product-2-tab"
                                    data-bs-toggle="pill"
                                    href="#product-2"
                                    role="tab"
                                  >
                                    <img
                                      src="assets/BackOffice/images/product/img-8.png"
                                      alt=""
                                      class="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </a>
                                  <a
                                    class="nav-link"
                                    id="product-3-tab"
                                    data-bs-toggle="pill"
                                    href="#product-3"
                                    role="tab"
                                  >
                                    <img
                                      src="assets/BackOffice/images/product/img-9.png"
                                      alt=""
                                      class="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </a>
                                  <a
                                    class="nav-link"
                                    id="product-4-tab"
                                    data-bs-toggle="pill"
                                    href="#product-4"
                                    role="tab"
                                  >
                                    <img
                                      src="assets/BackOffice/images/product/img-11.png"
                                      alt=""
                                      class="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </a>
                                </div>
                              </div>
                              <div class="col-md-8 col-9">
                                <div
                                  class="tab-content"
                                  id="v-pills-tabContent"
                                >
                                  <div
                                    class="tab-pane fade show active"
                                    id="product-1"
                                    role="tabpanel"
                                  >
                                    <div class="product-img">
                                      <img
                                        src="assets/BackOffice/images/product/img-7.png"
                                        alt=""
                                        class="img-fluid mx-auto d-block"
                                        data-zoom="assets/images/product/img-1.png"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    class="tab-pane fade"
                                    id="product-2"
                                    role="tabpanel"
                                  >
                                    <div class="product-img">
                                      <img
                                        src="assets/BackOffice/images/product/img-8.png"
                                        alt=""
                                        class="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    class="tab-pane fade"
                                    id="product-3"
                                    role="tabpanel"
                                  >
                                    <div class="product-img">
                                      <img
                                        src="assets/BackOffice/images/product/img-9.png"
                                        alt=""
                                        class="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    class="tab-pane fade"
                                    id="product-4"
                                    role="tabpanel"
                                  >
                                    <div class="product-img">
                                      <img
                                        src="assets/BackOffice/images/product/img-11.png"
                                        alt=""
                                        class="img-fluid mx-auto d-block"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-7">
                          <div class="mt-4 mt-xl-3">
                            <a href="#" class="text-primary">
                              Chair
                            </a>
                            <h5 class="mt-1 mb-3">Home & Office Chair Green</h5>

                            <div class="d-inline-flex">
                              <div class="text-muted me-3">
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star text-warning"></span>
                                <span class="mdi mdi-star-half text-warning"></span>
                              </div>
                            </div>

                            <h5 class="mt-2">
                              <del class="text-muted me-2">$200</del>$240{" "}
                              <span class="text-danger font-size-12 ms-2">
                                25 % Off
                              </span>
                            </h5>

                            <hr class="my-4" />

                            <div class="mt-4">
                              <h6>Features :</h6>

                              <div class="mt-4">
                                <p class="text-muted mb-2">
                                  <i class="mdi mdi-check-bold text-success me-2"></i>
                                  Various have evolved over years sometimes on
                                  purpose.
                                </p>
                                <p class="text-muted mb-2">
                                  <i class="mdi mdi-check-bold text-success me-2"></i>
                                  Always free from repetition injected humour or
                                  words etc.
                                </p>
                                <p class="text-muted mb-2">
                                  <i class="mdi mdi-check-bold text-success me-2"></i>
                                  Excepteur cupidatat mollit anim id est
                                  laborum.
                                </p>
                              </div>
                            </div>

                            <div class="mt-4">
                              <button
                                type="button"
                                class="btn btn-primary waves-effect waves-light mt-2"
                              >
                                <i class="mdi mdi-cart me-2"></i> Add to cart
                              </button>
                            </div>

                            <div class="row mt-4">
                              <div class="col-md-6">
                                <div class="product-color mt-3">
                                  <h5 class="font-size-14">Color :</h5>
                                  <a href="#" class="active">
                                    <div class="product-color-item">
                                      <img
                                        src="assets/BackOffice/images/product/img-7.png"
                                        alt=""
                                        class="avatar-md"
                                      />
                                    </div>
                                    <p>Blue</p>
                                  </a>
                                  <a href="#">
                                    <div class="product-color-item">
                                      <img
                                        src="assets/BackOffice/images/product/img-8.png"
                                        alt=""
                                        class="avatar-md"
                                      />
                                    </div>
                                    <p>Cyan</p>
                                  </a>
                                  <a href="#">
                                    <div class="product-color-item">
                                      <img
                                        src="assets/BackOffice/images/product/img-9.png"
                                        alt=""
                                        class="avatar-md"
                                      />
                                    </div>
                                    <p>Green</p>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title mb-4">Reviews : </h4>
                      <div class="d-inline-flex mb-3">
                        <div class="text-muted me-3">
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star text-warning"></span>
                          <span class="mdi mdi-star"></span>
                        </div>
                        <div class="text-muted">( 132 customer Review)</div>
                      </div>
                      <div class="border p-4 rounded">
                        <div class="media border-bottom pb-3">
                          <div class="media-body">
                            <p class="text-muted mb-2">
                              To an English person, it will seem like simplified
                              English, as a skeptical Cambridge
                            </p>
                            <h5 class="font-size-15 mb-3">James</h5>

                            <ul class="list-inline product-review-link mb-0">
                              <li class="list-inline-item">
                                <a href="#">
                                  <i class="mdi mdi-thumb-up align-middle me-1"></i>{" "}
                                  Like
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a href="#">
                                  <i class="mdi mdi-message-text align-middle me-1"></i>{" "}
                                  Comment
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p class="float-sm-right font-size-12">
                            11 Feb, 2020
                          </p>
                        </div>
                        <div class="media border-bottom py-3">
                          <div class="media-body">
                            <p class="text-muted mb-2">
                              Everyone realizes why a new common language would
                              be desirable
                            </p>
                            <h5 class="font-size-15 mb-3">David</h5>

                            <ul class="list-inline product-review-link mb-0">
                              <li class="list-inline-item">
                                <a href="#">
                                  <i class="mdi mdi-thumb-up align-middle me-1"></i>{" "}
                                  Like
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a href="#">
                                  <i class="mdi mdi-message-text align-middle me-1"></i>{" "}
                                  Comment
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p class="float-sm-right font-size-12">
                            22 Jan, 2020
                          </p>
                        </div>
                        <div class="media pt-3">
                          <div class="media-body">
                            <p class="text-muted mb-2">
                              If several languages coalesce, the grammar of the
                              resulting{" "}
                            </p>
                            <h5 class="font-size-15 mb-3">Scott</h5>

                            <ul class="list-inline product-review-link mb-0">
                              <li class="list-inline-item">
                                <a href="#">
                                  <i class="mdi mdi-thumb-up align-middle me-1"></i>{" "}
                                  Like
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a href="#">
                                  <i class="mdi mdi-message-text align-middle me-1"></i>{" "}
                                  Comment
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p class="float-sm-right font-size-12">
                            04 Jan, 2020
                          </p>
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
    </>
  );
};

export default AdminProductDetails;
