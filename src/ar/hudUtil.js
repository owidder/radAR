import * as d3 from 'd3';
import * as $ from 'jquery';

import './hudUtil.css';

import {slidarGlobal} from '../slides/slidAR/slidarGlobal';

let hudmenuResolve;
const hudMenuPromise = new Promise(resolve => hudmenuResolve = resolve);

export const addButtons = (hudSelector, onLeftClick, onRightClick, onUpClick, onDownClick) => {
    $(hudSelector).empty();

    if(slidarGlobal.withAr) {
        const menu = d3.selectAll(hudSelector)
            .append("div")
            .attr("class", "menu _hudmenu")

        addHudButton(menu, "lefthud", "arrow_back", onLeftClick);

        if(slidarGlobal.withHudText) {
            menu.append("div")
                .attr("class", "leftright")
                .append("text")
                .text("Press left-/right arrow keys or click on the arrow-buttons")
        }

        addSlideNumber(menu);
        addHudButton(menu, "arrowup", "arrow_upward", onUpClick);
        addSlideCounter(menu);
        addHudButton(menu, "arrowdown", "arrow_downward", onDownClick);
        addNoThreeLink(menu);

        addHudButton(menu, "righthud", "arrow_forward", onRightClick);

        hudmenuResolve(menu);
    }
}

const addSlideNumber = (parent) => {
    parent.append("div").attr("class", "_slideNumber").text("0");
}

const addSlideCounter = (parent) => {
    parent.append("div").attr("class", "_slideCounter").text("0");
}

const addNoThreeLink = (parent) => {
    parent.append("div")
        .attr("class", "_noThree")
        .append("a").attr("target", "_blank")
        .append("i").attr("class", "material-icons")
        .text("all_out");
}

export const setSlideNumber = (slideNumber) => {
    hudMenuPromise.then(hudmenu => hudmenu.selectAll("div._slideNumber").text(slideNumber));
}

export const setSlideCounter = (stepNo, noOfSteps) => {
    hudMenuPromise.then(hudmenu => {
        const text = noOfSteps > 0 ? `${stepNo} / ${noOfSteps}` : "";
        hudmenu.selectAll("div._slideCounter").text(text)

        showArroDown(stepNo < noOfSteps);
        showArrowUp(stepNo > 0);
    });
}

export const setNoThreeLink = (slideId) => {
    hudMenuPromise.then(hudmenu => {
        const link = `${window.location.origin}${window.location.pathname}?${slidarGlobal.bodyType}=0&slide=${slideId}`;
        hudmenu.selectAll("div._noThree a").attr("href", link);
    })
}

const showArrowUp = (trueIfShow) => {
    hudMenuPromise.then(hudmenu => {
        hudmenu.selectAll(".arrowup")
            .style("visibility", trueIfShow ? "visible" : "hidden")
    });
}

const showArroDown = (trueIfShow) => {
    hudMenuPromise.then(hudmenu => {
        hudmenu.selectAll(".arrowdown")
            .style("visibility", trueIfShow ? "visible" : "hidden")
    });
}

export const addHudButton = (parent, classname, materialIcon, onClick) => {
    const button = parent.append("button")
        .attr("class", classname)
        .on("click", onClick)

    button.append("i")
        .attr("class", "material-icons")
        .text(materialIcon)
}

export const init = (selector, hud) => {
    const hudContainer = document.querySelector(selector);
    hud.hudElements[0].appendChild(hudContainer);
}
