const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const getFileExtension = (file) => {
  return file.mimetype.split('/')[1];
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname, '..', 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
      const fileExtension = getFileExtension(file);
        const imageId = uuidv4()
        req.imageId =`${imageId}.${fileExtension}`
      cb(null,`${imageId}.${fileExtension}`)
    }
  })
  
  const uploads = multer({ storage: storage })

  const profstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  path.join(__dirname, '..', 'public', 'images'))
    },
    filename: function (req, file, cb) {
      const fileExtension = getFileExtension(file);
        const profId = uuidv4()
        req.profileImg = `${profId}.${fileExtension}`
      cb(null,`${profId}.${fileExtension}`)
    }
  })
  const profuploads = multer({ storage: profstorage })

  module.exports={
    uploads,
    profuploads
  }