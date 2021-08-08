
export const getLocalData = (key) => {
  const localWalletId = localStorage.getItem(key)
  if (!localWalletId) return false
  else return JSON.parse(localWalletId)
}

export const storeDataInLocal = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalKey = (key) => {
  return localStorage.removeItem(key)
}