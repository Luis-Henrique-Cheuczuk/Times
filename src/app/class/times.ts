export class Times {

    private _id: any
    private _nome: string
    private _telefone: number
    private _time_coracao: string
    private _time_odiado: string
    private _selecao: string
    private _idolo: string
    private _posicao: string

    constructor(nome: string, telefone: number, time_coracao: string, time_odiado: string, selecao: string, idolo: string, posicao: string){
        this._nome = nome
        this._telefone = telefone
        this._time_coracao = time_coracao
        this._time_odiado = time_odiado
        this._selecao = selecao
        this._idolo = idolo
        this._posicao = posicao
    }

//Get
public getId(): number {
    return this._id
}

public getNome(): string{
    return this._nome
}

public getTelefone(): number{
    return this._telefone
}

public getTimeCoracao(): string{
    return this._time_coracao
}

public getTimeOdiado(): string{
    return this._time_odiado
}

public getSelecao(): string{
    return this._selecao
}

public getIdolo(): string{
    return this._idolo
}

public getPosicao(): string{
    return this._posicao
}

//Set

public setId(id: any): void {
    this._id = id
}

public setNome(nome: string): void {
    this._nome = nome
}

public setTelefone(telefone: number): void {
    this._telefone = telefone
}

public setTimeCoracao(time_coracao: string): void {
    this._time_coracao = time_coracao
}

public setTimeOdiado(time_odiado: string): void {
    this._time_odiado = time_odiado
}

public setSelecao(selecao: string): void {
    this._selecao = selecao
}

public setIdolo(idolo: string): void {
    this._idolo = idolo
}

public setPosicao(posicao: string): void {
    this._posicao = posicao
}

}
