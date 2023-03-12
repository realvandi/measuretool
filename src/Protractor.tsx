import { useRef, useState } from "react";
import protractor from './protractor.png'
import DragDrop from "./DragDrop";

const reactDrawLine = require('react-drawline');
const { StraightLine } = reactDrawLine;

const Protractor = () => {

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
      <div ref={box1Ref}>
      </div>
      <div ref={box2Ref}>
      </div>

      <StraightLine
        startingElement={{
          ref: box1Ref,
          x: "right",
          y: "mid",
        }}
        endingElement={{
          ref: box2Ref,
          x: "center",
          y: "top",
        }}
        style={{ backgroundColor: "red" }}
        className="beautiful-class-name"
      />

      <DragDrop />

    </div>
  );
}

export default Protractor; 