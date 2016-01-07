import EventEmitter from "events"
import minimatch from "minimatch"
import Node from "./node"

const ignoreOptions = {
  dot: true
};

export default class Dropfile extends EventEmitter {
  static Event = {
    DROP_START: "DROP_START",
    DROP_ENTER: "DROP_ENTER",
    DROP_LEAVE: "DROP_LEAVE",
    DROP_END: "DROP_END",
    DROP_ERROR: "DROP_ERROR"
  };

  constructor(el, ignorePattern, limit) {
    super();
    this.el = el;
    this.isDragOver = false;
    this.ignorePattern = ignorePattern;
    this.limit = limit;
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
      this.emit(Dropfile.Event.DROP_LEAVE);
    }
  }

  handleDragOver(e) {
    this.cancelEvent(e);
    this.isDragOver = false;
    this.emit(Dropfile.Event.DROP_ENTER);
  }

  handleDrop(e) {
    this.cancelEvent(e);
    this.emit(Dropfile.Event.DROP_LEAVE);
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

  pathMatch(path) {
    const patterns = this.ignorePattern.split(",");
    for (let i = 0; i < patterns.length; i++) {
      if (minimatch(path, patterns[i], ignoreOptions)) return true;
    }
    return false;
  }

  entryPathMatch(entry) {
    return this.pathMatch(entry.fullPath);
  }

  entryToNode(entry) {
    const node = new Node(entry.name);
    const depth = entry.fullPath.slice(1).split("/").length;

    return new Promise((resolve, reject) => {
      if (entry.isFile) {
        return resolve(this.entryPathMatch(entry) ? null : node);
      }

      if (!entry.isDirectory) return reject();
      if (this.limit > 0 && this.limit < depth) return resolve(node);

      entry.createReader().readEntries(results => {
        if (results.length === 0) return resolve(node);
        let i = 0;
        results.forEach(result => {
          this.entryToNode(result).then(nodes => {
            i++;
            if (nodes != null && !this.entryPathMatch(result)) {
              node.addChild(nodes);
            }
            if (i === results.length) resolve(node);
          }, reject);
        });
      });
    });
  }
}
