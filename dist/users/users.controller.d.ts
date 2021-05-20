import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(CreateUserDto: CreateUserDto): Promise<import("./shemas/user.shemas").User>;
    profile(req: any): any;
}
