// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './schemas/file.schema';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async saveFileMetadata(createFileDto: CreateFileDto): Promise<File> {
    const createdFile = new this.fileModel(createFileDto);
    return createdFile.save();
  }
}
