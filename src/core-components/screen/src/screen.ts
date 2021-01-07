import { h, provide } from 'vue'

import mouseEvent from '../../../models/mouseEvent'
import keyboardEvent from '../../../models/keyboardEvent'
import keyboard from '../../../models/keyboard'
import simpleKeyboard from '../../../models/simpleKeyboard'

import desktop from '../../desktop/src/desktop'
import taskbar from '../../taskbar/src/taskbar'

import window from '../../window/src/window'

const componentName = 'f-screen'

export default {
	name: componentName,
	setup() {
		let { mouseEventModel } = mouseEvent();
		let handleMouseEvent = (e) => {
			Object.keys(mouseEventModel).map((value, key) => {
				mouseEventModel[value] = e[value]
			})
		}
		provide("$mouseEvent", mouseEventModel)

		let { keyboardEventModel } = keyboardEvent();
		let { keyboardModel } = keyboard();
		let { simpleKeyboardModel } = simpleKeyboard();
		let handleKeybaordEvent = (e) => {
			if (e.key.indexOf("F") == 0 && !(e.key == 'F12' || e.key == 'F5')) {
				e.preventDefault();
			}
			// 更新keyboardEvent
			Object.keys(keyboardEventModel).map((value, key) => {
				keyboardEventModel[value] = e[value]
			})

			// 更新keyboardModel和simpleKeyboardModel
			if (e.type == 'keydown' || e.type == 'keypress') {
				keyboardModel[e.code] = true;
				if (typeof simpleKeyboardModel[e.key.toLowerCase()] != 'undefined') {
					simpleKeyboardModel[e.key.toLowerCase()] = true;
				}
			}

			// 更新keyboardModel和simpleKeyboardModel
			if (e.type == 'keyup') {
				keyboardModel[e.code] = false;
				if (typeof simpleKeyboardModel[e.key.toLowerCase()] != 'undefined') {
					simpleKeyboardModel[e.key.toLowerCase()] = false;
				}
			}
		}
		document.addEventListener("keydown", handleKeybaordEvent);
		document.addEventListener("keypress", handleKeybaordEvent);
		document.addEventListener("keyup", handleKeybaordEvent);
		provide("$keyboardEvent", keyboardEventModel)
		provide("$keyboard", keyboardModel)
		provide("$simpleKeyboard", simpleKeyboardModel)

		return {
			handleMouseEvent,
		}
	},
	render() {
		return h("div", {
			id: componentName,
			style: {
				position: 'fixed',
				width: '100vw',
				height: '100vh',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				userSelect: "none",
				overflow: "hidden",
				backgroundColor: this.$registry.get('background.color'),
				backgroundImage: `url(${this.$registry.get('background.image')})`,
				backgroundRepeat: this.$registry.get('background.repeat'),
				backgroundSize: this.$registry.get('background.size'),
				backgroundPosition: this.$registry.get('background.position'),
			},
			onMouseDown: this.handleMouseEvent,
			onMouseUp: this.handleMouseEvent,
			onMouseMove: this.handleMouseEvent,
			onMouseEnter: this.handleMouseEvent,
			onMouseLeave: this.handleMouseEvent,
			onMouseOver: this.handleMouseEvent,
			onMouseOut: this.handleMouseEvent,
			onMouseWheel: this.handleMouseEvent,
			onContentMenu: this.handleMouseEvent,
		}, [
			this.$session.get() ? h(desktop) : undefined,
			this.$session.get() ? h(taskbar) : undefined,
			this.$process.getPids().map((value, key) => {
				return h(window, { instance: this.$process.get(value), key: value })
			})
		])
	},
	created() {
		if (!this.$registry.get('background.image')) {
			this.$registry.set('background.image', this.$resource.wallpaper.windows10)
		}
	}
}