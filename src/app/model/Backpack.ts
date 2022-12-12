import { ItemList } from "../lists/ItemList";
import { Fighter } from "./Fighter";
import { Item } from "./Item";
import { ItemHeld } from "./ItemHeld";

export class Backpack{
    items: ItemHeld[] = [];

    constructor(data?:any){
        if(data)
            this.items = data.items;
    }

    addItem(item:string, quantity:number){
        console.log(this.items);
        
        let itemFind = this.items.find(x => x.item == item);
        console.log(itemFind);      

        if(itemFind == undefined){
            let itm = {
                item:item,
                quantity:quantity
            }
            this.items.push(new ItemHeld(itm));
        }
        else{
            let idx = this.findItemIndex(item);
            if(idx != -1)
                this.items[idx].quantity += quantity;
        }
    }

    findItemIndex(item: any):number{
        let idx = -1;
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].item === item.item){
                idx = i
            }
        }
        return idx;
    }

    use(item:any, quantity:number, fighter:Fighter){
        const itemList: ItemList = new ItemList();
        // console.log(itemList.items);
        let itemFind = itemList.items.find(x => x.itemName == item.item);
        // console.log(itemFind);
        let itemIdx = this.findItemIndex(item);
        console.log(item);
        if(itemFind && itemIdx != -1){
            // console.log("item being used");
            if(this.items[itemIdx].quantity <= 0){
                this.items.splice(itemIdx,1);
                // this.items = [];
                // this.items = this.cleanArray();
            }
            else{
                itemFind.useItem(fighter);
                this.items[itemIdx].quantity -= 1;
            }
        }

        console.log(fighter);

    }

    cleanArray(){
        let newArr: ItemHeld[] = [];
        this.items.forEach(elem => {
            if(elem.quantity >=1)
                newArr.push(elem);
        });
        return newArr;
    }

    hasItem(item: any){
        const itemList: ItemList = new ItemList();
        let itemFind = itemList.items.find(x => x.itemName == item.item);

        if(itemFind != undefined)
            return true;
        else
            return false;
    }
}