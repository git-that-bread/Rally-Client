import React from 'react';
import MainFooter from "./MainFooter.component";
import { Jumbotron, Button, Row, Col, Card} from "react-bootstrap";
import IndexStyle from '../index.module.css';
import '../index.css';

const Home = () => {
    return (
        <div className={IndexStyle.landing}>
          <Jumbotron>
            <Row>
                <Col className={IndexStyle.landingInfo}>
                    <h1>A platform for non-profits to manage and track their volunteering activities.</h1>
                    <p>
                        Start using Rally today!
                    </p>
                    <p>
                        <Button className="redButton" href="/learnMore"> Learn More </Button>
                    </p>
                </Col>
                <Col className={IndexStyle.landingInfo}>
                    <img className={IndexStyle.landingImage} src= {process.env.PUBLIC_URL + "/assets/hugo-productive-work.png"} ></img>
                </Col>
            </Row>
           </Jumbotron>
           <Row className={IndexStyle.landing} id={IndexStyle.moreInfo}>
                <Col>
                <Card
                style={{ height: '20rem'} , {width: '30rem'}}> 
                        <Card.Body>
                            <Card.Title>Manage and Keep track of Events</Card.Title>
                            <Card.Text>
                                Manage, schedule and coordinate volunteering events through our calendar view UI.
                            </Card.Text>
                            <Button className="redButton" href="/learnMore#features"> Learn More</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                <Card
                style={{ height: '20rem'} , {width: '30rem'}}>
                    <Card.Body>
                    <Card.Title> Manage volunteers and track shifts</Card.Title>
                        <Card.Text>
                            Manage organization members and volunteers all in one place.
                        </Card.Text>
                        <Button className="redButton" href="/learnMore#features"> Learn More </Button>
                    </Card.Body>
                </Card>
                
                </Col>

               <Col>
               <Card
                style={{ height: '20rem'} , {width: '30rem'}}>
                    <Card.Body>
                    <Card.Title> Volunteer Access</Card.Title>
                        <Card.Text>
                            Rally lets volunteers discover nonprofits and schedule their participation in events.
                        </Card.Text>
                        <Button className="redButton" href="/learnMore#features"> Learn More </Button>
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

