import * as types from "../constants/action-types"
import * as outputStyles from "../constants/output-styles"
import * as tabSizes from "../constants/tab-sizes"

const initialState = {
  input: "",
  output: "",
  tabSize: tabSizes.SPACE2,
  outputStyle: outputStyles.TYPE_TEXT
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.EDITOR_FETCH_DEFAULT:
      return Object.assign({}, state, {
        input: action.input,
        output: action.output,
        tabSize: action.tabSize,
        outputStyle: action.outputStyle
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
