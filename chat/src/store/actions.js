import * as types from './mutation-types'

export const saveUserInfo = function ({commit}, user) {
  commit(types.SET_ID, user.id)
  commit(types.SET_NAME, user.name)
}
