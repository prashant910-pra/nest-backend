
import { Module,MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './products.service';
import { ProductsController } from './Produts.controller';
import { Product,ProductSchema } from './schemas/product.schema';
import { User,UserSchema } from '../users/schemas/user.schema';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
