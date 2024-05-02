// import node module libraries
import { ListGroup, Card } from 'react-bootstrap';
import Link from 'next/link';
import { portfolioService } from 'service/portfolio.service';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useRazorpay from "react-razorpay";
import { userService } from 'service/user.service';

const PricingCard = ({ content , initData , userDetails }) => {
    let plan = content;
    
    const [Razorpay] = useRazorpay();

    const [loading, setloading] = useState(false);
    const [open, setOpen] = useState(false);
    const [ResMessage , setResMessage] = useState('');
    const [alertType , setalertType] = useState('success');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
 
    async function handleSubcribe(plan_id , amountSubscription) {
        setloading(true);
        let amountcreate = parseFloat(amountSubscription) * 100; //convert to paise
        return portfolioService.createOrder({amount : amountcreate})
        .then((res) => {
            if(res.status) {
              const order = res.data;
              const options = {
                key: "rzp_test_3n2x87FxobYHrM", // Enter the Key ID generated from the Dashboard
                amount: `${order.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: `${order.currency}`,
                name: "Fintrix",
                description: "Subscription Plan",
                image: "http://localhost:3001/assets/img/logo-white.svg",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                handler: function (response) {
                  let obj = {
                    subscription : plan_id,
                    payment_id : response.razorpay_payment_id,
                    order_id : response.razorpay_order_id,
                    signature : response.razorpay_signature,
                    amount : amountSubscription
                  }
                  handleStoreSubscription(obj);
                },
                theme: {
                  color: "#3399cc",
                },
              };
            
              const rzp1 = new Razorpay(options);
            
              rzp1.on("payment.failed", function (response) {
                console.log("error");
                console.log(response.error.code);
                console.log(response.error.description);
                console.log(response.error.source);
                console.log(response.error.step);
                console.log(response.error.reason);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
                setResMessage("Error! Something went wrong during payment");
                setOpen(true);
                setalertType('error');
                setloading(false);
              });
            
              rzp1.open();  
            }
            else {
                setResMessage(res.message);
                setOpen(true);
                setalertType('error');
                setloading(false);
            }
        })
        .catch((err) => {
            setResMessage("Something went wrong");
            setOpen(true);
            setalertType('error');
            setloading(false);
        })
    }

    async function handleStoreSubscription(obj) {
         return portfolioService.subscribePlan(obj)
            .then(async (res) => {
                if(res.status) {
                    setResMessage(res.message);
                    setOpen(true);
                    setalertType('success');
                }
                else {
                    setResMessage(res.message);
                    setOpen(true);
                    setalertType('error');
                }
                await initData();
                setTimeout(() => {
                    setloading(false);
                }, 2000);
            })
            .catch((err) => {
                console.log("err is " , err)
                setResMessage("Something went wrong");
                setOpen(true);
                setalertType('error');
                setloading(false);
            })
    }

    return (
        <Card>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
             >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Card.Body className="p-6 border-bottom mb-4">
                {/* text */}
                <h2 className="mb-3">{plan.plantitle}</h2>
                <p className="mb-0" dangerouslySetInnerHTML={{ __html: plan.description }}></p>
                {/* price */}
                <div className="d-flex align-items-end mt-6 mb-3">
                    <h1 className="fw-bold me-1 mb-0">₹{plan.monthly} </h1>
                    <p className="mb-0">/ {plan.noOfMonths} months</p>
                </div>
                <Link style={userDetails && userDetails.subscription ? {pointerEvents : 'none'} : {}} href="javascript:void(0)" onClick={() => handleSubcribe(plan._id , plan.monthly)} className={`btn btn-${plan.buttonClass ? plan.buttonClass : 'outline-primary'
                    }`}>
                    {userDetails && userDetails.subscription ? 'Already Subscibed' : `Buy ${plan.plantitle}`}
                </Link>
            </Card.Body>
            <Card.Body>
                <p className="mb-0">{plan.featureHeading}</p>
                <ListGroup bsPrefix="list-unstyled" className="mt-4 mb-0">
                    {plan.features.map((item, index) => {
                        return (
                            <ListGroup.Item
                                key={index}
                                className="mb-1"
                                bsPrefix="list-item"
                            >
                                <span className="text-success me-2">
                                    <i className="far fa-check-circle"></i>
                                </span>
                                <span
                                    dangerouslySetInnerHTML={{ __html: item.feature }}
                                ></span>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card.Body>
            <Snackbar anchorOrigin={{ vertical : 'top', horizontal : 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={alertType}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {ResMessage}
                    </Alert>
                </Snackbar>
        </Card>
    )
}

export default PricingCard