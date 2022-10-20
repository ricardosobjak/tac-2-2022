export class User {
  id!: number;
  email!: string;
  first_name!: string;
  last_name!: string;
  avatar!: string;
  job!: string;

  get name() {
    return this.first_name + ' ' + this.last_name;
  }
}

export interface SingleUserResponse {
  data: User;
  ad: [];
}

export class UserListResponse {
  page!: number;
  per_page!: number;
  total!: number;
  total_pages!: number;
  data!: User[];
  ad!: [];
}
