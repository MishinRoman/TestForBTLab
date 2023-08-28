import axios from "axios";
import React, { useState, useEffect } from "react";
import { ITimeSheet } from "../services/Interfaces";
import { Table } from "reactstrap";
import timesheetSevice from "../services/timesheet.sevice";
import ModalForChange from "./ModalForChange";
import { reasons } from "../services/reasons.list";


type Props = {
  timeSheets:ITimeSheet[];
  fetchData:()=>void;
  setData:(data:ITimeSheet[])=>void;
};
const FetchData = (props: Props) => {
  
  const deleteItemHendler=(id:number):any=>{
    timesheetSevice.delete(id).then(()=>props.fetchData());
    
  }
  
  
  return (
    <div>
     
      <Table size="xl" responsive borderless>
        <thead>
          <tr>
            <th>id</th>
            <th>Причина прогула</th>
            <th>Дата начала</th>
            <th>Продолжительность дней</th>
            <th>Учтено при оплате</th>
            <th>Комментарии</th>
          </tr>
        </thead>
        <tbody>
          {props.timeSheets.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{Object.keys(reasons)[item.reason]}</td>
              <td>{new Date(item.startDate).toLocaleDateString()}</td>
              <td>{item.duration}</td>
              <td>{item.discounted.toString()}</td>
              <td>{item.description}</td>
              <td><button className="btn btn-danger" type="button" onClick={()=>deleteItemHendler(item.id)}>Удалить</button></td>
              <td><ModalForChange getAll={props.fetchData} dataForChanged={item}/></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default FetchData;
