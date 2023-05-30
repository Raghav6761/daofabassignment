export class ParentTransaction{
  constructor(
    public id:string,
    public sender: string,
    public receiver: string,
    public totalAmount: string
  ){}
}
