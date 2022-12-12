import { CPUCharacter } from "../model/CPUCharacter";

export class CPUBattleList{
    characters: CPUCharacter[] = [];

    constructor(){
        const jsonData = require('../docs/FighterList.json');

        jsonData.fighters.forEach((element:any) => {
            this.characters.push(element);
        });
        // console.log(this.characters);
    }
}