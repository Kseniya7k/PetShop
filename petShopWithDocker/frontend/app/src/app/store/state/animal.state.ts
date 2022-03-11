import {Animal} from "../../types/animal";

export interface AnimalState {
  animals: Animal[],
  selectedAnimal: Animal | null
}

export const initialAnimalState: AnimalState = {
  animals: [],
  selectedAnimal: null
}
