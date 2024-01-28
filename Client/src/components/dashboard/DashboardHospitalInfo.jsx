import React from 'react';
 
const DashboardHospitalInfo = () => {
    return (
        <div className=" table-card table-card-2">
            <div className="hospital-info-header">
                <p>Dental Care Center</p>
            </div>
            <hr />
                <div className='hospital-info'>
                    <div>
                        <i class="fa-solid fa-user-doctor "></i>
                    </div>
                    <p>Dr. Ritesh Ashok Mehta</p>
                </div>
                <div className='hospital-info'>
                    <div>
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                     <p>Mangaon</p>
                </div>
                <div className='hospital-info'>
                    <div>
                      <i class="fa-solid fa-phone"></i>   
                    </div>
                    <p>9850619374</p>
                </div>
                <div className='hospital-info'>
                    <div>
                        <i class="fa-regular fa-envelope"></i>
                    </div>
                    <p>riteshmehta1@gmail.com</p>
                </div>
      </div>
    );
};

export default DashboardHospitalInfo;