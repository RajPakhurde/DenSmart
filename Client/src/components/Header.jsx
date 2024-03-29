import React from 'react';
import Slide from '@mui/material/Slide';

const Header = (props) => {
    const handleClick = () => {
        props.setCurrentCompnent("7");
    }
    

    return (
        <Slide in={true}>
            <div className='header'>
                <div className='header-left'>
                    <p>{props.icon}  / {props.page} {(props.page==="Appointment" || props.page === "Records") && props.subHeader !== undefined && props.subHeader}</p>
                    <h3>{props.page}</h3>
                </div>
                <div className='header-right'>
                    <i class="ri-user-add-fill"
                    onClick={handleClick}
                    ></i>
                    <div className='img-div'>
                        <div className='profile-img'>
                            <i class="fa-solid fa-user-doctor "></i>
                        </div>
                        <h4>Dentokraft Dental Care Centre  <br /> <span>clinic</span></h4>
                    </div>
                </div>
            </div>
        </Slide>
    );
};

export default Header;