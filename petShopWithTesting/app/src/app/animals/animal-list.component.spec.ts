import {HttpService} from "../http.service";
import {TestBed} from "@angular/core/testing";
import {AnimalListComponent} from "./animal-list.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {of} from "rxjs";

describe('Animal-list component control', () => {
  const animals = [
    {
      "name": "Хедвик",
      "id": 3,
      "type": "Сова",
      "sex": "м",
      "color": "серый",
      "age": 1,
      "family": "Birds",
      "uniqueAbilities": "доставлять почту"
    },
    {
      "name": "Фоукс",
      "id": 4,
      "type": "Феникс",
      "sex": "м",
      "color": "оранжевый",
      "age": 101,
      "family": "Birds",
      "uniqueAbilities": "исцелять слезами"
    },
    {
      "name": "Симба",
      "id": 5,
      "type": "Лев",
      "sex": "м",
      "color": "жёлтый",
      "age": 1,
      "family": "Cats",
      "uniqueAbilities": "честность"
    },
    {
      "name": "Гав",
      "id": 6,
      "type": "Котёнок",
      "sex": "м",
      "color": "песочный",
      "age": 1,
      "family": "Cats",
      "uniqueAbilities": "искать неприятности"
    },
    {
      "id": 7,
      "name": "Симон",
      "type": "Кот",
      "sex": "м",
      "color": "серо-белый",
      "family": "Cats",
      "uniqueAbilities": "кушать и гулять",
      "age": 1
    },
    {
      "name": "Дружок",
      "type": "Пёс",
      "age": 1,
      "sex": "м",
      "color": "чёрный",
      "family": "Dogs",
      "uniqueAbilities": "бегать за кошкой",
      "id": 9
    },
    {
      "name": "Муся",
      "type": "Котёнок",
      "sex": "ж",
      "color": "рыжая",
      "age": 1,
      "family": "Cats",
      "uniqueAbilities": "спать",
      "id": 10
    }
  ];
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['getAnimals']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AnimalListComponent,
        {provide: HttpService, useValue: httpServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      declarations: [AnimalListComponent]
    }).compileComponents();
  });

  it('should create the animal-list component', () => {
    const component = TestBed.createComponent(AnimalListComponent);
    const app = component.componentInstance;
    expect(app).toBeTruthy();
  });

  it('returns animals', () => {
    const component = TestBed.inject(AnimalListComponent);
    httpServiceSpy.getAnimals.and.returnValue(of(animals));

    component.ngOnInit();

    expect(httpServiceSpy.getAnimals).toHaveBeenCalledOnceWith();
    expect(component._animals).toEqual(animals);
  });

  it('returns animals without cats', () => {
    const component = TestBed.inject(AnimalListComponent);
    component._animals = animals;

    component.filterAnimals();

    expect(component._animals.length).toBeLessThan(animals.length);
    expect(component._animals.find(animal => animal.family === 'Cats')).toBeUndefined();
  });

  it('add animal', () => {
    const component = TestBed.inject(AnimalListComponent);
    component._animals = animals;

    component.addAnimal();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['create']);
  });

  it('changes the id of the active animal', () => {
    const component = TestBed.inject(AnimalListComponent);
    component._animals = animals;

    component.activeAnimal(animals[6].id);

    expect(component._activeId).toEqual(10);
  });

  it('changes the flag isCatsShown = true', () => {
    const component = TestBed.inject(AnimalListComponent);
    component._animals = animals;
    component.isCatsShown = true;

    component.toggleCatsVisibility();

    expect(component.isCatsShown).toEqual(false);
  });

  it('changes the flag isCatsShown = false', () => {
    const component = TestBed.inject(AnimalListComponent);
    component.isCatsShown = false;
    httpServiceSpy.getAnimals.and.returnValue(of(animals));

    component.toggleCatsVisibility();

    expect(component.isCatsShown).toEqual(true);
  });
})
