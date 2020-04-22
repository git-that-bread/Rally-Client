
import React, {Component} from 'react';
import MainFooter from "./MainFooter.component";
import { Button, Row, Col, Card} from "react-bootstrap";
import IndexStyle from '../index.module.css';
import '../index.css';

class LearnMore extends Component {


    render() {
        return(
            <div>
            <div class="LearnMore-header" >
                <h1>Rally</h1>
                <img src="/assets/logo.png" alt="Signup Today"/>
                <p>A resource for making volunteer organization and scheduling easy</p>
                <p>Whether you're looking to help your community with volunteer work or are a non-profit organization looking for an easy and convenient way to organize your activities, Rally is here for you!</p>
            </div>
            <div class="row">
            <div class="column">
                <Button href="signupVolunteer"> Volunteer Sign Up </Button>
                </div>
                <div class="column">
                <Button href="signupOrganization"> Organization Sign Up </Button>
                </div>
                </div>
            <div class="LearnMore-header" a id="features" >
                <h1>Features</h1>
               <div class="LearnMore-content">
                    <h2>Event Management</h2>
                    <p>We provide tools to easily setup and manage volunteering events, including shift scheduling, volunteer signup, and calendar UI reminders to help your organization better coordinate.</p>
               </div>
               <div class="LearnMore-content">
                    <h2>Volunteer Management</h2>
                    <p>Easily view and manage volunteers with tools including volunteer approval, shift request approval, and providing accessible contact information.</p>
               </div>
               <div class="LearnMore-content">
                    <h2>Volunteer Access</h2>
                    <p>Aside from organizational features, Rally makes scheduling easy for volunteers. It's convenient and simple to sign up for an account, join an organization, request a shift, and volunteer all from one site. This eliminates the hassle and unnessasary correspondance that holds back potential volunteers from doing the work that matters to them. </p>
               </div>
            </div>

      </div>
        );
    }

}
export default LearnMore;