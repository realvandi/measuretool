import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Protractor from "./Protractor";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: React.SetStateAction<File | null>) => {
    setFile(file);
  };

  const fileUploaderStack = (
    <div
      style={{  }}
    >
      Drop your files here
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

      {file && (
        <div>
          <img
            alt="not found"
            width="100px"
            src={URL.createObjectURL(file)}
          />
        </div>
      )}
    </>
  );
}

export default DragDrop;