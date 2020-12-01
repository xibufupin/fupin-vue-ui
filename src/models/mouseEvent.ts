// import {MouseEventInterface} from '../interfaces/MouseEventInterface'

import { reactive } from 'vue'

export default function () {
    let mouseEventModel = {
        altKey: false,
        bubbles: false,
        button: 0,
        buttons: 0,
        cancelBubble: false,
        cancelable: false,
        clientX: 0,
        clientY: 0,
        composed: false,
        ctrlKey: false,
        currentTarget: {},
        defaultPrevented: false,
        detail: 0,
        eventPhase: 0,
        fromElement: {},
        isTrusted: false,
        layerX: 0,
        layerY: 0,
        metaKey: false,
        movementX: 0,
        movementY: 0,
        offsetX: 0,
        offsetY: 0,
        pageX: 0,
        pageY: 0,
        path: [],
        relatedTarget: {},
        returnValue: false,
        screenX: 0,
        screenY: 0,
        shiftKey: false,
        sourceCapabilities: {},
        srcElement: null,
        target: null,
        timeStamp: 0,
        toElement: {},
        type: "",
        view: null,
    }
    return {
        mouseEventModel: reactive(mouseEventModel)
    }
}