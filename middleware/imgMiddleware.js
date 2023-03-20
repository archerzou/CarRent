
import fs from 'fs';

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No files were choosen.' });
    }
    const files = Object.values(req.files).flat();
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      //---------------
      if (
        file.mimetype !== 'image/jpeg'
        && file.mimetype !== 'image/png'
        && file.mimetype !== 'image/jpg'
        && file.mimetype !== 'image/webp'
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: 'File format is incorrect, only JPEG/PNG/JPG are allowed.',
        });
      }
      //---------------
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: 'File size is too large maximum 10 mb allowed.',
        });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
