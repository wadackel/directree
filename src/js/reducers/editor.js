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
  const tmpState = {};

  switch (action.type) {
    case types.EDITOR_FETCH_DEFAULT:
      if (action.input) tmpState.input = action.input;
      if (action.output) tmpState.output = action.output;
      if (action.tabSize) tmpState.tabSize = action.tabSize;
      if (action.outputStyle) tmpState.outputStyle = action.outputStyle;
      return Object.assign({}, state, tmpState);

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
