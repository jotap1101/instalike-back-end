import { GoogleGenerativeAI } from '@google/generative-ai';

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = generativeAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default async function generateDescriptionWithGemini(imageBuffer) {
    const prompt = 'Gere uma descrição curta e detalhada em português do Brasil para a seguinte imagem. O resultado deve ser somente a descrição.';

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString('base64'),
                mimeType: 'image/png'
            }
        };
        const response = await model.generateContent([prompt, image]);

        return response.response.text() || 'No description available.';
    } catch (error) {
        console.error('Failed to generate description with Gemini: ', error.message, error);
        throw new Error('Failed to generate description with Gemini.');
    }
}