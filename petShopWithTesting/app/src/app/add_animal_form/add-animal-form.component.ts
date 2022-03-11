import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../http.service";
import {Animal} from "../types/animal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'add-animal-form',
  templateUrl: './add-animal-form.component.html',
  styleUrls: ['./add-animal-form.component.less'],
  providers: [HttpService]
})

export class AddAnimalFormComponent implements OnInit, OnDestroy {
  _animal: Animal;
  _formGroup: FormGroup;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      sex: [''],
      color: ['', [Validators.required, Validators.maxLength(10)]],
      family: ['', [Validators.required]],
      uniqueAbilities: ['', [Validators.required, Validators.maxLength(17)]],
    });

    this.httpService.newSubject
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  _onSubmit(): void {
    if (this._formGroup.valid) {
      this.httpService
        .createAnimal(this._formGroup.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (_) => this.router.navigateByUrl('home'),
          error: err => {
            console.error(err);
            alert("Не удалось добавить животное");
          },
          complete: () => {}
        });
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
