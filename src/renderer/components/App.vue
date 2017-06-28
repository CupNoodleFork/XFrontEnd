<template>
  <div class="page-root">
    <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="3000">
      <span v-text="snackBarMessage"></span>
    </md-snackbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
      computed: {
          ...mapState('base', {
              snackBarMessage: state => state.snackbar.message
          })
      },
      mounted() {
          this.setSnackBar(this.$refs.snackbar);
      },
      methods: {
          ...mapMutations('base', [
              'setSnackBar'
          ])
      }
  }
</script>
