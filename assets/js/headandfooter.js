document.querySelector("nav").innerHTML=`<div class="container-fluid">
    <a class="navbar-brand" href="index.html">Api task</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li class="nav-item text-info">
          <a class="nav-link active" aria-current="page" href="index.html">Show category</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="product.html">Show Products</a>
        </li>
       
        
      </ul>
    
    </div>
  </div>`;
document.querySelector("footer").innerHTML=`<p>&copy; <span id="year"></span> Api Task. All rights reserved.</p>`;
document.getElementById("year").textContent = new Date().getFullYear();
