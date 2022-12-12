import { JsonPipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ItemList } from 'src/app/lists/ItemList';
import { Backpack } from 'src/app/model/Backpack';
import { Character } from 'src/app/model/Character';
import { Fighter } from 'src/app/model/Fighter';
import { PlayerCharacter } from 'src/app/model/PlayerCharacter';
import {DialogModule} from 'primeng/dialog';
import { throwIfEmpty } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { LoginService } from 'src/app/service/login.service';
import { VersusService } from 'src/app/service/versus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[MessageService]
})
export class LoginComponent implements OnInit,OnChanges {

  generateFile: boolean = false;
  formError:boolean;

  fileLocation:File | undefined;
  itemList: ItemList = new ItemList();

  rVal:number = 0;
  gVal:number = 0;
  bVal:number = 0;

  ErrorMessage:string;

  fighterType:any[] = [{
    atkStat: 5,
    defStat: 2,
    spdStat: 3,
    currentFighterType:"DRAGON"

  },{
    atkStat: 3,
    defStat: 2,
    spdStat: 5,
    currentFighterType:"IMP"
  },{
    atkStat: 2,
    defStat: 5,
    spdStat: 3,
    currentFighterType:"SLIME"
  }];

  selectedFighter:any;

  constructor(private router:Router, private msgService:MessageService,private primengConfig:PrimeNGConfig, private dropdownSvc:DropdownModule,private inputSvc:InputTextModule,private slideSvc:SliderModule,private loginSvc:LoginService, private vsSvc: VersusService){

  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onSubmit(form:NgForm){
    console.log(form.value);

  }

  register(){
    this.generateFile = true;
  }

  loginScreen(){
    this.generateFile = false;
  }

  getFiles(event: any) {
    // console.log(event.target.files);
    this.fileLocation = event.target.files[0]; 
    localStorage.setItem('path',event.target.files[0].path);
  }

  readFileTextInformation(){
    var data;
    if(this.fileLocation?.name.includes('.fght')){
      var fr = new FileReader();
      if(this.fileLocation){
        fr.readAsText(this.fileLocation);
      }
      fr.onloadend = (e) => {
        data = fr.result;
        //console.log(data);
        this.loginSvc.setfileAcceptance(JSON.parse(data as unknown as string));
        this.vsSvc.setOpponent1(JSON.parse(data as string));
        localStorage.setItem("userInformation",data as string);
        this.router.navigate(['character']);
      };      
    }
    else{
      this.ErrorMessage = "Incorrect File Type";
      this.formError=true;
    }    
  }

  checkForm(form:NgForm){
    // console.log(form.value.nameInp);
    // console.log(form.value.fightType);
    // console.log(form.value.fightInp);
    if(form.value.nameInp == "" || form.value.fightType ==undefined || form.value.fightInp ==""){
      this.formError = true;
      this.ErrorMessage = "Missing credentials in character generator."
    }
    else{
      this.formError = false;
    }
  }

  generate(form:NgForm){
    // console.log(form.value);
    this.checkForm(form)
    if(!this.formError){
      // console.log(form.value);
      let backpack = new Backpack();
      let fighter:any = {
        atkStat:form.value.fightType.atkStat,
        defStat:form.value.fightType.defStat,
        spdStat:form.value.fightType.spdStat,
        r : form.value.red,
        g : form.value.green,
        b : form.value.blue,
        monsterName: form.value.fightInp,
        currentFighterType: form.value.fightType.currentFighterType ,
        crown: false
      };
      let FightFighter = new Fighter(fighter)
      let character:any = {
        characterName:form.value.nameInp,
        characterChampion:FightFighter,
        characterId:Math.floor(Math.random()*1000000),
        characterBP:backpack
      };
      let CharacterFile = new PlayerCharacter(character);
      // console.log(CharacterFile);

      let jsonObj = JSON.stringify(CharacterFile);
      // console.log(jsonObj);

      this.saveFile(jsonObj,form.value.nameInp);
      this.selectedFighter = null;
      this.bVal = 0;
      this.rVal = 0;
      this.gVal = 0;
      this.generateFile = false;
    }
    //let character = new Character();
  }

  saveFile(jsonContent:any,fileName:any){
    var blob = new File([jsonContent],fileName+'.fght',{type:"application/json"})
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.href = url
    link.download = blob.name;
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}
