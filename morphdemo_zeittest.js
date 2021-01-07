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
mc12 = new MorphClock('morphclockdemo12', 'hhmmss12');
mc24 = new MorphClock('morphclockdemo24', 'hhmmss24');
md = new MorphDate('morphdatedemofull', 'full');
mdde = new MorphDate('morphdatedemofullde', 'full-de');
ml = new MorphLogo('morphlogodemo');
mc12.launch = () => {
    var now = new MorphInternalTimeDate(offset);
    mc12.update(now);
    window.requestAnimationFrame(mc12.launch);
}
mc24.launch = () => {
    var now = new MorphInternalTimeDate(offset);
    mc24.update(now);
    window.requestAnimationFrame(mc24.launch);
}
md.launch = () => {
    var now = new MorphInternalTimeDate(offset);
    md.update(now);
    window.requestAnimationFrame(md.launch);
}
mdde.launch = () => {
    var now = new MorphInternalTimeDate(offset);
    mdde.update(now);
    window.requestAnimationFrame(mdde.launch);
}
ml.launch = () => {
    var now = new MorphInternalTimeDate(offset);
    ml.update(now);
    window.requestAnimationFrame(ml.launch);
}
