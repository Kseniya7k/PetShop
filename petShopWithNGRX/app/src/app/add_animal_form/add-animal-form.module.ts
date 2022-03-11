import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddAnimalFormComponent} from "./add-animal-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: AddAnimalFormComponent,
  },
];

@NgModule({
  declarations: [
    AddAnimalFormComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [],
  providers: []
})
export class AddAnimalFormModule { }
