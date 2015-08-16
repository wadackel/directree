export default class Node {

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

  toIndentString(indent="") {
    let {name, children} = this;
    let str = `${indent}${this.name}\n`;
    let child_indent = indent;

    for( let i = 0; i < children.length; i++ ){
      let ruleLine = child_indent + "  ";
      str += children[i].toIndentString(ruleLine);
    }

    return str;
  }

  toRuleString(indent="") {
    let {name, children} = this;
    let str = `${indent}${this.name}\n`;
    let child_indent = indent.replace(/├─/, "│  ").replace(/└─/, "  ");

    for( let i = 0; i < children.length; i++ ){
      let ruleLine = child_indent + ( i >= children.length - 1 ? "└─" : "├─" );
      str += children[i].toRuleString(ruleLine);
    }

    return str;
  }
}
