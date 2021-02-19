const eventHub = document.querySelector("#container")

export const Product = (product, category, reviews) => {
    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${product.name}</h4>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct--${product.id}">Add to Cart</button>
              <p>${product.description} [${category.name}]</p>
              <div class="reviews">
              <h3>Reviews</h3>
              ${reviews.map(rev => {
                  return `<div class="review">
                  <div class="date">${rev.date}</div>
                  <p>${rev.text}</p>
                  <p>${rev.rating}/5</p>
                  </div>`
              }                
                ).join("")}
              
          </div>
      </section>
  `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                "addedProduct": parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})
