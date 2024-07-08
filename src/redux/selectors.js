const selectAuth = state => state.auth;

export const selectActiveAuth = selectAuth;


const selectProducts = state => state.products;

export const selectActiveProducts = selectProducts;



const selectCategories = state => state.categories;

export const selectActiveCategories = selectCategories;


const currentCategory = state => state.categories.currentCategory;

export const selectCurrentCategory = currentCategory;


const selectCurrentSubCategory = state => state.categories.currentSubCategory;

export const selectcurrentSubCategory = selectCurrentSubCategory;


const selectBusinesses = state => state.businesses.businesses


export const selectActiveBusinesses = selectBusinesses;


const selectFavorited = state => state.products.favorited

export const selectfavorited = selectFavorited;

const selectEdit = state => state.products.editproduct

export const selecteditProduct = selectEdit;


const selectcomment = state => state.comment.comment

export const selectComment = selectcomment;

const selectaddComment = state => state.comment.addComment

export const selectAddComment = selectaddComment;


const selectpost = state => state.post.post

export const selectPost = selectpost;