import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = path.resolve('data/posts.json');

/**
 * @returns {Promise<Array>}
 */
async function readPostsFromFile() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error){
        if(error.code === 'ENOENT') return[];
        throw error;
    }
}

/**
 * retreiving posts from file
 * @param {Array} posts 
 * @return {Promise<Array>}
 */
async function writePostsToFile(posts){
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8'); 
}

export async function getAllPosts(searchTerm) {
    const posts = await readPostsFromFile();
    
    if (!searchTerm) {
        return posts;
    }

    const term = searchTerm.toLowerCase();
    return posts.filter(
        post => post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
    );
}                       


export async function createPost({ title, content, category, tags = [] }) {
    const posts = await readPostsFromFile();

    const newPost = {
        id: Date.now().toString(),
        title,
        content,
        category,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    posts.push(newPost);
    await writePostsToFile(posts);
    
    return newPost;
}

export async function updatePost(id, { title, content, category, tags }) {
    const posts = await readPostsFromFile();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
        return null;
    }

    const updatedPost = {
        ...posts[index],
        title: title !== undefined ? title : posts[index].title,
        content: content !== undefined ? content : posts[index].content,
        category: category !== undefined ? category : posts[index].category,
        tags: tags !== undefined ? tags : posts[index].tags,
        updatedAt: new Date().toISOString()
    };

    posts[index] = updatedPost;
    await writePostsToFile(posts);
    return updatedPost;
}

export async function deletePost(id) {
    const posts = await readPostsFromFile();
    const filteredPosts = posts.filter(post => post.id !== id);

    if (posts.length === filteredPosts.length) {
        return false; // Post was not found
    }

    await writePostsToFile(filteredPosts);
    return true;
}
