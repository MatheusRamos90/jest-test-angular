import {UserEditComponent} from './user-edit.component';
import {UsersService} from "../../../core/services/users/users.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

describe('UserEditComponent', () => {
  const router = { navigate: jest.fn() };
  const service = new UsersService();
  const component = new UserEditComponent(service, new FormBuilder(), router as any, new ActivatedRoute());

  beforeEach(() => {
    router.navigate.mockClear();
  });

  it('deve constar que o formulário está inválido e que não foi redirecionado para tela inicial', () => {
    component.save();
    expect(component.formGroup.invalid).toBeTruthy();
    expect(component.user).toEqual({});
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('deve constar que o formulário está válido e redirecionar para tela inicial', () => {
    component.formGroup.setValue({
      name: 'Matheus',
      lastname: 'Ramos',
      email: 'matheus.hrs@live.com',
      telephone: '47998889999',
    });
    component.save();
    expect(component.formGroup.valid).toBeTruthy();
    expect(router.navigate).toHaveBeenCalled();
  });
});
