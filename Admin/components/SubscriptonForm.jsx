import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
// import node module libraries
import { Col, Row, Form, Card, Button } from "react-bootstrap";

// import widget as custom components
import { FormSelect } from "widgets";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function SubscriptonForm({ toggleDrawer, openForm , selectedSubscription , handleUpdateSubscriptionPlans }) {

  const [plan_title , setplan_title] = useState('');
  const [description , setdescription] = useState('');
  const [monthly , setmonthly] = useState('');
  const [buttonText , setbuttonText] = useState('');
  const [buttonClass , setbuttonClass] = useState('');
  const [noOfMonths , setnoOfMonths] = useState('');
  const [featureHeading , setfeatureHeading] = useState('');
  const [features, setfeatures] = useState([{ feature: '' }]);
  const [loading , setloading] = useState(false);

  useEffect(() => {
    if (selectedSubscription && selectedSubscription.plantitle) {
            setplan_title(selectedSubscription.plantitle);
            setdescription(selectedSubscription.description);
            setmonthly(selectedSubscription.monthly);
            setbuttonText(selectedSubscription.buttonText);
            setbuttonClass(selectedSubscription.buttonClass);
            setnoOfMonths(selectedSubscription.noOfMonths);
            setfeatureHeading(selectedSubscription.featureHeading);
            setfeatures(selectedSubscription.features);
    }
    else {
        setplan_title('');
        setdescription('');
        setmonthly('');
        setbuttonText('');
        setbuttonClass('');
        setnoOfMonths('');
        setfeatureHeading('');
        setfeatures('');
    }
  }, [selectedSubscription])
  

  const handleAddField = () => {
    setfeatures([...features, { feature : '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...features];
    updatedFields.splice(index, 1);
    setfeatures(updatedFields);
  };

  const handleFieldChange = (index, event) => {
    const updatedFields = [...features];
    updatedFields[index].feature = event.target.value;
    setfeatures(updatedFields);
  };

  const countryOptions = [
    { value: "outline-primary", label: "outline-primary" },
    { value: "primary", label: "primary" }
  ];

  async function handleSubmit() {
    setloading(true);
    let method = selectedSubscription && selectedSubscription.plantitle ? '1' : '0';
    let type = '1';
    let obj = {
        plantitle : plan_title , description , monthly , buttonText , buttonClass , noOfMonths , featureHeading , features , method , type , id : selectedSubscription && selectedSubscription._id
    }
    await handleUpdateSubscriptionPlans(obj);
    toggleDrawer('right', false);
    setloading(false);
  }

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openForm}
        className="clsx-drawerform"
        // onClose={toggleDrawer('right', false)}
      >
        <div>
          <Row className="mb-8">
            <Col xl={12} lg={12} md={12} xs={12}>
              <Card>
                {/* card body */}
                <Card.Body>
                  <div>
                    {/* border */}
                    <div className="mb-6">
                      <h4 className="mb-1">Subscription information</h4>
                    </div>
                    <Form>
                      {/* row */}
                      <Row className="mb-3">
                        <label
                          htmlFor="fullName"
                          className="col-sm-4 col-form-label
                    form-label"
                        >
                          Plan Title
                        </label>
                        <div className="col-sm-8 mb-3 mb-lg-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Plan Title"
                            id="plan_title"
                            required
                            value={plan_title}
                            onChange={(e) => setplan_title(e.target.value)}
                          />
                        </div>
                      </Row>
                      {/* row */}
                      <Row className="mb-3">
                        <label
                          htmlFor="description"
                          className="col-sm-4 col-form-label
                    form-label"
                        >
                          Description
                        </label>
                        <div className="col-md-8 col-12">
                          <input
                            type="description"
                            className="form-control"
                            placeholder="Description"
                            id="description"
                            required
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                          />
                        </div>
                      </Row>
                      {/* row */}
                      <Row className="mb-3">
                        <Form.Label className="col-sm-4" htmlFor="monthly">
                          Amount
                        </Form.Label>
                        <Col md={8} xs={12}>
                          <Form.Control
                            type="text"
                            placeholder="Amount"
                            id="monthly"
                            value={monthly}
                            onChange={(e) => setmonthly(e.target.value)}
                          />
                        </Col>
                      </Row>
                    {/* row */}
                      <Row className="mb-3">
                        <Form.Label className="col-sm-4" htmlFor="buttonText">
                          Button Text
                        </Form.Label>
                        <Col md={8} xs={12}>
                          <Form.Control
                            type="text"
                            placeholder="Amount"
                            id="buttonText"
                            value={buttonText}
                            onChange={(e) => setbuttonText(e.target.value)}
                          />
                        </Col>
                      </Row>

                      {/* Location */}
                      <Row className="mb-3">
                        <Form.Label className="col-sm-4" htmlFor="buttonClass">
                          Button Colour
                        </Form.Label>
                        <Col md={8} xs={12}>
                          <Form.Control
                            as={FormSelect}
                            placeholder="Select Button Colour"
                            id="buttonClass"
                            options={countryOptions}
                            onChange={(e) => setbuttonClass(e.target.value)}
                            value={buttonClass}
                          />
                        </Col>
                      </Row>

                      {/* Address Line One */}
                      <Row className="mb-3">
                        <Form.Label className="col-sm-4" htmlFor="noOfMonths">
                          No of Months
                        </Form.Label>
                        <Col md={8} xs={12}>
                          <Form.Control
                            type="text"
                            placeholder="No of Months"
                            id="noOfMonths"
                            required
                            value={noOfMonths}
                            onChange={(e) => setnoOfMonths(e.target.value)}
                          />
                        </Col>
                      </Row>

                      {/* Address Line Two */}
                      <Row className="mb-3">
                        <Form.Label
                          className="col-sm-4"
                          htmlFor="featureHeading"
                        >
                          Feature Heading
                        </Form.Label>
                        <Col md={8} xs={12}>
                          <Form.Control
                            type="text"
                            placeholder="Feature Heading"
                            id="featureHeading"
                            required
                            value={featureHeading}
                            onChange={(e) => setfeatureHeading(e.target.value)}
                          />
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Form.Label
                            className="col-sm-12"
                            htmlFor="featureHeading"
                        >
                            Features List
                        </Form.Label>
                        <Col md={12} xs={12}>
                        {features && features.length > 0 && features.map((field, index) => (
                            <div key={index}>
                                <div className="row mt-2 mb-2">
                                    <div className="col-9">
                                        <Form.Control
                                            type="text"
                                            placeholder="Feature"
                                            required
                                            value={field.feature}
                                            onChange={(e) => handleFieldChange(index, e)}
                                        />
                                    </div>
                                    <div className="col-3 mt-2">
                                         <DeleteIcon onClick={() => handleRemoveField(index)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                            <span className="cursor-pointer mt-3" onClick={handleAddField} ><AddIcon /> Add</span>
                        </Col>
                      </Row>

                      {/* Zip code */}
                      <Row className="align-items-center">
                       <Col
                          md={{ offset: 4, span: 8 }}
                          xs={12}
                          className="mt-4"
                        >
                           {loading ?
                           <Button disabled variant="primary" type="button">
                                Updating...
                            </Button>
                           : <>
                            <Button variant="info" className="mx-3" onClick={toggleDrawer('right', false)} type="button">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} variant="primary" type="button">
                                Save Changes
                            </Button>
                            </>}
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Drawer>
    </div>
  );
}
