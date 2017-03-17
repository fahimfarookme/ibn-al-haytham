/**
 * Template generator for Ibn Al-Haytham calendar.
 * Credits
 * - http://jszen.blogspot.pt/2007/03/how-to-build-simple-calendar-with.html.
 * - https://tympanus.net/Development/Calendario/index2.html
 *
 * @author Fahim Farook
 */
;
(function($, haytham) {

   "user strict";

   var MAX_WEEKS_PER_MONTH = 6,

      MAX_DAYS_PER_WEEK = 7,

      structure = (
         "<div class='iah-datepicker iah-rows-n>" +
            "<div class='head'>" +
               "<div class='month'></div>" +
               "<div class='year'></div>" +
            "</div>" +
            "<div class='body'>" +
               "<div class='week-header'></div>" +
               "<div class='week'>" +
                  "<span class='day' data-date='DD-MM-YYYY', data-data='{}'></span>" +
               "</div>" +
            "</div>" +
         "</div>"
      ),

      numWeeks = function(body) {
         return body.find(".week").size();
      };

   /**
    * The calendar template - generates calendar elements.
    * @return {element} calendar
    */
   var template = function(options) {
      this.options = options;
      this.$weekHeader = $("<div class='week-header'>").append(this._generateWeekHeader());
      this.event = new haytham.event(options);
   };

   template.prototype = {
      constructor: template,

      /**
       * Gnerates the html calendar for a given month. Also binds events on calendar.
       * @param  {integer} year  The year.
       * @param  {integer} month The month.
       * @return {element}       Generated html element.
       */
      generate: function(year, month) {
         var head = this._generateHead(year, month);
         var body = this._generateBody(year, month);
         var cal = $("<div class='iah-datepicker " + "iah-weeks-" + numWeeks(body) + "'>").append(head, body);
         return this.event.bind(cal);
      },

      /**
       * Generates the week header - which is static for all the calendars/ months.
       * @return {element} The <div class='week-header'> element.
       */
      _generateWeekHeader: function() {
         var html = "";
         for (var i = 0; i < 7; i++) {
            var index = i + this.options.week.start;
            index = index > 6 ? index - 7 : index;

            html += "<div>";
            html += this.options.week[this.options.week.display][index];
            html += "</div>";
         }

         return html;
      },


      /**
       * Generates the head section of the calendar.
       * <div class='head'>
       *    <div class='month'></div>
       *    <div class='year'></div>
       * </div>
       * 
       * @param  {integer} year  The year.
       * @param  {integer} month The month.
       * @return {element}       Generated html element.
       */
      _generateHead: function(year, month) {
         return $("<div class='head'>").append(
            $("<div class='month'>" + this.options.month[this.options.month.display][month] + "</div>"),
            $("<div class='year'>" + year + "</div>"));
      },

      /**
       * Generates the body section of the calendar.
       * <div class='body'>
       *    <div class='week-header'></div>
       *    <div class='week'></div>
       * </div>
       * 
       * @param  {integer} year  The year.
       * @param  {integer} month The month.
       * @return {element}       Generated html element.
       */
      _generateBody: function(year, month) {
         // new Date(year, month, 1).getDay() = first day of first week
         // new Date(year, month + 1, 0).getDate() = last day ofmonth  
         var diff = new Date(year, month, 1).getDay() - this.options.week.start;
         var firstDayOfFirstWeek = diff < 0 ? diff + MAX_DAYS_PER_WEEK : diff;

         var data = {
            year: year,
            month: month,
            week: 1, // starts at 1
            dayOfMonth: 1, // starts at 1
            lastDayOfMonth: new Date(year, month + 1, 0).getDate(),
            firstDayOfFirstWeek: firstDayOfFirstWeek
         };

         return $("<div class='body'>").append(this.$weekHeader, this._generateWeeks(data.week, data));
      },

      /**
       * Generates weeks array, recursively.
       * <div class='week'></div>
       * <div class='week'></div>
       * <div class='week'></div>
       * <div class='week'></div>
       * 
       * @param  {integer} week  The week. 1 -> first week.
       * @param  {object}  data  The data having rest of the details. dayOfMonth, lastDayOfMonth
       * @return {element}       Generated html elements.
       */
      _generateWeeks: function(week, data) {
         // exit conditions
         // if week exceeded 6
         // if day of month exceeded last day of month.
         if (week > MAX_WEEKS_PER_MONTH || data.dayOfMonth > data.lastDayOfMonth) {
            return;
         }
         var $curr = $("<div class='week'>").append(this._generateDaysOfWeek(0, data));
         ++data.week;
         return $curr.after(this._generateWeeks(data.week, data));
      },

      /**
       * Generates days array for the given week, recursively.
       * <div></div>
       * <div></div>
       * <div></div>
       * <div></div>
       * <div></div>
       * <div></div>
       * <div></div>
       * 
       * @param  {integer} dayOfWeek   The day of the week.
       * @param  {object}  data        The data having rest of the details.
       * @return {element}             Generated html elements.
       */
      _generateDaysOfWeek: function(dayOfWeek, data) {
         // exit conditions
         // if day of week exceeded 7
         if (dayOfWeek >= MAX_DAYS_PER_WEEK) {
            return;
         }

         var $curr = $("<div class='day'>");
         // day of month - not exceeded the last day of month
         // not first week -OR- Or first day of of (first week) is reached
         if (data.dayOfMonth <= data.lastDayOfMonth && (data.week > 1 || dayOfWeek >= data.firstDayOfFirstWeek)) {
            var dayStr = data.year + "-" + (data.month < 10 ? "0" + data.month : data.month) + "-" + (data.dayOfMonth < 10 ? "0" + data.dayOfMonth : data.dayOfMonth);
            $curr.append(data.dayOfMonth);
            $curr.data("dayOfWeek", dayOfWeek);
            $curr.data("dayOfMonth", data.dayOfMonth);
            $curr.data("month", data.month);
            $curr.data("year", data.year);
            $curr.data("data", this.options.data[dayStr]);
            ++data.dayOfMonth;
         }

         return $curr.after(this._generateDaysOfWeek(++dayOfWeek, data));
      }
   };

   haytham.template = template;

})(jQuery, HAYTHAM || {});