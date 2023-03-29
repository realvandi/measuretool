import { useEffect, useRef, useState } from "react";
import DragDrop from "./DragDrop";
import Xarrow, { Xwrapper } from "react-xarrows";
import DraggableBox from "./Draggablebox";
import { PointDictionary, position } from "./GeneralTypes";

const Protractor = () => {

  const [mouseCoords, setMouseCoords] = useState<position>({ x: 0, y: 0 });
  const [pointDictionary, setPointDictionary] = useState<PointDictionary>({});

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
      {
        <ul>
          {Object.entries(pointDictionary).map(([id, position]) => (
            <li key={id}>
              {id} = {position.x}, {position.y}
            </li>
          ))}
        </ul>
      }

      <DragDrop />

      <Xwrapper>
        <DraggableBox id={'1'} pointDictionary={pointDictionary} setPointDictionary={setPointDictionary} />
        <DraggableBox id={'2'} pointDictionary={pointDictionary} setPointDictionary={setPointDictionary} />
        <DraggableBox id={'3'} pointDictionary={pointDictionary} setPointDictionary={setPointDictionary} />
        <Xarrow start={'1'} end={'2'} path="straight" showHead={false} startAnchor={'middle'} endAnchor={'middle'} animateDrawing={true} />
        <Xarrow start={'3'} end={'2'} path="straight" showHead={false} startAnchor={'middle'} endAnchor={'middle'} animateDrawing={true} />
      </Xwrapper>
    </div>
  );
}

export default Protractor; 