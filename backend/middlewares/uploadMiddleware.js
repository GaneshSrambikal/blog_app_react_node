const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_app_react_node',
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'blog_app_react_node',
    });
    return result.secure_url;
  } catch (error) {
    return `Cloudinary upload failed: ${error.message}`;
  }
};

module.exports = { upload, uploadToCloudinary };
