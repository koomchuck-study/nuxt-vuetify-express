<template>
  <v-app>
    <v-app-bar app dark color="green">
      <v-toolbar-title>
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-text-field
          label="검색"
          hide-details
          prepend-icon="mdi-magnify"
          :style="{ display: 'flex', alignItems: 'center' }"
        />
        <v-btn text nuxt to="/profile">
          프로필
        </v-btn>
        <v-btn text nuxt to="/signup">
          회원가입
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <login-form />
          </v-col>
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm"

export default {
  components: {
    LoginForm,
  },
  computed: {
    name() {
      return this.$store.state.posts.name
    },
  },
  methods: {
    onChangeName() {
      this.$store.commit("posts/BYE")
    },
  },
  head() {
    return {
      title: "pignuBird",
    }
  },
}
</script>
