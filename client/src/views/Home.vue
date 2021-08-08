<template>
  <div class="p-4">
    <h1 class="text-2xl">Hello {{ name }},</h1>
    <button class="mt-4 text-red-400 rounded-md border border-red-400 px-4 py-2" @click="signOut()"> Sign Out </button>
    <br />
    <br />
    <div class="text-left">
      Your Available Balance is {{ balance }}
    </div>
    <br />
    <br />
    <div class="border border-blue-900 rounded-md p-4">
      <h2 class="text-xl">Do transactions</h2>
      <form class="w-full space-y-6" @submit.prevent >
        <label class="block text-left" for="amount">
          <span class="text-gray-700">Amount:</span><span class="text-red-500"> * </span>
          <input class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Enter Amount" v-model="amount" type="number" id="amount" name="amount" required/>
        </label>
        <label class="block text-left" for="description">
          <span class="text-gray-700">Description: </span>
          <input class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Enter description" v-model="description" type="text" id="description" name="description"/>
        </label>
        <toggle v-model="credit"/>
        <button :disabled="disabled" @click="doTransaction()" class="bg-blue-200 rounded-md text-blue-900 border border-blue-900 hover:border-transparent hover:bg-blue-500 hover:text-white w-full py-2">Transact</button>
      </form>
    </div>
  </div>
</template>

<script>
import userInfoMixin from '@/mixins/userInfo'
import { getLocalData, removeLocalKey } from '@/utils'
import Toggle from '@/components/Toggle'
import { http } from '@/utils'

export default {
  name: 'Home',
  inject: ['EventHub'],
  components: {
    Toggle
  },
  mixins: [userInfoMixin],
  data() {
    return {
      amount: null,
      description: '',
      credit: true,
      disabled: false
    }
  },
  methods: {
    signOut() {
      removeLocalKey('walletId')
      removeLocalKey('walletUser')
      this.$router.push('/wallet-signin')
    },
    doTransaction() {
      if(this.amount) {
        const walletId = getLocalData('walletId')
        http.post(`/transact/${walletId}`, {
          amount: this.credit ? this.amount : 0 - this.amount,
          description: this.description
        }).then((res) => {
          this.EventHub.$emit('showPrompt', {
            msg: `Transaction successfull. TxnIx: ${res.data.id}`,
            type: 'success'
          })
        }).catch(err => {
          this.EventHub.$emit('showPrompt', {
            msg: err.response.data,
            type: 'error'
          })
        })
      }
    }
  }
}
</script>
