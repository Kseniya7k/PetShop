import {TestBed} from "@angular/core/testing";
import {ErrorComponent} from "./error.component";

describe('Error component control', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ErrorComponent],
    }).compileComponents();
  });

  it('should create the app component', () => {
    const component = TestBed.createComponent(ErrorComponent);
    const app = component.componentInstance;
    expect(app).toBeTruthy();
  });

  it('h1 created in page error-component', () => {
    const fixture = TestBed.createComponent(ErrorComponent);
    const infoMessageEl: HTMLElement = fixture.nativeElement;
    const h1 = infoMessageEl.querySelector('h1');
    expect(h1!.textContent).toContain('Page Not Found');
  })
})
