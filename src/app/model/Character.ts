import {Fighter} from './Fighter';

export class Character{
    characterName: string;
    characterChampion: Fighter;

    constructor(data:any){
        this.characterName = data.characterName;
        this.characterChampion = new Fighter(data.characterChampion);
    }
}