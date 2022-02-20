export async function getCategories() {
  const endPointCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const fetchResponse = await fetch(endPointCategories);
  const responseJson = await fetchResponse.json();
  return responseJson;
  // Implemente aqui
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPointCategoryId = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const endPointQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const endPointCategoriesIdAndQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  let usedEndPoint = '';

  if (categoryId && query) {
    usedEndPoint = endPointCategoriesIdAndQuery;
  } else if (categoryId) {
    usedEndPoint = endPointCategoryId;
  } else { usedEndPoint = endPointQuery; }

  const fetchResponse = await fetch(usedEndPoint);
  const responseJson = await fetchResponse.json();
  return responseJson;
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}

export async function getProductDetails(productId) {
  const fetchResponse = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const responseJson = await fetchResponse.json();
  return responseJson;
}