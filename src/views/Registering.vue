<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Have an account?</router-link>
          </p>

          <!--- props который validation-errors передаем данные отсюда в  компонент validationErrors
                    props - передача данных в дочерние компоненты
                    ---->
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>


          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="text"
                     class="form-control
                     form-control-lg"
                     placeholder="Username"
                     v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input type="text"
                     class="form-control
                     form-control-lg"
                     placeholder="Email"
                     v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input type="password"
                     class="form-control form-control-lg"
                     placeholder="Password"
                     v-model="password"
              />
            </fieldset>
            <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting">Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from "@/store/modules/auth";

export default {
  components: {McvValidationErrors},
  name: "McvRegistering",
  data: () => ({
    email: '',
    password: '',
    username: ''
  }),
  computed: {

    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
    // isSubmitting() {
    //   // присваивает значение из state.count в count
    //   //получение данных из state (VueX) и вывод через computed
    //   return this.$store.state.auth.isSubmitting
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors
    // }
  },
  methods: {
    onSubmit() {
      console.log('Submitted form')

      // mutation
      // this.$store.commit('registerStart')

      //Action 'register'
      this.$store
          .dispatch(actionTypes.register, {
            email: this.email,
            username: this.username,
            password: this.password
          })
          //подписывается на Promise
          .then(user => {
            console.log('successfully registering user', user)

            //пишем алиасом name:'home', если вдруг поменяется путь,
            // то алиас в приложении не нужно будет менять
            // {перебрасывает при регистрации на главную}
            this.$router.push({name: 'globalFeed'})
          })
    },

  },

}
</script>

<style scoped>

</style>