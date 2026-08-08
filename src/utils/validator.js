// TO-DO: Implement validation for post creation and update
/**
 * 
 * @param {Object} body - request body payload
 * @returns {{ isValid: boolean, errors: Array<string> }} 
 */
export function validatePostInput(body) {
    const error = [];

    if (!body || typeof body !== 'object') {
        return { isValid: false, errors: ['Invalid request body'] }
    }

    const { title, content, category, tags } = body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        error.push('Title is required');
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        error.push('Content is required');
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
        error.push('Category is required');
    }

    if (tags && (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string'))) {
        error.push('Tags must be an array of strings');
    }

    return { isValid: error.length === 0, errors: error };
}