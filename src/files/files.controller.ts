
import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',  // local directory for storing files
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, filename);
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileData: CreateFileDto = {
      filename: file.filename,
      path: file.path,  
      originalName: file.originalname,
    };

    const savedFile = await this.filesService.saveFileMetadata(fileData);

    return {
      message: 'File uploaded and saved successfully!',
      file: savedFile,
    };
  }
}
