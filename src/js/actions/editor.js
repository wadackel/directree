import localStorage from "store"
import * as types from "../constants/action-types"
import Node from "../utils/node"

export function fetchInput() {
  const input = localStorage.get("input");
  const output = Node.indentToRuleString(input);

  return {
    type: types.EDITOR_FETCH_INPUT,
    input,
    output
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
