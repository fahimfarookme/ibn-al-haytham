/**
 * The default options.
 *
 * @author Fahim Farook
 */
;
(function($, haytham) {

   "user strict";

   var now = new Date();

   haytham.defaults = {
      month: {
         start: now.getMonth(),
         long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
         short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
         display: "long"
      },
      week: {
         start: 1, // 0 - Sunday, 1 - Monday...
         long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
         short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
         display: "short"
      },
      year: now.getFullYear(),
      events: {
         clickDate: {
            name: "click.haytham",
            selector: ".day",
            handler: null
         }
      },
      data: {
         // "MM-DD-YYYY" : "HTML Content",
         // "MM-DD-YYYY" : "HTML Content",
         // "MM-DD-YYYY" : "HTML Content"
      }
   };

})(jQuery, HAYTHAM || {});