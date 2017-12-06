var products = [
	{ id: 0, brand: "Samsung", name: "Samsung Galaxy S8", price: 3399, category: "phone" },
	{ id: 1, brand: "Samsung", name: "Samsung Galaxy S7", price: 1999, category: "phone" },
	{ id: 2, brand: "Samsung", name: "Samsung Galaxy A5", price: 1299, category: "phone" },
	{ id: 3, brand: "Huawei", name: "Huawei P10 Lite", price: 949, category: "phone" },
	{ id: 4, brand: "Huawei", name: "Huawei Y6", price: 599, category: "phone" },
	{ id: 5, brand: "Huawei", name: "Huawei Mate 9", price: 2899, category: "phone" },
	{ id: 6, brand: "Apple", name: "Apple iPhone 7", price: 2999, category: "phone" },
	{ id: 7, brand: "Apple", name: "Apple iPhone SE", price: 1499, category: "phone" },
	{ id: 8, brand: "Apple", name: "Apple iPhone 8 Plus", price: 4849, category: "phone" },
	{ id: 9, brand: "Sony", name: "Sony XZ Premium", price: 3099, category: "phone" },
	{ id: 10, brand: "Sony", name: "Sony Xperia X", price: 1356, category: "phone" },
	{ id: 11, brand: "Sony", name: "Sony Xperia Z3", price: 1399, category: "phone" },
	{ id: 12, brand: "Xiaomi", name: "Xiaomi Redmi Note 4X", price: 849, category: "phone" },
	{ id: 13, brand: "Xiaomi", name: "Xiaomi Mi Mix", price: 2859, category: "phone" },
	{ id: 14, brand: "Xiaomi", name: "Xiaomi Mi 5s Plus", price: 1696, category: "phone" },
];

var productBrands = document.getElementById("product-brands");
var sectionProducts = document.getElementById("all-products");
var productsFilter = document.getElementById("products-filter");

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

/* Add to Bag Click increment */
var bagCounter = 0;
var circle = document.getElementById("circle-counter");

var addToBagClickHandler = function(e) {
	if(e.target.type == 'submit') {
		bagCounter++;
		circle.textContent = bagCounter;
	}
}
sectionProducts.addEventListener('click', addToBagClickHandler);

/* Filter products */
productsFilter.addEventListener("change", function(e) {
	if(e.target.type == "select-one") {		

		while (sectionProducts.firstChild) {
		    sectionProducts.removeChild(sectionProducts.firstChild);
		}

		if(e.target.value == "price") {
			// products sorted by price
			var sortedByPriceProducts = products.sort(function(a, b){
				return a.price - b.price;
			});

			sortedByPriceProducts.forEach(function(product) {
				renderProduct(product);
			});
		}

		if(e.target.value == "alphabetical") {
			init();
		}
	}
});

/* Render products */
function renderProduct(product) {
	var newArticle = document.createElement("article");
	newArticle.setAttribute("id", "article-content-"+product.id);

	var divName = document.createElement("div");
	divName.setAttribute("id", "product-name-"+product.id);
	divName.innerHTML = product.name;

	var divPrice = document.createElement("div");
	divPrice.setAttribute("id", "product-price-"+product.id);
	divPrice.innerHTML = "Pret: "+product.price;

	var divBrand = document.createElement("div");
	divBrand.setAttribute("id", "product-brand-"+product.id);
	divBrand.innerHTML = "Brand: "+product.brand;

	var addToBag = document.createElement("button");
	addToBag.setAttribute("class", "add-to-bag");
	addToBag.innerHTML = "Adauga in cos";

	newArticle.appendChild(divName);
	newArticle.appendChild(divPrice);
	newArticle.appendChild(divBrand);
	newArticle.appendChild(addToBag);
	sectionProducts.appendChild(newArticle);
}

function init() {
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
}

document.addEventListener("DOMContentLoaded", function() {
   init();
});