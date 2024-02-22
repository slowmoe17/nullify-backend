import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dovighfuo', 
  api_key: '552798269998812', 
  api_secret: 'MwS8ljg-8GJ1m0R7ExQDW6tgCcU' 
});
@Injectable()
export class CloudinaryService {
  async uploadImage(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
