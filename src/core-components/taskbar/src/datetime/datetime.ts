import { h, ref, computed, watchEffect, getCurrentInstance } from 'vue'

import moment from 'moment';

import useMouseEvent from '../../../../compositions/useMouseEvent'
// import useMoment from '../../../../compositions/useMoment'

const componentName = 'f-taskbar-datetime'

export default {
    name: componentName,
    setup() {
        let { mouseEvent } = useMouseEvent();
        // let { moment } = useMoment();

        let isHover = ref(false);
        let isOpen = ref(false);



        let onMouseEnter = (e) => {
            isHover.value = true;
        }

        let onMouseLeave = (e) => {
            isHover.value = false;
        }
        let onClickIcon = (e) => {
            isOpen.value = !isOpen.value
        }

        let stopPropagation = (e) => {
            e.stopPropagation()
        }

        watchEffect(() => {
            if (mouseEvent.type == 'mousedown') {
                isOpen.value = false;
            }
        })

        return {
            isHover,
            isOpen,

            onMouseEnter,
            onMouseLeave,
            onClickIcon,
            stopPropagation
        }
    },
    computed: {
        datetime() {
            return {
                default: moment(this.$variable.getCore("datetime")).format("HH:mm:ss"),
                full: moment(this.$variable.getCore("datetime")).format("LL dddd")
            }
        }
    },
    render() {
        return h("div", {
            id: componentName,
            title: this.datetime.full,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onMouseDown: this.stopPropagation,
            onMouseUp: this.stopPropagation,
            onClick: this.onClickIcon,
            isHover: this.isHover,
            isOpen: this.isOpen,
            style: {
                height: '30px',
                lineHeight: '30px',
                padding: '0 7px',
                backgroundColor: this.isOpen ? "rgba(255, 255, 255, .16)" : this.isHover ? 'rgba(255, 255, 255, .10)' : 'unset',
            }
        }, `${this.datetime.default}`)
    }
}