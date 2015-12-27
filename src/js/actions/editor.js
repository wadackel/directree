import localStorage from "store"
import * as types from "../constants/action-types"
import blobTypes from "../constants/blob-types"
import Node from "../utils/node"

export function fetchDefault() {
  const input = localStorage.get("input") || "";
  const output = Node.indentToRuleString(input);
  const tabSize = localStorage.get("tabSize");
  const outputStyle = localStorage.get("outputStyle");

  return {
    type: types.EDITOR_FETCH_DEFAULT,
    input,
    output,
    tabSize,
    outputStyle
  };
}

export function changeInput(input) {
  const output = Node.indentToRuleString(input);
  localStorage.set("input", input);

  return {
    type: types.EDITOR_CHANGE_INPUT,
    input,
    output
  };
}

export function changeOutputStyle(outputStyle) {
  localStorage.set("outputStyle", outputStyle);

  return {
    type: types.EDITOR_CHANGE_OUTPUT_STYLE,
    outputStyle
  };
}

export function changeTabSize(tabSize) {
  localStorage.set("tabSize", tabSize);

  return {
    type: types.EDITOR_CHANGE_TAB_SIZE,
    tabSize
  };
}
