

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DashboardStyle from './Dashboard.module.css';

// This component will check that a user is logged in

const DashboardNav = (props) =>  {
    return(
            <nav className={DashboardStyle.sidebar}
            activeKey="/dashboard">
            <div>
                {/* [ORG LOGO IF PROVIDED] */}
            </div>

            <ul className={DashboardStyle.sidebarList}>
                <li className={DashboardStyle.sidebarItem}>
                    <Link className={DashboardStyle.sidebarLink} to="/dashboard">
                        <FontAwesomeIcon icon={faHome} /> Dashboard
                    </Link>
                </li>
                    <hr className={DashboardStyle.divider}></hr>
                    {
                        props.user.userType == 'admin'
                        ?  
                        [
                            <li className={DashboardStyle.sidebarItem}>
                                <Link className={DashboardStyle.sidebarLink} to={{pathname: "/dashboard/volunteers", user: props.user}}>
                                    <FontAwesomeIcon icon={faUsers} /> Manage Members
                                </Link>
                            </li>
                        ]
                        :
                        [ 
                            <li className={DashboardStyle.sidebarItem}>
                                <Link className={DashboardStyle.sidebarLink} to={{pathname: "/dashboard/organizations", user: props.user}}>
                                    <FontAwesomeIcon icon={faCalendarAlt} />   Manage Organizations
                                </Link>
                            </li>
                        ]
                    }
                <li className={DashboardStyle.sidebarItem}>  
                    <Link className={DashboardStyle.sidebarLink} to={{pathname: "/dashboard/events", user: props.user}}>
                        <FontAwesomeIcon icon={faCalendarAlt} />  Manage Events
                    </Link>
                </li>

            </ul>
                
            
               
            </nav>
            
            
    );
}

export default DashboardNav;

 