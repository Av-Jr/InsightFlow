import { useState } from 'react'
import './App.css'
import FileUpload from './UploadFiles/FileUpload.jsx';
import DisplayCards from './DataCards/DisplayCards.jsx'

function App() {

  return (
    <>
        <div id={"MainCon"}>
            <FileUpload></FileUpload>
            <DisplayCards></DisplayCards>
        </div>

    </>
  )
}

export default App