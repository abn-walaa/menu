export type adminInfo = {
    name: String
}
export type insertOneInput = {
    name: String
}
export type insertOneOutput = { age: 18 }

export type insertOne = (name: string) => Promise<{ age: number }>

export const s: insertOne = async (name) => {
    return { age: 20 };
}