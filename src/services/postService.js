import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = path.resolve('data/posts.json');

/**
 * Reads all posts from the JSON data file.
 * Returns an empty array if the file does not exist (ENOENT).
 *
 * @async
 * @function readPostsFromFile
 * @returns {Promise<Array<Object>>} Resolves to an array of post objects.
 * @throws {Error} Throws an error if reading or parsing the file fails.
 */
async function readPostsFromFile() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

/**
 * Writes an array of posts to the JSON data file.
 *
 * @async
 * @function writePostsToFile
 * @param {Array<Object>} posts - The array of post objects to save.
 * @returns {Promise<void>} Resolves when the file has been successfully written.
 */
async function writePostsToFile(posts) {
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

/**
 * Retrieves all blog posts, optionally filtered by a search term.
 * Matches search terms against title, content, and category (case-insensitive).
 *
 * @async
 * @function getAllPosts
 * @param {string} [searchTerm] - Optional term to filter posts.
 * @returns {Promise<Array<Object>>} Resolves to an array of matching post objects.
 */
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

/**
 * Retrieves a single blog post by its unique ID.
 *
 * @async
 * @function getPostById
 * @param {string} id - The unique ID of the post to retrieve.
 * @returns {Promise<Object|null>} Resolves to the post object if found, or null.
 */
export async function getPostById(id) {
    const posts = await readPostsFromFile();
    return posts.find(post => post.id === id) || null;
}

/**
 * Creates a new blog post with generated ID and timestamps, then saves it to storage.
 *
 * @async
 * @function createPost
 * @param {Object} postData - Post payload details.
 * @param {string} postData.title - Title of the post.
 * @param {string} postData.content - Content/body of the post.
 * @param {string} postData.category - Category of the post.
 * @param {string[]} [postData.tags=[]] - Optional list of tags associated with the post.
 * @returns {Promise<Object>} Resolves to the newly created post object.
 */
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
    };

    posts.push(newPost);
    await writePostsToFile(posts);

    return newPost;
}

/**
 * Updates an existing blog post by its unique ID with the provided fields.
 *
 * @async
 * @function updatePost
 * @param {string} id - The unique ID of the post to update.
 * @param {Object} updateData - Object containing post attributes to update.
 * @param {string} [updateData.title] - Updated title of the post.
 * @param {string} [updateData.content] - Updated content of the post.
 * @param {string} [updateData.category] - Updated category of the post.
 * @param {string[]} [updateData.tags] - Updated list of tags.
 * @returns {Promise<Object|null>} Resolves to the updated post object, or null if the post was not found.
 */
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

/**
 * Deletes a blog post by its unique ID.
 *
 * @async
 * @function deletePost
 * @param {string} id - The unique ID of the post to delete.
 * @returns {Promise<boolean>} Resolves to true if the post was found and deleted, or false if not found.
 */
export async function deletePost(id) {
    const posts = await readPostsFromFile();
    const filteredPosts = posts.filter(post => post.id !== id);

    if (posts.length === filteredPosts.length) {
        return false;
    }

    await writePostsToFile(filteredPosts);
    return true;
}
