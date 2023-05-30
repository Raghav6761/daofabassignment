export class ChildTransaction{
  constructor(
    public id:string,
    public parentId:string,
    public sender: string,
    public receiver: string,
    public totalAmount: string,
    public paidAmount: string
  ){}
}
