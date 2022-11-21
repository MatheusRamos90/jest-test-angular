import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersService} from "../../core/services/users/users.service";
import {User} from "../../core/dtos/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  currentViewScreen?: string;
  users: User[] = [];

  constructor(
    private service: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.checkRouteParameters();
  }

  private loadUsers(): void {
    this.service.getAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  private checkRouteParameters(): void {
    this.route.queryParams.subscribe((param: Params) => {
      this.currentViewScreen = param['route'];
    });
  }

  edit(u: User): void {
    this.router.navigate([`users/${u.id}`], { replaceUrl: true });
  }

  remove(u: User): void {
    this.service.remove(u.id).subscribe((code: number) => {
      console.log(`User ${u.id} removed`);
      this.users.splice(this.users.indexOf(u), 1);
    });
  }
}
