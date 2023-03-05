
import dotenv from "dotenv"
import express from 'express'
import wishRouter from './routes/wish.routes.js'
import multer from 'multer'

dotenv.config()


const app = express()

const PORT = process.env.PORT || 4444

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.use('/api', wishRouter)


app.listen(PORT,  (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});