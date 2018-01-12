var compareContainer = document.getElementById("compare-container");
var sectionProducts = document.getElementById("section-top-products");
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

		axios.get('/products')
			.then(function (response) {
				var products = response.data;
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
				
			})
			.catch(function (error) {
			    console.log(error);
			});

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
		axios.get('/products')
			.then(function (response) {
				var products = response.data;

				var popularProducts = products.filter(isPopular);
				
				sectionProducts.innerHTML = '';
				for (var i = 0; i < popularProducts.length; i++) {
					renderProduct(popularProducts[i]);	
				}				
			})
			.catch(function (error) {
			    alert("No products found");
			});
	}, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
   init();
});

