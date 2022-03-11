import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Animal} from "../../types/animal";
import {Router} from "@angular/router";
import {AppState} from "../../store/state/app.state";
import { Store } from "@ngrx/store";
import {DeleteAnimal} from "../../store/actions/animal.actions";

@Component({
  selector: 'animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.less'],
  providers: [ ]
})
export class AnimalCardComponent {
  title = 'animal-card';

  @Input()
  animal: Animal;

  @Input()
  active: boolean;

  @Output()
  onAnimalSelect: EventEmitter<string> = new EventEmitter();

  @Output()
  getAll: EventEmitter<{}> = new EventEmitter();

  constructor(
    private router: Router,
    private _store: Store<AppState>
  ) {}

  onClick() {
    this.onAnimalSelect.emit(this.animal._id);
  }

  _editAnimal(): void {
    this.router.navigate(["animal", this.animal._id]);
  }

  _deleteAnimal(): void {
    const flagDelete = confirm(`Хотите удалить животное ${this.animal.type} ${this.animal.name}?`);
    if (flagDelete && this.animal._id) {
      this._store.dispatch(new DeleteAnimal(this.animal._id));
    }
  }
}
