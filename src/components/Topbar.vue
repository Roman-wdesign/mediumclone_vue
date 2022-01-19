<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name:'globalFeed'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'globalFeed'}">Home</router-link>
        </li>

        <!--- для зарегистрированных-->

        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
                class="navbar-link"
                :to="{name:'createArticle'}"
                active-class="active"
            >
              <i class="ion-compose"> &nbsp; New Article </i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                class="navbar-link"
                :to="{name:'settings'}"
                active-class="active"
            >
              <i class="ion-gear-a"> &nbsp; Settings </i>
            </router-link>
          </li>
          <li class="nav-item">

            <!--- создание уникального слага, у каждого user будет своя страница
            slug- человекопонятный уникальный идентефикатор, на уровне API
            -->
            <router-link
                class="navbar-link"
                :to="{name:'userProfile',
                params:{slug:currentUser.username}}"
            >
              <img class="user-pic" :src="currentUser.image"/>
              &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>

        <!--- для НЕ зарегистрированных-->
        <template v-if="isAnonymous">

          <li class="nav-item">
            <router-link
                class="navbar-link"
                :to="{name:'login'}"
                active-class="active"
            >
              Sign In
            </router-link>
          </li>
          <li class="nav-item">

            <router-link
                class="navbar-link"
                :to="{name:'registering'}"
                active-class="active"
            >
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import {getterTypes} from "@/store/modules/auth";
import {mapGetters} from 'vuex'

export default {
  name: "McvTopbar",
  data: () => ({}),
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  },
}
</script>

<style  scoped>
.user-pic {
  width: 16px;
  height: 16px;
}
</style>