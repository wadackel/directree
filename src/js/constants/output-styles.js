export const TYPE_TEXT = "text";
export const TYPE_JSON = "json";

export const options = [
  {value: TYPE_TEXT, label: "デフォルト"},
  {value: TYPE_JSON, label: "JSON"}
];

export const extensions = {
  [TYPE_TEXT]: "txt",
  [TYPE_JSON]: "json"
};
