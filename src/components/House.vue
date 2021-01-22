<template>
  <div class="house col-4">
    <router-link :to="{ name: 'HouseDetails', params: { id: house.id } }">
      <div class="card">
        <img class="card-img-top" :src="house.imgUrl" alt="" />
        <div class="card-body">
          <h4 class="card-title">{{ house.bedrooms }} Bed | {{ house.bathrooms }} Bath | ${{ house.price }}</h4>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'House',
  props: {
    house: {
      type: Object,
      required: true
    }
  },
  setup(props) {

  }
}
</script>

<style lang="scss">
  .house {
    cursor: pointer;
  }
</style>
