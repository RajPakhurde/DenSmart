import React, { useState }  from 'react';
import ConsultingFee from './records/ConsultingFee'
import ConsumeMaterial from './records/ConsumeMaterial'
import LabRecords from './records/LabRecords'
import MaintenanceRecords from './records/MaintenanceRecords'
import MaterialRecords from './records/MaterialRecords'
import SalaryRecords from './records/SalaryRecords'
import StockHistory from './records/StockHistory'
import RecordsNav from './records/RecordsNav';

import LabRecordsForm from './records/forms/LabRecord'
import MaterialRecordsForm from './records/forms/MaterailRecords'
import MaintenanceRecordsForm from './records/forms/MaintenanceRecords'
import SalaryRecordsForm from './records/forms/SalaryRecords'
import ConsumeMaterailForm from './records/forms/ConsumeMaterial'
import StockHistoryForm from './records/forms/StockHistory'
import ConsultingFeeForm from './records/forms/ConsultingFee'

const Records = (props) => {
    const [currentTable, setCurrentTable] = useState("labrecords");

 
    return (


        <div className='records-container'>
            <RecordsNav setCurrentTable={setCurrentTable} setHeader={props.setHeader}/>
              
              {currentTable === "labrecords" && <LabRecords setCurrentTable={setCurrentTable} />}
              {currentTable === "materialrecords" && <MaterialRecords setCurrentTable={setCurrentTable} />}
              {currentTable === "maintenancerecords" && <MaintenanceRecords setCurrentTable={setCurrentTable} />}
              {currentTable === "salaryrecords" && <SalaryRecords setCurrentTable={setCurrentTable} />}
              {currentTable === "consumematerial" && <ConsumeMaterial setCurrentTable={setCurrentTable} />}
              {currentTable === "stockhistory" && <StockHistory setCurrentTable={setCurrentTable} />}
              {currentTable === "consultingfee" && <ConsultingFee setCurrentTable={setCurrentTable} />}

              {currentTable === "new-lab-record" && <LabRecordsForm setCurrentTable={setCurrentTable} openInRecords="true" />}
              {currentTable === "new-material-record" && <MaterialRecordsForm setCurrentTable={setCurrentTable}/>}
              {currentTable === "new-mantenance-record" && <MaintenanceRecordsForm setCurrentTable={setCurrentTable}/>}
              {currentTable === "new-salary-record" && <SalaryRecordsForm setCurrentTable={setCurrentTable}/>}
              {currentTable === "new-consumematerial-record" && <ConsumeMaterailForm setCurrentTable={setCurrentTable} openInRecords="true"/>}
              {currentTable === "new-stockhistory-record" && <StockHistoryForm setCurrentTable={setCurrentTable}/>}
              {currentTable === "new-consultingfee-record" && <ConsultingFeeForm setCurrentTable={setCurrentTable} openInRecords="true"/>}
        </div>
    );
};

export default Records;