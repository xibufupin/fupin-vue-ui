import { h } from 'vue'
import instanceMinxin from '../../../../mixins/instance'
import useInstance from '/@/fupin-vue-ui/compositions/useInstance'

const componentName = 'f-window-footer'

export default {
    name: componentName,
    mixins: [instanceMinxin],
    setup() {
        let { instance } = useInstance();
        return {
            instance
        }
    },
    render() {
        return h("div", {
            id: `${componentName}-${this.instance.pid}`,
            style: {
                height: '24px',
                lineHeight: '24px',
                padding: '0 9px',
            }
        }, this.instance.status)
    }
}