<template>
  <div>
    <mcv-loading v-if="isLoading"/>
    <mcv-error-message :message="'error has been received'"/>
    <div v-if="feed">
      <div class="article-preview"
           v-for="(article, index) in feed.articles"
           :key=index>
        <div class="article-meta">
          <router-link
              :to="{name: 'userProfile', params:{slug: article.author.username}}">
            <img alt="" :src="article.author.image"/>
          </router-link>
          <div class="info">
            <router-link
                class="author"
                :to="{name: 'userProfile', params:{slug: article.author.username}}">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            ADD TO FAVORITES
          </div>
        </div>
        <router-link
            :to="{name: 'article', params:{slug: article.slug}}"
            class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more ...</span>
          TAG LIST
        </router-link>
      </div>
      <mcv-pagination
          :total="total"
          :limit="limit"
          :current-page="currentPage"
          :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import {limit} from '@/helpers/vars'
import {stringify, parseUrl} from 'query-string'
import McvPagination from '@/components/Pagination'
import McvLoading from "@/components/Loading"
import McvErrorMessage from "@/components/ErrorMessage"

export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,

    },
  },
  data: () => ({
    limit,
    url: '/',
    total: 500
  }),
  components: {
    McvErrorMessage,
    McvLoading,
    McvPagination,
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },

    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() {
      console.log('currentPage changed')
      this.fetchFeed()
    }
  },
  mounted() {
    console.log('init feed')
    return this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`

      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  },
}
</script>

<style scoped>

</style>