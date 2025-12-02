import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  formatName(name: string) {
    // some external API calls
    return name.toUpperCase();
  }
}
