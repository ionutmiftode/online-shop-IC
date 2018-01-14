/* Render products */
function renderProduct(product, canCompare) {
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

    if(canCompare) {
    	var checkBox = document.createElement("input");
		checkBox.setAttribute("data-checkbox-id", product.id);
	    checkBox.type = "checkbox";
	    checkBox.title = "Compara";
    }

	var addToBag = document.createElement("button");
	addToBag.setAttribute("class", "add-to-bag");
	addToBag.setAttribute("data-addtobag-id", product.id);
	addToBag.innerHTML = "Adauga in cos";

	newArticle.appendChild(divName);
	newArticle.appendChild(divPrice);
	newArticle.appendChild(divBrand);
	newArticle.appendChild(addToBag);
	if(canCompare) {
		newArticle.appendChild(checkBox);
	}
	sectionProducts.appendChild(newArticle);
}