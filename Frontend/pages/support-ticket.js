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
import { ticketService } from 'service/ticket.service';
import { DropFiles } from "widgets";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function SupporTicket() {
    
  const [name , setname] = useState('');
  const [email , setemail] = useState('');
  const [issue_description , setissue_description] = useState('');

  const [open, setOpen] = useState(false);
  const [updateResMessage , setupdateResMessage] = useState('');
  const [alertType , setalertType] = useState('success');

  const [isSubmitTicket , setisSubmitTicket] = useState(false);
  const [autoOpen , setautoOpen] = useState(0);
  const [clearImage , setclearImage] = useState(0);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    // fetchUserProfile()
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  async function handleUpdateProfile() {
    setisSubmitTicket(true);
    const formData = new FormData();
    // Append fields to FormData object
    formData.append('name', name);
    formData.append('email', email);
    formData.append('issue_description', issue_description);
    formData.append('issue_img', files && files[0] ? files[0] : null); // 'file' is the File object obtained from an <input type="file"> element
    return ticketService.createTicket(formData)
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
            setisSubmitTicket(false);
            setemail('');
            setname('');
            setissue_description('');
            setFiles([]); 
            setclearImage(clearImage + 1);
        }, 1000);
    })
    .catch((err) => {
        setalertType('error');
        setupdateResMessage('Something Went Wrong');               
        setOpen(true);
        setisSubmitTicket(false);
    });
  }

  return (
    <div>
       <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitTicket}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
      <Container fluid className="p-6">
        <Row className="mb-8">
          <Col xl={3} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h4 className="mb-1">Support Ticket</h4>
              <p className="mb-0 fs-5 text-muted">
                Raise a Ticket to solve the issues
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
                    <h4 className="mb-1">Issue information</h4>
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
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                    </Row>
                    {/* row */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="Issue">
                        Issue Description
                      </Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control
                          as="textarea"
                          placeholder="Issue Description"
                          id="Issue"
                          value={issue_description}
                          onChange={(e) => setissue_description(e.target.value)}
                        />
                      </Col>
                    </Row>

                    {/* Location */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="pan_number">
                        Screen Shots
                      </Form.Label>
                      <Col md={8} xs={12}>
                          <div>
                            <div
                              className="dropzone mb-3 py-10 border-dashed"
                            >
                              <DropFiles setFilesParent={setFiles} autoOpen={autoOpen} clearImage={clearImage} />
                            </div>
                            {/* <Button variant="outline-white" type="button" onClick={() => setautoOpen(autoOpen + 1)}>
                              Change{" "}
                            </Button> */}
                          </div>
                      </Col>
                    </Row>

                    {/* Zip code */}
                    <Row className="align-items-center">
                      <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                        {
                            isSubmitTicket ?
                            <Button variant="primary" type="button" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Submitting...
                             </Button>
                            :
                            <Button variant="primary" type="button" onClick={handleUpdateProfile}>
                                Create Ticket
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

export default SupporTicket;