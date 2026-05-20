import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStore } from './admin-store';

describe('AdminStore', () => {
  let component: AdminStore;
  let fixture: ComponentFixture<AdminStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
