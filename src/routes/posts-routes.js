import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { createPost, getPosts, updatePost, uploadImage } from '../controllers/posts-controller.js';

// Define o middleware de CORS
const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
};

// Define o armazenamento de arquivos para o upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Define o middleware de upload de arquivos
const upload = multer({ dest: './uploads', storage });

const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições JSON
    app.use(express.json());
    
    // Habilita o middleware de CORS
    app.use(cors(corsOptions));

    // Define uma rota GET para a URL '/api/posts/' (obter todos os posts)
    app.get('/api/posts/', getPosts);

    // Define uma rota POST para a URL '/api/posts/' (criar um novo post)
    app.post('/api/posts/', createPost);

    // Define uma rota de upload de imagens para a URL '/api/posts/upload/' (upload de imagens)
    app.post('/api/posts/upload/', upload.single('image'), uploadImage);

    app.put('/api/posts/upload/:id', updatePost);
}

export default routes;