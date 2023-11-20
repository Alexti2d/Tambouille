export interface Ireaderwriter {
    findAll(): object;
    findOne(id: number): object;
    update(data: object, id: number): object;
    create(data: object): object;
    delete(id: number): object;
}