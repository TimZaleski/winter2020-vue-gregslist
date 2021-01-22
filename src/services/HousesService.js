/* eslint-disable */

import { AppState } from "../AppState.js"
import {houseapi} from "./AxiosService.js"

class HousesService {
 
 async getHouses() {
    let res  = await houseapi.get('');
    AppState.houses = res.data;
  }

  async create(house) {
    const res = await houseapi.post('', house)
    AppState.houses.push(res.data)
    return res.data.id
  }


  async deleteHouse(id) {
    let res  = await houseapi.delete(id)
    console.log(res)

    AppState.houses = AppState.houses.filter(house => house.id != id)


  }

   async getOne(id){
    const res = await houseapi.get(id)
    AppState.activeHouse = res.data
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
export const housesService = new HousesService()