<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-error-message :message="'error has been received'"/>
    <div class="side-bar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
            v-for="popularTag in popularTags"
            class="tag-default tag-pill"
            :key="popularTag"
            :to="{name:'tag', params:{slug:popularTag}}"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading'
import McvErrorMessage from "@/components/ErrorMessage";

export default {
  name: "McvPopularTags",
  components:{
    McvErrorMessage,
    McvLoading
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      error: state => state.popularTags.error,
      popularTags: state => state.popularTags.data,
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }
}
</script>

<style scoped>

</style>