var price = document.getElementById("total-price");
var table = document.getElementById("table");
var emptyBag = document.getElementById("empty-bag");
var tableBody = document.getElementById("table-body");
var totalProductsPrice = document.getElementById("total-products-price");
var totalPrice = 0;

if (localStorage.getItem("bagProducts") !== null) {
	table.classList.remove("hidden");

	var productsId = JSON.parse(localStorage.getItem("bagProducts"));
	//circle.innerText = productsId.length;

	axios.get('/products')
		.then(function (response) {
			var products = response.data;

			for (var i = 0; i < productsId.length; i++) {
				var newTr = document.createElement("tr");
				var noTh = document.createElement("th");
				var nameTd = document.createElement("td");
				var priceTd = document.createElement("td");

				var product = products.find(function(product) {
					return productsId[i] == product.id;
				});

				totalPrice += product.price;

				noTh.innerHTML = i + 1;
				nameTd.innerHTML = product.name;
				priceTd.innerHTML = product.price;

				newTr.appendChild(noTh);
				newTr.appendChild(nameTd);
				newTr.appendChild(priceTd);
				tableBody.appendChild(newTr);
			}

			//price.innerHTML = totalPrice;
			totalProductsPrice.innerHTML = totalPrice;
		})
		.catch(function (error) {
		    console.log(error);
		});
} else {
	emptyBag.classList.remove("hidden");
}

