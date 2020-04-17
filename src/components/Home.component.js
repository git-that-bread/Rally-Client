import React from 'react';
import MainNav from "./MainNav.component";
import MainFooter from "./MainFooter.component";
import { Jumbotron, Button, Row, Col, Card} from "react-bootstrap";

const Home = () => {
    return (
        <div className="landing">
          <MainNav></MainNav>
          <Jumbotron>
            <Row>
                <Col className="landing-info">
                    <h1>A platform for non-profits to manage and track their volunteering activities.</h1>
                    <p>
                        Start using Rally today!
                    </p>
                    <p>
                        <Button className="landing-button">Learn more</Button>
                    </p>
                </Col>
                <Col className="landing-info">
                    <img className="landing-image" src= {process.env.PUBLIC_URL + "/assets/hugo-productive-work.png"} ></img>
                </Col>
            </Row>
           </Jumbotron>
           <Row id="more info">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Manage and Keep track of Events</Card.Title>
                            <Card.Text>
                                Manage, schedule and coordinate volunteering events through our calendar view UI.
                            </Card.Text>
                            <Button variant="primary">Create an Organization today!</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                <Card>
                    <Card.Body>
                    <Card.Title> Manage volunteers and track shifts</Card.Title>
                        <Card.Text>
                            Manage organization members and volunteers all in one place.
                        </Card.Text>
                        <Button variant="primary">Get started! </Button>
                    </Card.Body>
                </Card>
                
                </Col>

               <Col>
               <Card>
                    <Card.Body>
                    <Card.Title> Volunteer Access</Card.Title>
                        <Card.Text>
                            Rally lets volunteers discover nonprofits and schedule their participation in events.
                        </Card.Text>
                        <Button variant="primary">Start discovering! </Button>
                    </Card.Body>
                </Card>
                </Col>

           </Row>
           <MainFooter>
           </MainFooter>
           
        </div>
    );
};

export default Home;

