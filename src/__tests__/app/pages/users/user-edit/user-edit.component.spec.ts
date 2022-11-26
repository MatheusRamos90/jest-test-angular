import {UserEditComponent} from '../../../../../app/pages/users/user-edit/user-edit.component';
import {FormBuilder} from "@angular/forms";
import {of} from "rxjs";
import {User} from "../../../../../app/core/dtos/user";

describe('UserEditComponent', () => {
  const service = {
    getById: (id: number) => of<{} | null>(),
    save: (value: any) => of({}),
    put: (value: any) => of({})
  };
  const router = { navigate: jest.fn() };
  const user: User = {
    name: 'Lukas',
    lastname: 'Tuprosky',
    email: 'lukas.tsky@gmail.com',
    telephone: '72855552222',
    location: {
      address: 'Main Street',
      zipcode: '14888244',
      number: '25',
      city: 'Moscow'
    }
  };

  beforeEach(() => {
    router.navigate.mockClear();
  });

  it('should be to verify route params with id to edit user', () => {
    const route = { params: of({ id: 1 }) };
    const component = new UserEditComponent(service as any, new FormBuilder(), router as any, route as any);
    component.ngOnInit();
    jest.spyOn(service, 'getById').mockReturnValue(of(user));
    expect(component.formGroup.invalid).toBeTruthy();
    expect(component['edit']).toEqual(true);
  });

  it('should be to return back page when not found user', () => {
    const route = { params: of({ id: 2 }) };
    const component = new UserEditComponent(service as any, new FormBuilder(), router as any, route as any);
    const userNotFound = null;
    jest.spyOn(service, 'getById').mockReturnValue(of(userNotFound));
    component.ngOnInit();
    expect(router.navigate).toBeCalled();
  });

  it('should be return that form is invalid', () => {
    const route = { params: of({}) };
    const component = new UserEditComponent(service as any, new FormBuilder(), router as any, route as any);
    component.save();
    expect(component.formGroup.invalid).toBeTruthy();
    expect(component.formGroup.get('name')?.hasError('required')).toBeTruthy();
    expect(component.formGroup.get('name')?.dirty).toBeTruthy();
  });

  it('should be save user after call save function', () => {
    const route = { params: of({ id: 'new' }) };
    const component = new UserEditComponent(service as any, new FormBuilder(), router as any, route as any);
    component.formGroup.patchValue(user);
    component.save();
    jest.spyOn(service, 'save');
    expect(component['edit']).toEqual(false);
    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should be update user after call save function', () => {
    const route = { params: of({ id: 1 }) };
    const component = new UserEditComponent(service as any, new FormBuilder(), router as any, route as any);
    component['edit'] = true;
    user.id = '1';
    component.formGroup.patchValue(user);
    component.save();
    jest.spyOn(service, 'put');
    expect(component['edit']).toEqual(true);
    expect(component.formGroup.valid).toBeTruthy();
  });

  it('should be to verify field invalid', () => {
    const route = { params: of({ id: 1 }) };
    const component = new UserEditComponent(service as any, new FormBuilder(), router as any, route as any);
    component.verifyFieldInvalid('location.city');
    expect(component.formGroup.invalid).toBeTruthy();
  });
});
