import localStorage from "store"
import * as types from "../constants/action-types"
import Node from "../utils/node"

export function fetchDefault() {
  const input = localStorage.get("input");
  const output = Node.indentToRuleString(input);
  const outputStyle = localStorage.get("outputStyle");

  return {
    type: types.EDITOR_FETCH_DEFAULT,
    input,
    output,
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
