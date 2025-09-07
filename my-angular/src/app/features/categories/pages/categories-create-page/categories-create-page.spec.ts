import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCreatePage } from './categories-create-page';

describe('CategoriesCreatePage', () => {
  let component: CategoriesCreatePage;
  let fixture: ComponentFixture<CategoriesCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
