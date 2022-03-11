import {Action} from "@ngrx/store";
import {Animal} from "../../types/animal";

export enum AnimalActions {
  GetAnimals = '[Animal] Get Animals',
  GetAnimalsSuccess = '[Animal] Get Animals Success',
  GetAnimalById = '[Animal] Get Animal By Id',
  GetAnimalByIdSuccess = '[Animal] Get Animal By Id Success',
  UpdateAnimal = '[Animal] Update Animal',
  DeleteAnimal = '[Animal] Delete Animal',
  CreateAnimal = '[Animal] Create Animal',
  GetAnimalsNoCats = '[Animal] Get Animals No Cats',
  RouteGo = '[Animal] Route Go',
}

export class GetAnimals implements Action {
  public readonly type = AnimalActions.GetAnimals;
}

export class GetAnimalsSuccess implements Action {
  public readonly  type = AnimalActions.GetAnimalsSuccess;
  constructor(public payload: Animal[]) { }
}

export class GetAnimalById implements Action {
  public readonly type = AnimalActions.GetAnimalById;
  constructor(public payload: string) { }
}

export class GetAnimalByIdSuccess implements Action {
  public readonly type = AnimalActions.GetAnimalByIdSuccess;
  constructor(public payload: Animal) { }
}

export class UpdateAnimal implements Action {
  public readonly type = AnimalActions.UpdateAnimal;
  constructor(public payload: Animal) { }
}

export class DeleteAnimal implements Action {
  public readonly type = AnimalActions.DeleteAnimal;
  constructor(public payload: string) { }
}

export class CreateAnimal implements Action {
  public readonly type = AnimalActions.CreateAnimal;
  constructor(public payload: Animal) { }
}

export class GetAnimalsNoCats implements Action {
  public readonly type = AnimalActions.GetAnimalsNoCats;
}


export class RouteGo implements Action {
  public readonly type = AnimalActions.RouteGo;
  constructor(public payload: { path: string, queryParams?: string }) {}
}

export type AnimalActionsType = GetAnimals | GetAnimalsSuccess | GetAnimalById | GetAnimalByIdSuccess
  | UpdateAnimal | DeleteAnimal | CreateAnimal | GetAnimalsNoCats | RouteGo;
