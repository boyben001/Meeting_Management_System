console.log('hello');
/* Monday 改成 Mon. */
$("#datepicker").datepicker( {
    format: "mm-yyyy",
    startView: "months", 
    minViewMode: "months"
});