import React, {Component} from "react"
import ReactDOM from "react-dom"
import Header from "./header"
import Editor from "./editor"
import Dropfile from "../utils/dropfile"
import sleep from "../utils/sleep"

export default class App extends Component {
  componentDidMount() {
    this.props.fetchInput();
    
    this.dropFile = new Dropfile(document.body);
    this.dropFile.on(Dropfile.Event.DROP_START, ::this.handleDropStart);
    this.dropFile.on(Dropfile.Event.DROP_END, ::this.handleDropEnd);
  }

  handleDropStart(entry) {
    // @TODO implement of visual feedback
    console.log("START", entry.name);
  }

  handleDropEnd(node) {
    this.props.changeInput(node.toIndentString());
  }

  render() {
    const {changeInput, editor} = this.props;
    const {input, output, tabSize} = editor;

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
            value={input}
            tabSize={tabSize}
            readOnly={false}
            onChange={value => changeInput(value)}
          />
          <Editor
            name="output-editor"
            className="editor--output container__col"
            value={output}
            tabSize={tabSize}
            readOnly={true}
          />
        </div>
        <p className="copyright">Copyright Directree &copy; All Right Reserved.</p>
      </div>
    );
  }
}
