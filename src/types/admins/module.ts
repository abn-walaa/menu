export type insertOne = (name: string, password: string, email: string) =>
    Promise<{ id: number, name: string, email: string }>;


export type genToken = (user_id: number, ip: string, user_agent: string) =>
    Promise<{ token: string }>