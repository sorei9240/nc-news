import axios from 'axios';

const url = 'https://sorei9240-nc-news.onrender.com/api';

export function getArticles(topic = null, sort_by = 'created_at', order = 'desc') {
    return axios.get(`${url}/articles`, {
        params: {topic, sort_by, order, limit: 100}
    })
    .then(response => response.data);
}

export function getArticleById(articleId) {
    return axios.get(`${url}/articles/${articleId}`)
    .then(response => response.data);
}

export function getComments(articleId) {
    return axios.get(`${url}/articles/${articleId}/comments`)
    .then(response => response.data);
}

export function addComment(articleId, commentData) {
    return axios.post(`${url}/articles/${articleId}/comments`, commentData)
    .then(response => response.data);
}

export function deleteComment(commentId) {
    return axios.delete(`${url}/comments/${commentId}`);
}

export function updateVotes(type, id, increment) {
    return axios.patch(`${url}/${type}/${id}`, {
        inc_votes: increment
    })
    .then(response => response.data);
}

export function getTopics() {
    return axios.get(`${url}/topics`)
    .then(response => response.data);
}