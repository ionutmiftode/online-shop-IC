var price = document.getElementById("total-price");
var bagProducts = [];

if (localStorage.getItem("bagProducts") !== null) {
	bagProducts = JSON.parse(localStorage.getItem("bagProducts"));
}

var bag = {
	popup: document.getElementById("bag-popup"),
	products: [],
	total: 0,
	onClick: document.addEventListener('click', function(e) {
		if(e.target.id == 'svg-cart' || e.target.id == 'svg-path') {
			if(bag.popup.classList.contains('hidden')) {
				bag.popup.classList.remove('hidden');	
			} else {
				bag.popup.classList.add('hidden');
			}
		} else {
			bag.popup.classList.add('hidden');
		}
	}),
	updateTotal: function() {
		var totalPrice = parseInt(price.innerText);
		var lastProduct = this.products.length - 1;
		totalPrice += this.products[lastProduct].price;
		this.total = totalPrice;
		price.innerHTML = totalPrice;
	},
	add: function(e) {
		if(e.target.classList.value == 'add-to-bag') {
			var productId = e.target.dataset.addtobagId;

			bagProducts.push(productId);
			localStorage.setItem('bagProducts', JSON.stringify(bagProducts));

			axios.get('/products')
				.then(function (response) {
					var products = response.data;
					var product = products.find(function(product) {
						return productId == product.id;
					});

					bag.products.push(product);
					bag.updateTotal();
					bagCounter = bagProducts.length;
					circle.textContent = bagCounter;
					bagCounter++;
				})
				.catch(function (error) {
				    console.log(error);
				});
		}
	}
}		