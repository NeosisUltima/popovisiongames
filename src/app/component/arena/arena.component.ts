import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersusService } from 'src/app/service/versus.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit{
  constructor(private router:Router, private vsSvc:VersusService){

  }

  ngOnInit(): void {
    console.log(this.vsSvc.getCPU2());
    console.log(this.vsSvc.getOpponent1());
    if(this.vsSvc.getOpponent1() == undefined && this.vsSvc.getOpponent2() == undefined && this.vsSvc.getCPU2() == undefined){
      this.router.navigate(['arena/pvp']);
    }
  }

}
