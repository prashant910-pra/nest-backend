
import { Injectable,ConflictException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model,SortOrder  } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(CreateUserDto: any): Promise<User> {
   
    const existingUser = await this.UserModel.findOne({ email: CreateUserDto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(CreateUserDto.password);
    const newUser = { ...CreateUserDto, password: hashedPassword,status: CreateUserDto.deleted || 0, };
    const createdUser = new this.UserModel(newUser);
    return createdUser.save();
  }

  async findAll(filters: FindUserDto): Promise<any> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' }; 
    }

    if (filters.email) {
      query.email = { $regex: filters.email, $options: 'i' };
    }

    if (filters.type) {
      query.type = filters.type; 
    }

    if (filters.deleted) {
      query.deleted = filters.deleted; 
    }

    if (filters.start && filters.end) {
      query.createdAt= {
        $gte: new Date(filters.start),
        $lte: new Date(filters.end),
      }
    }

   console.log(query)

    const limit = filters.limit || 10; 
  const page = filters.page || 1;
  const skip = (page - 1) * limit;
  const sort: [string, SortOrder][] = filters.sortBy ? [[filters.sortBy, 1]] : [];
   
    const totalCount = await this.UserModel.countDocuments(query);
    const records = await this.UserModel.find(query).limit(limit).skip(skip).sort(sort).exec();
    return {
      totalCount,
      records
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async searchUsers(filters: FindUserDto): Promise<any> {
    const regex = new RegExp(filters.keyword, 'i'); 
    const limit = filters.limit || 10;
    const page = filters.page || 1;
    const skip = (page - 1) * limit;
    const sort: [string, SortOrder][] = filters.sortBy ? [[filters.sortBy, 1]] : [];
    

    const totalCount = await this.UserModel.countDocuments({
      $or: [
        { name: { $regex: regex } }, 
        { email: { $regex: regex } }, 
        { phone: { $regex: regex } }, 
        
      ],
    });
    const records = await this.UserModel.find({
      $or: [
        { name: { $regex: regex } }, 
        { email: { $regex: regex } },
        { phone: { $regex: regex } },
      ],
    }).limit(limit).skip(skip).sort(sort).exec();
   
    return {
      totalCount,
      records
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; 
    return await bcrypt.hash(password, saltRounds);
  }

  
  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }


  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.UserModel.findOne({ email: loginUserDto.email });
    if (!user || (user && user.deleted == 1)) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.validatePassword(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    return user; 
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true, 
      runValidators: true,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
