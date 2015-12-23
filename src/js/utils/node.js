export default class Node {
  constructor(name, children = []) {
    this.name = name;
    this.children = children;
  }

  addChild(child) {
    this.children.push(child);
  }

  totIndentString(indent = "") {
    const {name, children} = this;
    const childIndent = indent;
    let str = `${indent}${name}\n`;

    children.forEach((child) => {
      const ruleLine = `${childIndent}  `;
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
