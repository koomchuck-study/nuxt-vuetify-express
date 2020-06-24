<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post" />
    </div>
  </v-container>
</template>

<script>
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"

export default {
  components: {
    PostForm,
    PostCard,
  },
  data() {
    return {
      name: "julia.js",
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts
    },
  },
}
</script>
