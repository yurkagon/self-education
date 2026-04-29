import { Pipe, PipeTransform } from '@angular/core';

import IUser from './interfaces/user';

@Pipe({ name: 'filterBySearch' })
export class FilterBySearch implements PipeTransform {
  transform(users: Array<IUser>, str: string): Array<IUser> {
    if (!str.length) {
      return users;
    }

    const filter = str.toLowerCase();

    return users.filter(({ name, username }) =>
      name.toLowerCase().includes(filter) || username.toLowerCase().includes(filter)
    );
  }
}
