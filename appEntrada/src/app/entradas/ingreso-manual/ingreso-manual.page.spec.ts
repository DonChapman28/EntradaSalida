import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoManualPage } from './ingreso-manual.page';

describe('IngresoManualPage', () => {
  let component: IngresoManualPage;
  let fixture: ComponentFixture<IngresoManualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresoManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
