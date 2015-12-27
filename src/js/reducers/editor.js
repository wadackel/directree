import * as types from "../constants/action-types"
import * as outputStyles from "../constants/output-styles"
import * as tabSizes from "../constants/tab-sizes"

const URL = window.URL || window.webkitURL;
const initialState = {
  input: `.
  depth1
    depth2
      depth3
  depth1
    depth2`,
  output: "",
  tabSize: tabSizes.SPACE2,
  outputStyle: outputStyles.TYPE_TEXT,
  outputBlob: null
};


function createObjectURL(value, type = "text/plain") {
  const blob = new Blob([value], {type});
  return URL.createObjectURL(blob);
}


export default function editor(state = initialState, action) {
  let tmpState = {};

  switch (action.type) {
    case types.EDITOR_FETCH_DEFAULT:
      if (action.input) tmpState.input = action.input;
      if (action.output) tmpState.output = action.output;
      if (action.tabSize) tmpState.tabSize = action.tabSize;
      if (action.outputStyle) tmpState.outputStyle = action.outputStyle;
      tmpState = Object.assign({}, state, tmpState);
      tmpState.outputBlob = createObjectURL(tmpState.output, tmpState.outputStyle);
      return tmpState;

    case types.EDITOR_CHANGE_INPUT:
      return Object.assign({}, state, {
        input: action.input,
        output: action.output,
        outputBlob: createObjectURL(tmpState.output, state.outputStyle)
      });

    case types.EDITOR_CHANGE_OUTPUT_STYLE:
      return Object.assign({}, state, {
        outputStyle: action.outputStyle,
        outputBlob: createObjectURL(state.output, action.outputStyle)
      });

    default:
      return state;
  }
}
