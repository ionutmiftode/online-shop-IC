
var compareContainer = document.getElementById("compare-container");
var sectionProducts = document.getElementById("section-top-products");
var price = document.getElementById("total-price");
var totalPrice = 0;
var products;
//var randomNumber = Math.random();

// Add to bag (number of products and total price)
sectionProducts.addEventListener('click', bag.add);

function isPopular(product) {
	return product.popular == true;
}
/*var getPopularProducts = new Promise(function(resolve, reject) {
	setTimeout(function() {
		if(randomNumber > 0.5) {
			resolve(products.filter(isPopular));
		} else {			
			reject('No products in stoc. Please try again later!');					
		}
	}, 3000);
});*/

/* Add/remove products to/from Compare Container */
sectionProducts.addEventListener("change", function(e) {
	var checkbox = e.target.dataset.checkboxId;
	if(e.target.checked) {	
		var popularProducts = products.filter(isPopular).find(function(product) {
			return checkbox == product.id;
		});
		var containerProduct = document.createElement("div");

		if(compareContainer.classList.contains("hidden")) {
			compareContainer.classList.remove("hidden");
		}				

		containerProduct.setAttribute("data-product-id", popularProducts.id);
		containerProduct.classList.add('compare-product')
		containerProduct.innerText = popularProducts.name;
		compareContainer.appendChild(containerProduct);

		/*var product = products.filter(isPopular).find(function(product) {
			return checkbox == product.id;
		});

		var containerProduct = document.createElement("div");
		containerProduct.setAttribute("data-product-id", product.id);
		containerProduct.classList.add('compare-product')
		containerProduct.innerText = product.name;
		compareContainer.appendChild(containerProduct);*/

	} else {
		var productRemove = document.querySelector("[data-product-id='"+e.target.dataset.checkboxId+"']");
		productRemove.remove();
	}
		
	if(!compareContainer.hasChildNodes()) {
		compareContainer.classList.add("hidden");
	}
});

function init() {
	/*getPopularProducts
		.then(function(result) {
			sectionProducts.innerHTML = '';
			for (var i = 0; i < result.length; i++) {
				renderProduct(result[i]);	
			}
		})
		.catch(function(error) {
			sectionProducts.innerHTML = '';
			alert(error);
		});*/
	setTimeout(function() {
		var popularProducts = products.filter(isPopular);
		
		sectionProducts.innerHTML = '';
		for (var i = 0; i < popularProducts.length; i++) {
			renderProduct(popularProducts[i], true);	
		}				
	}, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
	axios.get('/products')
		.then(function (response) {
			products = response.data;

			bagCounter = bagProducts.length;
			circle.textContent = bagCounter;

			var j = bagProducts.length - 1;

			for (var i = products.length - 1; i >= 0;) {
				if (products[i].id == bagProducts[j]) {
					i = bagProducts[j];
					j--;

					totalPrice += products[i].price;					
				} else {
					i--;
				}
			}
			price.innerHTML = totalPrice;

			init();
		})
		.catch(function (error) {
		    alert(error);
		});
});

