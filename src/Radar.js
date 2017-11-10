import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import PropTypes from 'prop-types';

const RootScene = (props) => {
    if(props.withAr) {
        return (
                <Scene artoolkit={{sourceType: 'webcam', trackingMethod: 'best'}}>
                    {props.children}
                    <a-camera-static preset="hiro" />
                </Scene>
            )
    }
    else {
        return (
            <Scene>
                {props.children}
            </Scene>
        )
    }
}

class Radar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RootScene withAr={this.props.withAr}>
                <a-sphere color="yellow" radius="5"></a-sphere>
            </RootScene>
        );
    }
}

Radar.propTypes = {
    withAr: PropTypes.bool
}

export default Radar;
