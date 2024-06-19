
const selectProducts = state => state.products;

export const selectActiveProducts = selectProducts;



const selectCategories = state => state.categories;

export const selectActiveCategories = selectCategories;


const currentCategory = state => state.categories.currentCategory;

export const selectCurrentCategory = currentCategory;


const selectCurrentSubCategory = state => state.categories.currentSubCategory;

export const selectcurrentSubCategory = selectCurrentSubCategory;


const selectBusinesses = state => state.businesses.businesses ? state.businesses.businesses.data : []


export const selectActiveBusinesses = selectBusinesses;


const selectFavorited = state => state.products.favorited

export const selectfavorited = selectFavorited;