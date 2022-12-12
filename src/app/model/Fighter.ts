export class Fighter{
    // enum fighterClass {DRAGON,IMP,SLIME};

    MAXSTATTOTAL:number = 120;
    MAXSTATWITHIN:number = 99;

    atkStat:number;
    defStat:number;
    spdStat:number;
    r : number;
    g : number;
    b : number;
    rockChance: number;
    paperChance: number;
    scissorChance: number;
    monsterName: string;
    currentFighterType: string ;
    crown: boolean;

    constructor(data:any){
        this.atkStat = data.atkStat;
        this.defStat = data.defStat;
        this.spdStat = data.spdStat;
        this.r = data.r;
        this.g = data.g;
        this.b = data.b;
        this.rockChance = this.calculateRockChance();
        this.paperChance = this.calculatePaperChance();
        this.scissorChance = this.calculateScissorChance();
        this.monsterName = data.monsterName;
        this.currentFighterType = data.currentFighterType;
        this.crown = data.crown;

    }

    totalStatPoints(){
        return this.atkStat +this.defStat+this.spdStat;
    }

    calculateRockChance(){
        return this.defStat/this.totalStatPoints();
    }

    calculatePaperChance(){
        return this.spdStat/this.totalStatPoints();
    }

    calculateScissorChance(){
        return this.atkStat/this.totalStatPoints();
    }

    validateStat(val:number){
        if(val < 1)
            return 1;
        else if(val > this.MAXSTATWITHIN)
            return this.MAXSTATWITHIN;
        return val;
    }

    addAtkStat(atkStat:number){
        this.atkStat = this.atkStat + atkStat;
        this.atkStat = this.validateStat(this.atkStat);
    }

    addSpdStat(spdStat:number){
        this.spdStat = this.spdStat + spdStat;
        this.spdStat = this.validateStat(this.spdStat);
    }

    addDefStat(defStat:number){
        this.defStat = this.defStat+defStat;
        this.defStat = this.validateStat(this.defStat);
    }

    giveFighterStatPoints( opponent:Fighter){
        let A = this.totalStatPoints();
        let B = opponent.totalStatPoints();
        let statPointsGiven = (A - B > 5) ? Math.round(A * (3/4))
                : (A - B< 0) ? Math.round(A * (1/4))
                : Math.round(A*(1/2));

        for(let i = 0 ; i < statPointsGiven; i++){
            let random = Math.floor(Math.random()*3);
            //ATTACK
            if(random == 0){
                if(opponent.currentFighterType == "DRAGON"){
                    opponent.addAtkStat(2);
                    i++;
                }
                else{
                    opponent.addAtkStat(1);
                }
            }
            //DEFENSE
            else if (random == 1){
                if(opponent.currentFighterType == "SLIME"){
                    opponent.addDefStat(2);
                    i++;
                }
                else{
                    opponent.addDefStat(1);
                }
            }
            //SPEED
            else if(random == 2){
                if(opponent.currentFighterType == "IMP"){
                    opponent.addSpdStat(2);
                    i++;
                }
                else{
                    opponent.addSpdStat(1);
                }
            }
        }
    }
}