import {Component, OnInit} from "@angular/core";
import {AnimalCardComponent} from "./animal-card/animal-card.component";
import {Animal} from "../types/animal";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'animals',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.less'],
  providers: [
    AnimalCardComponent,
    HttpService
  ]
})
export class AnimalListComponent implements OnInit {
  title = 'animal';
  isCatsShown = true;
  _animals: Animal[] = [];
  _activeId: number = 0;

  constructor(
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  filterAnimals() {
    this._animals = this._animals.filter(animal => animal.family !== "Cats");
  }

  getAll() {
    this.httpService.getAnimals().subscribe((data: Animal[]) => this._animals = data);
  }

  toggleCatsVisibility() {
    this.isCatsShown = !this.isCatsShown;
    this.isCatsShown ? this.getAll() : this.filterAnimals();
  }

  activeAnimal(id: number) {
    this._activeId = id;
  }

  addAnimal(): void {
    this.router.navigate(["create"]);
  }
}
