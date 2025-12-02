import { Component, computed, inject, input, output } from '@angular/core';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  name = input.required<string>();
  age = input.required<number>();

  userService = inject(UserService);

  // Computed signal
  status = computed(() => (this.age() >= 18 ? 'Valid User' : 'Invalid User'));

  // Output event
  selected = output<string>();

  selectUser() {
    const formatted = this.userService.formatName(this.name());
    this.selected.emit(formatted);
  }
}
