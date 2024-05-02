// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { portfolioService } from "service/portfolio.service";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { Card, Table, Dropdown, Image } from "react-bootstrap";
import { MoreVertical } from "react-feather";
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  border: '1px solid #99999994',
  borderRadius: '10px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentHistoryBack, setPaymentHistoryBack] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginResMessage, setloginResMessage] = useState("");
  const [alertType, setalertType] = useState("success");

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function fetchPaymentHistory() {
    return portfolioService
      .getPaymentHistories()
      .then((res) => {
        if (res.status) {
          setPaymentHistory(res.data);
          setPaymentHistoryBack(res.data);
        }
      })
      .catch((err) => {
        setalertType("error");
        setloginResMessage("Something Went Wrong");
        setOpen(true);
      });
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));

  CustomToggle.displayName = "CustomToggle";

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-muted" />
        </Dropdown.Toggle>
        <Dropdown.Menu align={"end"}>
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };


const generateAvatarWithName = (name) => {
    // Split the name into parts
    const parts = name.split(' ');
  
    // Take the first letter of the first two parts (if available)
    const initials = parts
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  
    return (
      <Avatar sx={{ bgcolor: '#396e87' , width : 35 , height : 35 }}>
        <Typography variant="body1" className="clsx-avatarIntials">
          {initials}
        </Typography>
      </Avatar>
    );
};

function handleSearch(e) {
  let searchInput = e.target.value.toLowerCase();
  let filteredArr = [];
  let wholeArr = paymentHistoryBack;

  if(searchInput && paymentHistoryBack && paymentHistoryBack.length > 0) {
    filteredArr = paymentHistoryBack.filter(item => {
      const name = item.name.toLowerCase();
      const email = item.email.toLowerCase();
      const planTitle = item.subscriptionDetails && item.subscriptionDetails.plantitle ? item.subscriptionDetails.plantitle.toLowerCase() : '';
      
      return name.includes(searchInput) || email.includes(searchInput) || planTitle.includes(searchInput);
    });
  }
  else {
 // If search input is empty, restore original paymentHistory
    filteredArr = wholeArr;
  }
  setPaymentHistory(filteredArr);
}

  return (
    <Fragment>
      <Container fluid className="p-4">
        <Row className="my-6">
          <Col xl={12} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            {/* Tasks Performance  */}
            <Card className="h-100">
              <Card.Header className="bg-white py-4">
                <div className="d-flex justify-content-between w-100">
                  <h4 className="mb-0 mt-2">Payment Histories </h4>
                  <div>
                  <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        onChange={handleSearch}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                  </div>
                </div>                
              </Card.Header>
              <Table responsive className="text-nowrap">
                <thead className="table-light">
                  <tr>
                    <th>Name / Email</th>
                    <th>Subscription Plan</th>
                    <th>Subscription Amount</th>
                    <th>Subscription Start Date</th>
                    <th>Subscription End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory && paymentHistory.length > 0 && paymentHistory.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <div>
                                {generateAvatarWithName(item.name)}
                            </div>
                            <div className="ms-3 lh-1">
                              <h5 className=" mb-1">{item.name}</h5>
                              <p className="mb-0">{item.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{item.subscriptionDetails && item.subscriptionDetails.plantitle}</td>
                        <td className="align-middle">{item.amount ? item.amount : 0}</td>
                        <td className="align-middle">{moment(item.subscription_start_date).format('DD-MM-YYYY')}</td>
                        <td className="align-middle">{moment(item.subscription_end_date).format('DD-MM-YYYY')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {loginResMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default PaymentHistory;
