import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dovighfuo',
      api_key: '552798269998812',
      api_secret: 'MwS8ljg-8GJ1m0R7ExQDW6tgCcU'
    });
  }
  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload)
    })

  }

}


