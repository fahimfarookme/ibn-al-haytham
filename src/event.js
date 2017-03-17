/**
 * Binds events with the calendar.
 *
 * @author Fahim Farook
 */
;
(function($, haytham) {

   "user strict";

   var util = function(data, options) {
      this.options = options;
      this.data = data ? data : {};
   };

   util.prototype = {
      constructor: util,

      year: function() {
         return this.data.year;
      },

      month: function() {
         return this.data.month;
      },

      monthName: function() {
         return this.options.month.long[this.data.month];
      },

      monthNameShort: function() {
         return this.options.month.short[this.data.month];
      },

      dayOfMonth: function() {
         return this.data.dayOfMonth;
      },

      dayOfWeek: function() {
         return this.data.dayOfWeek;
      },

      dayName: function() {
         var index = this.data.dayOfWeek + this.options.week.start;
         index = index > 6 ? index - 7 : index;
         return this.options.week.long[index];
      },

      dayNameShort: function() {
         var index = this.data.dayOfWeek + this.options.week.start;
         index = index > 6 ? index - 7 : index;
         return this.options.week.short[index];
      }
   };

   var event = function(options) {
      this.options = options;
      this.events = options.events;
   };

   event.prototype = {
      constructor: event,

      bind: function(template) {
         for (var key in this.events) {
            var event = this.events[key];
            template.on(event.name, event.selector, this._handler(event.handler, this.options));
         }
         return template;
      },

      unbind: function(template) {
         for (var key in this.events) {
            var event = this.events[key];
            template.off(event.name);
         }
         return template;
      },

      _handler: function(handler, options) {
         return function(event) {
            event.stopPropagation();
            var data = new util($(this).data(), options);

            if (typeof handler === "function") {
               return handler(data);
            }

            return data;
         };

      }

   };

   haytham.event = event;

})(jQuery, HAYTHAM || {});