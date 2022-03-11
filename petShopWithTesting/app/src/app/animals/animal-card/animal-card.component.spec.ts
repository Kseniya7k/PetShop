import {HttpService} from "../../http.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AnimalCardComponent} from "./animal-card.component";
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


describe('Animal card component control', () => {
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
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/'
  });
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['deleteAnimalById']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AnimalCardComponent,
        {provide: HttpService, useValue: httpServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      declarations: [AnimalCardComponent]
    }).compileComponents();
  });

  it('should create the animal-card component', () => {
    const component = TestBed.createComponent(AnimalCardComponent);
    const app = component.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should onAnimalSelect on click', () => {
    const fixture = TestBed.createComponent(AnimalCardComponent);
    const component = fixture.componentInstance;
    component.animal = animal;
    spyOn(component.onAnimalSelect, 'emit');
    component.onClick();

    expect(component.onAnimalSelect.emit).toHaveBeenCalledWith(10);
  });

  it('should getAll on click', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const component = TestBed.inject(AnimalCardComponent)

    component.animal = animal;
    spyOn(component.getAll, 'emit');
    httpServiceSpy.deleteAnimalById.and.returnValue(of(10));
    component._deleteAnimal();

    expect(component.getAll.emit).toHaveBeenCalledWith();
    expect(httpServiceSpy.deleteAnimalById).toHaveBeenCalledOnceWith(10);
  });

  it('editAnimal testing', () => {
    const component = TestBed.inject(AnimalCardComponent);
    component.animal = animal;

    component._editAnimal();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['animal', animal.id]);
  });

  it('deleteAnimal fails', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    const component = TestBed.inject(AnimalCardComponent);
    component.animal = animal;
    spyOn(component.getAll, 'emit');

    httpServiceSpy.deleteAnimalById.and.returnValue(throwError(() => errorResponse));

    component._deleteAnimal();

    expect(window.alert).toHaveBeenCalledWith('Не удалось удалить животное');
  })
})
