import React from "react";

const DashboardSmallTable = (props) => {
    
    return (
        <div className="dashboard-div-item">
                <table>
                    <tr>
                        <td className="table-th">{props.th}</td>
                        <td className='table-second-ele'>{props.icon}</td>
                    </tr>
                    <hr />
                    <tr>
                        <td>Today</td>
                        <td className='table-second-ele'>0</td>
                    </tr>
                    <tr>
                        <td>This Month</td>
                        <td className='table-second-ele'>0</td>
                    </tr>
                    <tr>
                        <td>Last Month</td>
                        <td className='table-second-ele'>0</td>
                    </tr>
                    <tr>
                        <td>This Year</td>
                        <td className='table-second-ele'>0</td>
                    </tr>
                    <tr>
                        <td>Last Year</td>
                        <td className='table-second-ele'>0</td>
                    </tr>
                </table>
                {console.log(props.icon)}
            </div>
    );
};

export default DashboardSmallTable;