import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Protractor from "./protractor.png";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: React.SetStateAction<File | null>) => {
    setFile(file);
  };

  const fileUploaderStack = (
    <div
      style={{ borderRadius: "30px", borderStyle: "solid" }}
    >
      <img src={Protractor} width={"200px"} />
      {file ?
        (
          <div>
            <img
              alt="not found"
              width="200px"
              src={URL.createObjectURL(file)}
            />
          </div>
        )
        :
        (
          <div>
            Drop your files here
          </div>
        )
      }
    </div>
  );

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        onDraggingStateChange={(dragging: any) => console.log("dragging=" + dragging)}
        children={fileUploaderStack}
      />
      {
        file && (
          <button onClick={(event) => { setFile(null) }}>
            Remove files
          </button>
        )
      }
    </>
  );
}

export default DragDrop;