// import node module libraries
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  Spinner,
} from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { userService } from 'service/user.service';

function Settings() {
    
  const [name , setname] = useState('');
  const [email , setemail] = useState('');
  const [mobile_number , setmobile_number] = useState('');
  const [pan_no , setpan_no] = useState('');

  const [current_password , setcurrent_password] = useState('');
  const [new_password , setnew_password] = useState('');
  const [confirm_password , setconfirm_password] = useState('');

  const [open, setOpen] = useState(false);
  const [updateResMessage , setupdateResMessage] = useState('');
  const [alertType , setalertType] = useState('success');

  const [isSubmitProfile , setisSubmitProfile] = useState(false);
  const [isSubmitPassword , setisSubmitPassword] = useState(false);

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

  async function fetchUserProfile() {
    return userService.getUserDetail()
    .then((res) => {
        if (res.status && res.user) {
            setname(res.user.name);
            setemail(res.user.email);
            setmobile_number(res.user.mobile_number);
            setpan_no(res.user.pan_no);
        }
    })
    .catch((err) => {
        setalertType('error');
        setupdateResMessage('Something Went Wrong');               
        setOpen(true);
        setisSubmitProfile(false);
    });
  }


  async function handleUpdateProfile() {
    let obj = {name , email , mobile_number , pan_no}
    return userService.updateProfile(obj)
    .then((res) => {
        if (res.status) {
            setalertType('success');
            setupdateResMessage(res.message);               
            setOpen(true);
        } else {
            setalertType('error');
            setOpen(true);
            setupdateResMessage(res.message);            
        }
        setTimeout(() => {
            setisSubmitProfile(false);
        }, 1000);
    })
    .catch((err) => {
        setalertType('error');
        setupdateResMessage('Something Went Wrong');               
        setOpen(true);
        setisSubmitProfile(false);
    });
  }

  async function handleUpdatePassword() {
    let obj = {current_password , new_password , confirm_password}
    return userService.updatePassword(obj)
    .then((res) => {
        if (res.status) {
            setalertType('success');
            setupdateResMessage(res.message);               
            setOpen(true);
            setcurrent_password('');
            setconfirm_password('');
            setnew_password('');
        } else {
            setalertType('error');
            setOpen(true);
            setupdateResMessage(res.message);            
        }
        setTimeout(() => {
            setisSubmitPassword(false);
        }, 1000);
    })
    .catch((err) => {
        setalertType('error');
        setupdateResMessage('Something Went Wrong');               
        setOpen(true);
        setisSubmitPassword(false);
    });
  }

  return (
    <div>
      <Container fluid className="p-6">
        <Row className="mb-8">
          <Col xl={3} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h4 className="mb-1">General Setting</h4>
              <p className="mb-0 fs-5 text-muted">
                Profile configuration settings{" "}
              </p>
            </div>
          </Col>
          <Col xl={9} lg={8} md={12} xs={12}>
            <Card>
              {/* card body */}
              <Card.Body>
                <div>
                  {/* border */}
                  <div className="mb-6">
                    <h4 className="mb-1">Basic information</h4>
                  </div>
                  <Form>
                    {/* row */}
                    <Row className="mb-3">
                      <label
                        htmlFor="fullName"
                        className="col-sm-4 col-form-label
                        form-label"
                      >
                        Name
                      </label>
                      <div className="col-md-8 col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          id="fullName"
                          required
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                        />
                      </div>
                    </Row>
                    {/* row */}
                    <Row className="mb-3">
                      <label
                        htmlFor="email"
                        className="col-sm-4 col-form-label
                        form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-8 col-12">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          id="email"
                          required
                          disabled
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    </Row>
                    {/* row */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="phone">
                        Phone Number
                      </Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Phone Number"
                          id="phone"
                          value={mobile_number}
                          onChange={(e) => setmobile_number(e.target.value)}
                        />
                      </Col>
                    </Row>

                    {/* Location */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="pan_number">
                        Pan Number
                      </Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Pan Number"
                          id="pan_number"
                          value={pan_no}
                          disabled
                        />
                      </Col>
                    </Row>

                    {/* Zip code */}
                    <Row className="align-items-center">
                      <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                        {
                            isSubmitProfile ?
                            <Button variant="primary" type="button" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Updating...
                             </Button>
                            :
                            <Button variant="primary" type="button" onClick={handleUpdateProfile}>
                                Save Changes
                            </Button>  
                        }
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-8">
          <Col xl={3} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h4 className="mb-1">Password Setting</h4>
              <p className="mb-0 fs-5 text-muted">
                Change a Password settings to profile{" "}
              </p>
            </div>
          </Col>
          <Col xl={9} lg={8} md={12} xs={12}>
            {/* card */}
            <Card id="edit">
              {/* card body */}
              <Card.Body>
                <div className="mb-6 mt-0">
                  <h4 className="mb-1">Change your password</h4>
                </div>
                <Form>
                  {/* Current password */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="currentPassword">
                      Current password
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="password"
                        placeholder="Enter Current password"
                        id="currentPassword"
                        required
                        value={current_password}
                        onChange={(e) => setcurrent_password(e.target.value)}
                      />
                    </Col>
                  </Row>

                  {/* New password */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="newPassword">
                      New password
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="password"
                        placeholder="Enter New password"
                        id="newPassword"
                        required
                        value={new_password}
                        onChange={(e) => setnew_password(e.target.value)}
                      />
                    </Col>
                  </Row>

                  {/* Confirm new password */}
                  <Row className="align-items-center">
                    <Form.Label
                      className="col-sm-4"
                      htmlFor="confirmNewpassword"
                    >
                      Confirm new password
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        id="confirmNewpassword"
                        required
                        value={confirm_password}
                        onChange={(e) => setconfirm_password(e.target.value)}
                      />
                    </Col>
                    {/* list */}
                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <h6 className="mb-1">Password requirements:</h6>
                      <p>Ensure that these requirements are met:</p>
                      <ul>
                        <li> Minimum 8 characters long the more, the better</li>
                        <li>At least one lowercase character</li>
                        <li>At least one uppercase character</li>
                        <li>
                          At least one number and special character
                        </li>
                      </ul>
                      {
                            isSubmitPassword ?
                            <Button variant="primary" type="button" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Updating...
                             </Button>
                            :
                            <Button variant="primary" type="button" onClick={handleUpdatePassword}>
                                Save Changes
                            </Button>  
                        }
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Snackbar anchorOrigin={{ vertical : 'top', horizontal : 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
            onClose={handleClose}
            severity={alertType}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {updateResMessage}
        </Alert>
    </Snackbar>
    </div>
  );
}

export default Settings;
