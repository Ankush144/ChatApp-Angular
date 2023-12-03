import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelUsingMaterialComponent } from './excel-using-material.component';

describe('ExcelUsingMaterialComponent', () => {
  let component: ExcelUsingMaterialComponent;
  let fixture: ComponentFixture<ExcelUsingMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelUsingMaterialComponent]
    });
    fixture = TestBed.createComponent(ExcelUsingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
