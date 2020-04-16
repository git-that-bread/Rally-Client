

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// This component will check that a user is logged in

const DashboardNav = (props) =>  {
    return(
            <nav className="sidebar"
            activeKey="/dashboard">
            <div>
                {/* [ORG LOGO IF PROVIDED] */}
            </div>

            <ul>
                <li >
                    <Link to="/dashboard">
                        <FontAwesomeIcon icon={faHome} /> Dashboard
                    </Link>
                </li>
                    <hr className="divider"></hr>
                    {
                        props.user.userType == 'admin'
                        ?  
                        [
                            <li >
                                <Link to="/dashboard/volunteers">
                                    <FontAwesomeIcon icon={faUsers} /> Manage Members
                                </Link>
                            </li>
                        ]
                        :
                        [ 
                            <li>
                                <Link to="/dashboard/organizations">
                                    <FontAwesomeIcon icon={faCalendarAlt} />   Manage Organizations
                                </Link>
                            </li>
                        ]
                    }
                <li>  
                    <Link to="/dashboard/events">
                        <FontAwesomeIcon icon={faCalendarAlt} />  Manage Events
                    </Link>
                </li>
                
                <li> 
                    <Link to="/logout">
                        <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                    </Link>
                    
                </li>

            </ul>
                
            
               
            </nav>
            
            
    );
}

export default DashboardNav;

 