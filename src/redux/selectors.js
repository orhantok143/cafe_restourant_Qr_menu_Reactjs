
const selectProducts = state => state.products;

export const selectActiveProducts = selectProducts;



const selectCategories = state => state.categories;

export const selectActiveCategories = selectCategories;


const selectBusinesses = state => state.businesses.businesses ? state.businesses.businesses.data : []


export const selectActiveBusinesses = selectBusinesses;