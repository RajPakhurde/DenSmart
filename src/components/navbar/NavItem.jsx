import React, { useState } from 'react';
import homeicon from './home.svg'

const NavItem = ({navitem, active, id, setActiveCompnent, subHeader}) => {
    const icons = [
    <i class="ri-home-7-fill"></i>, 
    <i class="ri-calendar-2-line"></i>,
    <i class="ri-user-3-fill"></i>,
    <i class="ri-time-fill"></i>,
    <i class="ri-file-history-fill"></i>,
    <i class="ri-money-rupee-circle-fill"></i>
    ]

    return (
        <div className={active ? 'nav-item-active' : 'nav-item'} 
        onClick={() => {
            setActiveCompnent(id);
            if (id === "2") {
                subHeader("/ All");
            }
            if (id === "5") {
                subHeader("/ Labrecords")
            }
        }}
        >
            <h3> {icons[parseInt(id) - 1]} {navitem}</h3>
            <homeicon />
        </div>
    );
};

export default NavItem;