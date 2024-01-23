import React, {useState} from 'react';
import NavItem from './NavItem';

 
 
const Nav = ({setCurrentCompnent, subHeader}) => {
    const [activeCom, setActiveCom] = useState("1");

    function setActiveCompnent(id) {
         setCurrentCompnent(id);
         setActiveCom(id); 
    }

    return (
        <div className='nav-container'>
            <h1 className='product-name'>DenSmart</h1>
            <hr />
            
            <NavItem id="1" navitem="Dashboard" active={activeCom === "1" ? true : false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="2" navitem="Appointment" active={activeCom === "2" ? true : false} setActiveCompnent={setActiveCompnent} subHeader={subHeader}/>
            <NavItem id="3" navitem="Patients" active={activeCom === "3" ? true : false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="4" navitem="Planner" active={activeCom === "4" ? true : false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="5" navitem="Records" active={activeCom === "5" ? true : false} setActiveCompnent={setActiveCompnent} />
            <NavItem id="6" navitem="Accounts" active={activeCom === "6" ? true : false} setActiveCompnent={setActiveCompnent} />
        </div>
    );
};
 
export default Nav;