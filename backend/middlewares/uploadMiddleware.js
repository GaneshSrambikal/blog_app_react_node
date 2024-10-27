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

module.exports = upload;
