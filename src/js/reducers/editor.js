import * as types from "../constants/action-types"

const initialState = {
  value: "test",
  tabSize: 2
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.EDITOR_CHANGE_VALUE:
      return Object.assign({}, state, {
        value: action.value
      });
    default:
      return state;
  }
}
