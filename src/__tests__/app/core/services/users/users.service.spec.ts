import {UsersService} from '../../../../../app/core/services/users/users.service';
import {User} from "../../../../../app/core/dtos/user";
import {Observable, of, throwError} from "rxjs";

describe('UsuariosService', () => {
  let httpClient = {
    get: Observable,
    post: Observable,
    put: Observable,
    delete: Observable
  };
  let service = new UsersService(httpClient as any);
  let users: User[] = [
    {
      id: '1',
      name: 'Matheus',
      lastname: 'Ramos'
    }
  ];

  it('should be get user by id with success', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(users[0]));
    service.getById(1).subscribe((u: User) => {
      expect(u.name).toEqual('Matheus');
    });

    expect(httpClient.get).toBeCalled();
  });

  it('should be thrown when get user by id', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(() => 'Error'));
    service.getById(1).subscribe(value => {
      expect(value).toThrowError();
      expect(value).toEqual('Error');
    });
  });

  it('should be get all users with success', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(users));
    service.getAll().subscribe(value => {
      expect(value.length).toEqual(1);
      expect(value[0].name).toEqual('Matheus');
    });
  });

  it('should be thrown when get all users', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(throwError(() => 'Error'));
    service.getAll().subscribe(value => {
      expect(value).toThrowError();
      expect(value).toEqual('Error');
    });
  });

  it('should be remove user by id with success', () => {
    jest.spyOn(httpClient, 'delete').mockReturnValue(of(users[0]));
    service.remove(users[0].id).subscribe((u: User) => {
      expect(u.id).toEqual('1');
    });
    expect(httpClient.delete).toBeCalled();
  });

  it('should be thrown when remove user', () => {
    jest.spyOn(httpClient, 'delete').mockReturnValue(throwError(() => 'Error'));
    service.remove(users[0].id).subscribe(value => {
      expect(value).toThrowError();
      expect(value).toEqual('Error');
    });
  });

  it('should be save user with success', () => {
    const newUser: User = {
      name: 'George',
      lastname: 'Hummels'
    };
    jest.spyOn(httpClient, 'post').mockReturnValue(of(newUser));
    service.save(newUser).subscribe((u: User) => {
      expect(u.name).toEqual('George');
    });
    expect(httpClient.post).toBeCalled();
  });

  it('should be thrown when save user', () => {
    const newUser: User = {
      name: 'George',
      lastname: 'Hummels'
    };
    jest.spyOn(httpClient, 'post').mockReturnValue(throwError(() => 'Error'));
    service.save(newUser).subscribe(value => {
      expect(value).toThrowError();
      expect(value).toEqual('Error');
    });
  });

  it('should be update user with success', () => {
    const updateUser: User = {
      id: '1',
      name: 'George',
      lastname: 'Hummels'
    };
    jest.spyOn(httpClient, 'put').mockReturnValue(of(updateUser));
    service.put(updateUser).subscribe((u: User) => {
      expect(u.name).toEqual('George');
    });
    expect(httpClient.put).toBeCalled();
  });

  it('should be thrown when update user', () => {
    const updateUser: User = {
      id: '1',
      name: 'George',
      lastname: 'Hummels'
    };
    jest.spyOn(httpClient, 'put').mockReturnValue(throwError(() => 'Error'));
    service.put(updateUser).subscribe(value => {
      expect(value).toThrowError();
      expect(value).toEqual('Error');
    });
  });
});

