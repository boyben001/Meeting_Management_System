$(document).ready(() => {
    /* initialize */
    let today = new Date();
    let currentDate;  // 當前 datepicker 的值
    $('#datepicker').datepicker({
        format: 'yyyy-mm',
        startView: 'months', 
        minViewMode: 'months',
        autoclose: true
    });
    $('#datepicker').datepicker('update', today);
    currentDate = $('#datepicker').val();

    /* 當 datepicker 值改變 */
    $('#datepicker').change((e) => {
        currentDate = $('#datepicker').val();
        /* TODO: 更改日曆程式碼 */
    });

    /* 上個月按鈕 */
    $('#prev_month').click(() => {
        let year = parseInt(currentDate.slice(0, 4));
        let month = parseInt(currentDate.slice(5));
        if (month == 1) {
            year -= 1;
            month = 12;
        } else month -= 1;

        $('#datepicker').datepicker('update', new Date(year, month - 1));
    });

    /* 下個月按鈕 */
    $('#next_month').click(() => {
        let year = parseInt(currentDate.slice(0, 4));
        let month = parseInt(currentDate.slice(5));
        if (month == 12) {
            year += 1;
            month = 1;
        } else month += 1;

        $('#datepicker').datepicker('update', new Date(year, month - 1));
    });
});
