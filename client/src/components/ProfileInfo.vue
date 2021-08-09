<template>
  <div>
    <h1 class="text-2xl">Hello {{ name }},</h1>
    <button class="mt-4 text-red-400 rounded-md border border-red-400 px-4 py-2" @click="signOut()"> Sign Out </button>
    <br />
    <br />
    <div class="text-left">
      Your Available Balance is <b>{{ balance }}</b> in wallet id <b>{{ walletId }}</b> created at {{ createdData | convertDate }}
    </div>
  </div>
</template>

<script>
import { getLocalData, http, removeLocalKey, convertDate } from '@/utils'

export default {
  data() {
    return {
      name: '',
      balance: 0,
      walletId: '',
      createdData: ''
    }
  },
  filters: {
    convertDate
  },
  mounted() {
    this.$root.$on('userInfo', this.setUserInfo)
    this.name = getLocalData('walletUser').name
    this.createdData = getLocalData('walletUser').date
    this.walletId = getLocalData('walletId')
    http.get(`/wallet/${this.walletId}`)
      .then((res) => this.setUserInfo(res.data))
      .catch(err => {
        this.$root.$emit('showPrompt', {
          msg: err.response.data,
          type: 'error'
        })
        this.signOut()
      })
  },
  methods: {
    signOut() {
      removeLocalKey('walletId')
      removeLocalKey('walletUser')
      this.$router.push('/wallet-signin')
    },
    setUserInfo(val) {
      this.balance = val.balance,
      this.name = val.name
    }
  }
}
</script>