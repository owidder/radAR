import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Radar from './Radar';

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
                <Radar withAr={false}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
