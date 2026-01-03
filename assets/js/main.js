const getcategorys = async () => {  

    const response = await axios.get('https://dummyjson.com/products/category-list');

    return response.data;
}
const displaydatacategory=async()=>{
  try{

    const result=await getcategorys();

    const categorys=result.map((category)=>{
    return`
    
  <div class="col-md-3 p-2 ">
    <div class="card category-card text-center w-100">
        <div class="card-body ">
            
            <h5 class="card-title mb-4 text-info fw-semibold">
                ${category}
            </h5>

            <a href="./category-products.html?category=${category}"
               class="btn btn-outline-info rounded-pill mt-auto">
                Show Products
            </a>

        </div>
    </div>
</div>


            `  
    }).join(' ');
 
    document.querySelector(".container .row").innerHTML=categorys;
}
catch(error){
    document.querySelector(".errorClass").classList.remove("d-none");
                document.querySelector(".errorClass").textContent=error.message;


}
finally{
    document.querySelector(".loader").classList.add("d-none");
}
}
displaydatacategory();
