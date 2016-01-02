import React, {Component, PropTypes} from "react"
import brace from "brace"
import "brace/mode/text"
import "brace/theme/tomorrow_night"

const CURSOR_POS = 1;

export default class Editor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    tabSize: PropTypes.number,
    readOnly: PropTypes.bool,
    scrollTop: PropTypes.number,
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
      scrollTop,
      onChange,
      onScroll
    } = this.props;

    const editor = brace.edit(name);
    const session = editor.getSession();

    editor.setTheme("ace/theme/tomorrow_night");
    editor.renderer.setPadding(10);
    editor.setValue(value, CURSOR_POS);
    editor.setOption("readOnly", readOnly);
    editor.setOption("tabSize", tabSize);
    editor.setOption("showPrintMargin", false);
    session.setMode("ace/mode/text");

    if (scrollTop != null) {
      session.setScrollTop(scrollTop);
    }

    editor.on("change", ::this.handleChange);
    session.on("changeScrollTop", ::this.handleScroll);

    this.editor = editor;
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

    if (nextProps.scrollTop !== oldProps.scrollTop) {
      session.setScrollTop(nextProps.scrollTop);
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

  handleScroll(top) {
    if (this.props.onScroll) {
      this.props.onScroll(top);
    }
  }

  render() {
    return (
      <div
        id={this.props.name}
        className={this.props.className}>
      </div>
    );
  }
}
