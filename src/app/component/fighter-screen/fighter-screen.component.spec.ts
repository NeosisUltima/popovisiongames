import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterScreenComponent } from './fighter-screen.component';

describe('FighterScreenComponent', () => {
  let component: FighterScreenComponent;
  let fixture: ComponentFixture<FighterScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FighterScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
