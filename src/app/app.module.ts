import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MessageModule} from 'primeng/message'
import {MessagesModule} from 'primeng/messages'
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { CreatorComponent } from './component/creator/creator.component';
import { CharacterComponent } from './component/character/character.component';
import { ArenaComponent } from './component/arena/arena.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './component/nav/nav.component';
import { VersusComponent } from './component/versus/versus.component';
import { FighterScreenComponent } from './component/fighter-screen/fighter-screen.component';
import { LoginService } from './service/login.service';
import {ConfirmationService, SharedModule } from 'primeng/api';
import { ArenaScreenComponent } from './component/arena-screen/arena-screen.component';
import { VersusService } from './service/versus.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatorComponent,
    CharacterComponent,
    ArenaComponent,
    NavComponent,
    VersusComponent,
    FighterScreenComponent,
    ArenaScreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    MenubarModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    SliderModule,
    SharedModule,
    InputTextModule
  ],
  providers: [LoginService,VersusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
