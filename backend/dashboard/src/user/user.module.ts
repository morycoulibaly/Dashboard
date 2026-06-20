import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema'; // Adaptez le chemin selon votre structure
import { UsersService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UserModule {}
