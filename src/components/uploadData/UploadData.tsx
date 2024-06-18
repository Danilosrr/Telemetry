import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./UploadData.css";
import CsvData from "./CsvData";

enum Status {
  ERROR = 0,
  SUCCESS = 1,
  PENDING = 2,
}

function UploadData() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>(2);
  const [csvLoaded, setCsvLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function fileBrowserHandler() {
    inputRef.current?.click();
  }

  function fileChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setStatus(1);
      setFile(selectedFile);
    } else {
      setStatus(0);
    }
  }

  function uploadFile() {
    console.log("uploaded data:", file);
    if (file && file.type === "text/csv") {
      console.log("csv loaded");
      setCsvLoaded(true);
    }
  }

  if (csvLoaded && file) {
    return <CsvData file={file}/>;
  } else {
    return (
      <div className="uploadData">
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
            <Icon icon="mdi:file-document-plus-outline" width={48} />
            <p>Choose a <b>.csv</b> file here</p>
          </div>
        )}
        <input type="file" accept="text/csv" ref={inputRef} onChange={fileChangeHandler} hidden />
        <div className="buttonContainer">
          {status === 1 && (
            <button onClick={uploadFile}>
              <b>Upload</b>
            </button>
          )}
          <button onClick={fileBrowserHandler}>
            <b>Browser file</b>
          </button>
        </div>
      </div>
    );
  }
}

export default UploadData;
