// import $ from "jquery";
import ace from "brace";
import indent2obj from "indent2obj";

import "brace/mode/text";
import "brace/theme/monokai";


class Node {

  constructor(name, children=[]) {
    this.name = name;
    this.children = children;
  }

  setChildren(children) {
    this.children = children;
  }

  addChild(child) {
    this.children.push(child);
  }

  toString(indent="") {
    let {name, children} = this;
    let str = `${indent}${this.name}\n`;
    let child_indent = indent.replace(/├─/, "│  ").replace(/└─/, "  ");

    for( let i = 0; i < children.length; i++ ){
      let ruleLine = child_indent + ( i >= children.length - 1 ? "└─" : "├─" );
      str += children[i].toString(ruleLine);
    }

    return str;
  }
}


var defaultValue = [
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

function nodeFormatter(obj){
  let node = new Node(obj.name);

  for( let i = 0; i < obj.children.length; i++ ){
    let childNode = nodeFormatter(obj.children[i]);
    node.addChild(childNode);
  }

  return node;
}

function indentToNode(input){
  let obj = indent2obj(input);
  let str = "";

  for( let key in obj ){
    let rootNode = nodeFormatter(obj[key]);
    str += rootNode.toString();
  }

  return str;
}


let inputEditor = getEditor("input-editor");
let outputEditor = getEditor("output-editor");

inputEditor.on("change", (e) => {
  let output = indentToNode(inputEditor.getValue());
  outputEditor.setValue(output);
  outputEditor.clearSelection();
});

inputEditor.setValue(defaultValue);
inputEditor.clearSelection();

outputEditor.setReadOnly(true);
