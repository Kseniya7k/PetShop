import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {GetAnimalById, UpdateAnimal} from "../store/actions/animal.actions";
import {selectorSelectedAnimal} from "../store/selectors/animal.selector";

@Component({
  selector: 'edit-animal-form',
  templateUrl: './edit-animal-form.component.html',
  styleUrls: ['./edit-animal-form.component.less'],
  providers: []
})
export class EditAnimalFormComponent implements OnInit {
  animal$ = this._store.pipe(select(selectorSelectedAnimal))

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    const animalId: number = this.activeRoute.snapshot.params['id'];
    this._store.dispatch(new GetAnimalById(animalId));
  }

  _onSubmit(form: NgForm): void {
    if (form.valid) {
      this._store.dispatch(new UpdateAnimal({
        ...form.value,
        id: this.activeRoute.snapshot.params['id']
      }));
      form.reset();
      this.router.navigateByUrl('home')
    }
  }
}
