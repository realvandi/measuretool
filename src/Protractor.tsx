import { useEffect, useRef, useState } from "react";
import DragDrop from "./DragDrop";
import ProtractorPointClass from "./ProtractorPointClass";
import position from "./GeneralTypes";
import Xarrow, { Xwrapper } from "react-xarrows";
import DraggableBox from "./Draggablebox";

const Protractor = () => {

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

      <DragDrop />

      <ProtractorPointClass position={mouseCoords}/>
      <ProtractorPointClass position={mouseCoords}/>

      <Xwrapper>
            <DraggableBox id={'comp1'}/>
            <DraggableBox id={'comp2'}/>
            <DraggableBox id={'comp3'}/>
            <Xarrow start={'comp1'} end={'comp2'} path="straight" showHead={false}/>
            <Xarrow start={'comp2'} end={'comp3'} path="straight" showHead={false}/>
        </Xwrapper>

    </div>
  );
}

export default Protractor; 