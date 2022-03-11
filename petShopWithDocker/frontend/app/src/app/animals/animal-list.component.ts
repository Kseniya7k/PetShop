import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {selectorAnimals} from "../store/selectors/animal.selector";
import {GetAnimals, GetAnimalsNoCats} from "../store/actions/animal.actions";

@Component({
  selector: 'animals',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.less'],
  providers: [ ]
})
export class AnimalListComponent implements OnInit {
  title = 'animal';
  isCatsShown = true;
  _animals = this._store.pipe(select(selectorAnimals));
  _activeId = '';

  constructor(
    private _store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  filterAnimals() {
    this._store.dispatch(new GetAnimalsNoCats());
  }

  getAll() {
    this._store.dispatch(new GetAnimals());
  }

  toggleCatsVisibility() {
    this.isCatsShown = !this.isCatsShown;
    this.isCatsShown ? this.getAll() : this.filterAnimals();
  }

  activeAnimal(id: string) {
    this._activeId = id;
  }

  addAnimal(): void {
    this.router.navigate(["create"]);
  }
}
