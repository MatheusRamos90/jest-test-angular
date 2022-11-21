import {UsersComponent} from "../../../../app/pages/users/users.component";
import {ActivatedRoute} from "@angular/router";

describe('UsuariosComponent', () => {
  const component = new UsersComponent(new ActivatedRoute());

  it('componente ok', () => {
    expect(component).toBeTruthy();
  });
});
