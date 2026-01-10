
const limit = 10;
let currentPage = 1;
let currentSort = "title-asc";


const getProduct = async (page = 1) => {
    const skip = (page - 1) * limit;
    const [sortBy, order] = currentSort.split("-");

    const response = await axios.get(
        "https://dummyjson.com/products",
        {
            params: {
                limit,
                skip,
                sortBy,
                order,
                select: "id,title,price,thumbnail"
            }
        }
    );

    return response.data;
};



const displaydataProduct = async (page = 1) => {
    currentPage = page;
    document.querySelector(".loader").classList.remove("d-none");

    try {
        const result = await getProduct(page);
        const numOfPages = Math.ceil(result.total / limit);

        const cards = result.products.map(product => `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex">
                <div class="card product-card w-100">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column text-center">
                        <h6 class="fw-semibold mb-2">${product.title}</h6>
                        <span class="text-info fw-bold mb-3">$${product.price}</span>
                        <a href="product_details.html?id=${product.id}"
                           class="btn btn-outline-info rounded-pill mt-auto">
                            View details
                        </a>
                    </div>
                </div>
            </div>
        `).join("");

        document.querySelector(".row").innerHTML = cards;

       let pagination = `
    <li class="page-item ${page === 1 ? "disabled" : ""}">
        <button class="page-link" onclick="displaydataProduct(${page - 1})">Previous</button>
    </li>
`;

for (let i = 1; i <= numOfPages; i++) {
    pagination += `
        <li class="page-item ${page === i ? "active" : ""}">
            <button class="page-link" onclick="displaydataProduct(${i})">${i}</button>
        </li>
    `;
}

pagination += `
    <li class="page-item ${page === numOfPages ? "disabled" : ""}">
        <button class="page-link" onclick="displaydataProduct(${page + 1})">Next</button>
    </li>
`;
document.querySelector(".pagination").innerHTML = pagination;

    } catch (error) {
        document.querySelector(".errorClass").classList.remove("d-none");
        document.querySelector(".errorClass").textContent = error.message;
    } finally {
        document.querySelector(".loader").classList.add("d-none");
    }
};



  
document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentSort = e.target.value;
    displaydataProduct(1);
});



displaydataProduct();
