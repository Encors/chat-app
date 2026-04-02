import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsListComponent } from './channels-list.component';

describe('ChannelsListComponent', () => {
  let component: ChannelsListComponent;
  let fixture: ComponentFixture<ChannelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
