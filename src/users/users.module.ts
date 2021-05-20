import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserShema } from './shemas/user.shemas';
import { UsersController } from './users.controller';
import { Address, AddressShema } from './shemas/address.shemas';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserShema },
      { name: Address.name, schema: AddressShema },
    ]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
