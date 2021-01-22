<template>
  <div class="house-details">
    <h1>Welcome to house details</h1>
    <img v-if="state.loaded" :src="house.imgUrl" alt="" />
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { housesService } from '../services/HousesService'
// IMPORTANT REVIEW
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      loaded: false
    })
    // onBeforeRouteLeave(() => {
    //   AppState.activeCar = {}
    // })
    onMounted(async () => {
      try {
        await housesService.getOne(route.params.id)
      } catch (error) {
        console.error(error)
      } finally {
        state.loaded = true
      }
    })
    return {
      state,
      house: computed(() => AppState.activeHouse)
    }
  }
}
</script>

<style>
</style>
