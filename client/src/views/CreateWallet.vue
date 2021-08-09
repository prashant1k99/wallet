<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-5 max-w-xl mx-auto">
    <!-- <h1 class="text-3xl text-gray-700">Create Wallet Id</h1> -->
    <div class="space-y-6 text-lg border border-blue-900 p-6 min-w-full">
      <h1 class="text-xl text-gray-700">{{ exisitingWallet ? 'Use Your Wallet' : 'Create New Wallet' }}</h1>
      <form class="w-full space-y-6" @submit.prevent >
        <div v-if="exisitingWallet">
          <label class="block text-left" for="walletId">
            <span class="text-gray-700">Wallet Id:</span><span class="text-red-500"> * </span>
            <input class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Enter Wallet Id" v-model="walletId" type="text" id="walletId" name="walletId"/>
            <p v-if="!validate" class="text-sm text-red-500">Wallet Id is Required</p>
          </label>
        </div>
        <div v-else>
          <label class="block text-left" for="name">
            <span class="text-gray-700">Name:</span><span class="text-red-500"> * </span>
            <input class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Enter Name" v-model="name" type="text" id="name" name="name" required/>
            <p v-if="!validate" class="text-sm text-red-500">Name is Required</p>
          </label>
          <label class="block text-left" for="balance">
            <span class="text-gray-700">Balance: </span>
            <input class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Enter Initial Balance" v-model="balance" type="number" id="balance" name="balance"/>
          </label>
        </div>
        <button :disabled="!validate || disabled" @click="submitButton()" class="bg-blue-200 rounded-md text-blue-900 border border-blue-900 hover:border-transparent hover:bg-blue-500 hover:text-white w-full py-2">{{exisitingWallet ? 'Get In' : 'Create Wallet' }}</button>
      </form>
      <p class="text-base text-blue-600 cursor-pointer" @click="exisitingWallet = !exisitingWallet"> {{exisitingWallet ? 'Create New Wallet' : 'Have Exisiting Wallet' }}</p>
    </div>
  </div>
</template>

<script>
import { http, storeDataInLocal } from '@/utils'

export default {
  data () {
    return {
      exisitingWallet: false,
      walletId: null,
      name: '',
      balance: null,
      disabled: false,
      validationError: {
        walletId: false,
        name: false
      }
    }
  },
  computed: {
    validate() {
      if (this.exisitingWallet) {
        if (!this.walletId) return false
        else return true
      } else {
        if (!this.name) return false
        else return true
      }
    }
  },
  methods: {
    submitButton() {
      this.disabled = true
      if(this.exisitingWallet) {
        if (!this.walletId) return
        http.get(`/wallet/${this.walletId}`).then((res) => {
          delete res.data.balance
          storeDataInLocal('walletUser', res.data)
          storeDataInLocal('walletId', this.walletId)
          this.$root.$emit('showPrompt', {
            msg: `Using Wallet Id: ${this.walletId}`,
            type: 'success'
          })
          this.$router.push(this.$route.query.to || '/')
        }).catch((err) => {
          this.$root.$emit('showPrompt', {
            msg: err.response.data,
            type: 'error'
          })
        })
      } else {
        if (!this.name) return
        http.post('/setup', {
          name: this.name,
          balance: this.balance ? parseFloat(this.balance) : undefined
        }).then((res) => {
          delete res.data.balance
          storeDataInLocal('walletUser', res.data)
          storeDataInLocal('walletId', res.data.id)
          this.$root.$emit('showPrompt', {
            msg: `Wallet Created, Id: ${res.data.id}`,
            type: 'success'
          })
          this.$router.push(this.$route.query.to || '/')
        }).catch((err) => {
          this.$root.$emit('showPrompt', {
            msg: err.response.data.message,
            type: 'error'
          })
        })
      }
      this.disabled = false
    }
  }
}
</script>