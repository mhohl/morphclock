/* morphdemo_timetest.js */
var offset = 0;
$('input').change(function() {
    offset = $("#offset_year").val() * 365 * 24 * 60 * 60 * 1000
           + $("#offset_month").val() * 30 * 24 * 60 * 60 * 1000
                  + $("#offset_day").val() * 24 * 60 * 60 * 1000
                      + $("#offset_hour").val() * 60 * 60 * 1000
                         + $("#offset_minute").val() * 60 * 1000
                              + $("#offset_second").val() * 1000;
});
MorphDisplay.prototype.update = function() {
    let now = new MorphTimeDate(offset);
    // wir übergeben 'this' an die jeweilige Funktion:
    this[this.type].update.call(this, now);
}