import indent2obj from "indent2obj"

export default class Node {
  static objToNode(obj) {
    const node = new Node(obj.name);

    obj.children.forEach((child) => {
      const childNode = Node.objToNode(child);
      node.addChild(childNode);
    });

    return node;
  }

  static indentToRuleString(input) {
    const obj = indent2obj(input);
    let str = "";

    Object.keys(obj).forEach((key) => {
      const rootNode = Node.objToNode(obj[key]);
      str += rootNode.toRuleString();
    });

    return str;
  }

  constructor(name, children = []) {
    this.name = name;
    this.children = children;
  }

  addChild(child) {
    this.children.push(child);
  }

  toIndentString(indent = "") {
    const {name, children} = this;
    let str = `${indent}${name}\n`;

    children.forEach((child) => {
      const ruleLine = `${indent}  `;
      str += child.toIndentString(ruleLine);
    });

    return str;
  }

  toRuleString(indent = "") {
    const {name, children} = this;
    const childIndent = indent.replace(/├─/, "│  ").replace(/└─/, "  ");
    let str = `${indent}${name}\n`;

    children.forEach((child, i) => {
      const ruleLine = childIndent + (i >= children.length -1 ? "└─" : "├─");
      str += child.toRuleString(ruleLine);
    });

    return str;
  }
}
