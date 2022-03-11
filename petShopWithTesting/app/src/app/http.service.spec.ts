import {HttpService} from "./http.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Animal} from "./types/animal";
import {of, throwError} from "rxjs";
import { environment } from "src/environments/environment";

describe('Http service control', () => {
  const expectedAnimals: Animal[] =
    [{
      "name": "Муся",
      "id": 1,
      "type": "Кошка",
      "sex": "ж",
      "color": "рыжая",
      "age": 1,
      "family": "Cats",
      "uniqueAbilities": "быстро бегать за мышкой"
    },
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
      }];
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
    url: 'url'
  });
  const expectedAnimal: Animal = {
    "name": "Муся",
    "id": 1,
    "type": "Кошка",
    "sex": "ж",
    "color": "рыжая",
    "age": 1,
    "family": "Cats",
    "uniqueAbilities": "быстро бегать за мышкой"
  };
  const changedExpectedAnimal: Animal = {
    "name": "Муся",
    "id": 1,
    "type": "Котёнок",
    "sex": "ж",
    "color": "рыжая",
    "age": 1,
    "family": "Cats",
    "uniqueAbilities": "спать"
  };
  const response: Animal = {
    "name": "Муся",
    "type": "Котёнок",
    "sex": "ж",
    "color": "рыжая",
    "age": 1,
    "family": "Cats",
    "uniqueAbilities": "спать",
    "id": 10
  };
  const url = environment.serverUrl;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpService: HttpService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post', 'delete']);
    httpService = new HttpService(httpClientSpy);
  });

  it('getAnimals success', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedAnimals));

    httpService.getAnimals()
      .subscribe({
          next: animals => {
            expect(animals).toEqual(expectedAnimals);
            done();
          },
          error: done.fail
        }
      );
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`${url}/animals`);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    httpService.getAnimals().subscribe({
      error: error => {
        expect(error.error).toContain('test 404 error');
        done();
      }
    });
  });

  it('getting an animal by id', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedAnimal));

    httpService.findAnimalById(1)
      .subscribe({
          next: animal => {
            expect(animal).toEqual(expectedAnimal);
            done();
          },
          error: done.fail
        }
      );
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(`${url}/animals/1`);
  });

  it('update animal by id', (done: DoneFn) => {
    httpClientSpy.put.and.returnValue(of(changedExpectedAnimal));

    httpService.updateAnimalById(changedExpectedAnimal)
      .subscribe({
          next: animal => {
            expect(animal).toEqual(changedExpectedAnimal);
            done();
          },
          error: done.fail
        }
      );
    expect(httpClientSpy.put).toHaveBeenCalledOnceWith(`${url}/animals/1`, changedExpectedAnimal);
  });

  it('delete animal by id', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of({}));

    httpService.deleteAnimalById(1)
      .subscribe({
          next: animal => {
            expect(animal).toEqual({});
            done();
          },
          error: done.fail
        }
      );
    expect(httpClientSpy.delete).toHaveBeenCalledOnceWith(`${url}/animals/1`);
  });

  it('create Animal', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(response));

    httpService.createAnimal(changedExpectedAnimal)
      .subscribe({
          next: animal => {
            expect(animal).toEqual(response);
            done();
          },
          error: done.fail
        }
      );

    expect(httpClientSpy.post).toHaveBeenCalledOnceWith(`${url}/animals`, changedExpectedAnimal);
  });
})
