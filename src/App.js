import logo from './logo.svg';
import './App.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useCallback, useEffect } from 'react';
import EditorTiny from './EditorTinyMCE';

const clientID = '868e09ba7bf4412';
const clientSecret = 'f1626d7502a7c0a48f55f2fa55aba11a7a13b4e7';

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleChange = useCallback((e) => setEditorState(e));
  useEffect(() => {
    // console.log(stateToHTML(editorState.getCurrentContent()));
    setHtml(() => stateToHTML(editorState.getCurrentContent()));
  }, [editorState])
  const [html, setHtml] = useState('');

  function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 868e09ba7bf4412');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response)
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error)
          reject(error);
        });
      }
    );
  }

  return (
    
    
    <div className="App" style={appStyles}>
      <h1>Tiny Editor</h1>
      <EditorTiny />
      {/* <div className='editor' style={editorStyles}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(e) => { setEditorState(e)}}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />;`
      </div>
      <div className='papan'>
        {html}
      </div> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     
    </div>
  );
}

export default App;

const appStyles ={
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
  
}
const editorStyles = {
  width: 1200,
  height: 600,
  overflow: 'scroll'
}