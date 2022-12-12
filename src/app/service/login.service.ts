import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, VirtualTimeScheduler } from 'rxjs';
import { PlayerCharacter } from '../model/PlayerCharacter';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private characterInfo:any;
  private loggedin:boolean;
  private fileSubject = new BehaviorSubject<boolean>(false); 
   
  constructor(){}


  login(data:any) {
    //console.log("If you see this, then it worked"); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    if(data.characterName != "")
      this.fileSubject.next(true);
    else
      this.fileSubject.next(false);
  }

  public getfileAcceptance():Observable<boolean>{
    // console.log(this.characterInfo);
    if(localStorage.getItem("userInformation") != "" && !this.loggedin){
      this.fileSubject.next(true);
    }
    return this.fileSubject.asObservable();
  }

  public setfileAcceptance(data:any){
    //console.log(this.fileSubject.value);
    //console.log(data.characterName);
    if(data.characterName != ""){
      this.fileSubject.next(true);
      this.characterInfo = data;
      //console.log(this.characterInfo);
    }
    else{
      this.fileSubject.next(false);
    }
    
    //console.log(this.fileSubject.value);
  }

  public getCharacter(){
    if(this.characterInfo == undefined)
      this.characterInfo = JSON.parse(localStorage.getItem("userInformation") as string);
    let pVar = new PlayerCharacter(this.characterInfo);
    return pVar;
  }

  public logout(){
    this.loggedin = false;
    this.characterInfo = null;
    localStorage.removeItem("userInformation");
    this.fileSubject.next(false);
  }

  public saveFile(jsonContent:any,fileName:any){
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

  public updateCharacter(data:any){
    this.characterInfo = data;
    localStorage.setItem("userInformation",JSON.stringify(this.characterInfo));
  }
}
