import axios from "axios"
import { ITimeSheet } from "./Interfaces"
class TodoSevice {
    private URL =  "/api/timesheets/"
    async getAll() {
        return axios.get<ITimeSheet[]>(this.URL)
    }
    async getById(id:number){
        return axios.get<ITimeSheet>(this.URL+id)
    }

    async create(data:ITimeSheet): Promise<any>{
        return axios.post<any, any, ITimeSheet>(this.URL, data)
    }
    async delete(id:number):Promise<boolean>{
        return axios.delete<any, any, ITimeSheet>(this.URL+id)
    }
    async update(timesheet:ITimeSheet):Promise<ITimeSheet>{
        return axios.patch(this.URL, timesheet)
    }
}
export default new TodoSevice;