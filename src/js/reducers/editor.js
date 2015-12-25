import * as types from "../constants/action-types"
import * as outputStyles from "../constants/output-styles"

const initialState = {
  input: "",
  output: "",
  tabSize: 2,
  outputStyle: outputStyles.TYPE_TEXT
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.EDITOR_FETCH_INPUT:
      return Object.assign({}, state, {
        input: action.input,
        output: action.output
      });

    case types.EDITOR_CHANGE_INPUT:
      return Object.assign({}, state, {
        input: action.input,
        output: action.output
      });

    case types.EDITOR_CHANGE_OUTPUT_STYLE:
      return Object.assign({}, state, {
        outputStyle: action.outputStyle
      });

    default:
      return state;
  }
}
