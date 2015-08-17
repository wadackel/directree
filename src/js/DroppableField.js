import EventEmitter from "events";
import Node from "./Node";


export default class DroppableField extends EventEmitter {

  constructor(el) {
    super();
    this.el = el;
    this.innerFlag = false;
    this.setEvents();
  }


  setEvents() {
    this.el.addEventListener("dragenter", this.handleDragEnter.bind(this), false);
    this.el.addEventListener("dragleave", this.handleDragLeave.bind(this), false);
    this.el.addEventListener("dragover", this.handleDragOver.bind(this), false);
    this.el.addEventListener("drop", this.handleDrop.bind(this), false);
  }


  cancelEvents(e) {
    e.preventDefault();
    e.stopPropagation();
  }


  handleDragEnter(e) {
    this.cancelEvents(e);
    this.innerFlag = true;
  }


  handleDragLeave(e) {
    this.cancelEvents(e);

    if( this.innerFlag ){
      this.innerFlag = false;
    }else{
      this.el.className = "";
    }
  }


  handleDragOver(e) {
    this.cancelEvents(e);
    this.innerFlag = false;
    this.el.className = "is-enter";
  }


  handleDrop(e) {
    this.cancelEvents(e);
    this.el.className = "";

    let {items} = e.dataTransfer;

    if( !items ) return alert("お使いのブラウザではディレクトリのドロップをサポートしていません。ブラウザをChromeに変えて再度お試し下さい。");
    if( items.length !== 1 ) return alert("単一のディレクトリをドロップして下さい。");

    let item = items[0];
    let entry = item.getAsEntry ? item.getAsEntry() : item.webkitGetAsEntry();
    console.log(item, entry);
    this.entryToNode(entry).then((nodes) => {
      this.emit("dropped", nodes);
    });
  }


  entryToNode(entry) {
    let node = new Node(entry.name);

    return new Promise((resolve, reject) => {
      if( entry.isFile ){
        resolve(node);

      }else if( entry.isDirectory ){
        entry.createReader().readEntries((results) => {
          let i = 0;

          results.forEach((result) => {
            this.entryToNode(result).then((nodes) => {
              node.addChild(nodes);
              if( i === results.length - 1 ){
                resolve(node);
              }
              i++;
            });
          });
        }, reject);
      }
    });
  }
}