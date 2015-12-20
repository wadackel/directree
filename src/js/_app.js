import store from "store";
import ace from "brace";
import indent2obj from "indent2obj";

import "brace/mode/text";
import "brace/theme/monokai";

import DroppableField from "./DroppableField";
import Node from "./Node";


const STORE_INPUT_KEY = "input";


var defaultValue = store.get(STORE_INPUT_KEY) || [
  ".",
  "  depth1",
  "    depth2",
  "      depth3",
  "  depth1",
  "    depth2"
].join("\n");


function getEditor(name){
  let editor = ace.edit(name);
  let session = editor.getSession();
  editor.setTheme("ace/theme/monokai");
  editor.resize();
  editor.renderer.setPadding(10);
  session.setMode("ace/mode/text");
  session.setTabSize(2);
  return editor;
}


function setEditorValue(editor, value){
  editor.setValue(value);
  editor.clearSelection();
}


function objToNode(obj){
  let node = new Node(obj.name);

  for( let i = 0; i < obj.children.length; i++ ){
    let childNode = objToNode(obj.children[i]);
    node.addChild(childNode);
  }

  return node;
}


function indentToRuleString(input){
  let obj = indent2obj(input);
  let str = "";

  for( let key in obj ){
    let rootNode = objToNode(obj[key]);
    str += rootNode.toRuleString();
  }

  return str;
}


var inputEditor = getEditor("input-editor");
var outputEditor = getEditor("output-editor");
var droppableField = new DroppableField(document.body);


inputEditor.on("change", (e) => {
  let value = inputEditor.getValue();
  store.set(STORE_INPUT_KEY, value);

  let output = indentToRuleString(value);
  setEditorValue(outputEditor, output);
});


outputEditor.setReadOnly(true);
setEditorValue(inputEditor, defaultValue);


droppableField.on("dropped", (nodes) => {
  inputEditor.setValue(nodes.toIndentString());
  inputEditor.clearSelection();
});
