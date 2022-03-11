import {Component, OnDestroy, OnInit,} from '@angular/core';
import {Animal} from "../types/animal";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../http.service";
import {Subject, takeUntil} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'edit-animal-form',
  templateUrl: './edit-animal-form.component.html',
  styleUrls: ['./edit-animal-form.component.less'],
  providers: [HttpService]
})
export class EditAnimalFormComponent implements OnInit, OnDestroy {
  _animal: Animal;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    const animalId = this.activeRoute.snapshot.params['id'];
    this.httpService.findAnimalById(animalId)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: animal => this._animal = animal,
        error: () => this.router.navigateByUrl('error'),
        complete: () => {
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  _onSubmit(form: NgForm): void {
    if (form.valid) {
      this.httpService.updateAnimalById(this._animal)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (_) => this.router.navigateByUrl('home'),
          error: err => {
            console.error(err);
            alert("Не удалось обновить животное");
          },
          complete: () => { }
        });
    }
  }
}
