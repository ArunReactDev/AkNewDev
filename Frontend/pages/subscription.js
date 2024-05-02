// import node module libraries
import Link from 'next/link';
import { Col, Row, Container } from 'react-bootstrap';
// import sub components
import { PricingCard, PageHeading, FeatureLeftTopIcon } from 'widgets'
import FAQsData from 'data/pricing/FAQsData';
import FeaturesData from 'data/pricing/FeaturesData';
import { portfolioService } from 'service/portfolio.service';
import { useEffect, useState } from 'react';
import NotifyAlertComponent from "components/NotifyAlertComponent";
import { userService } from 'service/user.service';
import moment from 'moment';

const Subscription = () => {

  const [subscriptionPlans , setsubscriptionPlans] = useState([]);
  const [userDetails , setuserDetails] = useState("");

  useEffect(() => {
    getAllSubscriptionPlans();
    initData();
  }, [])

  async function initData() {
    return userService
      .getUserDetail()
      .then((res) => {
        if (res.status && res.user) {
          setuserDetails(res.user);
        }
      })
      .catch((err) => {
        console.log("err is ", err);
      });
  }

  

  async function getAllSubscriptionPlans() {
    return portfolioService.getSubscriptionPlans()
          .then((res) => {
            if(res.status) {
              setsubscriptionPlans(res.data);
            }
          })
          .catch((err) => {
            console.log("err is " , err)
          })
  }

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Pricing" />
      <div className="py-8">
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12}>
            <Row className="mb-10">
              <Col md={12} xs={12} className="mb-6">
                <h1 className="display-4 fw-bold ls-sm">Find a plan that's right for you</h1>
                <div className="d-lg-flex align-items-center mt-4">
                  <div>
                    <p className="mb-lg-0">Or simply leverage the expertise of our consultation team.</p>
                  </div>
                  <div className="ms-0 ms-lg-3">
                    <Link href="javascript:void(0)" className="btn btn-outline-primary btn-sm">Talk to us</Link>
                  </div>
                </div>
               {userDetails && userDetails.subscription && <div className='my-3'>
                  <NotifyAlertComponent description={`
                      You have already subscribed a plan. Your subscription will ends in ${moment(userDetails.subscription_end_date).format("DD-MM-YYYY")}
                  `} subdescription='You can continue to manage your Goal' />
                </div>}
              </Col>
              {
                subscriptionPlans && subscriptionPlans.length > 0 ?

                subscriptionPlans.map((item , index) => {
                  return (
                    <Col xl={4} lg={6} md={12} xs={12} className="mb-3" key={index}>
                      {/* Standard Pricing Card */}
                      <PricingCard userDetails={userDetails} initData={initData} content={item} />
                    </Col>
                  )
                })

                :
                
                ""
              }
            </Row>
            <Row className="mb-10">
              <Col lg={12} md={12} xs={12}>
                <div className="mb-6">
                  <h2>Everything you need to build efficiently</h2>
                  <p>Start building your app using our tools, be efficient, spend less time with details more time with your business.
                  </p>
                </div>
              </Col>
              {/* Features */}
              {FeaturesData.map((item, index) => {
                return (
                  <Col lg={4} md={6} xs={12} key={index}>
                    <FeatureLeftTopIcon item={item} />
                  </Col>
                )
              })}
            </Row>
            <Row>
              {/* FAQs Heading */}
              <Col xs={12}>
                <div className="mb-6">
                  <h2 className="mb-0">Frequently Asked Questions</h2>
                </div>
              </Col>

              {/* FAQs List */}
              {FAQsData.map((item, index) => {
                return (
                  <Col lg={4} md={6} sm={12} className="mb-3" key={index}>
                    <h4>{item.question}</h4>
                    <p>{item.answer}</p>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Subscription