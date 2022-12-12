import { Fighter } from "./Fighter";

export class Item{
    itemName:string;
    description:string;
    atkBoost:number;
    defBoost:number;
    spdBoost:number;

    constructor(data:any){
        this.itemName = data.itemName;
        this.description = data.description;
        this.atkBoost = data.atkBoost;
        this.defBoost = data.defBoost;
        this.spdBoost = data.spdBoost;
    }

    useItem(fighter:Fighter){
        console.log(this.atkBoost);
        console.log(this.defBoost);
        console.log(this.spdBoost);
        fighter.addAtkStat(this.atkBoost);
        fighter.addDefStat(this.defBoost);
        fighter.addSpdStat(this.spdBoost);
    }
}