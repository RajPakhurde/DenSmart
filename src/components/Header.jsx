import React from 'react';
import Slide from '@mui/material/Slide';

const Header = (props) => {
    

    return (
        <Slide in={true}>
            <div className='header'>
                <div className='header-left'>
                    <p>{props.icon}  / {props.page} {props.page==="Appointment" && props.subHeader !== undefined && props.subHeader}</p>
                    <h3>{props.page}</h3>
                </div>
                <div className='header-right'>
                    <i class="ri-user-add-fill"></i>
                    <i class="ri-notification-3-fill"></i>
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