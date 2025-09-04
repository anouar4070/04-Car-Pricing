import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  //make copy of UsersService
  constructor(private usersService: UsersService) {}
}
