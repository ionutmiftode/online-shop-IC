var compareContainer = document.getElementById("compare-container");
var sectionProducts = document.getElementById("section-top-products");

// Add to bag (number of products and total price)
sectionProducts.addEventListener('click', bag.add);

function isPopular(product) {
	return product.popular == true;
}
var popularProducts = products.filter(isPopular);

/* Add/remove products to/from Compare Container */
sectionProducts.addEventListener("change", function(e) {
	var checkbox = e.target.dataset.checkboxId;

	if(e.target.checked) {
		if(compareContainer.classList.contains("hidden")) {
			compareContainer.classList.remove("hidden");
		}

		var product = popularProducts.find(function(product) {
			return checkbox == product.id;
		});

		var containerProduct = document.createElement("div");
		containerProduct.setAttribute("data-product-id", product.id);
		containerProduct.classList.add('compare-product')
		containerProduct.innerText = product.name;
		compareContainer.appendChild(containerProduct);

	} else {
		var productRemove = document.querySelector("[data-product-id='"+e.target.dataset.checkboxId+"']");
		productRemove.remove();
	}
		
	if(!compareContainer.hasChildNodes()) {
		compareContainer.classList.add("hidden");
	}
});

function init() {
	for (var i = 0; i < popularProducts.length; i++) {
		renderProduct(popularProducts[i]);	
	}
}

document.addEventListener("DOMContentLoaded", function() {
   init();
});

