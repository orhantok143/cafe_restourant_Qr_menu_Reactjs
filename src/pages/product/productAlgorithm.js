export  const getTop15ProductsForBusiness = (businessId,products) => {
     // Ağırlıklar belirleniyor
      const ratingWeight = 0.4;
      const likesWeight = 0.2;
      const commentsWeight = 0.2;
      const favoritesWeight = 0.2;
      
      const totalPrice = products?.reduce((total, product) => {
        return (total + product.price);
      }, 0);

        const averagePrice = totalPrice/products?.length
        // Her ürünün toplam puanını hesaplama
        const filteredProducts = products?.filter(product=>product.business === businessId && product.price>averagePrice)
      const productsWithScores = filteredProducts?.map(product => {
        const score = 
          (product.averageRating * ratingWeight) +
          (product.likes.length * likesWeight) +
          (product.comments.length * commentsWeight) +
          (product.addToFavotiresUser.length * favoritesWeight);
  
        return { ...product, score };
      });

  
      // Ürünleri toplam puana göre sıralama
      productsWithScores?.sort((a, b) => b.score - a.score);
  
      // İlk 15 ürünü seçme
      const top15Products = productsWithScores?.slice(0, 15);
  
      return top15Products
   
  };