import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './component/arena/arena.component';
import { CharacterComponent } from './component/character/character.component';
import { CreatorComponent } from './component/creator/creator.component';
import { LoginComponent } from './component/login/login.component';
import { VersusComponent } from './component/versus/versus.component';
import { LoginService } from './service/login.service';

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:'full'},
  {path:'character',component:CharacterComponent,pathMatch:'full'},
  {path:'arena',component:ArenaComponent,pathMatch:'full'},
  {path:'arena/pve',component:ArenaComponent,pathMatch:'full'},
  {path:'arena/pvp',component:VersusComponent,pathMatch:'full'},
  {path:'arena/pvp/begin',component:ArenaComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
