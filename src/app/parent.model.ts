export class ParentTransaction{
  constructor(
    public id:string,
    public sender: string,
    public receiver: string,
    public totalPaidAmount: number,
    public totalAmount: string
  ){}
}
