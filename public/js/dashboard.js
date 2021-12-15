
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
    //setCalendar參數為 => 該月第一天星期幾 , 該月有幾天
    let content = document.getElementById('week_5').innerHTML;
    setCalendar(new Date(today.getFullYear(),today.getMonth(),1).getDay(),new Date(today.getFullYear(),today.getMonth()+1,0).getDate());
    function setCalendar(firstDay,dayNum){
        let weekNum = 6;
        let week5 = document.getElementById('week_5');
        if(firstDay+dayNum > 35){                              //若第一天星期幾+該月天數>35 代表需要最後一周 
            week5.innerHTML = content;                        
            weekNum = 6;                                       //並調整weekNum(會顯示幾周)
        }
        else{                                                  //否則要把最後一周刪掉
            week5.innerHTML = "";
            weekNum = 5;
        }
        for(let i=0;i<weekNum;i++){                            //表格初始class內容(清空'hide')
            for(let j=0;j<7;j++){
                let block = document.getElementById(i + '-' + j);
                block.setAttribute('class','card day_block');
            }
        }
        let counter = 1;
        for(let i=0;i<weekNum;i++){                               
            for(let j=0;j<7;j++){
                let block = document.getElementById(i + '-' + j);
                if(i==0 && j<firstDay){                       //前段設成hide
                    block.classList.add('hide');
                    continue;
                }
                if(counter > dayNum){                         //後段射程hide
                    block.classList.add('hide');
                    continue;
                }  
                block.innerHTML = "<span class='number_block'>"+ counter + "</span>";
                counter++;
            }
        }
    }
    /* 當 datepicker 值改變 */
    $('#datepicker').change((e) => {
        currentDate = $('#datepicker').val();
        let temp = currentDate.split('-');
        let year = Number(temp[0]);
        let month = Number(temp[1]);
        let firstDay = new Date(year,month-1,1).getDay();   //取得該月第一天星期幾
        let dayNum = new Date(year,month,0).getDate();      //取得該月有幾天
        setCalendar(firstDay,dayNum);
        /* TODO: 更改桌面版日曆程式碼 */
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
