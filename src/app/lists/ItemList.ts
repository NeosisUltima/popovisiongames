import { Item } from "../model/Item";

export class ItemList{
    items:Item[] = [];


    constructor(){
        const jsonData = require('../docs/ItemList.json');

        jsonData.items.forEach((element:any)=>{
            this.items.push(new Item(element));
        });

        // console.log(this.items);
    }
}