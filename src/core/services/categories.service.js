export class CategoriesService {
  static async fetchCategories() {
    const body = {
      variables: {},
      query: `{
              categories {
                name
              },
              currencies {
                label
                symbol
              }
            }`,
    };
    return fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}
