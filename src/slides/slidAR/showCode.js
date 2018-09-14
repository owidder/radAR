import * as $ from 'jquery';

import {createReverseStep} from './steps';

const Prism = require('prismjs');

const render = (selector, language, _string) => {
    const l = Prism.languages;
    const html = Prism.highlight(_string, Prism.languages[language]);
    $(selector).html(`<pre class="language-${language}">${html}</pre>`);
}

export const css = (selector, cssString) => {
    render(selector, "css", cssString);
}

export const js = (selector, jsString) => {
    render(selector, "javascript", jsString);
}

export const bash = (selector, jsString) => {
    render(selector, "clike", jsString);
}

export const remove = (selector) => {
    $(selector).empty();
}

export const cssStep = (selector, cssString) => {
    return {
        f: () => css(selector, cssString),
        b: () => remove(selector)
    }
}

export const jsStep = (selector, jsString) => {
    return {
        f: () => js(selector, jsString),
        b: () => remove(selector)
    }
}

export const cssStepWithReverse = (selector, cssString) => {
    const step = cssStep(selector, cssString);
    return createReverseStep(step);
}

export const jsStepWithReverse = (selector, jsString) => {
    const step = jsStep(selector, jsString);
    return createReverseStep(step);
}

export const showCode = {
    css,
    js,
    bash,
    remove,
    cssStep,
    cssStepWithReverse,
    jsStep,
    jsStepWithReverse
}
