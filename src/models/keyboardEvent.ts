// import {MouseEventInterface} from '../interfaces/MouseEventInterface'

import { reactive } from 'vue'

export default function () {
    let keyboardEventModel = {
        altKey: false,
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        charCode: 0,
        code: "",
        composed: false,
        ctrlKey: false,
        currentTarget: {},
        defaultPrevented: false,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: false,
        key: "",
        keyCode: 0,
        location: 0,
        metaKey: false,
        path: [],
        repeat: false,
        returnValue: false,
        shiftKey: false,
        sourceCapabilities: {},
        srcElement: null,
        target: null,
        timeStamp: 0,
        type: "",
        view: null,
        witch: 0
    }
    return {
        keyboardEventModel: reactive(keyboardEventModel)
    }
}