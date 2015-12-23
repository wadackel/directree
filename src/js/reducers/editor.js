import * as types from "../constants/action-types"

const initialState = {
  input: "",
  output: "",
  tabSize: 2
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.EDITOR_FETCH_INPUT:
      return Object.assign({}, state, {
        input: action.input
      });

    case types.EDITOR_CHANGE_INPUT:
      return Object.assign({}, state, {
        input: action.input
      });

    default:
      return state;
  }
}
