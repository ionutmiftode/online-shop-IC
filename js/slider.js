var sliders = document.getElementById("slider");
var dots = document.getElementById("slider-dots");
var activeSlideDot = dots.getElementsByClassName("active-slide-dot");
var maxSlideId = 2;

var slider = {
	activeSlideId: 0,
	animate: function() {
		var self = this;
		this.interval = setInterval(function () {
				// get nextSlideId				
				var nextSlideId = self.activeSlideId === maxSlideId ? 0 : self.activeSlideId +1;

				// show next slide
				sliders.className = "slide-transition-"+nextSlideId;

				// remove active dot class
				activeSlideDot[0].classList.remove("active-slide-dot");

				// add dot active class
				var nextSlideDot = dots.querySelector("[data-slide-id='"+nextSlideId+"']");
				nextSlideDot.classList.add("active-slide-dot");
				
				// update activeSlideId
				self.activeSlideId = nextSlideId;
		}, 5000);	
	},
	onClick: function(e) {
		if(e.target.classList.value == 'slider-dot') {
			// remove active dot class
			activeSlideDot[0].classList.remove("active-slide-dot");

			// add active class on clicked dot
			e.target.classList.add("active-slide-dot");

			// update activeSlideId and show active slide
			this.activeSlideId = parseInt(e.target.dataset.slideId);
			sliders.classList.replace(sliders.className, "slide-transition-"+this.activeSlideId);
		}
	}
}
slider.animate();
dots.addEventListener('click', function(e){
	slider.onClick(e);
});