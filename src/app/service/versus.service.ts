import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersusService {
  private opp1:any;
  private opp2:any;
  private cpu2:any;

   
  constructor(){}

  setOpponent1(data:any){
    this.opp1 = data;
  }

  setOpponent2(data:any){
    this.opp2 = data;
  }

  setCPU2(data:any){
    this.cpu2 = data;
  }

  getOpponent1(){
    return this.opp1;
  }

  getOpponent2(){
    return this.opp2;
  }

  getCPU2(){
    return this.cpu2;
  }
}
