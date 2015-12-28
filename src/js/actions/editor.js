import localStorage from "store"
import * as types from "../constants/action-types"

export function fetchDefault() {
  const input = localStorage.get("input") || "";
  const tabSize = localStorage.get("tabSize");
  const outputStyle = localStorage.get("outputStyle");
  const ignorePattern = localStorage.get("ignorePattern");

  return {
    type: types.EDITOR_FETCH_DEFAULT,
    input,
    tabSize,
    outputStyle,
    ignorePattern
  };
}

export function changeInput(input) {
  localStorage.set("input", input);

  return {
    type: types.EDITOR_CHANGE_INPUT,
    input
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

export function changeIgnorePattern(ignorePattern) {
  localStorage.set("ignorePattern", ignorePattern);

  return {
    type: types.EDITOR_CHANGE_IGNORE_PATTERN,
    ignorePattern
  };
}
