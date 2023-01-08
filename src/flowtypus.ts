import { flowtypus } from './core'

export default (): ReturnType<typeof flowtypus> => {
    const Flowtypus = flowtypus()

    if (window) {
        const flow = window as Window &
            typeof globalThis & { flowtypus: ReturnType<typeof flowtypus> }
        flow.flowtypus = Flowtypus
    }

    return Flowtypus
}
