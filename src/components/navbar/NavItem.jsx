import React from 'react';
import homeicon from './home.svg'

const NavItem = ({navitem, active, id, setActiveCompnent}) => {
    return (
        <div className={active ? 'nav-item-active' : 'nav-item'} 
        onClick={() => {
            setActiveCompnent(id);
        }}
        >
            <h3> <homeicon /> {navitem}</h3>
            <homeicon />
        </div>
    );
};

export default NavItem;