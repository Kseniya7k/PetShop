import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EditAnimalFormComponent} from "./edit-animal-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: ':id',
    component: EditAnimalFormComponent,
  },
];

@NgModule({
  declarations: [
    EditAnimalFormComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: []
})

export class EditAnimalFormModule { }
