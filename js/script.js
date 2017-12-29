var compareContainer = document.getElementById("compare-container");
var sectionProducts = document.getElementById("section-top-products");
var randomNumber = Math.random();

// Add to bag (number of products and total price)
sectionProducts.addEventListener('click', bag.add);

function isPopular(product) {
	return product.popular == true;
}
var popularProducts = new Promise(function(resolve, reject) {
	if(randomNumber > 0.5) {
		setTimeout(function() {
			resolve(products.filter(isPopular));
		}, 4000);
	} else {
		setTimeout(function() {
			reject('No products in stoc. Please try again later!');
		}, 2000);		
	}
});

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
	popularProducts
		.then(function(result) {
			sectionProducts.innerHTML = '';
			for (var i = 0; i < result.length; i++) {
				renderProduct(result[i]);	
			}
		})
		.catch(function(error) {
			sectionProducts.innerHTML = '';
			alert(error);
		});	
}

document.addEventListener("DOMContentLoaded", function() {
   init();
});

