export class ChildTransaction{
  constructor(
    public id:number,
    public parentid:number,
    public paidAmount: number
  ){}
}
