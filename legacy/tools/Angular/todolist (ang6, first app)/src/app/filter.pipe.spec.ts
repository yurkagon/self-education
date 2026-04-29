import { FilterBySearch } from './filter.pipe';
import IUser from './interfaces/user';

import mockUsers from './mock/users';

describe('Filter pipe', () => {
  const pipe: FilterBySearch = new FilterBySearch();

  it('should return given array without filter string', () => {
    const result: Array<IUser> = pipe.transform(mockUsers, '');
    expect(result).toBe(mockUsers);
  });
  it('should return correct filtered array', () => {
    const filter = 'FiLteRmarK';
    const result: Array<IUser> = pipe.transform(mockUsers, filter);
    expect(result.length).toBe(2);
    expect(result[0].id).toBe(mockUsers[1].id);
    expect(result[1].username.includes(filter)).toBeTruthy();
  });
});
