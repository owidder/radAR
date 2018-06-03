import * as d3 from 'd3';
import * as $ from 'jquery';

import {slidarGlobal} from '../slides/slidAR/slidarGlobal';

export const addLeftRightButtons = (hudSelector, onLeftClick, onRightClick) => {
    $(hudSelector).empty();

    if(slidarGlobal.withAr) {
        const menu = d3.selectAll(hudSelector)
            .append("div")
            .attr("class", "menu")

        addHudButton(menu, "lefthud", "arrow_back", onLeftClick);
        addHudButton(menu, "righthud", "arrow_forward", onRightClick);
    }
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
