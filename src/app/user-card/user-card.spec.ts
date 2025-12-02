import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCard } from './user-card';
import { UserService } from '../services/user-service';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  const mockUserService = {
    formatName: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserCard],
      providers: [{ provide: UserService, useValue: mockUserService }],
    });

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('name', '');
    fixture.componentRef.setInput('age', 0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name', () => {
    fixture.componentRef.setInput('name', 'John');

    fixture.detectChanges();

    const html = fixture.nativeElement.textContent;
    expect(html).toContain('John');
  });

  it('shows Adult or Minor using @if', () => {
    fixture.componentRef.setInput('age', 16);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Minor');

    fixture.componentRef.setInput('age', 18);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Adult');
  });

  it('should emit name on button click', () => {
    const spy = vi.fn();
    component.selected.subscribe(spy);

    fixture.componentRef.setInput('name', 'John');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call service API', () => {
    fixture.componentRef.setInput('name', 'John');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(mockUserService.formatName).toHaveBeenCalled();
    expect(mockUserService.formatName).toHaveBeenCalledWith('John');
  });

  it('should call selectUser when button is clicked', () => {
    const spy = vi.spyOn(component, 'selectUser');

    const btn = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(spy).toHaveBeenCalled();
  });

  // it('more that 5 seconds', async () => {
  //   await new Promise<void>((resolve) => {
  //     setTimeout(() => resolve(), 5000);
  //   });
  // });

  function delayedGreet(callback: () => void) {
    setTimeout(() => callback(), 10000);
  }

  it('calls the callback after 10 second', () => {
    vi.useFakeTimers();

    const cb = vi.fn();
    delayedGreet(cb);

    expect(cb).not.toHaveBeenCalled();

    // Move virtual time forward
    vi.advanceTimersByTime(10000);

    expect(cb).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it.todo('for future');

  it.each([
    [1, 2, 3],
    [4, 5, 9],
    [10, 20, 30],
  ])('adds %i and %i to equal %i', (a, b, expected) => {
    expect(a + b).toBe(expected);
  });
});
