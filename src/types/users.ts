export type userLoginInfo = { id: number, name: string, email: string, password: string };
export type userInfo = { id: number, name: string, email: string };
export type insertOne = (name: string, password: string, email: string, admin_id: number) =>
    Promise<{ id: number, name: string, email: string }>;


export type genToken = (user_id: number) =>
    Promise<string>

export type checkUser = (email: string, password: string) => Promise<{ id: number, name: string, email: string }>

export type findByToken = (user_id: number, token: string) => Promise<userInfo | undefined>

export type getAll = (next: number | undefined) => Promise<userInfo[]>