
import { Injectable,ConflictException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model,SortOrder  } from 'mongoose';
import { Product } from './schemas/product.schema';
import { User } from '../users/schemas/user.schema';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<Product>,
  @InjectModel(User.name) private UserModel: Model<User>
) {}

  async create(CreateProductDto: any): Promise<Product> {   
    
    const createdUser = new this.ProductModel(CreateProductDto);
    return createdUser.save();
  }

  async findAll(filters: FindProductDto): Promise<any> {
    const query: any = {};

    if (filters.product_name) {
      query.product_name = { $regex: filters.product_name, $options: 'i'  }; // Case-insensitive match
    }

    if (filters.description) {
      query.description = { $regex: filters.description, $options: 'i'  };
    }

    if (filters.deleted) {
      query.deleted = filters.deleted;
    }
 
    
  const limit = filters.limit || 10; // Default limit is 10
  const page = filters.page || 1;
  const skip = (page - 1) * limit;
  const sort: [string, SortOrder][] = filters.sortBy ? [[filters.sortBy, 1]] : [];
  const totalCount = await this.ProductModel.countDocuments(query);
    const records = await this.ProductModel.find(query).populate('user_id').limit(limit).skip(skip).sort(sort).exec();
   
    return {
      totalCount,
      records
    }
  }

  async findById(id: string): Promise<any> {
    const user = await this.ProductModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async searchProducts(filters: FindProductDto): Promise<any> {
    const regex = new RegExp(filters.keyword, 'i'); // Create a case-insensitive regex
    const limit = filters.limit || 10; // Default limit is 10
    const page = filters.page || 1;
    const skip = (page - 1) * limit;
    const sort: [string, SortOrder][] = filters.sortBy ? [[filters.sortBy, 1]] : [];
    
     const totalCount = await this.ProductModel.countDocuments({
      $or: [
        { product_name: { $regex: regex } }, // Match name
        { description: { $regex: regex } }, // Match desc
      ],
    });
    const records = await this.ProductModel.find({
      $or: [
        { product_name: { $regex: regex } }, // Match name
        { description: { $regex: regex } }, // Match desc
      ],
    }).populate('user_id').limit(limit).skip(skip).sort(sort).exec();
   
    return {
      totalCount,
      records
    }
  }

  async update(id: string, updateUserDto: UpdateProductDto): Promise<Product> {
    const user = await this.ProductModel.findByIdAndUpdate(id, updateUserDto, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated fields
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }




 
}
