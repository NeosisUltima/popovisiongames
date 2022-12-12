import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaScreenComponent } from './arena-screen.component';

describe('ArenaScreenComponent', () => {
  let component: ArenaScreenComponent;
  let fixture: ComponentFixture<ArenaScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenaScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArenaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
