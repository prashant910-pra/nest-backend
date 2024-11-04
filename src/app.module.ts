import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/Products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './products/upload.controller';
import { FilesModule } from './files/files.module';
 
@Module({
  imports: [
    MongooseModule.forRoot(''), ,//add mongoDB URL
    UsersModule,
    FilesModule,
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // URL path to access the uploaded files
    }),
  ],
  controllers: [AppController,UploadController],
  providers: [AppService],
})
export class AppModule {}
