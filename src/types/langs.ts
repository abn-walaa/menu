export type insertinput = {
    name: String
}
export type insertOutput = Promise<{ age: number }>

export type insert = (input: insertinput) => insertOutput
