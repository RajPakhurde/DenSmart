import React, {useState} from 'react';
import NavItem from './NavItem';
 
 
const Nav = ({setCurrentCompnent}) => {

    function setActiveCompnent(id) {
         setCurrentCompnent(id);
    }

    return (
        <div className='nav-container'>
            <h1 className='product-name'>DenSmart</h1>
            <hr />
            <NavItem id="1" navitem="Dashboard" active={true} setActiveCompnent={setActiveCompnent} />
            <NavItem id="2" navitem="Appointment" active={false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="3" navitem="Patients" active={false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="4" navitem="Planner" active={false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="5" navitem="Records" active={false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="6" navitem="Accounts" active={false} setActiveCompnent={setActiveCompnent} />
        </div>
    );
};

export default Nav;