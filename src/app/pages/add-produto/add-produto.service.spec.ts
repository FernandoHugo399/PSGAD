import { TestBed } from '@angular/core/testing';

import { AddProdutoService } from './add-produto.service';

describe('AddProdutoService', () => {
  let service: AddProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
