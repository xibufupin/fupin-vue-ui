import task from 'Fui/core-components/taskbar/src/task/task'
import { h, reactive, provide, watchEffect, ref, computed, getCurrentInstance } from 'vue'

import mouseEvent from '../../../models/mouseEvent'

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