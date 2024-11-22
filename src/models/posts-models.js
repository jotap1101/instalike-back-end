import 'dotenv/config';
import { ObjectId } from 'mongodb';
import connectDB from '../config/db-config.js';

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida pela variável de ambiente 'CONNECTION_STRING'
const connection = await connectDB(process.env.CONNECTION_STRING);

// Função assíncrona para obter todos os posts do banco de dados
export async function getPostsModel() {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = connection.db('imersao-instabytes');

    // Seleciona a coleção 'posts' dentro do banco de dados
    const collection = db.collection('posts');

    // Retorna todos os documentos da coleção como um array
    return collection.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function createPostModel(post) {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = connection.db('imersao-instabytes');

    // Seleciona a coleção 'posts' dentro do banco de dados
    const collection = db.collection('posts');

    // Insere um novo documento na coleção com os dados do post fornecidos
    await collection.insertOne(post);

    // Retorna o post criado
    return post;
}

// Função assíncrona para atualizar um post no banco de dados
export async function updatePostModel(postId, post) {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = connection.db('imersao-instabytes');

    // Seleciona a coleção 'posts' dentro do banco de dados
    const collection = db.collection('posts');

    const objectId = ObjectId.createFromHexString(postId);

    // Atualiza o documento na coleção com o ID do post fornecido
    await collection.updateOne({ _id: new ObjectId(objectId) }, { $set: post });

    // Retorna o post atualizado
    return post;
}