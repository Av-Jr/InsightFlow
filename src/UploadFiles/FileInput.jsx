 import React, {useRef, forwardRef, useImperativeHandle} from 'react';

const FileInput = forwardRef(({isDragging, upDragging, upFilesUploaded, filesGotUp}, ref) => {
    const refToInput = useRef(null);

    const HandleFiles = (event) => {
        event.preventDefault();
        let files = event.target.files || event.dataTransfer.files;
        if(files.length > 0){
            upFilesUploaded(true);
            filesGotUp(prev => [...prev, ...Array.from(files)])
        }
        else upFilesUploaded(false);
    }
    useImperativeHandle(ref, () => ({
        FileDialog : () => {refToInput.current.click();},

        HandleDragEnter : (event) => {
            event.preventDefault();
            upDragging(true);
        },

        HandleDragOver : (event) => {
            event.preventDefault();
        },

        HandleDrop : (e) =>{
            e.preventDefault();
            HandleFiles(e);
            upDragging(false);
        },

        HandleDragLeave : (event) => {
            event.preventDefault();
            upDragging(false);
        }

    }))




    return(
        <>
            <input type={"file"} multiple onChange={HandleFiles} ref={refToInput} style={{display : 'none'}}/>
        </>
    )
 })

 export default FileInput;