import React from "react";
import { Divider } from "@mui/material";

export const Footer = (props) => {
  return (
    <footer>
      <div className="container-md clsx-footer-section mt-5 pt-3">
        <div className="d-flex clsx-footerflex-container justify-content-between w-100">
          <div className="">
            <div className="clsx-footer-logodiv">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2bccea1f72c96756b9c3a29cd80f378852cc4c0a7ac477cb415467739e3c1e?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                className="clsx-footer-logo"
              />
            </div>
            <p className="clsx-footer-text">
              With its arsenal of superpowers, Fintrix is your trusted ally in
              the quest for financial mastery. Harnessing cutting-edge
              technology and expert insights.
            </p>
          </div>
          <div className="">
            <div className="clsx-banner-buttons">
              <div className="">
                <button type="button" className="btn clsx-banner-request">
                  Request a demo
                </button>
              </div>
              <div className="">
                <button type="button" className="btn clsx-freetrialbanner-btn">
                  Get Free Trial{" "}
                  <span>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/549fef92bbd34bc417aa71de1652192740d333d9eb9fbced3b008a13cae537bd?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                      className=""
                    />
                  </span>
                </button>
              </div>
            </div>
            <div className="clsx-banner-subcredittexts">
              <div className="clsx-banner-subcredittexts-left">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/149dc89276ef83d3edf60fd46ed5594ed54cd5d3b289f050ef95dc18bdd47cb8?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                  className=""
                />
                <div className="clsx-subhelpertext-banner">
                  No credit card required
                </div>
              </div>
              <div className="clsx-banner-subcredittexts-right">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c302bd87fa03c9f21871693ea96d3c13902f660bcd0de424b73f58ff625c880f?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                  className=""
                />
                <div className="clsx-subhelpertext-banner">
                  30 days free trail
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider className="mt-5 mb-4" />

      <div className="container-md">
        <div className="d-flex justify-content-between w-100 clsx-footercopyrightsflex-container">
          <p className="clsx-copyrights-text">
            Copyright © 2024 Fintrix. All rights reserved
          </p>
          <div>
            <div className="d-flex w-100 clsx-socialmedia-container">
              <div>
                <img src="/assets/img/fb.svg" />
              </div>
              <div>
                <img src="/assets/img/twitter.svg" />
              </div>
              <div>
                <img src="/assets/img/insta.svg" />
              </div>
              <div>
                <img src="/assets/img/linkedin.svg" />
              </div>
              <div>
                <img src="/assets/img/youtube.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
