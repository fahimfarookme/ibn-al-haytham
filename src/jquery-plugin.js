/**
 * The jquery plugin.
 *
 * @author Fahim Farook
 */
;(function($, api) {

   "user strict";

   var NAMESPACE = "haytham",

      decorate = function(mod, element) {
         var fn = mod.generate;
         mod.generate = function(year, month) {
            $(element).append(fn.call(mod, year, month));
         }
         return mod;
      };

   // Register as a jquery plugin
   // jQuery.fn = jQuery.prototype
   $.fn.haytham = function(options) {
      var result = [];

      // this.each - to instantiate multiple calendars for multiple selected elements.
      this.each(function() {
         var mod = $(this).data(NAMESPACE);
         if (!mod) { // if not already instantiated
            mod = decorate(new api(options), this);
            $(this).addClass("iah-datepicker-container");
            $(this).data(NAMESPACE, mod);
         }
         result.push(mod);
      });

      return result.length > 1 ? result : result[0];
   };

})(jQuery, HAYTHAM.api);
