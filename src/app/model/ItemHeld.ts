import { Item } from "./Item";

export class ItemHeld{
    item: string;
    quantity: number;

    constructor(data:any){
        this.item = data.item;
        this.quantity = data.quantity
    }
}