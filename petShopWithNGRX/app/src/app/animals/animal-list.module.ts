import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AnimalCardComponent} from "./animal-card/animal-card.component";
import {AnimalListComponent} from "./animal-list.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpService} from "../http.service";

const routes: Routes = [
  {
    path: "",
    component: AnimalListComponent
  }
]
@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AnimalListComponent
  ],
  providers: [ HttpService ]
})
export class AnimalListModule { }
