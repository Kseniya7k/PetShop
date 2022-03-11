import {TestBed} from "@angular/core/testing";
import {AddAnimalFormComponent} from "./add-animal-form.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpService} from "../http.service";
import {of, throwError} from "rxjs";
import {Animal} from "../types/animal";
import {AnimalListComponent} from "../animals/animal-list.component";
import {HttpErrorResponse} from "@angular/common/http";

describe('Add-animal-form component control', () => {
  const formBuilder: FormBuilder = new FormBuilder();
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
    url: `http://localhost:3000/create`
  });
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['createAnimal']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: 'home', component: AnimalListComponent}]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        AddAnimalFormComponent,
        {provide: HttpService, useValue: httpServiceSpy},
        {provide: FormBuilder, useValue: formBuilder}],
      declarations: [AddAnimalFormComponent]
    }).compileComponents();
  });

  it('should create the add-animal-form component', () => {
    const component = TestBed.createComponent(AddAnimalFormComponent);
    const app = component.componentInstance;
    expect(app).toBeTruthy();
  });

  it('onSubmit success', () => {
    const expectedAnimal: Animal = {
      name: 'Муся',
      type: 'Кошка',
      age: 1,
      sex: 'ж',
      color: 'белый',
      family: 'Cats',
      uniqueAbilities: 'кушать' }

    const component = TestBed.inject(AddAnimalFormComponent);
    component._formGroup = formBuilder.group({
      name: ['Муся', [Validators.required, Validators.minLength(2)]],
      type: ['Кошка', [Validators.required, Validators.minLength(2)]],
      age: [1, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      sex: ['ж'],
      color: ['белый', [Validators.required, Validators.maxLength(10)]],
      family: ['Cats', [Validators.required]],
      uniqueAbilities: ['кушать', [Validators.required, Validators.maxLength(17)]],
    });

    httpServiceSpy.createAnimal.and.returnValue(of({name: 'Муся'}));

    component._onSubmit();

    expect(httpServiceSpy.createAnimal).toHaveBeenCalledOnceWith(expectedAnimal);
  });

  it('onSubmit fails testing', () => {
    spyOn(window, 'alert');
    const component = TestBed.inject(AddAnimalFormComponent);

    component._formGroup = formBuilder.group({
      name: ['Муся', [Validators.required, Validators.minLength(2)]],
      type: ['Кошка', [Validators.required, Validators.minLength(2)]],
      age: [1, [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      sex: ['ж'],
      color: ['белый', [Validators.required, Validators.maxLength(10)]],
      family: ['Cats', [Validators.required]],
      uniqueAbilities: ['кушать', [Validators.required, Validators.maxLength(17)]],
    });

    httpServiceSpy.createAnimal.and.returnValue(throwError(() => errorResponse));

    component._onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Не удалось добавить животное');
  });
})
