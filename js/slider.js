var sliders = document.getElementById("slider");
var dots = document.getElementById("slider-dots");

var slider = {
	activeSlideId: 0,
	animate: function() {
		var self = this;
		this.interval = setInterval(function () {		
			if(self.activeSlideId < sliders.childElementCount) {
				// delete slider class
				sliders.className = '';

				// remove/add active class for dots
				for (var i = dots.children.length - 1; i >= 0; i--) {
					dots.children[i].classList.remove("active-slide-dot");
					if(dots.children[i].dataset.slideId == self.activeSlideId) {
						dots.children[i].classList.add("active-slide-dot");
					}
				}

				//add current slide id class
				sliders.className = "slide-transition-"+self.activeSlideId;


				//update self.activeSlideId
				self.activeSlideId++;
			}
			if(self.activeSlideId == sliders.childElementCount) {
				self.activeSlideId = 0;
			}
			
		}, 3000);	
	},
	onClick: function(e) {
		if(e.target.classList.value == 'slider-dot') {
			//clearInterval(this.interval);
			//sliders.className = '';
			for (var i = dots.children.length - 1; i >= 0; i--) {
				dots.children[i].classList.remove("active-slide-dot");
			}
			e.target.classList.add("active-slide-dot");
			this.activeSlideId = e.target.dataset.slideId;
			sliders.classList.replace(sliders.className, "slide-transition-"+this.activeSlideId);
			//this.animate();
		}
	}
}
slider.animate();
document.addEventListener('click', function(e){
	slider.onClick(e);
});