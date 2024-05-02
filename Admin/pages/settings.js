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
  Table,
} from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { settingService } from 'service/settings.service';
import SubscriptionForm from 'components/SubscriptonForm'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function Settings() {

  const [current_password, setcurrent_password] = useState('');
  const [new_password, setnew_password] = useState('');
  const [confirm_password, setconfirm_password] = useState('');

  const [open, setOpen] = useState(false);
  const [updateResMessage, setupdateResMessage] = useState('');
  const [alertType, setalertType] = useState('success');

  const [isSubmitProfile, setisSubmitProfile] = useState(false);
  const [isSubmitPassword, setisSubmitPassword] = useState(false);
  const [trial_period, settrial_period] = useState('');

  const [openForm, setopenForm] = useState(false);
  const [selectedSubscription, setselectedSubscription] = useState('');
  const [subscriptionList, setsubscriptionList] = useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setopenForm(open);
  };

  useEffect(() => {
    fetchCommonSettings()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

function handleEditSubscription(subItems) {
  setselectedSubscription(subItems);
  setopenForm(true)
}

function handleAddSubscription() {
  setselectedSubscription('');
  setopenForm(true)
}


  async function fetchCommonSettings() {
    return settingService.getSettings()
      .then((res) => {
        if (res.status && res.data) {
          settrial_period(res.data.trial_period);
          setsubscriptionList(res.data.plan_details)
        }
      })
      .catch((err) => {
        setalertType('error');
        setupdateResMessage('Something Went Wrong');
        setOpen(true);
        setisSubmitProfile(false);
      });
  }


  async function handleUpdateTrial() {
    let obj = { trial_period, type: '0' };
    return settingService.updateSettings(obj)
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

  async function handleUpdateSubscriptionPlans(obj) {
    return settingService.updateSettings(obj)
      .then((res) => {
        if (res.status) {
          setalertType('success');
          setupdateResMessage(res.message);
          setOpen(true);
          fetchCommonSettings();
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

  return (
    <div>
      <Container fluid className="p-6">
        <Row className="mb-8">
          <Col xl={3} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h4 className="mb-1">General Setting</h4>
              <p className="mb-0 fs-5 text-muted">
                Common configuration settings{" "}
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
                        Trial Period
                      </label>
                      <div className="col-md-8 col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          id="fullName"
                          required
                          value={trial_period}
                          onChange={(e) => settrial_period(e.target.value)}
                        />
                      </div>
                    </Row>
                    {/* row */}

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
                            <Button variant="primary" type="button" onClick={handleUpdateTrial}>
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
              <h4 className="mb-1">Subscription Setting</h4>
              <p className="mb-0 fs-5 text-muted">
                Modify Subscriptions settings{" "}
              </p>
            </div>
          </Col>
          <Col xl={9} lg={8} md={12} xs={12}>
            {/* card */}
            <Card id="edit">
              {/* card body */}
              <Card.Body>
                <div className="mb-6 mt-0 d-flex justify-content-between">
                  <h4 className="mb-1">Subscription List</h4>
                  <span className="cursor-pointer" onClick={handleAddSubscription} ><AddIcon  /> <b>Add Subscription</b></span>
                </div>
                <div>
                  <Table responsive className="text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>Subscription Name</th>
                        <th>Subscription Amount</th>
                        <th>No Of Months</th>
                        <th>Edit</th>
                        {/* <th>Subscription Start Date</th>
                    <th>Subscription End Date</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptionList && subscriptionList.length > 0 && subscriptionList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="align-middle">
                             {item.plantitle}
                            </td>
                            <td className="align-middle">{item.monthly}</td>
                            <td className="align-middle">
                              {item.noOfMonths}
                            </td>
                            <td className="align-middle">
                              <EditIcon className="cursor-pointer" onClick={() => handleEditSubscription(item)} />
                            </td>
                            {/* <td className="align-middle">{moment(item.subscription_start_date).format('DD-MM-YYYY')}</td>
                        <td className="align-middle">{moment(item.subscription_end_date).format('DD-MM-YYYY')}</td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <SubscriptionForm selectedSubscription={selectedSubscription} toggleDrawer={toggleDrawer} handleUpdateSubscriptionPlans={handleUpdateSubscriptionPlans} openForm={openForm} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
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
