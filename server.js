import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Blogging Platform API running`);
    console.log(`📡 URL: http://localhost:${PORT}/api/posts`);
    console.log('=================================');
});