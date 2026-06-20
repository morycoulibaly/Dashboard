import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: CreateUserDto) {
    const { password, ...user } = createUser;
    const email = createUser.email;
    const expectedUser = await this.findOnebyEmail(email);
    if (expectedUser) {
      throw new HttpException('email already exists please change', 422);
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ ...user, password: hashed });
    return newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findOnebyEmail(email: string) {
    const user = this.userModel.findOne({ email });
    return user;
  }
  async update(id: string, updateUser: UpdateUserDto) {
    const updateddUser = this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    return updateddUser;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
    return `user removes with success`;
  }

  async switchRole(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role == 'user') {
      user.role = 'admin';
    } else {
      user.role = 'user';
    }
    return user?.save();
  }
  findAdmin() {
    return this.userModel.find({ role: 'admin' });
  }
}
