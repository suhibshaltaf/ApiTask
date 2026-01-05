const getCategoryProducts = async (category) => {
    const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
    );
            document.querySelector(".nametitle").innerHTML=` ${category} product`

    
    return response.data.products;
};


const displayCategoryProducts = async () => {
    try {
        const params = new URLSearchParams(location.search);
        const category = params.get("category");


        const products = await getCategoryProducts(category);

        const cards = products.map(product => `
            <div class="col-md-3  d-flex">
                <div class="card product-card w-100">

                    <img src="${product.thumbnail}"
                         class="card-img-top"
                         alt="${product.title}">

                    <div class="card-body d-flex flex-column text-center">

                        <h6 class="fw-semibold mb-2">
                            ${product.title}
                        </h6>

                        <span class="text-info fw-bold mb-3">
                            $${product.price}
                        </span>

                        <a href="product_details.html?id=${product.id}"
                           class="btn btn-outline-info rounded-pill mt-auto">
                            View details
                        </a>

                    </div>
                </div>
            </div>
        `).join("");

        document.querySelector(".container .row").innerHTML = cards;

    } catch (error) {
        document.querySelector(".errorClass").classList.remove("d-none");
        document.querySelector(".errorClass").textContent = error.message;
    } finally {
        document.querySelector(".loader").classList.add("d-none");
    }
};

displayCategoryProducts();
