import indent2obj from "indent2obj"
import * as types from "../constants/action-types"
import * as outputStyles from "../constants/output-styles"
import * as tabSizes from "../constants/tab-sizes"
import Node from "../utils/Node"

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
  outputBlob: null,
  ignorePattern: "**/*.DS_Store"
};


function indent(tabSize) {
  return new Array(tabSize + 1).join(" ");
}


function createObjectURL(value, type = "text/plain") {
  const blob = new Blob([value], {type});
  return URL.createObjectURL(blob);
}


function createOutputValue(input, outputStyle = initialState.outputStyle, tabSize = initialState.tabSize) {
  switch (outputStyle) {
    case outputStyles.TYPE_TEXT:
      return Node.indentToRuleString(input, indent(tabSize));
    case outputStyles.TYPE_JSON:
      return JSON.stringify(indent2obj(input, indent(tabSize)), null, "  ");
    default:
      return input;
  }
}


export default function editor(state = initialState, action) {
  let tmpState = {};

  switch (action.type) {
    case types.EDITOR_FETCH_DEFAULT:
      if (action.input) tmpState.input = action.input;
      if (action.tabSize) tmpState.tabSize = action.tabSize;
      if (action.outputStyle) tmpState.outputStyle = action.outputStyle;
      if (action.ignorePattern) tmpState.ignorePattern = action.ignorePattern;
      tmpState = Object.assign({}, state, tmpState);
      tmpState.output = createOutputValue(tmpState.input, tmpState.outputStyle, tmpState.tabSize);
      tmpState.outputBlob = createObjectURL(tmpState.output, tmpState.outputStyle);
      return tmpState;

    case types.EDITOR_CHANGE_INPUT:
      tmpState.input = action.input;
      tmpState.output = createOutputValue(action.input, state.outputStyle, state.tabSize);
      tmpState.outputBlob = createObjectURL(tmpState.output, state.outputStyle);
      return Object.assign({}, state, tmpState);

    case types.EDITOR_CHANGE_OUTPUT_STYLE:
      tmpState.output = createOutputValue(state.input, action.outputStyle, state.tabSize);
      tmpState.outputStyle = action.outputStyle;
      tmpState.outputBlob = createObjectURL(tmpState.output, action.outputStyle);
      return Object.assign({}, state, tmpState);

    case types.EDITOR_CHANGE_TAB_SIZE:
      tmpState.tabSize = action.tabSize;
      tmpState.output = createOutputValue(state.input, state.outputStyle, action.tabSize);
      tmpState.outputBlob = createObjectURL(tmpState.output, state.outputStyle);
      return Object.assign({}, state, tmpState);

    case types.EDITOR_CHANGE_IGNORE_PATTERN:
      return Object.assign({}, state, {
        ignorePattern: action.ignorePattern
      });

    default:
      return state;
  }
}
