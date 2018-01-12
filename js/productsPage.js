var productBrands = document.getElementById("product-brands");
var sectionProducts = document.getElementById("all-products");
var productsFilter = document.getElementById("products-filter");

axios.get('/products')
	.then(function (response) {
		products = response.data;
		/* get unique brands */
		var flags = {};
		var uniqueBrands = products.filter(function(product) {
		    if (flags[product.brand]) {
		        return false;
		    }
		    flags[product.brand] = true;
		    return true;
		});

		uniqueBrands.forEach(function(product) {
			var newLi = document.createElement("li");
			newLi.innerText = product.brand;
			productBrands.appendChild(newLi);
		});
	})
	.catch(function (error) {
	    console.log(error);
	});

// Add to bag (number of products and total price)
sectionProducts.addEventListener('click', bag.add);

/* Filter products */
productsFilter.addEventListener("change", function(e) {
	if(e.target.type == "select-one") {		

		while (sectionProducts.firstChild) {
		    sectionProducts.removeChild(sectionProducts.firstChild);
		}

		if(e.target.value == "price") {
			axios.get('/products')
				.then(function (response) {
					products = response.data;
					// products sorted by price
					var sortedByPriceProducts = products.sort(function(a, b){
						return a.price - b.price;
					});

					sortedByPriceProducts.forEach(function(product) {
						renderProduct(product);
					});
				})
				.catch(function (error) {
				    console.log(error);
				});
			
		}

		if(e.target.value == "alphabetical") {
			init();
		}
	}
});

function init() {
	axios.get('/products')
		.then(function (response) {
			products = response.data;
			// products sort by name
			var sortedByNameProducts = products.sort(function(a, b) {
			  	var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			  	var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			  	if (nameA < nameB) {
			    	return -1;
			  	}
			  	if (nameA > nameB) {
			    	return 1;
			  	}

			  	// names must be equal
			  	return 0;
			});

			sortedByNameProducts.forEach(function(product) {
				renderProduct(product);
			});
		})
		.catch(function (error) {
		    console.log(error);
		});
	
}

document.addEventListener("DOMContentLoaded", function() {
   init();
});