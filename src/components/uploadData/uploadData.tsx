import { DragEvent, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./uploadData.css";

enum Status {
  ERROR = 0,
  SUCCESS = 1,
  PENDING = 2,
}

function UploadData() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>(2);
  const inputRef = useRef<HTMLInputElement>(null) 

  function dragHandler(event: DragEvent<HTMLDivElement>) {
    console.log("drop",status);
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];

      if (file.type === "text/csv") {
        setStatus(1);
        setFile(file);
      } else {
        setStatus(0);
      }
    }
  }

  function dragOverHandler(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function fileBrowserHandler() {
    inputRef.current?.click();
  };

  function fileChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if(selectedFile && selectedFile.type === "text/csv") {
      setStatus(1);
      setFile(selectedFile)
    } else {
      setStatus(0);
    }
  };

  function uploadFile() {
    console.log('uploaded data');
  }

  return (
    <div className="uploadData" onDrop={dragHandler} onDragOver={dragOverHandler}>
      <div className="dropContainer">
        {status === 1 && (
          <div className="success">
            <Icon icon="mdi:file-document-check-outline" width={48} />
            <b>{file?.name}</b>
          </div>
        )}
        {status === 0 && (
          <div className="warning">
            <Icon icon="mdi:file-document-remove-outline" width={48} />{" "}
            <b>Only CSV files allowed</b>
          </div>
        )}
        {status === 2 && (
          <div className="pending">
            <Icon icon="mdi:file-document-plus-outline" width={48}  />
            <b>drag and drop or browser a <b>.csv</b> file here</b>
          </div>
        )}
      </div>
      <input type="file" ref={inputRef} onChange={fileChangeHandler} hidden />

      <div className="buttonContainer">
        {status === 1 && <button onClick={uploadFile}><b>Upload</b></button>}
        <button onClick={fileBrowserHandler}><b>Browser file</b></button>
      </div>
    </div>
  );
}

export default UploadData;
