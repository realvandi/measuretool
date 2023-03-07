import { useState } from "react";
import protractor from './protractor.png'
import DragDrop from "./DragDrop";

const Protractor = () => {

  const [selectedImage, setSelectedImage] = useState<File|null>(null);
  return (
    <div>
      {/* {selectedImage && (
        <div>
          <img
            alt="not found"
            width="1000px"
            src={URL.createObjectURL(selectedImage)}
          />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (event.target.files != null) {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }
        }}
      /> */}

      <DragDrop/>

    </div>
  );
}

export default Protractor; 