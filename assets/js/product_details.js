const getProductDetails = async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
};

const displayProductDetails = async () => {
    try {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");


        const product = await getProductDetails(id);
        const container = document.getElementById("productDetails");

        const renderStars = (rating) => {
            let fullStars = Math.floor(rating);
            let halfStar = (rating - fullStars >= 0.5) ? "⭐" : "";
            let stars = "⭐".repeat(fullStars) + halfStar;
            if (rating > 5) stars += "⭐";
            return stars;
        };

        container.innerHTML = `
        <div class="product-card row g-4">

            <!-- Images -->
            <div class="col-md-5 image-section">
                <img src="${product.thumbnail}" class="product-thumbnail mb-3">
                <div class="product-images">
                    ${product.images.map((img, i) =>
                        `<img src="${img}" class="${i === 0 ? "active" : ""}">`
                    ).join("")}
                </div>
            </div>

            <!-- Details -->
            <div class="col-md-7 details-section">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="price-box">$${product.price}</div>

                <div class="meta">
                    <div><h6>Rating</h6><h6>${renderStars(product.rating)} (${product.rating})</h6></div>
                    <div><h6>Stock</h6><h6>${product.stock}</h6></div>
                    <div><h6>Discount</h6><h6>${product.discountPercentage}%</h6></div>
                </div>

                <div class="info-grid">
                    <div><h6>Category</h6><h6>${product.category}</h6></div>
                    <div><h6>Brand</h6><h6>${product.brand}</h6></div>
                    <div><h6>Dimensions</h6><h6>${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}</h6></div>
                    <div><h6>Status</h6><h6>${product.availabilityStatus}</h6></div>
                    <div><h6>Warranty</h6><h6>${product.warrantyInformation}</h6></div>
                    <div><h6>Shipping</h6><h6>${product.shippingInformation}</h6></div>
                    <div><h6>Return</h6><h6>${product.returnPolicy}</h6></div>
                    <div><h6>Min Order</h6><h6>${product.minimumOrderQuantity}</h6></div>
                </div>

                <div class="product-tags mt-2">
                    ${product.tags.map(tag => `<span class="badge bg-info">${tag}</span>`).join("")}
                </div>
            </div>

            <!-- Reviews -->
            <div class="col-12 product-reviews">
                <h4>Reviews</h4>
                <div class="row">
                    ${product.reviews.map(r => `
                        <div class="col-md-4">
                            <div class="review-card">
                                <div><h6>${r.reviewerName}</h6> </div>
                                <div>Rating: ${renderStars(r.rating)} (${r.rating})</div>
                                <div>Comment: ${r.comment}</div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
        `;

        const mainImage = container.querySelector(".product-thumbnail");
        container.querySelectorAll(".product-images img").forEach(img => {
            img.addEventListener("click", () => {
                mainImage.src = img.src;
                container.querySelectorAll(".product-images img").forEach(i => i.classList.remove("active"));
                img.classList.add("active");
            });
        });

    } catch (error) {
        document.querySelector(".errorClass").classList.remove("d-none");
        document.querySelector(".errorClass").textContent = error.message;
    } finally {
        document.querySelector(".loader").classList.add("d-none");
    }
};

displayProductDetails();
