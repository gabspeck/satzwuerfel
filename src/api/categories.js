export async function insertCategory(category) {
  return await fetch(`api/categories`, {
    method: 'post',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function updateCategory(category) {
  await fetch(`api/categories/${category.id}`, {
    method: 'put',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteCategory(id) {
  await fetch(`api/categories/${id}`, { method: 'delete' });
}

export async function getCategories() {
  return await (await fetch('api/categories')).json();
}
