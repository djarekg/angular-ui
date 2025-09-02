import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProtectedLayoutContainer from './protected-layout';

describe('ProtectedLayoutContainer', () => {
  let component: ProtectedLayoutContainer;
  let fixture: ComponentFixture<ProtectedLayoutContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtectedLayoutContainer],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProtectedLayoutContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
