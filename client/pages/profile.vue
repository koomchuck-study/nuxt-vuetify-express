<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>
            My profile
          </v-subheader>
          <v-form>
            <v-text-field label="Nick name" required />
            <v-btn color="blue" type="submit">
              수정
            </v-btn>
          </v-form>
        </v-container>
      </v-card>

      <v-card style="margin-bottom: 20px;">
        <v-container>
          <v-subheader>following</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px;">
        <v-container>
          <v-subheader>follower</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "../components/FollowList"

export default {
  components: {
    FollowList,
  },
  data() {
    return {
      name: "julia.js",
    }
  },
}
</script>
