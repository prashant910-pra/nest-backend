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
    MongooseModule.forRoot('mongodb+srv://puranikprashant3:Password123@cluster0.1b6ha.mongodb.net/prashant?retryWrites=true&w=majority&appName=Cluster0'),
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
