import fs from "fs";
import { getPostsModel, createPostModel, updatePostModel } from '../models/posts-models.js';
import generateDescriptionWithGemini from '../services/gemini-service.js';

// Função assíncrona para obter todos os posts do banco de dados
export async function getPosts(req, res) {
    // Obtém todos os posts usando a função `getPosts()`
    const posts = await getPostsModel();

    // Envia uma resposta JSON com o status 200 (OK) e os posts obtidos
    res.status(200).json(posts);
}

// Função assíncrona para criar um novo post no banco de dados
export async function createPost(req, res) {
    const newPost = req.body;

    try {
        // Cria um novo post no banco de dados
        const post = await createPostModel(newPost);

        // Envia uma resposta JSON com o status 201 (Created) e o post criado
        res.status(201).json(post);
    } catch (error) {
        // Envia uma resposta JSON com o status 400 (Bad Request) e a mensagem de erro
        res.status(400).json({ error: error.message });
    }
}

// Função assíncrona para fazer upload de uma imagem
export async function uploadImage(req, res) {
    // Cria um novo post com a URL da imagem enviada
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Cria um novo post no banco de dados
        const post = await createPostModel(newPost);

        // Define o caminho da imagem com o ID do post e a extensão .png
        const imageUrl = `uploads/${post._id}.png`;

        // Renomeia o arquivo de imagem para o ID do post e a extensão .png
        fs.renameSync(req.file.path, imageUrl);

        // Envia uma resposta JSON com o status 201 (Created) e o post criado
        res.status(201).json(post);
    } catch (error) {
        // Envia uma resposta JSON com o status 400 (Bad Request) e a mensagem de erro
        res.status(400).json({ error: error.message });
    }
}

// Função assíncrona para atualizar um post no banco de dados
export async function updatePost(req, res) {
    // Obtém o ID do post a ser atualizado
    const postId = req.params.id;

    // Define o caminho da imagem com o ID do post e a extensão .png
    const imageUrl = `http://localhost:3000/${postId}.png`;

    try {
        // Lê o arquivo de imagem do post usando o ID do post
        const imageBuffer = fs.readFileSync(`uploads/${postId}.png`);

        // Gera uma descrição para a imagem usando o serviço Gemini
        const descricao = await generateDescriptionWithGemini(imageBuffer);

        // Cria um objeto com a descrição e a URL da imagem atualizada
        const updatedPost = {
            descricao: descricao,
            imgUrl: imageUrl,
            alt: req.body.alt
        };

        // Atualiza o post no banco de dados
        const post = await updatePostModel(postId, updatedPost);

        // Envia uma resposta JSON com o status 200 (OK) e o post atualizado
        res.status(200).json(post);
    } catch (error) {
        // Envia uma resposta JSON com o status 400 (Bad Request) e a mensagem de erro
        res.status(400).json({ error: error.message });
    }
}