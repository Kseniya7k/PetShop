import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Animal} from "../../types/animal";
import {Router} from "@angular/router";
import {HttpService} from "../../http.service";

@Component({
  selector: 'animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.less'],
  providers: [ HttpService ]
})
export class AnimalCardComponent {
  title = 'animal-card';

  @Input()
  animal: Animal;

  @Input()
  active: boolean;

  @Output()
  onAnimalSelect: EventEmitter<number> = new EventEmitter();

  @Output()
  getAll: EventEmitter<{}> = new EventEmitter();

  constructor(
    private router: Router,
    private httpService: HttpService) {
  }

  onClick() {
    this.onAnimalSelect.emit(this.animal.id);
  }

  _editAnimal(): void {
    this.router.navigate(["animal", this.animal.id]);
  }

  _deleteAnimal(): void {
    const flagDelete = confirm(`Хотите удалить животное ${this.animal.type} ${this.animal.name}?`);
    if (flagDelete && this.animal.id) {
      this.httpService.deleteAnimalById(this.animal.id).subscribe({
        next: () => {
          this.getAll.emit();
        },
        error: err => {
          console.error(err);
          alert("Не удалось удалить животное");
        },
        complete: () => {}
      });
    }
  }
}
