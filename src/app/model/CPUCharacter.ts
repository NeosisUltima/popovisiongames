import { Character } from "./Character";
import { Item } from "./Item";
import { PlayerCharacter } from "./PlayerCharacter";

export class CPUCharacter extends Character{
    droppedItems: any[];
    numItemsGiven: number;

    constructor(data:any){
        super(data);
        this.droppedItems = data.droppedItems;
        this.numItemsGiven = data.numItemsGiven;
    }

    giveItemsToPlayer(pChar: PlayerCharacter) {
        let amt = this.droppedItems.length;
        console.log(amt);
        console.log(this.droppedItems[0]);
        console.log(pChar.characterBP);
        for(let i = 0; i < this.numItemsGiven; i++){
            let num = Math.floor(Math.random() *(amt));
            if(num < amt){
                pChar.characterBP.addItem(this.droppedItems[num].itemName, 1);
            }
        }
    }
}