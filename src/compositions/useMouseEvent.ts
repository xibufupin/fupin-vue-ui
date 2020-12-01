import { inject } from 'vue'

export default function () {
    let mouseEvent: any = inject('$mouseEvent');
    
    return {
        mouseEvent
    }
}