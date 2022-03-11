import {RouterReducerState} from "@ngrx/router-store";
import {AnimalState, initialAnimalState} from "./animal.state";

export interface AppState {
  router?: RouterReducerState;
  animals: AnimalState
}

export const initialAppState: AppState = {
  animals: initialAnimalState
};

export function getInitialState(): AppState {
  return initialAppState
}
