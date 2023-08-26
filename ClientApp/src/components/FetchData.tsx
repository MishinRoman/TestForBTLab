import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ITimeSheet } from '../services/Interfaces';
type Props ={

}


const FetchData = (props:Props) => {
  
  
  const [timeSheets, setTimeSheets] = useState<ITimeSheet[]>([]);
  useEffect(() => {
    axios.get('/api/timesheets').then(res=>setTimeSheets(res.data));
    }, [])
  
  
  return (
    <div>
        {timeSheets.map(item=><div key={item.id}>{item.description}</div>)}
    </div>
  )
}
export default FetchData;