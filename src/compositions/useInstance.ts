import { inject } from 'vue'

export default function () {
    let instance: any = inject('instance');
    
    return {
        instance
    }
}