	$(function() {
 $('.owl-carousel').owlCarousel({
 //margin: 20,
 loop: true,
 items: 1,
 margin: 10,
 //stagePadding: 40,

 nav:true,
 dragBeforeAnimFinish: false,
 dots: true,
 navText:['<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>','<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>'],


 
 
   onInitialized  : counter, //When the plugin has initialized.
  onTranslated : counter //When the translation of the stage has finished.
 });
 function counter(event) {
   var element   = event.target;         // DOM element, in this example .owl-carousel
    var items     = event.item.count;     // Number of items
    var item      = event.item.index + 1;     // Position of the current item
  
  // it loop is true then reset counter from 1
  if(item > items) {
    item = item - items
  }
  $('#counter').html("Item " + item+ " of " +items)
}
	});