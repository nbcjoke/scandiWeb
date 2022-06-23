export class ProductService {
  static async fetchProduct(id) {
    const body = {
      variables: {},
      query: `{
              product(id: "${id}") {
                id
                name
                description
                brand
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                gallery
              }
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
    })
      .then((response) => response.json())
      .then((response) => response.data.product);
  }
}
