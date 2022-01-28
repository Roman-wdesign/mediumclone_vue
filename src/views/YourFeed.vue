<template>
  <div class="home-page">
    <mcv-banner/>
    <div class="container-page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler/>
          <mcv-feed :api-url="apiUrl"/>
        </div>
        <div class="col-md-3">
          <mcv-popular-tags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvBanner from "@/components/Banner";
import McvPopularTags from "@/components/PopularTags";
import McvFeed from "@/components/Feed";
import McvFeedToggler from "@/components/FeedToggler";

export default {
  name: "McvYourFeed",
  components: {McvFeedToggler, McvBanner, McvPopularTags, McvFeed},
  data: () => ({
    apiUrl: '/articles/feed'
  }),
}
</script>

<style scoped>

</style>