export interface CRUDAction<T>{
    action: 'get' | 'add' | 'update' | 'delete',
    data: T
}