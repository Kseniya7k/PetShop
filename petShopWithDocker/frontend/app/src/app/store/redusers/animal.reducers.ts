import {AnimalState, initialAnimalState} from "../state/animal.state";
import {AnimalActions, AnimalActionsType} from "../actions/animal.actions";

export const animalReducers = (
    state = initialAnimalState,
    action: AnimalActionsType
): AnimalState => {
  switch (action.type) {
    case AnimalActions.GetAnimalsSuccess:
      return {
        ...state,
        animals: action.payload
      };
    case AnimalActions.GetAnimalByIdSuccess:
      return {
        ...state,
        selectedAnimal: action.payload
      }
    default:
      return state
  }
}
