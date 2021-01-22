<template>
  <div class="job-details">
    <h1>Welcome to job details</h1>
    <h1 v-if="state.loaded" >{{ job.jobTitle }} | {{ job.company }}</h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { jobsService } from '../services/JobsService'
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
        await jobsService.getOne(route.params.id)
      } catch (error) {
        console.error(error)
      } finally {
        state.loaded = true
      }
    })
    return {
      state,
      job: computed(() => AppState.activeJob)
    }
  }
}
</script>

<style>
</style>
