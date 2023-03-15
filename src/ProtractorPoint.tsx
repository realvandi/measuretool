import { useState } from "react";
import generateRandomInteger from "./Tools";

/*
DEPRECATED
*/
const ProtractorPoint = (ref: any) => {

    const [position, setPosition] = useState({ x: generateRandomInteger(0, 500), y: generateRandomInteger(0, 500) });
    const [id, setId] = useState(undefined);
    const [selected, setSelected] = useState<Boolean>(false);

    return (
        <>
            <div style={{ position: 'absolute', left: position.x, top: position.y }} ref={ref}>
                X
            </div>
        </>
    );
}

export default ProtractorPoint;