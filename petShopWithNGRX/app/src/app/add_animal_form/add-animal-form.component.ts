import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Animal} from "../types/animal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../store/state/app.state";
import {CreateAnimal} from "../store/actions/animal.actions";

@Component({
  selector: 'add-animal-form',
  templateUrl: './add-animal-form.component.html',
  styleUrls: ['./add-animal-form.component.less'],
  providers: []
})

export class AddAnimalFormComponent implements OnInit {
  _animal: Animal;
  _formGroup: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _store: Store<AppState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      sex: [''],
      color: ['', [Validators.required, Validators.maxLength(20)]],
      family: ['', [Validators.required]],
      uniqueAbilities: ['', [Validators.required, Validators.maxLength(17)]],
    });
  }

  _onSubmit(): void {
    if (this._formGroup.valid) {
      this._store.dispatch(new CreateAnimal(this._formGroup.value));
      this.router.navigateByUrl('home');
    } else {
      alert("Не удалось добавить животное");
    }
  }

  get name() {
    return this._formGroup.get('name');
  }

  get type() {
    return this._formGroup.get('type');
  }

  get sex() {
    return this._formGroup.get('sex');
  }

  get color() {
    return this._formGroup.get('color');
  }

  get family() {
    return this._formGroup.get('family');
  }

  get age() {
    return this._formGroup.get('age');
  }

  get uniqueAbilities() {
    return this._formGroup.get('uniqueAbilities');
  }
}
