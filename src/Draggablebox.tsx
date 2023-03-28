import Draggable, { DraggableData, DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";
import generateRandomInteger from "./Tools";
import './styles.css';

type DraggableBoxProps = {
    id: string
}

const onDragHandler: DraggableEventHandler = (event, data) => {
    console.log("Point Location: " + data.x + ',' + data.y)

}

const DraggableBox = ({ id }: DraggableBoxProps) => {

    useXarrow();

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