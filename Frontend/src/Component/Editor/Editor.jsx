import React, { useRef, useState } from 'react'
import './Editor.scss'
import EditorCode from '@monaco-editor/react'
import { executeCode } from './api'

const Editor = () => {
    const editorRef = useRef()
    const [value , setValue] = useState();
    const [lang, setLang] = useState("javascript")
    const [output, setOutput] = useState("Click On Run Code To Execute The Code")

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const showValue = async ()=> {
      // alert(editorRef.current.getValue());
      const sourceCode = editorRef.current.getValue()
      try {
        const code = await executeCode(lang, sourceCode);
        // console.log(code)
        setOutput(code.run.output)
      } catch (error) {
        console.log(error)
      }
    }
  return (
      <div>
      <div className="editor-container">
        <div id="editor">
        <EditorCode width={"100%"} height="100vh" language={lang} theme='vs-dark' value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
        />
        </div>
        <div id="output">
          <button onClick={showValue}>Run</button>
          <p>
            {output}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Editor
