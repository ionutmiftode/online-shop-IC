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
		var price = document.getElementById("total-price");
		var lastProduct = this.products.length - 1;
		this.total += this.products[lastProduct].price;
		price.innerHTML = this.total;
	},
	add: function(e) {
		if(e.target.classList.value == 'add-to-bag') {
			var productId = e.target.dataset.addtobagId;

			axios.get('/products')
				.then(function (response) {
					var products = response.data;
					var product = products.find(function(product) {
						return productId == product.id;
					});

					bag.products.push(product);
					bag.updateTotal();
					bagCounter++;
					circle.textContent = bagCounter;
				})
				.catch(function (error) {
				    console.log(error);
				});
		}
	}
}		