$(document).ready(() => {
    /* initialize */

    let today = new Date();
    let currentDate; // 當前 datepicker 的值
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
    setCalendar(new Date(today.getFullYear(), today.getMonth(), 1).getDay(), new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate());

    function setCalendar(firstDay, dayNum) {
        let weekNum = 6;
        let week5 = document.getElementById('week_5');
        if (firstDay + dayNum > 35) { //若第一天星期幾+該月天數>35 代表需要最後一周 
            week5.innerHTML = content;
            weekNum = 6; //並調整weekNum(會顯示幾周)
        } else { //否則要把最後一周刪掉
            week5.innerHTML = "";
            weekNum = 5;
        }
        for (let i = 0; i < weekNum; i++) { //表格初始class內容(清空'hide')
            for (let j = 0; j < 7; j++) {
                let block = document.getElementById(i + '-' + j);
                block.setAttribute('class', 'card day_block');
            }
        }
        let counter = 1;
        for (let i = 0; i < weekNum; i++) {
            for (let j = 0; j < 7; j++) {
                let block = document.getElementById(i + '-' + j);
                if (i == 0 && j < firstDay) { //前段設成hide
                    block.classList.add('hide');
                    continue;
                }
                if (counter > dayNum) { //後段設成hide
                    block.classList.add('hide');
                    continue;
                }
                block.innerHTML = "<span class='number_block'>" + counter + "</span>";
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
        let firstDay = new Date(year, month - 1, 1).getDay(); //取得該月第一天星期幾
        let dayNum = new Date(year, month, 0).getDate(); //取得該月有幾天
        setCalendar(firstDay, dayNum);
        /* TODO: 更改桌面版日曆程式碼 */

    });
    let meetingTime = document.getElementById('meeting_time').textContent.trim().split(',');
    let meetingTitle = document.getElementById('meeting_title').textContent.trim().split(',');
    let mobileContent = document.getElementById('calendar_zone_mobile');
    initialContent();
    setTitieYear();

    function setTitieYear() {
        let yearTitle = document.querySelector('.fw-bold');
        yearTitle.textContent = `${today.getFullYear()} 年 ${today.getMonth() + 1} 月`;
    }

    function initialContent() {
        mobileContent.innerHTML = "";
        let h3 = document.createElement('h3');
        h3.setAttribute('class', 'mx-3 my-0 fw-bold');
        let monthBar = document.createElement('div');
        monthBar.setAttribute('id', 'month_bar');
        monthBar.setAttribute('class', 'd-flex flex-column justify-content-center');
        monthBar.appendChild(h3);
        mobileContent.appendChild(monthBar);

        let level1 = document.createElement('div');
        level1.setAttribute('class', 'd-flex flex-column px-3');
        let str = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
        let arr = [];
        for (let i = 0; i < meetingTime.length; i++) {
            // if (parseInt(meetingTime[i].split('T')[0].split('-')[1]) == today.getMonth() + 1 && parseInt(meetingTime[i].split('T')[0].split('-')[0]) == today.getFullYear())
            arr.push(parseInt(meetingTime[i].split('T')[0].split('-')[2]));
        }
        let count = {}; //對日期進行每個值的重複數量紀錄
        arr.forEach(function(x) {
            count[x] = (count[x] || 0) + 1;
        });
        if (str != meetingTime[0].split('T')[0]) {
            let level2 = document.createElement('div');
            level2.setAttribute('class', 'content_item my-3 d-flex');
            let level3_date = createDateNode(today.getDate()); //新增日期
            level2.appendChild(level3_date);
            let level3_meet = document.createElement('div');
            level3_meet.setAttribute('class', 'event_zone flex-fill ms-4 d-flex flex-column');
            let level4 = createEventNode("nothing", 0);
            level3_meet.appendChild(level4);
            level2.appendChild(level3_meet);
            level1.appendChild(level2);
        }
        let index = 0;
        for (let i in count) {

            let level2 = document.createElement('div');
            level2.setAttribute('class', 'content_item my-3 d-flex');
            let level3_date = createDateNode(i); //新增日期
            level2.appendChild(level3_date);
            let level3_meet = document.createElement('div');
            level3_meet.setAttribute('class', 'event_zone flex-fill ms-4 d-flex flex-column');
            for (let j = 0; j < count[i]; j++) {
                let level4 = createEventNode(meetingTitle[index], meetingTime[index].split('T')[1]); //新增會議內容
                level3_meet.appendChild(level4);
                index++;
            }
            level2.appendChild(level3_meet);
            level1.appendChild(level2);
        }
        mobileContent.appendChild(level1);
    }

    function createDateNode(number) {
        let todayDate = document.createElement('div');
        todayDate.setAttribute('class', 'day_circle d-flex justify-content-center align-items-center');
        let dateNum = document.createElement('span');
        dateNum.textContent = number;
        todayDate.appendChild(dateNum);
        return todayDate;
    }

    function createEventNode(title, time) {
        if (title == "nothing") {
            let temp = document.createElement('div');
            temp.setAttribute('class', 'event_item_none mb-2 px-3 d-flex flex-column');
            temp.textContent = "太棒了！今天沒有會議";
            return temp;
        } else {
            let level1 = document.createElement('div');
            level1.setAttribute('class', 'event_item mb-2 px-3 d-flex flex-column');
            let level2_title = document.createElement('div');
            level2_title.setAttribute('clas', 'meeting_title');
            level2_title.textContent = title;
            let level2_time = document.createElement('div');
            level2_time.setAttribute('class', 'meeting_time');
            level2_time.textContent = time;
            level1.appendChild(level2_title);
            level1.appendChild(level2_time);
            return level1;
        }
    }

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
