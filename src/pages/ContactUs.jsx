import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ContactUs = () => {
  return (
    <div>
      <Header />
      <br />
      <div class="site-main">
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
                  <form
                    id="request_qoute_form"
                    class="request_qoute_form wrap-form clearfix"
                    method="post"
                    novalidate="novalidate"
                    action="#"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <span class="text-input">
                          <input
                            name="name"
                            type="text"
                            value=""
                            placeholder="Your Name*"
                            required="required"
                          />
                        </span>
                      </div>
                      <div class="col-md-6">
                        <span class="text-input">
                          <input
                            name="address"
                            type="text"
                            value=""
                            placeholder="Your Email*"
                            required="required"
                          />
                        </span>
                      </div>
                      <div class="col-md-6">
                        <span class="text-input">
                          <input
                            name="phone"
                            type="text"
                            value=""
                            placeholder="Phone Number*"
                            required="required"
                          />
                        </span>
                      </div>
                      <div class="col-md-6">
                        <span class="text-input">
                          <input
                            name="subject"
                            type="text"
                            value=""
                            placeholder="Subject*"
                            required="required"
                          />
                        </span>
                      </div>
                      <div class="col-lg-12">
                        <span class="text-input">
                          <textarea
                            name="message"
                            rows="5"
                            placeholder="Message"
                            required="required"
                          ></textarea>
                        </span>
                      </div>
                      <div class="col-lg-12">
                        <button
                          class="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 margin_top5"
                          type="submit"
                        >
                          Send now!
                        </button>
                      </div>
                    </div>
                  </form>
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
                        example@evenex.com
                        <br />
                        +1800 123 456 7890
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
                        45 Mikraham Street, New York 47895
                      </div>
                    </div>
                  </div>
                  <div class="featured-icon-box icon-align-top-content margin_bottom10">
                    <div class="featured-icon">
                      <div class="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-skincolor ttm-icon_element-size-md">
                        <i class="themifyicon ti-themify-favicon"></i>
                      </div>
                    </div>
                    <div class="featured-content pt-2">
                      <div class="featured-title">
                        <h3 class="margin_bottom0 fs-20">Chat on Online</h3>
                      </div>
                      <div class="featured-desc">name@skype.com</div>
                    </div>
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
