/**
 * The pulic api exposed.
 *
 * @author Fahim Farook
 */
;(function($, haytham) {

   "user strict";

   /**
    * The module which is attached to element.
    * 
    * @param  {element} element The element on which the pligin is invoked.
    * @param  {object}  options The optional settings.
    * @return {void}
    */
   var api = function(options) {
      this.options = $.extend(true, {}, haytham.defaults, options);
      this.template = new haytham.template(this.options);
   };

   api.prototype = {
      constructor: api,

      generate: function(year, month) {
         return this.template.generate(year, month);
      }
   }

   haytham.api = api;

})(jQuery, HAYTHAM || {});