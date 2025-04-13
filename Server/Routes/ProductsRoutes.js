import express from 'express';
import {AddProducts, deleteproduct, getproduct, getproductByCategory, updateProduct, searchProducts} from '../Controllers/ProductController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/',upload.single('pic'), AddProducts);

router.get("/", getproduct);

router.get('/search', searchProducts);

router.get('/:category', getproductByCategory);

router.delete("/:productid",deleteproduct);

router.put("/:id", upload.single('pic'), updateProduct);  // Handle a single image file upload

export default router;