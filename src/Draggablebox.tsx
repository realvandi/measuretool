import Draggable, { DraggableData, DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";
import generateRandomInteger from "./Tools";
import './styles.css';
import { PointDictionary, position } from "./GeneralTypes";
import { useCallback } from "react";

type DraggableBoxProps = {
    id: string
    pointDictionary: PointDictionary
    setPointDictionary: React.Dispatch<React.SetStateAction<PointDictionary>>
}

/*
Curried function alternative for onDragHandler [DEPRECATED]
Originally called whenever a Draggable is onDrag so it consumes @param id, event, and data which
contains location and outputs in console.
TODO: Learn curried functions
*/
/*
const onDragHandler = (id: string, pointDictionary: PointDictionary, setPointDictionary: React.Dispatch<React.SetStateAction<PointDictionary>>): DraggableEventHandler => (event, data) => {
    console.log(`ID: ${id}, Point Location: ${data.x},${data.y}`);
    const position = { x: data.x, y: data.y };
    setPointDictionary(prevState => ({ ...prevState, [id]: position }));
}
*/

const DraggableBox = ({ id, pointDictionary, setPointDictionary }: DraggableBoxProps) => {

    useXarrow();

    /* TODO: Learn React useCallback() */
    const onDragHandler = useCallback(
        (event: any, data: any) => {
          const position = { x: data.x, y: data.y };
          setPointDictionary(prevState => ({ ...prevState, [id]: position }));
          console.log(`ID: ${id}, Point Location: ${data.x},${data.y}`);
        },
        [id, setPointDictionary]
      );

    return (
        <>
            <Draggable onDrag={onDragHandler} defaultPosition={{ x: generateRandomInteger(0, 500), y: generateRandomInteger(0, 500) }}>
                <div id={id} 
                  className="draggableButton"
                >
                    <div style={{userSelect: 'none'}}>
                        
                    </div>
                </div>
            </Draggable>
        </>
    );
};

export default DraggableBox