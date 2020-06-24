<template>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>Sign up</v-subheader>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-text-field
            v-model="email"
            label="email"
            type="email"
            :rules="emailRules"
            reqired
          />
          <v-text-field
            v-model="password"
            label="password"
            type="password"
            :rules="passwordRules"
            reqired
          />
          <v-text-field
            v-model="passwordCheck"
            label="check password"
            type="password"
            :rules="passwordCheckRules"
            reqired
          />
          <v-text-field
            v-model="nickname"
            label="Nick Name"
            type="nickname"
            :rules="nicknameRules"
            reqired
          />
          <v-checkbox
            v-model="terms"
            required
            :rules="termsRules"
            label="동의"
          />
          <v-btn color="green" type="submit" :disabled="!valid">
            Sign up
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false,
      emailRules: [
        (v) => !!v || "Email required",
        (v) => /.+@.+/.test(v) || "enter Email",
      ],
      nicknameRules: [(v) => !!v || "Nick Name required"],
      passwordRules: [(v) => !!v || "Password required"],
      passwordCheckRules: [
        (v) => !!v || "Password check is required",
        (v) => v === this.password || "Password check is required",
      ],
      termsRules: [(v) => !!v || "Term required"],
    }
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/signUp", {
            nickname: this.nickname,
            email: this.email,
          })
          .then(() => {
            this.$router.push({
              path: "/",
            })
          })
          .catch(() => {
            alert("fail to sign up")
          })
      }
    },
  },
  head() {
    return {
      title: "sign up",
    }
  },
}
</script>
