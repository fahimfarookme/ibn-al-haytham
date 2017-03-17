/**
 * The jquery plugin.
 *
 * @author Fahim Farook
 */
;(function($, api) {

   "user strict";

   var NAMESPACE = "haytham";

   // Register as a jquery plugin
   // jQuery.fn = jQuery.prototype
   $.fn.haytham = function(options) {
      var result = [];

      // this.each - to instantiate multiple calendars for multiple selected elements.
      this.each(function() {
         var mod = $(this).data(NAMESPACE);

         if (!mod) { // if not already instantiated
            $(this).data(NAMESPACE, (mod = new api(this, options)));
         }
         result.push(mod);
      });

      return result.length > 1 ? result : result[0];
   };

})(jQuery, HAYTHAM.api);