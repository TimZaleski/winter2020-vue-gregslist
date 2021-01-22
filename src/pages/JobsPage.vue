<template>
  <div class="jobs-page container-fluid">
    <div class="row">
      <div class="col text-center">
        <h1><img alt="Vue logo" src="../assets/logo.png" class="logoJob" />ery Cool Jobs</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="createJob">
          <div class="form-group-inline">
            <label for="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              v-model="state.newJob.company"
              class="form-control"
              placeholder="Company..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="jobTitle">Title</label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              v-model="state.newJob.jobTitle"
              class="form-control"
              placeholder="Title..."
              aria-describedby="helpId"
            />
          </div>

          <div class="form-group-inline">
            <label for="hours">Hours</label>
            <input
              type="number"
              name="hours"
              id="hours"
              v-model="state.newJob.hours"
              class="form-control"
              placeholder="Hours..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="rate">Rate</label>
            <input
              type="number"
              name="rate"
              id="rate"
              v-model="state.newJob.rate"
              class="form-control"
              placeholder="Rate..."
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group-inline">
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              v-model="state.newJob.description"
              class="form-control"
              placeholder="Description..."
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success">Add Job</button>
        </form>
      </div>
    </div>
    <div class="row">
      <Job v-for="job in jobs" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { jobsService } from '../services/JobsService'
import { AppState } from '../AppState'
import Job from '../components/Job.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'JobsPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      newJob: {}
    })

    // NOTE on mounted gets called when the page is first mounted to the dom (similar to constructors)
    onMounted(() => {
      try {
        jobsService.getJobs()
      } catch (error) {
        console.error(error)
      }
    })
    return {
      state,
      // if data changes dynimcally in the appstate use a computed
      jobs: computed(() => AppState.jobs),

      async createJob() {
        try {
          const id = await jobsService.create(state.newJob)
          state.newJob = {}
          // change route in javascript using router.push()
          router.push({ name: 'JobDetails', params: { id } })
        } catch (error) {
          console.error(error)
        }
      }

    }
  },
  components: {
    Job
  }
}
</script>

<style lang="scss">
  .logoJob {
   height: 1em
  }
</style>
