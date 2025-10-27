 import React, {useRef, forwardRef, useImperativeHandle} from 'react';

const FileInput = forwardRef(({isDragging, upDragging, upFilesUploaded, filesGotUp, realFiles}, ref) => {
    const refToInput = useRef(null);

    const HandleFiles = async(event) => {
        event.preventDefault();
        let files = event.target.files || event.dataTransfer.files;
        if(files.length > 0){
            upFilesUploaded(true);
            const newFiles = Array.from(files);
            filesGotUp(prev => [...prev, ...Array.from(files)]);
            const formData = new FormData();
            newFiles.forEach(f => formData.append("files", f));

            try {
                const res = await fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: formData
                });

                const data = await res.json();
                console.log(data.message);
            }catch(err){console.error("upload failed", err);}
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