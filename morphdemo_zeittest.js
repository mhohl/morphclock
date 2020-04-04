/* morphdemo_timetest.js */
var offset = 0;
var leap = 0;
$('input[type=number]').change(function() {
    offset = $("#offset_year").val() * 365 * 24 * 60 * 60 * 1000
           + $("#offset_month").val() * 30 * 24 * 60 * 60 * 1000
                  + $("#offset_day").val() * 24 * 60 * 60 * 1000
                      + $("#offset_hour").val() * 60 * 60 * 1000
                         + $("#offset_minute").val() * 60 * 1000
                              + $("#offset_second").val() * 1000;
});
$("input[name=leap]").change(function() {
    leap = $(this).val();
    Morph.io.leap = leap;
});
MorphDisplay.prototype.update = function() {
    let now = new MorphTimeDate(offset);
    // wir übergeben 'this' an die jeweilige Funktion:
    this[this.type].update.call(this, now);
}