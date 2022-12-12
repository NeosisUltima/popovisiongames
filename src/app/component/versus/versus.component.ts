import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { LoginService } from 'src/app/service/login.service';
import { VersusService } from 'src/app/service/versus.service';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.scss'],
  providers: [MessageService]
})
export class VersusComponent implements OnInit {
  fileLocation1:File;
  fileLocation2:File;

  data1:any;
  data2:any;

  loggedIn: boolean;
  battlersSet:boolean;
  constructor(private router:Router, private msgService:MessageService,private primengConfig:PrimeNGConfig,private inputSvc:InputTextModule,private loginSvc:LoginService, private vsSvc:VersusService){

  }

  ngOnInit(): void {
    if(this.loginSvc.getCharacter() != undefined){
      this.loggedIn = true;
      this.data1 = this.loginSvc.getCharacter();
      this.vsSvc.setOpponent1(this.data1);
    }

  }

  getFiles(fileLocation: File, event: any) {
    // console.log(event.target.files);
    fileLocation = event.target.files[0]; 
    localStorage.setItem('path',event.target.files[0].path);
  }


  importP1File(event: any){
    this.fileLocation1 = event.target.files[0]; 
    this.readFileTextInformation(this.fileLocation1)
  }

  importP2File(event: any){
    this.fileLocation2 = event.target.files[0]; 
    this.readFileTextInformationP2(this.fileLocation2)
  }

  readFileTextInformation(fileLocation1: File){
    var fr = new FileReader();
    if(fileLocation1){
      fr.readAsText(fileLocation1);
    }
    fr.onloadend = (e) => {
      this.data1 = fr.result;
      this.data1 = JSON.parse(this.data1);
      this.vsSvc.setOpponent1(this.data1);
      this.checkBattlers();
    }; 
  }

  readFileTextInformationP2(fileLocation2:File){
    var fr = new FileReader();
    if(fileLocation2){
      fr.readAsText(fileLocation2);
    }
    fr.onloadend = (e) => {
      this.data2 = fr.result;
      this.data2 = JSON.parse(this.data2);
      this.vsSvc.setOpponent2(this.data2);
      this.checkBattlers();
    };
  }

  checkBattlers(){
    console.log(this.data1);
    console.log(this.data2);
    if(this.vsSvc.getOpponent1().characterName && this.vsSvc.getOpponent2().characterName)
      this.battlersSet = true;
  }

  beginBattle(){
    this.router.navigate(['arena/pvp/begin']);
  }

}
function readFileTextInformation2(fileLocation2: File | undefined, File: { new(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag | undefined): File; prototype: File; }) {
  throw new Error('Function not implemented.');
}

