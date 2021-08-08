<template>
  <div class="p-4">
    <profile-info />
    <span class="text-left cursor-pointer underline text-blue-700" @click="sendToHome()">Home</span>
    <br />
    <br />
    <div class="border border-blue-900 rounded-md p-4">
      <h2 class="text-xl">All Transaction List</h2>
      <span class="cursor-pointer underline text-blue-700" @click="downloadCSV()">Get CSV</span>
      <br />
      <br />
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.id || '-' }}</td>
            <td>{{ transaction.description || '-'}}</td>
            <td>{{ transaction.type || '-'}}</td>
            <td>{{ transaction.amount || '-'}}</td>
            <td>{{ transaction.balance || '-'}}</td>
            <td>{{ transaction.date || '-'}}</td>
          </tr>
        </tbody>
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more">
            No More data to Load
          </div>
          <div slot="no-results">
            No Transactions Found
          </div>
        </infinite-loading>
      </table>
    </div>
  </div>
</template>

<script>
import ProfileInfo from '@/components/ProfileInfo'
import InfiniteLoading from 'vue-infinite-loading'
import { getLocalData, http } from '@/utils'

export default {
  name: 'Home',
  components: {
    InfiniteLoading,
    ProfileInfo
  },
  data() {
    return {
      skip: 0,
      limit: 10,
      transactions: [],
      loaded: false,
      walletId: ''
    }
  },
  mounted() {
    this.walletId = getLocalData('walletId')
  },
  methods: {
    clearFields() {
      this.amount = null,
      this.description = ''
    },
    infiniteHandler($state) {
      http.get(`/transactions/${this.walletId}`, {
        params: {
          skip: this.skip,
          limit: this.limit
        }
      }).then(({data}) => {
        this.skip = this.skip + this.limit
        if (!data.length) {
          $state.complete()
        } else {
          if (this.skip <= 0) this.transactions = []
          this.transactions.push(...data)
          $state.loaded()
        }
      })
      .catch(err => {
        this.EventHub.$emit('showPrompt', {
          msg: err.response.data,
          type: 'error'
        })
      })
      .finally(() => this.isLoading = false)
    },
    downloadCSV() {
      http.get(`/transactions/download/${this.walletId}`).catch(err => {
        this.EventHub.$emit('showPrompt', {
          msg: err.response.data,
          type: 'error'
        })
      })
    },
    sendToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>