import './FileUpload.css';
import FileInput from "./FileInput.jsx";
import {useRef, useState} from 'react';

function FileUpload(){
    const fDOref = useRef(null);
    const [isDraggin, upDraggin] = useState(false);
    const [filesUploaded, upFilesUploaded] = useState(false);
    const openFileDialog = () => {fDOref.current?.FileDialog();}
    const [GotFiles, upGotFiles] = useState([]);

    return(
        <>
            <div id={"FilesDropCon"} onDragEnter={(e) => fDOref.current?.HandleDragEnter(e)} onDrop={(e) => fDOref.current?.HandleDrop(e)} onDragOver={(e) => fDOref.current?.HandleDragOver(e)} onDragLeave={(e) => fDOref.current?.HandleDragLeave(e)} style={{backgroundColor : isDraggin ? "red" : ""}}>
                <button id={"FDCB1"} style={{width : filesUploaded ? "40%" : "80%", left : filesUploaded ? "30%" : "50%"}} onClick={openFileDialog}>{filesUploaded ? "Continue to process ? " : "Click to Upload Files or Drag  Files for Preprocessing."}</button>
                <div id={"ListFilesUp"}></div>
                <FileInput isDragging={isDraggin} upDragging={upDraggin} upFilesUploaded={upFilesUploaded} filesGotUp={upGotFiles} ref={fDOref}></FileInput>
                <div className={"FileList"} style={{opacity : filesUploaded ? 1 : 0}}>Files being Processed :
                    <ul>
                        {GotFiles.length > 0 && GotFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
       </>

    )
}

export default FileUpload;