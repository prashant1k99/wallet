import { getLocalData } from '@/utils'

export default {
  data() {
    return {
      name: '',
      balance: 0
    }
  },
  mounted() {
    const userData = getLocalData('walletUser')
    const balance = getLocalData('balance')
    this.name = userData && userData.name,
    this.balance = balance && balance
  }
}