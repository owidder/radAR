import * as _ from 'lodash';

import {init} from '../ar/argonApp';
import * as global from './global';
import * as setPositions from './setPositions';
import * as moveObject from './moveObject';

const TWEEN = window.TWEEN;


export const initAr = () => {
    if(_.isEmpty(global.getGlobalRoot()) || _.isEmpty(global.getGlobalApp())) {
        const {root, app} = init();
        global.setGlobalRoot(root);
        global.setGlobalApp(app);
    }
}

export const initTween = () => {
    global.getGlobalApp().updateEvent.on(() => {
        TWEEN.update();
    });

    global.setTween(TWEEN);
}

export const ar = {
    initAr,
    initTween,
    ...setPositions,
    ...moveObject
}
