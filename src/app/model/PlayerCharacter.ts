import { Backpack } from "./Backpack";
import { Character } from "./Character";

export class PlayerCharacter extends Character{
    characterId:string;
    characterBP: Backpack;

    constructor(data:any){
        // console.log(data);
        super(data);
        this.characterId = data.characterId;
        this.characterBP = new Backpack(data.characterBP);
    }
}