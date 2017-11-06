import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: 'red'};
    }

    changeColor() {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
        this.setState({
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    render() {
        return (
            <div className="App">
                <Scene artoolkit={{sourceType: 'webcam', trackingMethod: 'best'}}>

                    <a-anchor hit-testing-enabled="true">
                        <Entity geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                                material={{color: '#24CAFF'}}/>
                        <a-box position='0 0 0.5' material='opacity: 0.5;'></a-box>
                    </a-anchor>
                    <a-camera-static preset="hiro" />
                </Scene>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
