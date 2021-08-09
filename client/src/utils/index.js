import { getLocalData, storeDataInLocal, removeLocalKey } from './localStorage'
import http from './http'

const convertDate = (val) => {
  return val ? new Date(val).toString() : '-'
}

export {
  getLocalData,
  storeDataInLocal,
  removeLocalKey,
  convertDate,
  http
}