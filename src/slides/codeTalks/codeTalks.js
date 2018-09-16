import * as _ from 'lodash';

import {Slides} from "../Slides";
import {staticSlide} from "../staticSlide";
import * as slidesUtil from '../slidesUtil';
import {slideControl} from '../control/SlideControl';
import {slidarGlobal} from '../slidAR/slidarGlobal';
import {initPhase} from '../slidAR/initPhase';


const width = slidarGlobal.width;
const height = slidarGlobal.height;

export const init = async (rootSelector, selectedFilename) => {

    const slides = new Slides(rootSelector, width, height);

    const createFct = (filename) => staticSlide(slides, filename);

    await Promise.all([
        slidesUtil.createSlide(createFct, "title-cube", selectedFilename),
        slidesUtil.createSlide(createFct, "whats-a-blockchain", selectedFilename),
        slidesUtil.createSlide(createFct, "ethereum-video", selectedFilename),
        slidesUtil.createSlide(createFct, "whats-a-contract", selectedFilename),
        slidesUtil.createSlide(createFct, "contract-code", selectedFilename),
        slidesUtil.createSlide(createFct, "where-to-deploy", selectedFilename),
        slidesUtil.createSlide(createFct, "no-option", selectedFilename),
        slidesUtil.createSlide(createFct, "ropsten", selectedFilename),
        slidesUtil.createSlide(createFct, "rinkeby", selectedFilename),
        slidesUtil.createSlide(createFct, "how2-connect2-rinkeby", selectedFilename),
        slidesUtil.createSlide(createFct, "geth-rinkeby", selectedFilename),
        slidesUtil.createSlide(createFct, "infura", selectedFilename),
        slidesUtil.createSlide(createFct, "metamask-logo", selectedFilename),
    ])

    if(_.isEmpty(selectedFilename)) {
        slideControl.setCurrentSlideId("title-cube");
    }
    else {
        slideControl.setCurrentSlideId(selectedFilename);
    }

    const selection = slides.selection();
    await initPhase.waitForNumberOfSlides(selection.size());
    slideControl.runSlideEnterFunction();

    return selection;
}
