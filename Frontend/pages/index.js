import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import ChartComponent from "components/ChartComponent";
import Header from "components/Header";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Footer } from "components/Footer";

export default function Home() {
  const [selectedChartTab, setselectedChartTab] = useState(0);

  const Reviewsettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const testimonials = [
    {
      id: 1,
      name: "Ibrahim Habib",
      date: "2 days ago",
      text: "Fintrix has revolutionized how I manage my finances! With its intuitive interface and comprehensive features, I feel more in control of my money than ever before.",
      userImageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/89a5e3c4819bacd7699f455e496113a40f4a9bfee5a5c6bb757bc8e9740c3517?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&width=100",
      images: [
        {
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce405c2c3b818e2dcbcc32a29fcf5f4afcd8d3ab1963b1272c47673bf4dedada?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&",
          altText: "Screenshot of Fintrix feature 1",
        },
        {
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce405c2c3b818e2dcbcc32a29fcf5f4afcd8d3ab1963b1272c47673bf4dedada?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&",
          altText: "Screenshot of Fintrix feature 2",
        },
        {
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce405c2c3b818e2dcbcc32a29fcf5f4afcd8d3ab1963b1272c47673bf4dedada?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&",
          altText: "Screenshot of Fintrix feature 3",
        },
        {
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce405c2c3b818e2dcbcc32a29fcf5f4afcd8d3ab1963b1272c47673bf4dedada?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&",
          altText: "Screenshot of Fintrix feature 4",
        },
        {
          src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ce405c2c3b818e2dcbcc32a29fcf5f4afcd8d3ab1963b1272c47673bf4dedada?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&",
          altText: "Screenshot of Fintrix feature 5",
        },
      ],
    },
    // Assuming more testimonials follow the same structure, add more here if needed.
  ];

  const handleReadMoreClick = () => {
    console.log("Read more clicked");
  };

  return (
    <>
      <div className="div">
        <div className="">
          <Header />
          <div className="container-md">
            <div className="clsx-banner-div">
              <span>Conquer Your </span>
              <span className="clsx-violet-color">Financial Goals</span>
              <span> Today!</span>
            </div>
            <div className="clsx-banner-subtext">
              With its arsenal of superpowers, Fintrix is your trusted ally in
              the quest for financial mastery. Harnessing cutting-edge
              technology and expert insights.
            </div>
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
            <div className="clsx-banner-img-div">
              <img
                loading="lazy"
                src="/assets/img/bannerImg.svg"
                className=""
              />
            </div>
          </div>

          <div className="clsx-count-section">
            <div className="container-md">
              <div className="clsx-countflex-container">
                <div className="clsx-counter-innerIndividualdiv">
                  <div className="clsx-counter-text">1000+</div>
                  <div className="clsx-counter-subtext">
                    Satisfied
                    <br />
                    Customers
                  </div>
                </div>
                <div className="clsx-counter-innerIndividualdiv">
                  <div className="clsx-counter-text">500+</div>
                  <div className="clsx-counter-subtext">
                    Google
                    <br />
                    Reviews
                  </div>
                </div>
                <div className="clsx-counter-innerIndividualdiv">
                  <div className="clsx-counter-text">10+</div>
                  <div className="clsx-counter-subtext">
                    Empowered
                    <br />
                    Investors
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-md">
            <div className="clsx-targetcalulation">
              <h3 className="clsx-targetsection-title">
                Assessing Your Progress: Are You On Track to Achieve Your Goals?{" "}
                Let’s find.
              </h3>
              <div className="clsx-tabs-manual">
                <div
                  className={
                    selectedChartTab === 0
                      ? "clsx-tabs-menu-active"
                      : "clsx-tabs-menu"
                  }
                  onClick={() => {
                    setselectedChartTab(0);
                  }}
                >
                  Target amount
                </div>
                <div
                  className={
                    selectedChartTab === 1
                      ? "clsx-tabs-menu-active"
                      : "clsx-tabs-menu"
                  }
                  onClick={() => {
                    setselectedChartTab(1);
                  }}
                >
                  Salary
                </div>
                <div
                  className={
                    selectedChartTab === 2
                      ? "clsx-tabs-menu-active"
                      : "clsx-tabs-menu"
                  }
                  onClick={() => {
                    setselectedChartTab(2);
                  }}
                >
                  Retirement
                </div>
              </div>
              <div className="clsx-chartinput-div mb-5">
                <div className="clsx-targetamount-div">
                  <TextField
                    label=""
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          Target Amount
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="clsx-age-div">
                  <TextField
                    label=""
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Age</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="clsx-showgoals-div">
                  <button
                    type="button"
                    className="btn clsx-freetrialbanner-btn"
                  >
                    Show my goals
                  </button>
                </div>
              </div>
            </div>
            <ChartComponent />
          </div>
        </div>

        <div className="clsx-goallisting-div">
          <div className="container-md">
            <div className="clsx-goallisting-Innerdiv">
              <h3 className="clsx-goallisting-title">
                Crafting Your Financial Future: Set Your Goal and Achieve
                Financial Success
              </h3>
              <p className="clsx-goallisting-subtitle">
                It's time to take control of your financial destiny by setting a
                clear and compelling goal
              </p>
              <div className="clsx-goallisting-productsdiv">
                {/* <div className="div-142"> */}
                <div className="column">
                  <div className="clsx-goallisting-productsIndividualdiv">
                    <div className="clsx-goallisting-productsIndividualOuterFlex">
                      <div className="clsx-goalproduct-insidecol1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b5d6dd6a5aa5df061097a3eea35ef7c0be5703767f23b3b4ee5d90aa5bb7334?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                          className=""
                        />
                      </div>
                      <div className="clsx-goalproduct-insidecol2">
                        {/* <div className="div-145"> */}
                        <div className="clsx-goalproduct-title">
                          Prosperity ingredients
                        </div>
                        <div className="clsx-goalproduct-subtitle">
                          Analyse Your Financial Position
                        </div>
                        {/* </divx> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="clsx-goallisting-productsIndividualdiv">
                    <div className="clsx-goallisting-productsIndividualOuterFlex">
                      <div className="clsx-goalproduct-insidecol1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/956ebfd643a12429d1b369bda37993ba8afdc9099cb062aeab8903695d931a6a?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                          className=""
                        />
                      </div>
                      <div className="clsx-goalproduct-insidecol2">
                        {/* <div className="div-150"> */}
                        <div className="clsx-goalproduct-title">
                          Financial appetite
                        </div>
                        <div className="clsx-goalproduct-subtitle">
                          Know Your Personality
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="clsx-goallisting-productsIndividualdiv">
                    <div className="clsx-goallisting-productsIndividualOuterFlex">
                      <div className="clsx-goalproduct-insidecol1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7583e6e1f8ad1583c3584f01e2ed0c7be8b83f410ee722b5d713b66860ac866?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                          className=""
                        />
                      </div>
                      <div className="clsx-goalproduct-insidecol2">
                        {/* <div className="div-155"> */}
                        <div className="clsx-goalproduct-title">
                          Goal planner
                        </div>
                        <div className="clsx-goalproduct-subtitle">
                          Build Your Goals
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="clsx-goallisting-productsIndividualdiv">
                    <div className="clsx-goallisting-productsIndividualOuterFlex">
                      <div className="clsx-goalproduct-insidecol1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7216976b1f2422c1840bec15d6976ff8528a1ba8951e2ef8c5125368c7c68bc2?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                          className=""
                        />
                      </div>
                      <div className="clsx-goalproduct-insidecol2">
                        {/* <div className="div-162"> */}
                        <div className="clsx-goalproduct-title">
                          Financial X-ray report
                        </div>
                        <div className="clsx-goalproduct-subtitle">
                          Get your 360° plan
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="clsx-goallisting-productsIndividualdiv">
                    <div className="clsx-goallisting-productsIndividualOuterFlex">
                      <div className="clsx-goalproduct-insidecol1">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/be0cfc238d6aef54eea577133b5998c4de6aa720c644aaf0447e6d48178ce3bc?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                          className=""
                        />
                      </div>
                      <div className="clsx-goalproduct-insidecol2">
                        {/* <div className="div-167"> */}
                        <div className="clsx-goalproduct-title">
                          Safe and secure
                        </div>
                        <div className="clsx-goalproduct-subtitle">
                          Data protection
                        </div>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clsx-bg-white">
          <div className="container-md mt-4 pt-4 mb-4 pb-4">
            <div className="clsx-products-flexdiv">
              <div className="clsx-products-innerflex">
                <div className="clsx-products-innerdiv">
                  <div className="clsx-products-innerdivflex">
                    <h3 className="clsx-products-title">Mutual Funds</h3>
                    <p className="clsx-products-subtitle mt-2">
                      Research reports on mutual funds that have been carefully
                      sieved through filters of quality, consistency and
                      reliable investment strategy.
                    </p>
                  </div>
                  <div>
                    <img src="/assets/img/MutualFunds.svg" />
                  </div>
                </div>
              </div>
              <div className="clsx-products-innerflex">
                <div className="clsx-products-innerdiv">
                  <div className="clsx-products-innerdivflex">
                    <h3 className="clsx-products-title">Financial Appetite</h3>
                    <p className="clsx-products-subtitle mt-2">
                      Exploring Personality Traits and Investing Style:
                      Understanding Your Unique Characteristics and Financial
                      Approach
                    </p>
                  </div>
                  <div>
                    <img src="/assets/img/financialApettete.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-md">
          <div className="clsx-bg-title-div">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e15400a65ed82e4f6be2fc8694440a422b140e056c79eeda8257876ccbe93727?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
              className=""
            />
            <h4 className="clsx-bgtitle">AI-driven technology</h4>
          </div>
          <div className="d-flex justify-content-center w-100 flex-column">
            <h3 className="clsx-benifits-title">
              Way to your Financial Success. Beneficial for You and Your Bank
              Balance
            </h3>
            <p className="clsx-benifits-subtitle">
              Do it yourself, with the power of technology and affordability.
            </p>
          </div>

          <div className="clsx-benifits-flexcontainer">
            <div className="clsx-commision-text">0% Commission</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ebd1bebe3804ae726742bd373d166b297ac8e4b199b161bea49f8da6c4e88f4?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
              className=""
            />
            <div className="clsx-unbiased-text">100% Unbiased</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ebd1bebe3804ae726742bd373d166b297ac8e4b199b161bea49f8da6c4e88f4?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
              className=""
            />
            <div className="clsx-techdriven-text">200% Tech-Driven</div>
          </div>
        </div>

        <div className="clsx-bg-white">
          <div className="container">
            <h3 className="clsx-reviewsection-title">
              500+ Positive Google reviews
            </h3>
          </div>
          <div className="slider-container mt-5 mb-5">
            <Slider {...Reviewsettings}>
              <div className="clsx-bg-lightblue">
                <section className="testimonial-card">
                  <header className="user-info">
                    {testimonials.map(
                      ({ id, name, date, text, userImageSrc, images }) => (
                        <div key={id} className="testimonial">
                          <div className="d-flex w-100">
                            <div className="user-image-wrapper">
                              <img
                                loading="lazy"
                                src={userImageSrc}
                                alt={`${name}`}
                                className="user-image"
                              />
                              <div className="overlay" />
                            </div>
                            <div className="user-details">
                              <h3 className="user-name">{name}</h3>
                              <time className="date-posted">{date}</time>
                            </div>
                          </div>
                          <p className="testimonial-text">{text}</p>
                          <div className="testimonial-images">
                            {images.map((image, index) => (
                              <img
                                key={index}
                                loading="lazy"
                                src={image.src}
                                alt={image.altText}
                                className={`testimonial-image testimonial-image-${
                                  index + 1
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </header>
                </section>
              </div>
              <div>
                <div className="clsx-bg-lightblue">
                  <section className="testimonial-card">
                    <header className="user-info">
                      {testimonials.map(
                        ({ id, name, date, text, userImageSrc, images }) => (
                          <div key={id} className="testimonial">
                            <div className="d-flex w-100">
                              <div className="user-image-wrapper">
                                <img
                                  loading="lazy"
                                  src={userImageSrc}
                                  alt={`${name}`}
                                  className="user-image"
                                />
                                <div className="overlay" />
                              </div>
                              <div className="user-details">
                                <h3 className="user-name">{name}</h3>
                                <time className="date-posted">{date}</time>
                              </div>
                            </div>
                            <p className="testimonial-text">{text}</p>
                            <div className="testimonial-images">
                              {images.map((image, index) => (
                                <img
                                  key={index}
                                  loading="lazy"
                                  src={image.src}
                                  alt={image.altText}
                                  className={`testimonial-image testimonial-image-${
                                    index + 1
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </header>
                  </section>
                </div>
              </div>
              <div>
                <div className="clsx-bg-lightblue">
                  <section className="testimonial-card">
                    <header className="user-info">
                      {testimonials.map(
                        ({ id, name, date, text, userImageSrc, images }) => (
                          <div key={id} className="testimonial">
                            <div className="d-flex w-100">
                              <div className="user-image-wrapper">
                                <img
                                  loading="lazy"
                                  src={userImageSrc}
                                  alt={`${name}`}
                                  className="user-image"
                                />
                                <div className="overlay" />
                              </div>
                              <div className="user-details">
                                <h3 className="user-name">{name}</h3>
                                <time className="date-posted">{date}</time>
                              </div>
                            </div>
                            <p className="testimonial-text">{text}</p>
                            <div className="testimonial-images">
                              {images.map((image, index) => (
                                <img
                                  key={index}
                                  loading="lazy"
                                  src={image.src}
                                  alt={image.altText}
                                  className={`testimonial-image testimonial-image-${
                                    index + 1
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </header>
                  </section>
                </div>
              </div>
              <div>
                <div className="clsx-bg-lightblue">
                  <section className="testimonial-card">
                    <header className="user-info">
                      {testimonials.map(
                        ({ id, name, date, text, userImageSrc, images }) => (
                          <div key={id} className="testimonial">
                            <div className="d-flex w-100">
                              <div className="user-image-wrapper">
                                <img
                                  loading="lazy"
                                  src={userImageSrc}
                                  alt={`${name}`}
                                  className="user-image"
                                />
                                <div className="overlay" />
                              </div>
                              <div className="user-details">
                                <h3 className="user-name">{name}</h3>
                                <time className="date-posted">{date}</time>
                              </div>
                            </div>
                            <p className="testimonial-text">{text}</p>
                            <div className="testimonial-images">
                              {images.map((image, index) => (
                                <img
                                  key={index}
                                  loading="lazy"
                                  src={image.src}
                                  alt={image.altText}
                                  className={`testimonial-image testimonial-image-${
                                    index + 1
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </header>
                  </section>
                </div>
              </div>
              <div>
                <div className="clsx-bg-lightblue">
                  <section className="testimonial-card">
                    <header className="user-info">
                      {testimonials.map(
                        ({ id, name, date, text, userImageSrc, images }) => (
                          <div key={id} className="testimonial">
                            <div className="d-flex w-100">
                              <div className="user-image-wrapper">
                                <img
                                  loading="lazy"
                                  src={userImageSrc}
                                  alt={`${name}`}
                                  className="user-image"
                                />
                                <div className="overlay" />
                              </div>
                              <div className="user-details">
                                <h3 className="user-name">{name}</h3>
                                <time className="date-posted">{date}</time>
                              </div>
                            </div>
                            <p className="testimonial-text">{text}</p>
                            <div className="testimonial-images">
                              {images.map((image, index) => (
                                <img
                                  key={index}
                                  loading="lazy"
                                  src={image.src}
                                  alt={image.altText}
                                  className={`testimonial-image testimonial-image-${
                                    index + 1
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </header>
                  </section>
                </div>
              </div>
              <div>
                <div className="clsx-bg-lightblue">
                  <section className="testimonial-card">
                    <header className="user-info">
                      {testimonials.map(
                        ({ id, name, date, text, userImageSrc, images }) => (
                          <div key={id} className="testimonial">
                            <div className="d-flex w-100">
                              <div className="user-image-wrapper">
                                <img
                                  loading="lazy"
                                  src={userImageSrc}
                                  alt={`${name}`}
                                  className="user-image"
                                />
                                <div className="overlay" />
                              </div>
                              <div className="user-details">
                                <h3 className="user-name">{name}</h3>
                                <time className="date-posted">{date}</time>
                              </div>
                            </div>
                            <p className="testimonial-text">{text}</p>
                            <div className="testimonial-images">
                              {images.map((image, index) => (
                                <img
                                  key={index}
                                  loading="lazy"
                                  src={image.src}
                                  alt={image.altText}
                                  className={`testimonial-image testimonial-image-${
                                    index + 1
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </header>
                  </section>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        <div className="container-fluid pb-5">
          <div className="d-flex flex-column justify-content-center w-100 mb-4">
            <h3 className="clsx-reviewsection-title mt-5">
              Financial planner's blog
            </h3>
            <p className="clsx-benifits-subtitle">
              Get useful tips to manage your money better
            </p>
          </div>
          <div className="clsx-blogsrow row pb-4">
            <div className="col-12 col-sm-9 col-md-6 col-lg-4">
              <div className="article-card">
                <div className="image-container">
                  <Image
                    src="/assets/img/placeholder.svg"
                    alt="Article Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="article-date">17 Feb 2024</div>
                <div className="article-title">
                  Managing
                  <span className="text-lowercase"> Debt Wisely: </span>
                  <span className="text-capitalize">Strategies</span>
                  <span className="text-lowercase">
                    {" "}
                    for Debt Repayment and Consolidation{" "}
                  </span>
                </div>
                <div className="article-content">
                  Fintrix has revolutionized how I manage my finances! With its
                  intuitive interface and comprehensive features, I feel more in
                  control of my money than ever before.
                </div>
                <div
                  className="article-footer"
                  tabIndex="0"
                  role="button"
                  onClick={handleReadMoreClick}
                  onKeyDown={(e) => e.key === "Enter" && handleReadMoreClick()}
                >
                  Read more
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-9 col-md-6 col-lg-4">
              <div className="article-card">
                <div className="image-container">
                  <Image
                    src="/assets/img/placeholder.svg"
                    alt="Article Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="article-date">17 Feb 2024</div>
                <div className="article-title">
                  Managing
                  <span className="text-lowercase"> Debt Wisely: </span>
                  <span className="text-capitalize">Strategies</span>
                  <span className="text-lowercase">
                    {" "}
                    for Debt Repayment and Consolidation{" "}
                  </span>
                </div>
                <div className="article-content">
                  Fintrix has revolutionized how I manage my finances! With its
                  intuitive interface and comprehensive features, I feel more in
                  control of my money than ever before.
                </div>
                <div
                  className="article-footer"
                  tabIndex="0"
                  role="button"
                  onClick={handleReadMoreClick}
                  onKeyDown={(e) => e.key === "Enter" && handleReadMoreClick()}
                >
                  Read more
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-9 col-md-6 col-lg-4">
              <div className="article-card">
                <div className="image-container">
                  <Image
                    src="/assets/img/placeholder.svg"
                    alt="Article Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="article-date">17 Feb 2024</div>
                <div className="article-title">
                  Managing
                  <span className="text-lowercase"> Debt Wisely: </span>
                  <span className="text-capitalize">Strategies</span>
                  <span className="text-lowercase">
                    {" "}
                    for Debt Repayment and Consolidation{" "}
                  </span>
                </div>
                <div className="article-content">
                  Fintrix has revolutionized how I manage my finances! With its
                  intuitive interface and comprehensive features, I feel more in
                  control of my money than ever before.
                </div>
                <div
                  className="article-footer"
                  tabIndex="0"
                  role="button"
                  onClick={handleReadMoreClick}
                  onKeyDown={(e) => e.key === "Enter" && handleReadMoreClick()}
                >
                  Read more
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clsx-bg-white clsx-accreditations-container pb-5">
          <div className="container">
            <div className="d-flex flex-column justify-content-center w-100 mb-4">
              <h3 className="clsx-reviewsection-title mt-5">Accreditations</h3>
              <p className="clsx-benifits-subtitle">
                Trusted by all. Accredited by the mains.
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center w-100 clsx-accreditaions-flexcontainer">
            <div className="">
              <img src="/assets/img/accredited1.png" />
            </div>
            <div className="">
              <img src="/assets/img/accredited2.png" />
            </div>
            <div className="">
              <img src="/assets/img/accredited3.png" />
            </div>
          </div>
        </div>

        <div className="clsx-appsection-bg">
          <div className="container-lg">
            <div className="clsx-appsection-flexcontainer d-flex justify-content-between w-100">
              <div>
                <img
                  className="clsx-appdownload-image"
                  src="/assets/img/appdownloadsection.svg"
                />
              </div>
              <div className="align-self-center clsx-appdownload-textsection ">
                <h3 className="clsx-appsection-title">
                  Are you excited for Fintrix?
                </h3>
                <p className="clsx-appsection-subtitle">
                  Fintrix is your trusted ally in the quest for financial
                  mastery. Harnessing cutting-edge technology and expert
                  insights.
                </p>
                <div className="clsx-download-appbtn-div">
                  <button
                    type="button"
                    className="btn clsx-freetrialbanner-btn mt-2"
                  >
                    Download app{" "}
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
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}