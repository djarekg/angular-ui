import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSkeleton } from './card-skeleton';

describe('CardSkeletonComponent', () => {
  let component: CardSkeleton;
  let fixture: ComponentFixture<CardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSkeleton],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
