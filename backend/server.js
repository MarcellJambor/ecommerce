import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

const app = express();
const port = 5001;
app.use(cors())
app.use(express.json());

const { Schema } = mongoose;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect('mongodb+srv://jambomarc2003:ivfu5pmCeivx2Nw0@ecommerce.lsts5.mongodb.net/');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: {
      filename: String,
      data: Buffer,
      contentType: String,
    },
  });

const Product = mongoose.model('Product', productSchema);


app.get('/get',async (req, res) => {
try {
  const products = await Product.find();
  res.json(products);
} catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
}
})

app.get('/items', async (req, res) => {
  const { category } = req.query;

  try {
    let products;
    
    if (!category) {
      products = await Product.find();
    } else {
      products = await Product.find({ category });
    }

    res.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

app.get('/product/:id', async (req,res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    
      const product = await Product.findById(id);
      
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);

  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Error fetching product');
  }
});

app.get('/image/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product || !product.image || !product.image.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', product.image.contentType);
    
    res.send(product.image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Product({
            name,
            description,
            price: parseFloat(price),
            category,
            image: {
              filename: req.file.originalname,
              data: req.file.buffer,
              contentType: req.file.mimetype,
            },
          });
          await newProduct.save();
          res.send('Product uploadid sucessfully!')

    } catch (error) {
        res.status(500).send('Error uploading product')
    }
});

app.get('/edit/:id',async (req,res) => {
  try {
    const {id} = req.params;
    const editproduct = await Product.findById(id);
    res.json(editproduct);
  } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
  }
});

app.put('/edit/:id',upload.single('image'), async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category } = req.body;
  
      
      const updateData = {
            name: req.body.name || existingProduct.name,
            description: req.body.description || existingProduct.description,
            price: req.body.price ? parseFloat(req.body.price) : existingProduct.price,
            category: req.body.category || existingProduct.category,
      };

      const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).send('Product not found');
        }
  
      
      if (req.file) {
        updateData.image = {
          filename: req.file.originalname,
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
  
      
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.send('Product updated successfully');
    } catch (error) {
      res.status(500).send('Error updating product');
    }
  });

  app.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
  
      res.send('Product deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting product');
    }
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });