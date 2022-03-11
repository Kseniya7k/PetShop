import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  AnimalActions,
  CreateAnimal,
  DeleteAnimal,
  GetAnimalById,
  GetAnimalByIdSuccess,
  GetAnimals,
  GetAnimalsNoCats,
  GetAnimalsSuccess,
  RouteGo,
  UpdateAnimal
} from "../actions/animal.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpService} from "../../http.service";
import {Animal} from "../../types/animal";
import {Router} from "@angular/router";


@Injectable()
export class AnimalEffects {

  getAnimals = createEffect(() => {
    return this.actions$.pipe(
      ofType<GetAnimals>(AnimalActions.GetAnimals),
      switchMap(() => this.httpService.getAnimals()),
      switchMap((animalResponse: Animal[]) => of(new GetAnimalsSuccess(animalResponse))),
      catchError(err => of(new RouteGo({path: 'error'})))
      );
  });

  getAnimalById = createEffect(() => {
    return this.actions$.pipe(
      ofType<GetAnimalById>(AnimalActions.GetAnimalById),
      map(action => action.payload),
      switchMap(id => this.httpService.findAnimalById(id)),
      switchMap((animalResponse: Animal) => of(new GetAnimalByIdSuccess(animalResponse))),
      catchError(err => of(new RouteGo({path: 'error'})))
      );
  });

  updateAnimal = createEffect(() => {
    return this.actions$.pipe(
      ofType<UpdateAnimal>(AnimalActions.UpdateAnimal),
      map(action => action.payload),
      switchMap(animal => this.httpService.updateAnimalById(animal)),
      switchMap(() => this.httpService.getAnimals()),
      switchMap((animalResponse: Animal[]) => of(new GetAnimalsSuccess(animalResponse))));
  });

  deleteAnimal = createEffect(() => {
    return this.actions$.pipe(
      ofType<DeleteAnimal>(AnimalActions.DeleteAnimal),
      map(action => action.payload),
      switchMap(id => this.httpService.deleteAnimalById(id)),
      switchMap(() => this.httpService.getAnimals()),
      switchMap((animalResponse: Animal[]) => of(new GetAnimalsSuccess(animalResponse))));
  });

  createAnimal = createEffect(() => {
    return this.actions$.pipe(
      ofType<CreateAnimal>(AnimalActions.CreateAnimal),
      map(action => action.payload),
      switchMap(animal => this.httpService.createAnimal(animal)),
      switchMap(() => this.httpService.getAnimals()),
      switchMap((animalResponse: Animal[]) => of(new GetAnimalsSuccess(animalResponse))),
      catchError(err => of(new RouteGo({path: 'error'})))
    );
  });

  getAnimalsNoCats = createEffect(() => {
    return this.actions$.pipe(
      ofType<GetAnimalsNoCats>(AnimalActions.GetAnimalsNoCats),
      switchMap(() => this.httpService.getAnimals()),
      switchMap((animalResponse: Animal[]) => of(new GetAnimalsSuccess(animalResponse.filter(animal => animal.family !== "Cats"))))
    )
  });

  routeGo = createEffect(() => {
    return this.actions$.pipe(
      ofType<RouteGo>(AnimalActions.RouteGo),
      map(action => action.payload),
      tap(({ path }) => this.router.navigateByUrl(path)))
  }, {
    dispatch: false
  });

  constructor(
    private httpService: HttpService,
    private actions$: Actions,
    private router: Router
  ) { }
}
