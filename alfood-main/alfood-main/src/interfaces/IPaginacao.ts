export interface IPaginacao<T> {
    count: number
    next: string //Próxina página
    previous: string //Página anterior
    results: T[]
}