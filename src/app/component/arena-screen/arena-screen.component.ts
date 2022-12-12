import { ImageLoader } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CPUBattleList } from 'src/app/lists/CPUBattleList';
import { Character } from 'src/app/model/Character';
import { CPUCharacter } from 'src/app/model/CPUCharacter';
import { Fighter } from 'src/app/model/Fighter';
import { PlayerCharacter } from 'src/app/model/PlayerCharacter';
import { LoginService } from 'src/app/service/login.service';
import { VersusService } from 'src/app/service/versus.service';

@Component({
  selector: 'app-arena-screen',
  templateUrl: './arena-screen.component.html',
  styleUrls: ['./arena-screen.component.scss']
})
export class ArenaScreenComponent implements OnInit,OnChanges{
  @ViewChild('arena',{static:true}) arenaCanvas! :ElementRef;
  @ViewChild('battlelog',{static:true}) battleLog! :ElementRef;

  fighterList: CPUBattleList = new CPUBattleList();
  currentPhaseTime:number = 5;

  opp1:any;
  opp2:any;

  width:number;
  height:number;

  context:any;

  image:any;
  image2:any;
  imageR:any;
  imageP:any;
  imageS:any;

  textEl: HTMLTextAreaElement;

  @Input() pvp:boolean;
  @Input() p1: PlayerCharacter;
  @Input() p2: PlayerCharacter;
  @Input() pve:boolean;
  @Input() c1: CPUCharacter;

  constructor(private txtAreaMod:InputTextModule,private prime:PrimeNGConfig,private loginSvc:LoginService, private vsSvc:VersusService,private route:ActivatedRoute, private router:Router){    

  }

  async ngOnInit() {
    const canvEl:HTMLCanvasElement = this.arenaCanvas.nativeElement;
    this.textEl = this.battleLog.nativeElement;

    if(this.route.snapshot.url[1].path == "pve")
      this.pve = true;
    else(this.route.snapshot.url[1].path == "pve")
      this.pvp = true;
    
    if(this.pve){
      this.opp1 = new PlayerCharacter(this.loginSvc.getCharacter());
      let oppName = this.vsSvc.getCPU2().characterName;
      let characterLoad = this.fighterList.characters.find(x => x.characterName == oppName)
      this.opp2 = new CPUCharacter(characterLoad); 
    }
    else if(this.pvp){
      this.opp1 = new Character(this.vsSvc.getOpponent1());
      this.opp2 = new Character(this.vsSvc.getOpponent2()); 
    }

    console.log(this.opp1);
    console.log(this.opp2);

    if(this.opp1 != undefined || this.opp2 != undefined){
      canvEl.width = this.width = window.innerWidth*(3/4);
      canvEl.height = this.height = window.innerHeight/2;
      
      this.context = canvEl.getContext('2d');
      await this.waitForImages();
      
      this.generateImage(this.context)
      const updateTime = setInterval(() => {
        //textEl.value += "Hello Battle Arena Members!!!"
        this.battle();
        this.drawHealthBar(this.context);
      },this.currentPhaseTime * 1000);
    }
    

  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }


  //Drawing Functions
  drawBg(context:any){
    context.beginPath();
    context.fillStyle = "#808080";
    context.fillRect(0,0,this.width ,this.height);
  }
  drawPedestals(context:any){
    context.beginPath();
    context.fillStyle = "black";
    context.ellipse(40+(this.width  * .45)/4,(this.height)*(3/4),this.width /8,40,0,0, 2*Math.PI);
    context.fill();

    context.beginPath();
    context.fillStyle = "black";
    context.ellipse(this.width -40-(this.width  * .45)/4,(this.height)*(3/4),this.width /8,40,0,0, 2*Math.PI);
    context.fill();
  }
  drawHealthBar(context:any){
    context.fillStyle = "red";
    context.fillRect(10,10,this.width  * .45,20);
    context.fillRect(this.width -10,10,-this.width  * .45,20);

    context.globalCompositeOperation = 'source-over';

    context.fillStyle = "green";
    context.fillRect(10,10,(this.width  * .45) * (this.p1health/100),20);
    context.fillRect(this.width -10,10,-(this.width  * .45) * (this.p2health/100),20);
  }

  generateImage(ctx:any){
    // this.drawBg(ctx);


    // // ctx.globalCompositeOperation = 'destination-over';
    // this.drawHealthBar(ctx);
    
    // // ctx.globalCompositeOperation = 'destination-over';
    
    // this.drawPedestals(ctx);


    

    let x1 = (80+(this.width * .45)/4)-((this.width/4)*(3/4)/2);
    let x2 = this.width-((this.width * .45)/4)-((this.width/4)*(3/4)/2);
    let y = this.height/2-30;
    let size=((this.height/2));
    //draws character 1
    ctx.beginPath();
    ctx.drawImage(this.image,x1, y, size, size);
    ctx.globalCompositeOperation = "source-in";
    // console.log(this.rgbToHex(this.opp1.characterChampion.r,this.opp1.characterChampion.g,this.opp1.characterChampion.b))
    ctx.fillStyle=this.rgbToHex(this.opp1.characterChampion.r,this.opp1.characterChampion.g,this.opp1.characterChampion.b);
    ctx.fillRect(x1, y, size, size);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(this.image,x1, y, size, size);
    ctx.globalAlpha = 1.0;
    
    // //draws character 2
    ctx.beginPath();
    ctx.drawImage(this.image2,x2, y, size, size);  
    ctx.globalCompositeOperation = "source-atop";  
    // console.log(this.rgbToHex(this.opp2.characterChampion.r,this.opp2.characterChampion.g,this.opp2.characterChampion.b))
    ctx.fillStyle=this.rgbToHex(this.opp2.characterChampion.r,this.opp2.characterChampion.g,this.opp2.characterChampion.b);
    ctx.fillRect(x2, y, size, size);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(this.image2,x2, y, size, size);    
    ctx.globalAlpha = 1.0;
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-over';
    this.drawPedestals(ctx);
    this.drawHealthBar(ctx);
    ctx.globalCompositeOperation = 'destination-over';
    this.drawBg(ctx);


    
    
    // ctx.globalCompositeOperation = 'destination-over';
    
    

    // console.log('checkpoint');

    
  }

  drawChoices(ctx: any){
    let x1 = (100+(this.width * .45)/4)-((this.width/4)*(3/4)/2);
    let x2 = (this.width+80)-((this.width * .45)/4)-((this.width/4)*(3/4)/2);
    let y = 30;
    let size=(this.height/3);

    

    //draws character 1 choice
    ctx.beginPath();
    ctx.drawImage(this.getP1Choice(),x1, y, size, size);
    
    // //draws character 2 choice
    ctx.beginPath();
    ctx.drawImage(this.getP2Choice(),x2, y, size, size);  
  }


  eraseChoices(ctx: any){
    let x1 = (100+(this.width * .45)/4)-((this.width/4)*(3/4)/2);
    let x2 = (this.width+80)-((this.width * .45)/4)-((this.width/4)*(3/4)/2);
    let y = 30;
    let size=(this.height/3);
    ctx.fillStyle = "#808080";
    //draws character 1 choice
    ctx.beginPath();
    ctx.fillRect(x1, y, size, size);
    
    // //draws character 2 choice
    ctx.beginPath();
    ctx.fillRect(x2, y, size, size);  
  }

  getP1Choice(){
    if(this.p1Choice.toLocaleLowerCase() === "rock" ){
      return this.imageR;
    }
    else if(this.p1Choice.toLocaleLowerCase() === "paper" ){
      return this.imageP
    }
    else{
      return this.imageS;
    }
  }

  getP2Choice(){
    if(this.p2Choice.toLocaleLowerCase() === "rock" ){
      return this.imageR;
    }
    else if(this.p2Choice.toLocaleLowerCase() === "paper" ){
      return this.imageP
    }
    else{
      return this.imageS;
    }
  }

  valueToHex(val:any){
    var hex = val.toString(16);
    if(hex.length == 1)
      hex = '0'+hex;
    return hex;
  }

  rgbToHex(r:number,g:number,b:number){
    return '#'+(this.valueToHex(r)+this.valueToHex(g)+this.valueToHex(b));
  }
  
  //async
  async waitForImages(){
    this.image = new Image(32,32);
    this.image2 = new Image(32,32);
    this.imageR = new Image(32,32);
    this.imageP = new Image(32,32);
    this.imageS = new Image(32,32);
    
    this.image.onload = () =>{
      
      console.log('image 1 loaded');
    };

    this.image2.onload = () =>{
      console.log('image 2 loaded');
    }

    this.imageR.onload = () =>{
      
      console.log('image 1 loaded');
    };

    this.imageP.onload = () =>{
      console.log('image 2 loaded');
    }

    this.imageS.onload = () =>{
      
      console.log('image 1 loaded');
    };
    
    this.image.src = "assets/imgs/"+this.opp1.characterChampion.currentFighterType.toLowerCase()+".png";
    this.image2.src = "assets/imgs/"+this.opp2.characterChampion.currentFighterType.toLowerCase()+"_inv.png";
    this.imageR.src = "assets/imgs/rock.png";
    this.imageP.src = "assets/imgs/paper.png";
    this.imageS.src = "assets/imgs/scissors.png";

    await this.delay(1000);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //battle system
  //battle Variables
  TIMER_RESET:number = 1; 
  HEALTH:number = 100;
  DECISION_PHASE_RESET:number = 3;
  BATTLE_PHASE_RESET:number = 5;
  START_PHASE_TIMER:number = 5;
  END_PHASE_TIMER:number = 5;

  BATTLE_PHASE:number = 1;
  DECISION_PHASE:number = 0; 
  START_PHASE:number = -1;
  END_PHASE:number = 2;
  OVER_PHASE:number = 3;

  phase:number = this.START_PHASE;

  battleEnded:boolean = false;
  p1wins:boolean; 
  p2wins:boolean;
  leaveMsg:boolean = false;

  p1Choice:string;
  p2Choice:string;

  p1health: number = 100;
  p2health: number = 100;

  DMG_MULT:number= 10;
  choices: string[] = ['ROCK', 'PAPER', 'SCISSORS'];
  battle(){
    if(this.phase == this.START_PHASE){
      this.currentPhaseTime = this.DECISION_PHASE_RESET;
      this.phase = this.DECISION_PHASE;
      this.textEl.value = "Hello Battle Arena Members!!!";
      if(this.pvp)
        this.textEl.value += "\nToday we have the battle of the century as " + this.opp1.characterName + "'s " 
        + this.opp1.characterChampion.monsterName+" takes on " + this.opp2.characterName + "'s " + this.opp2.characterChampion.monsterName+"."; 
      if(this.pve)
        this.textEl.value += "\nToday we have a training battle between " + this.opp1.characterName + "'s " 
        + this.opp1.characterChampion.monsterName+" and " + this.opp2.characterName + "'s " + this.opp2.characterChampion.monsterName+".";
      this.textEl.value += "\nWho will win, let's find out!!!";  
    }
    else if(this.phase == this.DECISION_PHASE){
      this.eraseChoices(this.context);
      this.currentPhaseTime = this.BATTLE_PHASE_RESET;
      this.phase = this.BATTLE_PHASE;
      this.textEl.value += "\nDeciding....";
      this.RandomizeDecision();
    }
    else if(this.phase == this.BATTLE_PHASE){
        let battleSys:Battle = new Battle(this.p1Choice,this.p2Choice);
        if(!this.winnerDecided()){
            this.phase = this.DECISION_PHASE;
            this.drawChoices(this.context);
            this.textEl.value += "\n" + (this.RoundStatement(battleSys.RoundWinner()));
            this.damage(battleSys.RoundWinner());
        }
        else{
          this.determineWinner();
          this.currentPhaseTime = this.END_PHASE_TIMER;
          this.phase = this.END_PHASE;
        }
        
    }
    else if(this.phase == this.END_PHASE){
      this.currentPhaseTime = this.END_PHASE_TIMER;
      this.phase = this.OVER_PHASE;
      this.textEl.value += "\n" + this.determineWinner();

      
    }
    else{
      if(!this.leaveMsg){
        if(this.pve)
          this.textEl.value += "\nUse the navigation button above to return to the character screen.";
        else if(this.pvp)
        this.textEl.value += "\nUse the navigation button above to return to the character screen or the versus screen.";
        this.leaveMsg = true;
      }
    }

  }
  

  RandomizeDecision() {
    this.p1Choice = this.choices[this.findChoiceIndex(new Fighter(this.opp1.characterChampion))];
    this.p2Choice = this.choices[this.findChoiceIndex(new Fighter(this.opp2.characterChampion))];
  }

  findChoiceIndex(chooser:Fighter):number{
    let midChance = chooser.calculatePaperChance() + chooser.calculateRockChance();
    let choiceFl = Math.random();
    let choice = (choiceFl <= chooser.calculateRockChance()) ? 0 : (choiceFl < midChance && choiceFl > chooser.calculateRockChance()) ? 1 : 2;
    return choice;
}
  
  winnerDecided() : boolean{
    return this.p1health <= 0 || this.p2health <= 0;
  }
  
  RoundStatement(winner: string) {
    if(winner=="p2")
      return this.opp2.characterChampion.monsterName + " attacks " + this.opp1.characterChampion.monsterName;
    else if(winner == "p1")
      return this.opp1.characterChampion.monsterName + " attacks " + this.opp2.characterChampion.monsterName
    return "draw, both take damage.";
  }
  
  damage(winner: string) {
    if(winner == "p2"){
      let damage = (this.opp2.characterChampion.atkStat + (this.opp2.characterChampion.spdStat - ((this.opp1.characterChampion.spdStat+1)/2)) - this.opp1.characterChampion.defStat) * this.DMG_MULT;
      if(damage <= 0)
          damage = 1;
      this.p1health -= damage;
    }
    else if(winner=="p1"){
        let damage = (this.opp1.characterChampion.atkStat + (this.opp1.characterChampion.spdStat - ((this.opp2.characterChampion.spdStat+1)/2)) - this.opp2.characterChampion.defStat) * this.DMG_MULT;
        if(damage <= 0)
            damage = 1;
        this.p2health -= damage;
    }
    else{
        this.p1health -= ((this.opp2.characterChampion.atkStat/2 > 1 ) ? this.opp2.characterChampion.atkStat/2 : 1) * this.DMG_MULT;
        this.p2health -= ((this.opp1.characterChampion.atkStat/2 > 1 ) ? this.opp1.characterChampion.atkStat/2 : 1) * this.DMG_MULT;
    }

    if(this.p1health < 0) this.p1health =0;
    if(this.p2health < 0) this.p2health =0;
  }
  
  determineWinner() {
    if(this.p1health > this.p2health || this.p2health == 0){
      this.p1wins = true;
      if(this.opp2 instanceof CPUCharacter) {
          this.opp2.giveItemsToPlayer(this.opp1);
          this.opp2.characterChampion.giveFighterStatPoints(this.opp1.characterChampion);
          //SaveCharacterInformation from login service
          this.loginSvc.updateCharacter(this.opp1);
          return this.opp1.characterName + " won the battle against " + this.opp2.characterName + "!!!\nYou recieved some items.";
      }
      return this.opp1.characterName + " won the battle against " + this.opp2.characterName + "!!!";
  }
  else{
      this.p2wins =true;
      return this.opp2.characterName + " won the battle against " + this.opp2.characterName + "!!!";
  }
  }
}

class Battle{
  ROCK:number = 0; PAPER:number = 1; SCISSOR:number =2;
  choice_p1:number; choice_p2:number;

  constructor(choice1:string,choice2:string){
      this.choice_p1 = this.convertToChoice(choice1);
      this.choice_p2 = this.convertToChoice(choice2);
  }

  convertToChoice(a:string):number{
      if(a.toLowerCase()==="rock"){
          return this.ROCK;
      }
      else if(a.toLowerCase()==="paper"){
          return this.PAPER;
      }
      else{
          return this.SCISSOR;
      }
  }

  RoundWinner():string{
      if(this.choice_p1 == this.ROCK){
          if(this.choice_p2 == this.PAPER)
              return "p2";
          else if(this.choice_p2 == this.SCISSOR)
              return "p1";
      }
      else if(this.choice_p1 == this.PAPER){
          if(this.choice_p2 == this.SCISSOR)
              return "p2";
          else if(this.choice_p2 == this.ROCK)
              return "p1";
      }
      else if(this.choice_p1 == this.SCISSOR){
          if(this.choice_p2 == this.ROCK)
              return "p2";
          else if(this.choice_p2 == this.PAPER)
              return "p1";
      }
      return "draw";
  }
}




