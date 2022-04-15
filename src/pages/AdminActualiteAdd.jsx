import React from "react";
import AdminHeader from "../components/AdminHeader";

const AdminActualiteAdd = () => {
  return (
    <div>
      <AdminHeader />
      <div className="main-content">
        <div className="page-content">
          <div className="page-title-box">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="page-title">
                    <h4>Add Product</h4>
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">GIPP</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="javascript: void(0);">Ecommerce</a>
                      </li>
                      <li className="breadcrumb-item active">Add Product</li>
                    </ol>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="float-end d-none d-sm-block">
                    <a href="#" className="btn btn-success">
                      Add Widget
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="page-content-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div
                        id="addproduct-nav-pills-wizard"
                        className="twitter-bs-wizard"
                      >
                        <div className=" twitter-bs-wizard-tab-content">
                          <div className="tab-pane" id="basic-info">
                            <h4 className="header-title">Basic Information</h4>
                            <p className="card-title-desc">
                              Fill all information below
                            </p>

                            <form>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="productname"
                                >
                                  Product Name
                                </label>
                                <input
                                  id="productname"
                                  name="productname"
                                  type="text"
                                  className="form-control"
                                />
                              </div>
                              <div className="row">
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="manufacturername"
                                    >
                                      Manufacturer Name
                                    </label>
                                    <input
                                      id="manufacturername"
                                      name="manufacturername"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="manufacturerbrand"
                                    >
                                      Manufacturer Brand
                                    </label>
                                    <input
                                      id="manufacturerbrand"
                                      name="manufacturerbrand"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="price"
                                    >
                                      Price
                                    </label>
                                    <input
                                      id="price"
                                      name="price"
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label className="control-label">
                                      Category
                                    </label>
                                    <select className="form-control select2">
                                      <option>Select</option>
                                      <option defaultValue="EL">
                                        Electronic
                                      </option>
                                      <option defaultValue="FA">Fashion</option>
                                      <option defaultValue="FI">Fitness</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="productdesc"
                                >
                                  Product Description
                                </label>
                                <textarea
                                  className="form-control"
                                  id="productdesc"
                                  rows="5"
                                ></textarea>
                              </div>
                            </form>
                          </div>
                          <div className="tab-pane" id="product-img">
                            <h4 className="header-title">Product Images</h4>
                            <p className="card-title-desc">
                              Upload product image
                            </p>
                            <form
                              action="https://themesdesign.in/"
                              method="post"
                              className="dropzone"
                            >
                              <div className="fallback">
                                <input name="file" type="file" multiple />
                              </div>

                              <div className="dz-message needsclick">
                                <div className="mb-3">
                                  <i className="display-4 text-muted mdi mdi-cloud-download-outline"></i>
                                </div>

                                <h4>Drop files here or click to upload.</h4>
                              </div>
                            </form>
                            <br />
                          </div>
                          <div className="tab-pane" id="metadata">
                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                              <li className="float-end">
                                <a href="#">
                                  Save Changes{" "}
                                  <i className="mdi mdi-arrow-right ml-1"></i>
                                </a>
                              </li>
                            </ul>
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

export default AdminActualiteAdd;
