import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [ConfirmationService,MessageService]
})

export class NavComponent implements OnInit,OnChanges{
  
  items:MenuItem[] = [];
  position: string;
  userInformation: any = localStorage.getItem('path');
  logout:boolean;
  saveInformation:boolean;
  @Input() userFileAccepted: boolean;

  constructor(private router:Router,private primengConfig:PrimeNGConfig,private loginSvc:LoginService,
    private confirmationService: ConfirmationService, private messageService: MessageService,private dialog:DialogModule){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.userFileAccepted);
    this.ngOnInit();
  }

  ngOnInit(): void{
    this.updateItems();
  }

  updateItems(){
    let checker;
    this.loginSvc.getfileAcceptance().subscribe(res => {checker = res});

    this.items = [
      {
        label:'Character',
        icon:'pi pi-fw pi-id-card',
        routerLink:['character'],
      },
      {
        label:'Versus',
        icon:'pi pi-fw pi-users',
        routerLink:['arena/pvp'],
      },
      {
        label:'Logout',
        icon:'pi pi-fw pi-power-off',
        visible: checker,
        command: ()=>{
          this.logout = true;
        }
      }
    ];
  }

  proceedLogout(){
    this.saveInformation = true;
    this.logout = false;
  }

  logoutPlayer(){
    this.loginSvc.logout();
    this.saveInformation = false;
    this.router.navigate(['']);
  }

  savePlayer(){
    this.loginSvc.saveFile(JSON.stringify(this.loginSvc.getCharacter()),this.loginSvc.getCharacter().characterName);
    this.logoutPlayer();
  }
}
