import React from 'react';
import MainNav from "./MainNav.component";
import MainFooter from "./MainFooter.component";
import { Jumbotron, Button, Row, Col} from "react-bootstrap";

const Home = () => {
    return (
        <div>
          <MainNav></MainNav>
          <Jumbotron>
            <Row>
                <Col>
                    <h1>A platform for non-profits to manage and track their volunteering activities.</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Col>
                <Col>
                    <img className="landing-image" src= {process.env.PUBLIC_URL + "/assets/hugo-productive-work.png"} ></img>
                </Col>
            </Row>
           </Jumbotron>
           <MainFooter>
           </MainFooter>
           
        </div>
    );
};

export default Home;

