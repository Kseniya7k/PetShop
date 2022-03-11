import {AppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {AnimalState} from "../state/animal.state";

const animalSelector = (state: AppState) => state.animals;

export const selectorAnimals = createSelector(animalSelector, (state: AnimalState) => state.animals)
export const selectorSelectedAnimal = createSelector(animalSelector, (state: AnimalState) => state.selectedAnimal)
