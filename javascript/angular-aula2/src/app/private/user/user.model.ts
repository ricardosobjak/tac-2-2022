export class User {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    avatar!: string;
}

export class UserListResponse  {
    data!: User[];
    page!: number;
    per_page!: number;
    total!: number;
    total_pages!: number;
}