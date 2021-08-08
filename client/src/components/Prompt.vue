<template>
  <div class="absolute top-4 right-4 z-10 px-10 py-4 border" :class="[type === 'error' && 'border-red-600 text-red-600 bg-red-200', type === 'success' && 'border-green-600 text-green-600 bg-green-200']" v-if="isVisible">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Prompt',
  inject: ['EventHub'],
  data() {
    return {
      isVisible: false,
      msg: 'Message',
      type: 'error',
      time: 5000
    }
  },
  watch: {
    isVisible: function (val) {
      if (val) {
        setTimeout(() => {
          this.isVisible = false
        }, this.time)
      }
    }
  },
  mounted() {
    this.EventHub.$on('showPrompt', this.showPrompt)
  },
  methods: {
    showPrompt(val) {
      this.msg = val.msg
      this.type = val.type || 'error'
      this.isVisible = true
    }
  }
}
</script>

<style>

</style>