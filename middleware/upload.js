// middleware/upload.js
import multer, { diskStorage, MulterError } from 'multer';
import { extname } from 'path';
import { AppError } from './errorHandler';

// Configuración de almacenamiento
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG, GIF y WebP.', 400), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// Middlewares específicos
const uploadPlantImage = upload.single('imagen');
const uploadMultipleImages = upload.array('imagenes', 5); // Máximo 5 imágenes

const handleUploadError = (err, req, res, next) => {
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('El archivo es demasiado grande. Máximo 5MB.', 400));
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(new AppError('Demasiados archivos. Máximo 5 imágenes.', 400));
    }
  }
  next(err);
};

export default {
  uploadPlantImage,
  uploadMultipleImages,
  handleUploadError
};