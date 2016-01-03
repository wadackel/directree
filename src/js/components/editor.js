import React, {Component, PropTypes} from "react"
import brace from "brace"
import "brace/mode/text"
import "brace/theme/tomorrow_night"
import objectEquals from "../utils/object-equals"

const CURSOR_POS = 1;

export default class Editor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    tabSize: PropTypes.number,
    readOnly: PropTypes.bool,
    scroll: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number
    }),
    scrollPer: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number
    }),
    onChange: PropTypes.func,
    onScroll: PropTypes.func
  }

  static defaultProps = {
    name: "ace-editor",
    className: "ace-editor",
    value: "",
    tabSize: 2,
    readOnly: true
  }

  componentDidMount() {
    const {
      name,
      value,
      tabSize,
      readOnly,
      scroll,
      scrollPer,
      onChange,
      onScroll
    } = this.props;

    const editor = brace.edit(name);
    const session = editor.getSession();
    this.editor = editor;

    editor.setTheme("ace/theme/tomorrow_night");
    editor.renderer.setPadding(10);
    editor.setValue(value, CURSOR_POS);
    editor.setOption("readOnly", readOnly);
    editor.setOption("tabSize", tabSize);
    editor.setOption("showPrintMargin", false);
    session.setMode("ace/mode/text");

    if (scroll != null) {
      this.setScroll(scroll);
    }

    if (scrollPer != null) {
      this.setScrollPer(scrollPer);
    }

    editor.on("change", ::this.handleChange);
    session.on("changeScrollTop", ::this.handleScrollTop);
    session.on("changeScrollLeft", ::this.handleScrollLeft);
  }

  componentWillReceiveProps(nextProps) {
    const editor = this.editor;
    const session = editor.getSession();
    const oldProps = this.props;

    if (nextProps.tabSize !== oldProps.tabSize) {
      editor.setOption("tabSize", nextProps.tabSize);
    }

    if (nextProps.readOnly !== oldProps.readOnly) {
      editor.setOption("readOnly", nextProps.readOnly);
    }

    if (!objectEquals(nextProps.scroll, oldProps.scroll)) {
      this.setScroll(nextProps.scroll);
    }

    if (!objectEquals(nextProps.scrollPer, oldProps.scrollPer)) {
      this.setScrollPer(nextProps.scrollPer);
    }

    if (this.editor.getValue() !== nextProps.value) {
      const scrollTop = session.getScrollTop();
      this.silent = true;
      editor.setValue(nextProps.value, CURSOR_POS);
      session.setScrollTop(scrollTop);
      this.silent = false;
    }
  }

  componentWillUnmount() {
    this.editor = null;
  }

  handleChange() {
    if (this.props.onChange && !this.silent) {
      this.props.onChange(this.editor.getValue());
    }
  }

  handleScrollTop(top) {
    this.requestScroll("top", top, this.editor.getSession().getScrollLeft());
  }

  handleScrollLeft(left) {
    this.requestScroll("top", this.editor.getSession().getScrollTop(), left);
  }

  requestScroll(direction, top, left) {
    if (!this.props.onScroll) return;
    const size = this.getSize();
    const editorSize = this.getEditorSize();

    this.props.onScroll(direction, {top, left}, {
      top: Math.max(0, Math.min(100, top / (editorSize.height - size.height) * 100)),
      left: Math.max(0, Math.min(100, left / (editorSize.width - size.width) * 100))
    });
  }

  setScroll(scroll) {
    const session = this.editor.getSession();
    const newScroll = Object.assign({}, {
      top: session.getScrollTop(),
      left: session.getScrollLeft()
    }, scroll);

    session.setScrollTop(newScroll.top);
    session.setScrollLeft(newScroll.left);
  }

  setScrollPer(scrollPer) {
    const per = Object.assign({}, {top: 0, left: 0}, scrollPer);
    const size = this.getSize();
    const editorSize = this.getEditorSize();

    this.setScroll({
      top: (editorSize.height - size.height) * (scrollPer.top / 100),
      left: (editorSize.width - size.width) * (scrollPer.left / 100)
    });
  }

  getSize() {
    const {editorElement} = this.refs;
    return {
      width: editorElement.clientWidth,
      height: editorElement.clientHeight
    };
  }

  getEditorSize() {
    return {
      width: this.getEditorWidth(),
      height: this.getEditorHeight()
    };
  }

  getEditorWidth() {
    const {editor} = this;
    return editor.renderer.content.clientWidth;
  }

  getEditorHeight() {
    const {editor} = this;
    return editor.getSession().getScreenLength() * editor.renderer.lineHeight + editor.renderer.scrollBarH.height;
  }

  render() {
    return (
      <div
        id={this.props.name}
        ref="editorElement"
        className={this.props.className}>
      </div>
    );
  }
}
