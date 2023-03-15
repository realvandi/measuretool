import React, { SetStateAction } from "react";
import position from "./GeneralTypes";
import generateRandomInteger from "./Tools";

type ProtractorPointProps = {
    position: position
}

type ProtractorPointState = {
    position: position
    selected: boolean
}

class ProtractorPointClass extends React.Component<ProtractorPointProps, ProtractorPointState> {

    state: ProtractorPointState = {
        position: {x: generateRandomInteger(0,500), y: generateRandomInteger(0,500)},
        selected: false
    };

    componentDidUpdate(prevProps: ProtractorPointProps) {
        if (this.props.position !== prevProps.position && this.state.selected == true) {
            this.setState({ position: this.props.position });
        }
    }

    render() {
        return (
            <>
                <div style={{ position: 'absolute', left: this.state.position.x, top: this.state.position.y }}
                onClick={(e)=>{this.state.selected = !this.state.selected}}>
                    X
                    {this.state.position.x},{this.state.position.y}
                </div>
            </>
        )
    }

}

export default ProtractorPointClass;