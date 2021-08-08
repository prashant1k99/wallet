import { getLocalData, storeDataInLocal, removeLocalKey } from './localStorage'
import http from './http'

const convertDate = (val) => {
  return new Date(val).toString()
}

export {
  getLocalData,
  storeDataInLocal,
  removeLocalKey,
  convertDate,
  http
}