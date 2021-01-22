import { AppState } from '../AppState'
import { carapi } from './AxiosService'

class CarsService {
  async getCars() {
    // fetch data
    const res = await carapi.get('')
    // add to AppState
    AppState.cars = res.data
  }

  async getOne(id) {
    const res = await carapi.get(id)
    AppState.activeCar = res.data
  }

  async create(car) {
    const res = await carapi.post('', car)
    AppState.cars.push(res.data)
    return res.data.id
  }
}

export const carsService = new CarsService()
