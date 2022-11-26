import {UsersComponent} from "../../../../app/pages/users/users.component";
import {User} from "../../../../app/core/dtos/user";
import {of} from "rxjs";

describe('UsuariosComponent', () => {
  let users: User[] = [
    {
      id: '1',
      name: 'Fred',
      lastname: 'Mercury'
    },
    {
      id: '2',
      name: 'John',
      lastname: 'Henrickson'
    }
  ];
  const service = {
    getAll: () => of(users),
    remove: () => of(204)
  };
  const router = { navigate: jest.fn() };
  const route = { queryParams: of({}) };
  const component = new UsersComponent(service as any, router as any, route as any);

  beforeEach(() => {
    component.ngOnInit();
    jest.spyOn(service, 'getAll');
  });

  it('should be get all users with success', () => {
    expect(component.users.length).toEqual(2);
    expect(component.users[0].name).toEqual('Fred');
    expect(component.users[1].name).toEqual('John');
    expect(component.currentViewScreen).toBeUndefined();
  });

  it('should be redirect to users page passing id', () => {
    component.edit(users[0]);
    expect(router.navigate).toBeCalled();
  });

  it('should be call user service to remove specific record', () => {
    component.remove(users[0]);
    jest.spyOn(service, 'remove');
    expect(users.length).toEqual(1);
  });
});
