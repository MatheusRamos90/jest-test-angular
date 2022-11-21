import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/dtos/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../../core/services/users/users.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  private edit = false;

  formGroup: FormGroup = this.formBuilder.group({
    id: [{ value: null, disabled: false }],
    name: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20)]],
    lastname: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20)]],
    email: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20)]],
    telephone: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20)]],
    location: this.formBuilder.group({
      address: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(40)]],
      zipcode: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(8)]],
      number: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(10)]],
      city: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20)]]
    })
  });

  constructor(
    private service: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.verifyRouteParams();
  }

  private verifyRouteParams() {
    this.route.params.subscribe((param: Params) => {
      if (param && param['id'] && param['id'] != 'new') {
        this.edit = true;
        this.getUserById(param['id']);
      }
    });
  }

  getUserById(id: number): void {
    this.service.getById(id).subscribe((user: User) => {
      if (!user) {
        console.error('User not found');
        this.router.navigate(['']);
      }

      this.formGroup.patchValue(user);
    });
  }

  save(): void {
    if (this.formGroup.invalid) {
      console.error('Invalid form');
      this.markFormGroupTouched(this.formGroup);
    } else {
      if (this.edit) {
        this.service.put(this.formGroup.value).subscribe((response: any) => {
          this.router.navigate([''], { queryParams: { route: 'users' } });
        });
      } else {
        this.service.save(this.formGroup.value).subscribe((response: any) => {
          this.router.navigate([''], { queryParams: { route: 'users' } });
        });
      }
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field: string) => {
      if (formGroup.get(field) && formGroup.get(field)?.invalid) {
        formGroup.get(field)?.markAsDirty();
        this.verifyFormGroupChildrensForMark(formGroup.controls[field]);
      }
    });
  }

  private verifyFormGroupChildrensForMark(formGroupChildren: any): void {
    // has controls (fields) in a children formGroup
    if (formGroupChildren.getRawValue()) {
      this.markFormGroupTouched(formGroupChildren);
    }
  }

}
