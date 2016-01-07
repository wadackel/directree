import React, {Component} from "react"
import ReactDOM from "react-dom"
import Select from "react-select"
import Clipboard from "clipboard"
import Modal from "./modal"
import Footer from "./footer"
import Editor from "./editor"
import DropInfo from "./drop-info"
import Dropfile from "../utils/dropfile"
import sleep from "../utils/sleep"
import * as tabSizes from "../constants/tab-sizes"
import * as outputStyles from "../constants/output-styles"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollPer: {top: 0, left: 0},
      isSettingOpen: false,
      isAboutOpen: false,
      isDropEnter: false,
      isDropProgress: false
    };
  }

  componentDidMount() {
    this.props.fetchDefault();

    this.dropFile = new Dropfile(document.body);
    this.dropFile.on(Dropfile.Event.DROP_START, ::this.handleDropStart);
    this.dropFile.on(Dropfile.Event.DROP_ENTER, ::this.handleDropEnter);
    this.dropFile.on(Dropfile.Event.DROP_LEAVE, ::this.handleDropLeave);
    this.dropFile.on(Dropfile.Event.DROP_END, ::this.handleDropEnd);

    this.clipboard = new Clipboard(this.refs.btnCopy, {
      text: trigger => {
        return this.props.editor.output;
      }
    });
    this.clipboard.on("success", ::this.handleClipboardSuccess);
    this.clipboard.on("error", ::this.handleClipboardError);
  }

  componentWillReceiveProps(nextProps) {
    const {editor: {ignorePattern}} = nextProps;
    this.dropFile.ignorePattern = ignorePattern;
  }

  handleDropStart(entry) {
    this.setState({isDropProgress: true});
  }

  handleDropEnter() {
    this.setState({isDropEnter: true});
  }

  handleDropLeave() {
    this.setState({isDropEnter: false});
  }

  handleDropEnd(node) {
    this.props.changeInput(node.toIndentString());
    this.setState({isDropProgress: false});
  }

  handleScroll(direction, scroll, scrollPer) {
    this.setState({scrollPer});
  }

  handleClipboardSuccess() {
    this.flashBtnCopyText("Copied!!");
  }

  handleClipboardError() {
    this.flashBtnCopyText("Error");
  }

  flashBtnCopyText(msg, timeout = 1500) {
    const {btnCopyText} = this.refs;
    btnCopyText.innerHTML = msg;
    setTimeout(() => {
      btnCopyText.innerHTML = "Copy";
    }, timeout);
  }

  openSettingModal() {
    this.setState({isSettingOpen: true});
  }

  closeSettingModal() {
    this.setState({isSettingOpen: false});
  }

  openAboutModal() {
    this.setState({isAboutOpen: true});
  }

  closeAboutModal() {
    this.setState({isAboutOpen: false});
  }

  render() {
    const {
      changeInput,
      changeOutputStyle,
      changeTabSize,
      changeIgnorePattern,
      editor
    } = this.props;

    const {
      scrollPer,
      isSettingOpen,
      isAboutOpen,
      isDropEnter,
      isDropProgress
    } = this.state;

    const {
      input,
      output,
      outputBlob,
      tabSize,
      outputStyle,
      ignorePattern
    } = editor;

    const fileName = `directree.${outputStyles.extensions[outputStyle]}`;

    return (
      <div className="container">
        <div className="container__row">
          <div className="editor-header container__col">
            <h1 className="editor-header__title--brand"><a href="./">Directree</a></h1>
            <div className="editor-header__control">
              <button className="btn" onClick={::this.openAboutModal}><i className="fa fa-info-circle"></i> About</button>
              <button className="btn" onClick={::this.openSettingModal}><i className="fa fa-cog"></i> Setting</button>
            </div>
          </div>
          <div className="editor-header container__col">
            <h2 className="editor-header__title">Output</h2>
            <div className="editor-header__control">
              <button className="btn" ref="btnCopy"><i className="fa fa-clipboard"></i> <span ref="btnCopyText">Copy</span></button>
              <a
                className="btn"
                download={fileName}
                href={outputBlob}
                target="_blank">
                <i className="fa fa-download"></i> Download
              </a>
            </div>
          </div>
        </div>

        <div className="editors container__row">
          <Editor
            name="input-editor"
            className="editor--input container__col"
            value={input}
            tabSize={tabSize}
            readOnly={false}
            scrollPer={scrollPer}
            onChange={value => changeInput(value)}
            onScroll={::this.handleScroll} />
          <Editor
            name="output-editor"
            className="editor--output container__col"
            value={output}
            tabSize={tabSize}
            readOnly={true}
            scrollPer={scrollPer}
            onScroll={::this.handleScroll} />
        </div>

        <Modal title="About" icon="info-circle" isOpen={isAboutOpen} onRequestClose={::this.closeAboutModal}>
          <dl>
            <dt>Directreeについて</dt>
            <dd>
              インデントで階層を表現したテキストを、罫線で見やすく整形するWebツールです。<br />
              主にディレクトリの階層を表現するために使用します。<br />
              treeコマンドが使えない環境や、ちょっとブログに貼り付けたい時にお使いいただけると嬉しいです。
            </dd>
            <dt>便利な使い方</dt>
            <dd>
              画面内にフォルダをドラッグ&amp;ドロップすることで、簡単に階層を可視化することができます。<br />
              フォルダから除外したファイルパターンがある場合は、Settingからパスのパターンを指定ます。<br />
              この機能はGoogle Chromeでのみ動作します。
            </dd>
          </dl>
        </Modal>

        <Modal title="Setting" icon="cog" isOpen={isSettingOpen} onRequestClose={::this.closeSettingModal}>
          <dl>
            <dt>スペースの数</dt>
            <dd>
              <Select
                className=""
                clearable={false}
                searchable={false}
                value={tabSize}
                options={tabSizes.options}
                onChange={changeTabSize} />
            </dd>
            <dt>出力の種類</dt>
            <dd>
              <Select
                className=""
                clearable={false}
                searchable={false}
                value={outputStyle}
                options={outputStyles.options}
                onChange={changeOutputStyle} />
            </dd>
            <dt>除外ファイル</dt>
            <dd>
              <input
                type="text"
                value={ignorePattern}
                onChange={e => changeIgnorePattern(e.target.value.trim())}
                placeholder="**/*.DS_Store" />
              <p className="_help">フォルダをドロップした際に除外したいファイルのパターンを指定します。</p>
            </dd>
            <dt>階層制限</dt>
            <dd>
              <input
                type="text"
                placeholder="0" />
              <p className="_help">掘り下げる階層の深さを指定します。全てのディレクトリを出力する場合は0を指定します。</p>
            </dd>
          </dl>
        </Modal>

        <Footer />
        <DropInfo isEnter={isDropEnter} isProgress={isDropProgress} />
      </div>
    );
  }
}
