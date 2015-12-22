import * as types from "../constants/action-types"

export function initializeValue() {
  return {
    type: types.EDITOR_INITIALIZE_VALUE
  }
}

export function changeValue(value) {
  return {
    type: types.EDITOR_CHANGE_VALUE,
    value
  }
}
