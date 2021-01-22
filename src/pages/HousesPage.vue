<template>
  <div class="houses-page container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1>Ho<img alt="Vue logo" src="../assets/logo.png" class="logoHouse" />ses</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="createHouse">
          <div class="form-group-inline">
            <label for="bedrooms">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              id="bedrooms"
              v-model="state.newHouse.bedrooms"
              class="form-control"
              placeholder="Bedrooms..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="bathrooms">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              v-model="state.newHouse.bathrooms"
              class="form-control"
              placeholder="Bathrooms..."
              aria-describedby="helpId"
            />
          </div>
           <div class="form-group-inline">
            <label for="levels">Levels</label>
            <input
              type="number"
              name="levels"
              id="levels"
              v-model="state.newHouse.levels"
              class="form-control"
              placeholder="Levels..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              v-model="state.newHouse.year"
              class="form-control"
              placeholder="Year..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              v-model="state.newHouse.price"
              class="form-control"
              placeholder="Price..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              v-model="state.newHouse.description"
              class="form-control"
              placeholder="Description..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="imgUrl">imgUrl</label>
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              v-model="state.newHouse.imgUrl"
              class="form-control"
              placeholder="imgUrl..."
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success">Add House</button>
        </form>
      </div>
    </div>
    <div class="row">
      <House v-for="house in houses" :key="house.id" :house="house" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { housesService } from '../services/HousesService'
import { AppState } from '../AppState'
import House from '../components/House.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HousesPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      newHouse: {}
    })

    // NOTE on mounted gets called when the page is first mounted to the dom (similar to constructors)
    onMounted(() => {
      try {
        housesService.getHouses()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      // if data changes dynimcally in the appstate use a computed
      houses: computed(() => AppState.houses),

      async createHouse() {
        try {
          const id = await housesService.create(state.newHouse)
          state.newHouse = {}
          // change route in javascript using router.push()
          router.push({ name: 'HouseDetails', params: { id } })
        } catch (error) {
          console.error(error)
        }
      }

    }
  },
  components: {
    House
  }
}
</script>

<style lang="scss">
  .logoHouse {
   height: 1em
  }
</style>
