import { TestBed } from '@angular/core/testing';

import { BalancoDeVendasService } from './balanco-de-vendas.service';

describe('BalancoDeVendasService', () => {
  let service: BalancoDeVendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalancoDeVendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
