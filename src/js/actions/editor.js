import localStorage from "store"
import * as types from "../constants/action-types"

export function initializeValue() {
  return {
    type: types.EDITOR_INITIALIZE_VALUE,
    value: localStorage.get("value")
  };
}

export function changeValue(value) {
  localStorage.set("value", value);
  return {
    type: types.EDITOR_CHANGE_VALUE,
    value
  };
}
