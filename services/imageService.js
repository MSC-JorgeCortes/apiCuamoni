// services/imageService.js
import sharp from 'sharp';
import { promises as fs } from 'fs';
import { basename, extname, dirname, join } from 'path';
import { AppError } from '../middleware/errorHandler.js';

class ImageService {
  async processPlantImage(imagePath, options = {}) {
    try {
      const {
        width = 800,
        height = 600,
        quality = 80,
        format = 'jpeg'
      } = options;

      const processedImage = await sharp(imagePath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality })
        .toBuffer();

      // Guardar imagen procesada
      const processedPath = imagePath.replace(/(\.[\w]+)$/, `_processed$1`);
      await fs.writeFile(processedPath, processedImage);

      return processedPath;
    } catch (error) {
      throw new AppError('Error procesando la imagen', 500);
    }
  }

  async generateThumbnail(imagePath, size = 200) {
    try {
      const thumbnail = await sharp(imagePath)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 70 })
        .toBuffer();

      const thumbPath = imagePath.replace(/(\.[\w]+)$/, `_thumb$1`);
      await fs.writeFile(thumbPath, thumbnail);

      return thumbPath;
    } catch (error) {
      throw new AppError('Error generando miniatura', 500);
    }
  }

  async deleteImage(imagePath) {
    try {
      await fs.unlink(imagePath);
      
      // También eliminar versiones procesadas si existen
      const baseName = basename(imagePath, extname(imagePath));
      const dirName = dirname(imagePath);
      
      const files = await fs.readdir(dirName);
      const relatedFiles = files.filter(file => 
        file.startsWith(baseName) && file !== basename(imagePath)
      );

      for (const file of relatedFiles) {
        await fs.unlink(join(dirName, file));
      }
    } catch (error) {
      console.error('Error eliminando imagen:', error);
    }
  }

  async validateImageDimensions(imagePath, minWidth = 300, minHeight = 300) {
    try {
      const metadata = await sharp(imagePath).metadata();
      return metadata.width >= minWidth && metadata.height >= minHeight;
    } catch (error) {
      throw new AppError('Error validando dimensiones de la imagen', 400);
    }
  }
}

export default new ImageService();