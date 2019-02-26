import * as types from './mutation-types'

const mutations = {
  [types.SET_ID] (state, id) {
    state.id = id
  },
  [types.SET_NAME] (state, name) {
    state.name = name
  }
}

export default mutations
