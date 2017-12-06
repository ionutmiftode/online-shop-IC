function getProducts() {
	return [{
		name: "iPhone",
		price: 900,
		color: "gold",
		id: 0,
	},
	{
		name: "Galaxy",
		price: 1200,
		color: "black",
		id: 1,
	}];
}

var compareContainer = document.getElementById("compare-container");

/* Add to Bag Click increment */
var bagCounter = 0;
var sectionProducts = document.getElementById("section-top-products");
var circle = document.getElementById("circle-counter");

var addToBagClickHandler = function(e) {
	if(e.target.type == 'submit') {
		bagCounter++;
		circle.textContent = bagCounter;
	}
}
sectionProducts.addEventListener('click', addToBagClickHandler);

/* Add/remove products to/from Compare Container */
sectionProducts.addEventListener("change", function(e) {
	if(e.target.checked) {
		if(compareContainer.classList.contains("hidden")) {
			compareContainer.classList.remove("hidden");
		}

		var product = getProducts().find(function(product) {
			return e.target.dataset.checkboxId == product.id;
		});

		var containerProduct = document.createElement("div");
		containerProduct.setAttribute("data-product-id", product.id);
		containerProduct.setAttribute("class", "compare-product");
		containerProduct.innerText = product.name;
		compareContainer.appendChild(containerProduct);

	} else {
		var product = document.querySelector("[data-product-id='"+e.target.dataset.checkboxId+"']");
		product.remove();
	}
		
	if(!compareContainer.hasChildNodes()) {
		compareContainer.classList.add("hidden");
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

	var divColor = document.createElement("div");
	divColor.setAttribute("id", "product-color-"+product.id);
	divColor.innerHTML = "Culoare: "+product.color;

	var checkBox = document.createElement("input");
	checkBox.setAttribute("data-checkbox-id", product.id);
    checkBox.type = "checkbox";
    checkBox.title = "Compara";

	var addToBag = document.createElement("button");
	addToBag.setAttribute("class", "add-to-bag");
	addToBag.innerHTML = "Adauga in cos";

	newArticle.appendChild(divName);
	newArticle.appendChild(divPrice);
	newArticle.appendChild(divColor);
	newArticle.appendChild(addToBag);
	newArticle.appendChild(checkBox);
	sectionProducts.appendChild(newArticle);
}

function init() {
	var product = getProducts();
	for (var i = 0; i < product.length; i++) {
		renderProduct(product[i]);	
	}
}

document.addEventListener("DOMContentLoaded", function() {
   init();
});

