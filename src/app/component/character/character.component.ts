import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CPUBattleList } from 'src/app/lists/CPUBattleList';
import { PlayerCharacter } from 'src/app/model/PlayerCharacter';
import { LoginService } from 'src/app/service/login.service';
import { VersusService } from 'src/app/service/versus.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnChanges{

  LoggedIn:boolean;
  character:PlayerCharacter;

  characterList:CPUBattleList = new CPUBattleList();
  opponentChosen: any;
  itemChosen:any;

  quantitySize:any[];
  quantity:any;

  backpack: any;


  constructor(private router:Router,private primengConfig:PrimeNGConfig,private loginSvc:LoginService, private dropdown:DropdownModule, private dialog:DialogModule,private cd:ChangeDetectorRef, private vsSvc:VersusService){
    this.loginSvc.getfileAcceptance().subscribe(res => {
      this.LoggedIn = res;
    });
    // this.loginSvc.getCharacter();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.generateSizeOfItem(this.itemChosen);
  }

  ngOnInit(): void {

    if(this.LoggedIn){
      this.character = this.loginSvc.getCharacter();
      // console.log(this.character);
      this.backpack = this.character.characterBP;
    }

    // console.log(this.characterList.characters);
  }

  returnToLogin(){
    this.router.navigate(['']);
  }

  use(){
    this.character.characterBP.use(this.itemChosen,1,this.character.characterChampion);
    if(!this.character.characterBP.hasItem(this.itemChosen)){
      this.itemChosen = null;
    }
    this.loginSvc.updateCharacter(this.character);
    this.backpack = this.character.characterBP;
  }

  train(){
    this.vsSvc.setCPU2(this.opponentChosen);
    this.vsSvc.setOpponent1(this.character);
    console.log(this.vsSvc.getCPU2());
    this.router.navigate(['/arena/pve']);

  }

  callForChange(){
    this.cd.detectChanges();
    return this.quantitySize;
  }

  generateSizeOfItem(){
    this.quantitySize = [];
    for(let i = 1; i <= this.itemChosen.quantity;i++){
      this.quantitySize.push({amt: i})
    }
    console.log(this.quantitySize);
    
    return this.quantitySize;
  }
}
