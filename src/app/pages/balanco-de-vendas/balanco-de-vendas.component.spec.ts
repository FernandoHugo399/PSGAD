import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancoDeVendasComponent } from './balanco-de-vendas.component';

describe('BalancoDeVendasComponent', () => {
  let component: BalancoDeVendasComponent;
  let fixture: ComponentFixture<BalancoDeVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancoDeVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancoDeVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
