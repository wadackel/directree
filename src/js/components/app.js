import React, {Component} from "react"
import ReactDOM from "react-dom"
import Header from "./header"
import Editor from "./editor"

export default class App extends Component {
  render() {
    const {changeValue, editor} = this.props;
    const {value, tabSize} = editor;
    console.log(editor, value);

    return (
      <div className="container">
        <Header />
        <div className="editor-titles container__row">
          <h3 className="editor-title--input container__col">Input</h3>
          <h3 className="editor-title--output container__col">Output</h3>
        </div>
        <div className="editors container__row">
          <Editor
            name="input-editor"
            className="editor--input container__col"
            value={value}
            tabSize={tabSize}
            readOnly={false}
          />
          <Editor
            name="output-editor"
            className="editor--output container__col"
            tabSize={tabSize}
            readOnly={true}
          />
        </div>
        <p className="copyright">Copyright Directree &copy; All Right Reserved.</p>
      </div>
    );
  }
}
