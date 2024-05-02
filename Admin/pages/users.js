// import node module libraries
import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { userService } from "service/user.service";
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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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

const Users = () => {
  const [usersData, setusersData] = useState([]);
  const [usersDataBack, setusersDataBack] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginResMessage, setloginResMessage] = useState("");
  const [alertType, setalertType] = useState("success");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    fetchusersData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function fetchusersData() {
    return userService
      .getUserDataList()
      .then((res) => {
        if (res.status) {
          setusersData(res.data);
          setusersDataBack(res.data);
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

  const ActionMenu = ({data}) => {

    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-muted" />
        </Dropdown.Toggle>
        <Dropdown.Menu align={"end"}>
          {data && data.status === 0 && <Dropdown.Item eventKey="1" onClick={() => updateStatus(data.status , data.email)}>Activate User</Dropdown.Item>}
          {data && data.status === 1 && <Dropdown.Item eventKey="2" onClick={() => updateStatus(data.status, data.email)}>De-Activate User</Dropdown.Item>}
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
  let wholeArr = usersDataBack;

  if(searchInput && usersDataBack && usersDataBack.length > 0) {
    filteredArr = usersDataBack.filter(item => {
      const name = item.name.toLowerCase();
      const email = item.email.toLowerCase();
      const mobile = item.mobile_number.toLowerCase();
      const pan = item.pan_no.toLowerCase();

      return name.includes(searchInput) || email.includes(searchInput) || mobile.includes(searchInput) || pan.includes(searchInput);
    });
  }
  else {
 // If search input is empty, restore original usersData
    filteredArr = wholeArr;
  }
  setusersData(filteredArr);
}

async function updateStatus(status , email) {
  setloading(true);
  let tempStatus = status === 0 ? 1 : 0;
  return userService
  .updateStatus({status : tempStatus , email})
  .then((res) => {
    if (res.status) {
      setalertType("success");
      setloginResMessage(res.message);
      setOpen(true);
      fetchusersData();
    }
    else {
      setalertType("error");
      setloginResMessage(res.message);
      setOpen(true);
    }
    setloading(false);
  })
  .catch((err) => {
    setalertType("error");
    setloginResMessage("Something Went Wrong");
    setOpen(true);
    setloading(false);
  });
}

  return (
    <Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
    </Backdrop>
      <Container fluid className="p-4">
        <Row className="my-6">
          <Col xl={12} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            {/* Tasks Performance  */}
            <Card className="h-100">
              <Card.Header className="bg-white py-4">
                <div className="d-flex justify-content-between w-100">
                  <h4 className="mb-0 mt-2">Users Data </h4>
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
                    <th>Mobile Number</th>
                    <th>Pan Number</th>
                    <th>Status</th>
                    <th></th>
                    {/* <th>Subscription Start Date</th>
                    <th>Subscription End Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {usersData && usersData.length > 0 && usersData.map((item, index) => {
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
                        <td className="align-middle">{item.mobile_number}</td>
                        <td className="align-middle">{item.pan_no}</td>
                        <td className="align-middle">
                            {
                                item.status === 0 ?
                                    <span class="badge text-bg-danger">Blocked</span>
                                :

                                item.status === 1 ?
                                    <span class="badge text-bg-success">Active</span>
                                :

                                "-"
                            }
                        </td>
                        <td className="align-middle">
                            <ActionMenu data={item} />
                        </td>
                        {/* <td className="align-middle">{moment(item.subscription_start_date).format('DD-MM-YYYY')}</td>
                        <td className="align-middle">{moment(item.subscription_end_date).format('DD-MM-YYYY')}</td> */}
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
export default Users;
