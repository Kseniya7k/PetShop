import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Animal} from "./types/animal";
import {Observable, Subject} from "rxjs";
import {environment} from "../environments/environment";

@Injectable()
export class HttpService {

  url = environment.serverUrl;

  constructor(private http: HttpClient) {
  }

  getAnimals(): Observable<Animal[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set("Access-Control-Allow-Origin", "*");
    return this.http.get<Animal[]>(`${this.url}/animals`, { headers: httpHeaders });
  }

  findAnimalById(id: string) {
    return this.http.get<Animal>(`${this.url}/animals/${id}`);
  }

  updateAnimalById(animal: Animal) {
    return this.http.put(`${this.url}/animals/${animal._id}`, animal);
  }

  deleteAnimalById(id: string) {
    return this.http.delete(`${this.url}/animals/${id}`);
  }

  createAnimal(animal: Animal) {
    return this.http.post(`${this.url}/animals`, animal)
  }

  newSubject = new Subject();
}
