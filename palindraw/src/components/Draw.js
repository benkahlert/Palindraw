import React, { Component } from "react"
import base from "../re-base.js"
import "../css/Draw.css"

class Draw extends Component {

    // Instantiates state
    constructor(props) {
        super(props);
        this.state = {
            canDraw: false,
            dragging: false,
            radius: 3,
            color: "black",
            canvasSize: 500
        }
    }

    // Sets up canvas and updates state
    componentDidMount = () => {
        this.refs.canvas.width = window.innerWidth
        this.refs.canvas.height = window.innerHeight
        this.setState({context: this.refs.canvas.getContext("2d"), canDraw: true}, () => {
            const stateCopy = { ...this.state }
            stateCopy.context.lineWidth = 2 * this.state.radius
            this.setState(stateCopy)
        })
        window.onresize = () => {
            if (this.refs.canvas) 
                this.resetCanvas()
        }
    }

    // Puts a dot at where mouse is
    putPoint = (event, boolean) => {
        if (this.state.dragging || boolean) {
            this.state.context.lineTo(event.clientX, event.clientY)
            this.state.context.stroke()
            this.state.context.beginPath()
            this.state.context.arc(event.clientX, event.clientY, this.state.radius, 0, 2 * Math.PI)
            this.state.context.fill()
            this.state.context.beginPath()
            this.state.context.moveTo(event.clientX, event.clientY)
        }
    }

    // Sets dragging
    setDragging = (event, boolean) => {
        if (boolean) {
            const stateCopy = { ...this.state }
            stateCopy.dragging = boolean
            this.setState(stateCopy)
            this.putPoint(event, true)
        } else {
            this.state.context.beginPath()
            const stateCopy = { ...this.state }
            stateCopy.dragging = boolean
            this.setState(stateCopy)
        }
    }

    // Sets the current swatch
    setSwatch = (event) => {
        const swatch = event.target;
        const color = swatch.style.backgroundColor;
        const stateCopy = {...this.state};
        stateCopy.context.fillStyle = color;
        stateCopy.context.strokeStyle = color;
        stateCopy.color = color;
        this.setState(stateCopy);
        // Change this later, not suppesed to do in react
        const active = document.getElementsByClassName("active")[0];
        if (active) 
            active.className = "swatch"; 
        event.target.className += " active";
    }

    // Handles submit
    submitDrawing = (event) => {
        
    }

    // Goes back
    exit = (event) => {
        this.props.goToUrl("/home")
    }

    // Called when window is resized
    resetCanvas = () => {
        const imageData = this.state.context.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height)
        this.refs.canvas.width = window.innerWidth
        this.refs.canvas.height = window.innerHeight
        const stateCopy = { ...this.state }
        stateCopy.context.lineWidth = 2 * this.state.radius
        stateCopy.context.fillStyle = this.state.color
        stateCopy.context.strokeStyle = this.state.color
        this.setState(stateCopy)
        this.state.context.putImageData(imageData, 0, 0)
    }

    // Returns a swatch
    renderSwatch = (style, active) => {
        return (
            <div data-layout="column" key={style.backgroundColor}>
                <span data-flex></span>
                <div onClick={(event) => this.setSwatch(event)} className={active ? "swatch active" : "swatch"} style={style}></div>
                <span data-flex></span>
            </div>
        );
    }

    // Mandatory component return
    render() {

        const colors = ["black", "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#1abc9c", "#3498db", "#9b59b6", "#bdc3c7", "#ffffff"];

        return (
            <div data-flex data-layout="column">
                {/* <div className="toolbar" data-flex data-layout-gt-sm="row" data-layout="column">
                    <div data-layout="column">
                        <span data-flex></span>
                        <div className="toolbar-title">Pictobucket</div>
                        <span data-flex></span>
                    </div>
                    <span data-flex></span>
                    <div data-layout="column">
                        <span data-flex></span>
                        <div onClick={(event) => this.exit(event)} className="button -regular center submit" data-flex>Exit</div>
                        <span data-flex></span>
                    </div>
                    <div data-layout="column">
                        <span data-flex></span>
                        <div onClick={(event) => this.submitDrawing(event)} className="button -regular center submit" data-flex>Submit</div>
                        <span data-flex></span>
                    </div>
                    <span data-flex></span>
                    <div data-layout="column">
                        <span data-flex></span>
                        <div onClick={(event) => this.undo(event)} className="button -regular center undo" data-flex><span className="material-icons">undo</span></div>
                        <span data-flex></span>
                    </div>
                    <span data-flex></span>
                    <div data-layout="row">
                        <div data-layout="column">
                            <span data-flex></span>
                            <div className="radius-value" data-flex>Radius: {this.state.radius}</div>
                            <span data-flex></span>
                        </div>
                        <div className="toolbar-radius" data-layout="column">
                            <span data-flex></span>
                            <div onClick={(event) => this.setRadius(event, this.state.radius - 1)} className="button -regular center" data-flex>-</div>
                            <span data-flex></span>
                        </div>
                        <div className="toolbar-radius" data-layout="column">
                            <span data-flex></span>
                            <div onClick={(event) => this.setRadius(event, this.state.radius + 1)}  className="button -regular center" data-flex>+</div>
                            <span data-flex></span>
                        </div>
                    </div>
                    <span data-flex="5"></span>
                    <div data-layout="row">
                        {colors.map((color) => {
                            let boolean = true;
                            if (color !== "black")
                                boolean = false;
                            return (this.renderSwatch({backgroundColor: color}, boolean));
                        })}
                    </div>
                </div> */}
                <canvas 
                data-flex
                onMouseDown={(event) => this.setDragging(event, true)}
                onMouseUp={(event) => this.setDragging(event, false)}
                onMouseMove={(event) => this.putPoint(event, false)}
                ref="canvas">Sorry, your browser doesn't support html canvas!</canvas>
            </div>
        )
    }
}
export default Draw