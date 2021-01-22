/* eslint-disable */

import { AppState } from "../AppState.js"
import {jobapi} from "./AxiosService.js"

class JobsService {
 
 async getJobs() {
    let res  = await jobapi.get('');
    AppState.jobs = res.data;
  }

  async create(job) {
    const res = await jobapi.post('', job)
    AppState.jobs.push(res.data)
    return res.data.id
  }


  async deleteJob(id) {
    let res  = await jobapi.delete(id)
    console.log(res)

    AppState.jobs = AppState.jobs.filter(job => job.id != id)

  }

   async getOne(id){
    const res = await jobapi.get(id)
    AppState.activeJob = res.data
  }
}

//GET
//URL/api/collection

//GETBYID
//URL/api/collection/someId

//PUT
//URL/api/collection/someId, whatWeAreEditing

//POST
//URL/api/collection , whatWeArePosting

//DELETE
//URL/api/collection/someId
//api.delete(id)



// Singleton Pattern
export const jobsService = new JobsService()