import {HttpService} from "../http.service";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EditAnimalFormComponent} from "./edit-animal-form.component";
import {ActivatedRoute, Router} from "@angular/router";
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

describe('Edit-animal-form component control', () => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
    url: 'url'
  });
  const animal = {
    "name": "Муся",
    "type": "Котёнок",
    "sex": "ж",
    "color": "рыжая",
    "age": 1,
    "family": "Cats",
    "uniqueAbilities": "спать",
    "id": 10
  };
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const activatedRouteSpy = {
      snapshot: {
        params: {
          id: '10'
        }
      }
    };
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['updateAnimalById', 'findAnimalById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        EditAnimalFormComponent,
        {provide: HttpService, useValue: httpServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: Router, useValue: routerSpy}
      ],
      declarations: [EditAnimalFormComponent]
    }).compileComponents();
  });

  it('should create the edit-animal-form component', () => {
    const component = TestBed.createComponent(EditAnimalFormComponent);
    const app = component.componentInstance;
    expect(app).toBeTruthy();
  });

  it('looking for an animal by id', () => {
    const component = TestBed.inject(EditAnimalFormComponent);
    httpServiceSpy.findAnimalById.and.returnValue(of(animal));

    component.ngOnInit();

    expect(component._animal).toEqual(animal)
  });

  it('searching for an animal by id ends with an error', () => {
    const component = TestBed.inject(EditAnimalFormComponent);

    httpServiceSpy.findAnimalById.and.returnValue(throwError(() => errorResponse));

    component.ngOnInit();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('error');
  });

  it('updates information about the animal', () => {
    const component = TestBed.inject(EditAnimalFormComponent);
    const form: NgForm = new NgForm([], []);
    httpServiceSpy.updateAnimalById.and.returnValue(of(animal));

    component._onSubmit(form);

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('home')
  });

  it('updating information about the animal ended with an error', () => {
    const component = TestBed.inject(EditAnimalFormComponent);
    const form: NgForm = new NgForm([], []);
    spyOn(window, 'alert');
    httpServiceSpy.updateAnimalById.and.returnValue(throwError(() => errorResponse));

    component._onSubmit(form);

    expect(window.alert).toHaveBeenCalledWith('Не удалось обновить животное');
  });
})
