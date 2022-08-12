import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { BiTimeFive, BiCalendar, BiFilterAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
const CONTACT_URL = "http://127.0.0.1:8000/user/contactUs";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [nom, setisNom] = useState("");
  const [email, setisEmail] = useState("");
  const [number, setisNumber] = useState("");
  const [message, setisMessage] = useState("");
  const [subject, setisSubject] = useState("");

  function fetchContact() {
    setIsLoading(true);
    axios
      .post(CONTACT_URL, {
        nom: nom,
        email: email,
        number: number,
        message: message,
        subject: subject,
      })
      .then((response) => {
        console.log("message : " + response.data.message);
        if (response.data.message == "success") {
          Swal.fire({
            title: "Success",
            text: "Your message has been sent",
            icon: "success",
            confirmButtonText: "OK",
          });
          setIsLoading(false);
        } else {
          Swal.fire({
            title: "Error",
            text: "Your message has not been sent",
            icon: "error",
            confirmButtonText: "OK",
          });
          setIsLoading(false);
        }
      })
      .finally(() => {
        // setIsLoading(false);
        // okAlert();
      });
  }

  function cleanForm() {
    setisNom("");
    setisEmail("");
    setisNumber("");
    setisMessage("");
    setisSubject("");
  }

  const okAlert = () => {
    cleanForm();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Votre message a été envoyé avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  return (
    <div>
      <Header />
      <br />

      <div>
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 100000,
            }}
          >
            <CircularProgress color="primary" size={80} />
          </div>
        )}
        <section class="ttm-row conatct-section ttm-bgcolor-grey clearfix">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-title title-style-center_text">
                  <div class="title-header">
                    <h3>get in touch!</h3>
                    <h2 class="title">Have A Questions Drop Us Line?</h2>
                  </div>
                  <div class="title-desc">
                    <p>
                      We take great pride in everything that we do, complete
                      control over products allows us to ensure customers
                      receive best service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8">
                <div class="ttm-bgcolor-white p-40 padding_top35 border-rad_5 margin_top15">
                  <div class="row">
                    <div class="col-md-6">
                      <span class="text-input">
                        <input
                          style={{
                            backgroundColor: "#EFF3FF",
                            border: "none",
                            marginBottom: 20,
                          }}
                          type="text"
                          placeholder="Your Name*"
                          defaultValue={nom}
                          onChange={(e) => setisNom(e.target.value)}
                        />
                      </span>
                    </div>
                    <div class="col-md-6">
                      <span class="text-input">
                        <input
                          style={{
                            backgroundColor: "#EFF3FF",
                            border: "none",
                            marginBottom: 20,
                          }}
                          type="text"
                          placeholder="Your Email*"
                          defaultValue={email}
                          onChange={(e) => setisEmail(e.target.value)}
                        />
                      </span>
                    </div>
                    <div class="col-md-6">
                      <span class="text-input">
                        <input
                          style={{
                            backgroundColor: "#EFF3FF",
                            border: "none",
                            marginBottom: 20,
                          }}
                          type="text"
                          placeholder="Phone Number*"
                          defaultValue={number}
                          onChange={(e) => setisNumber(e.target.value)}
                        />
                      </span>
                    </div>
                    <div class="col-md-6">
                      <span class="text-input">
                        <input
                          style={{
                            backgroundColor: "#EFF3FF",
                            border: "none",
                            marginBottom: 20,
                          }}
                          type="text"
                          placeholder="Subject*"
                          defaultValue={subject}
                          onChange={(e) => setisSubject(e.target.value)}
                        />
                      </span>
                    </div>
                    <div class="col-lg-12">
                      <span class="text-input">
                        <textarea
                          style={{
                            backgroundColor: "#EFF3FF",
                            border: "none",
                            marginBottom: 25,
                          }}
                          rows="5"
                          placeholder="Message"
                          defaultValue={message}
                          onChange={(e) => setisMessage(e.target.value)}
                        ></textarea>
                      </span>
                    </div>
                    <div class="col-lg-12">
                      <button
                        class="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 margin_top5"
                        onClick={() => fetchContact()}
                      >
                        Send now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="ttm-bgcolor-white p-30 border-rad_5 margin_top15">
                  <div class="featured-icon-box icon-align-top-content margin_top0 margin_bottom25">
                    <div class="featured-icon">
                      <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                        <i class="flaticon-email"></i>
                      </div>
                    </div>
                    <div class="featured-content pt-2">
                      <div class="featured-title">
                        <h3 class="margin_bottom0 fs-20">
                          Let’s Call or Email
                        </h3>
                      </div>
                      <div class="featured-desc">
                        contact@gipp.tn
                        <br />
                        +216 71 786 976
                      </div>
                    </div>
                  </div>
                  <div class="featured-icon-box icon-align-top-content margin_bottom25">
                    <div class="featured-icon">
                      <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                        <i class="flaticon-address"></i>
                      </div>
                    </div>
                    <div class="featured-content pt-2">
                      <div class="featured-title">
                        <h3 class="margin_bottom0 fs-20">We Reached Here</h3>
                      </div>
                      <div class="featured-desc">
                        37, R. du Niger 1002, TUNIS BELVEDERE TUNIS Tunisie.
                      </div>
                    </div>
                  </div>
                  <div class="featured-icon-box icon-align-top-content margin_bottom10">
                    <div class="featured-icon">
                      <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-md"></div>
                    </div>
                    <div class="featured-content pt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
