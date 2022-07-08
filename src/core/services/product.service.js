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
                inStock
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

  static async fetchProducts(category) {
    const body = {
      variables: {},
      query: `{
              category(input: {title: "${category}"}) {
                name
                products {
                  id
                  name
                  inStock
                  gallery
                  prices {
                    currency {
                      label
                      symbol
                    }
                    amount
                  }
                  brand
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
                }
              },
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
      .then((response) => response.data.category);
  }
}
