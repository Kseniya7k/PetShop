import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('App component control', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const component = TestBed.createComponent(AppComponent);
    const app = component.componentInstance;
    expect(app).toBeTruthy();
  })
})
