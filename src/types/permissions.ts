
type actions = "view" | "update" | "create" | "delete";
type resources = "products" | "orders";
export type info = {
    id: number,
    resource: resources,
    action: actions
}

export type insertOne = (action: actions, resource: resources, admin_id: number) => Promise<info>;
export type check = (action: actions, resource: resources) => Promise<boolean>;

export type getAll = () => Promise<info[]>