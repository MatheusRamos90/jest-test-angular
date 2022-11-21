import {UsersService} from '../../../../../app/core/services/users/users.service';
import {User} from "../../../../../app/core/dtos/user";
import {of, pipe, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

describe('UsuariosService', () => {
  let httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  };
  let service = new UsersService(httpClient as any);

  it('should be get user by id with success', () => {
    let user: User = {
      id: '1',
      name: 'Matheus',
      lastname: 'Ramos'
    };
    jest.spyOn(httpClient, 'get').mockReturnValue(of(user));
    service.getById(1).subscribe((u: User) => {
      expect('Matheus').toEqual(u.name);
    });

    expect(httpClient.get).toBeCalled();
  });

  it('should be thrown when get user by id', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(() => 'Error'));
    service.getById(1).subscribe(value => {
      expect(value).toThrowError();
      expect('Error').toEqual(value);
    });
  });

  it('should be get all users with success', () => {
    let users: User[] = [
      {
        id: '1',
        name: 'Matheus',
        lastname: 'Ramos'
      }
    ];
    jest.spyOn(httpClient, 'get').mockReturnValue(of(users));
    service.getAll().subscribe(value => {
      expect(1).toEqual(value.length);
      expect('Matheus').toEqual(value[0].name);
    });
  });

  it('should be thrown when get all users', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(() => 'Error'));
    service.getAll().subscribe(value => {
      expect(value).toThrowError();
      expect('Error').toEqual(value);
    });
  });
});
