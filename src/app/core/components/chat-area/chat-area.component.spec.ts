import { ComponentFixture, TestBed } from '@angular/core/testing';
import ChatAreaComponent from '@app/core/components/chat-area/chat-area.component';

describe('ChatAreaComponent', () => {
  let component: ChatAreaComponent;
  let fixture: ComponentFixture<ChatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAreaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
