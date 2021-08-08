
export const getLocalWallet = () => {
  const localWalletId = localStorage.getItem('walletId')
  if (!localWalletId) return false
  else return localWalletId
}

export const storeWalletIdToLocal = (walletId) => {
  return localStorage.setItem('walletId', walletId)
}