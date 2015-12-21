import React, {Component, PropTypes} from "react"
import brace from "brace"
import "brace/mode/text"
import "brace/theme/monokai"

export default class Editor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func
  }

  static defaultProps = {
    name: "ace-editor",
    className: "ace-editor",
    value: "",
    readOnly: true
  }

  componentDidMount() {
    const {
      name,
      value,
      readOnly,
      onChange
    } = this.props;

    const editor = brace.edit(name);
    const session = editor.getSession();

    editor.setTheme("ace/theme/monokai");
    editor.renderer.setPadding(10);
    editor.setOption("readOnly", readOnly);
    session.setMode("ace/mode/text");
    session.setTabSize(2);

    editor.on("change", ::this.handleChange);

    this.editor = editor;
  }

  componentWillReceiveProps(nextProps) {
    const oldProps = this.props;
    
    if (nextProps.readOnly !== oldProps.readOnly) {
      this.editor.setOption("readOnly", nextProps.readOnly);
    }

    if (this.editor.getValue() !== oldProps.value) {
      this.silent = true;
      this.editor.setValue(nextProps.value);
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

  render() {
    return (
      <div
        id={this.props.name}
        className={this.props.className}>
      </div>
    );
  }
}
