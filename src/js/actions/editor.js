import localStorage from "store"
import * as types from "../constants/action-types"

export function fetchInput() {
  return {
    type: types.EDITOR_FETCH_INPUT,
    input: localStorage.get("input")
  };
}

export function changeInput(input) {
  localStorage.set("input", input);
  return {
    type: types.EDITOR_CHANGE_INPUT,
    input
  };
}
