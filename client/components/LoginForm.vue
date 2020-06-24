<template>
  <v-container>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            label="email"
            type="email"
            v-model="email"
            :rules="emailRules"
            required/>
          <v-text-field
            label="password"
            type="password"
            v-model="password"
            :rules="passwordRules"
            required/>
          <v-btn
            color="green"
            type="submit"
            :disabled="!valid"
          >login
          </v-btn>
          <v-btn nuxt to="/signup">Sign up</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "LoginForm",
    data() {
      return {
        valid: false,
        email: "",
        password: "",
        emailRules: [
          v => !!v || "Email required",
          v => /.+@.+/.test(v) || "enter Email"
        ],
        passwordRules: [
          v => !!v || "Password required"
        ],
      }
    },
    methods: {
      onSubmitForm() {
        this.$refs.form.validate;
      }
    },
  }
</script>

<style scoped>

</style>
