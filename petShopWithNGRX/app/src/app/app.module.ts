import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {AnimalListComponent} from "./animals/animal-list.component";
import {ErrorComponent} from "./error/error.component";
import {AnimalListModule} from "./animals/animal-list.module";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AnimalEffects} from "./store/effects/animal.effects";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {appReducers} from "./store/redusers/app.reducers";

const routes: Routes = [
  {
    path: 'home',
    component: AnimalListComponent
  },
  {
    path: 'create',
    loadChildren: () => import('../app/add_animal_form/add-animal-form.module').then(m => m.AddAnimalFormModule),
  },
  {
    path: 'animal',
    loadChildren: () => import('../app/edit_animal_form/edit-animal-form.module').then(m => m.EditAnimalFormModule),
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    redirectTo: 'animal-list',
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AnimalListModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AnimalEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    NoopAnimationsModule,
    MatSelectModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
