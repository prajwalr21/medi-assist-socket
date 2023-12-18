type Head = "client" | "human"

export const TwoWayMap = {
    client: new Map<string, string>(),
    human: new Map<string, string>(),
    set: (key: string, value: string) => {
        TwoWayMap.human.set(key, value)
        TwoWayMap.client.set(value, key)
    },
    get: (key: string) => {
        if (TwoWayMap.client.has(key)) {
            return TwoWayMap.client.get(key)
        }
        return TwoWayMap.human.get(key)
    }
}