import EventEmitter from "events"
import Node from "./node"

export default class Dropfile extends EventEmitter {
  static Event = {
    DROP_START: "DROP_START",
    DROP_END: "DROP_END",
    DROP_ERROR: "DROP_ERROR"
  }

  constructor(el) {
    super();
    this.el = el;
    this.isDragOver = false;
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener("dragenter", ::this.handleDragEnter, false);
    this.el.addEventListener("dragleave", ::this.handleDragLeave, false);
    this.el.addEventListener("dragover", ::this.handleDragOver, false);
    this.el.addEventListener("drop", ::this.handleDrop, false);
  }

  cancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragEnter(e) {
    this.cancelEvent(e);
    this.isDragOver = true;
  }

  handleDragLeave(e) {
    this.cancelEvent(e);
    if (this.isDragOver) {
      this.isDragOver = false;
    } else {
      this.el.classList.remove("is-enter");
    }
  }

  handleDragOver(e) {
    this.cancelEvent(e);
    this.isDragOver = false;
    this.el.classList.add("is-enter");
  }

  handleDrop(e) {
    this.cancelEvent(e);
    this.el.classList.remove("is-enter");
    const {items} = e.dataTransfer;

    if (!items) return alert("お使いのブラウザではディレクトリのドロップをサポートしていません。ブラウザをChromeに変えて再度お試し下さい。");
    if (items.length !== 1) return alert("単一のディレクトリをドロップして下さい。");

    const item = items[0];
    const entry = item.getAsEntry ? item.getAsEntry() : item.webkitGetAsEntry();

    this.emit(Dropfile.Event.DROP_START, entry);

    this.entryToNode(entry)
      .then(nodes => {
        this.emit(Dropfile.Event.DROP_END, nodes);
      }).catch(err => {
        this.emit(Dropfile.Event.DROP_ERROR, err);
      });
  }

  entryToNode(entry) {
    const node = new Node(entry.name);

    return new Promise((resolve, reject) => {
      if (entry.isFile) return resolve(node);
      if (!entry.isDirectory) return reject();
      entry.createReader().readEntries(results => {
        if (results.length === 0) return resolve(node);
        let i = 0;
        results.forEach(result => {
          this.entryToNode(result).then(nodes => {
            i++;
            node.addChild(nodes);
            if (i === results.length) resolve(node);
          }, reject);
        });
      });
    });
  }
}
