import React, { FormEvent, useEffect, useState } from "react";
import "./custom.css";
import FetchData from "./components/FetchData";
import FormNewData from "./components/FormNewData";
import timesheetSevice from "./services/timesheet.sevice";
import { ITimeSheet } from "./services/Interfaces";


const defaultData = {
  id: 0,
  description: "",
  startDate: "",
  reason: -1,
  discounted: false,
  duration: 0,
};

const App = () => {
  const [timeSheets, setTimeSheets] = useState<ITimeSheet[]>([]);
  const [first, setFirst] = useState<ITimeSheet>(defaultData);
  const fetchData=()=>{
    timesheetSevice.getAll().then(data=>setTimeSheets(data.data));
console.log("fetchData form App");

  }
  
  useEffect(() => {
    const fetchData=()=>{
      timesheetSevice.getAll().then(data=>setTimeSheets(data.data));

    }
    fetchData();
    

}, [])

  function onSubminHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    timesheetSevice.create(first).then(()=>fetchData()).catch((err) => console.log(err));
   
    setFirst(defaultData);
  }

  return (
    <div className="container">
      
      <FormNewData
        data={first}
        setData={setFirst}
        onSubminHandler={onSubminHandler}
      />
      <FetchData setData={setTimeSheets} timeSheets={timeSheets} fetchData={fetchData}/>
    </div>
  );
};
export default App;
