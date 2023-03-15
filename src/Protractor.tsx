import { useEffect, useRef, useState } from "react";
import protractor from './protractor.png'
import DragDrop from "./DragDrop";
import ProtractorPoint from "./ProtractorPoint";
import ProtractorPointClass from "./ProtractorPointClass";
import position from "./GeneralTypes";

const reactDrawLine = require('react-drawline');
const { StraightLine } = reactDrawLine;

const Protractor = () => {

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  const [mouseCoords, setMouseCoords] = useState<position>({x: 0, y: 0});

  useEffect(() => {
    const handleWindowMouseMove = (event: { clientX: any; clientY: any; }) => {
      setMouseCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);


  return (
    <div>

       <div>
        Coord: {mouseCoords.x}, {mouseCoords.y}
       </div>

      {/* <StraightLine
        startingElement={{
          ref: box3Ref,
          x: "center",
          y: "mid",
        }}
        endingElement={{
          ref: box4Ref,
          x: "center",
          y: "mid",
        }}
        style={{ backgroundColor: "red" }}
        className="beautiful-class-name"
      /> */}

      <DragDrop />

      <ProtractorPointClass position={mouseCoords}/>
      <ProtractorPointClass position={mouseCoords}/>

    </div>
  );
}

export default Protractor; 