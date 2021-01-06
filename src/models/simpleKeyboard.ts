// import {MouseEventInterface} from '../interfaces/MouseEventInterface'

import { reactive } from 'vue'

export default function () {
    let simpleKeyboardModel = {
        "Escape": false,

        "F1": false,
        "F2": false,
        "F3": false,
        "F4": false,
        "F5": false,
        "F6": false,
        "F7": false,
        "F8": false,
        "F9": false,
        "F10": false,
        "F11": false,
        "F12": false,

        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false,
        "8": false,
        "9": false,
        "0": false,
        ".": false,

        "a": false,
        "b": false,
        "c": false,
        "d": false,
        "e": false,
        "f": false,
        "g": false,
        "h": false,
        "i": false,
        "j": false,
        "k": false,
        "l": false,
        "m": false,
        "n": false,
        "o": false,
        "p": false,
        "q": false,
        "r": false,
        "s": false,
        "t": false,
        "u": false,
        "v": false,
        "w": false,
        "x": false,
        "y": false,
        "z": false,

        "backspace": false,
        "tab": false,
        "capsLock": false,
        "shift": false,
        "control": false,
        "meta": false,
        "alt": false,
        "enter": false,
        "contextmenu": false,
        "space": false,

        "scrolllock": false,
        "pause": false,

        "insert": false,
        "delete": false,
        "home": false,
        "end": false,
        "pageup": false,
        "pagedown": false,

        "arrowup": false,
        "arrowdown": false,
        "arrowleft": false,
        "arrowright": false,

        "numlock": false,
    }
    return {
        simpleKeyboardModel: reactive(simpleKeyboardModel)
    }
}