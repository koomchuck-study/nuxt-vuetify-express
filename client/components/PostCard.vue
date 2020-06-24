<template>
  <v-container>
    <v-card>
      <v-card-text>
        <div>
          <h3>pignu</h3>
          <div>hi!</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>
            mdi-heart-outline
          </v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>
            mdi-comment-outline
          </v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PostCard",
}
</script>

<style scoped></style>
