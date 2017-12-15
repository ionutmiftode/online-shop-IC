
var bag = {
	popup: document.getElementById("bag-popup"),
	products: [],
	getTotalPrice: function() {
		var price = 0;
		for (var i = 0; i < this.products.length; i++) {
			price += this.products[i].price;
		}
		return price;
	},
	updateTotal: function() {
		var totalPrice = this.getTotalPrice();
		var price = document.getElementById("total-price");
		price.innerText = totalPrice+" Lei";
	}
}		