import express from 'express';
import routes from './src/routes/posts-routes.js';

// Cria uma instância do servidor Express
const app = express();

// Serve arquivos estáticos da pasta 'uploads'
app.use(express.static('uploads'));

// Habilita o middleware para analisar o corpo das requisições JSON
routes(app);

// Inicia o servidor Express na porta 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});