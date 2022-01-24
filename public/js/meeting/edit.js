$(document).ready(() => {
    /* INFO: 身分權限 */
    let form = document.getElementById('authority');
    for (let i in form.childNodes) {
        if (i % 2 == 1) {
            let partYes = form.childNodes[i].childNodes[11].childNodes[1];
            let partNo = form.childNodes[i].childNodes[11].childNodes[7];
            let partList = form.childNodes[i].childNodes[11].childNodes[5];
            let read = form.childNodes[i].childNodes[7].childNodes[0];
            let write = form.childNodes[i].childNodes[9].childNodes[0];

            partYes.addEventListener('click', () => {
                if (partList.hasAttribute('disabled'))
                    partList.removeAttribute('disabled');
                if (!write.hasAttribute('disabled')) {
                    read.checked = true;
                    read.setAttribute('disabled', '');
                }
            });
            partNo.addEventListener('click', () => {
                partList.setAttribute('disabled', '');
                if (!write.hasAttribute('disabled') && !write.checked) {
                    read.removeAttribute('disabled', '');
                }
            });
            write.addEventListener('click', () => {
                if (write.checked) {
                    read.checked = true;
                    read.setAttribute('disabled', '');
                } else if (partList.hasAttribute('disabled')) {
                    read.removeAttribute('disabled', '');
                }
            });
        }
    }

    /* INFO: 動態新增刪除提案 */
    let disscussNum = 0;
    let originMode = localStorage.getItem("theme");
    $('#add_discuss_btn').click(() => {
        let changeMode = localStorage.getItem("theme");
        if (originMode != changeMode) {
            changeMode = originMode
        }
        disscussNum += 1;
        let item = 'discuss' + disscussNum;
        $(`
            <div id="${item}" class="card">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>提案</h3>
                <button type="button" id="delete_${item}_btn" class="icon_text_button">
                  <span class="material-icons">delete</span>
                  <span>刪除</span>
                </button>
              </div>
              <div class="card_item">
                <label>案&emsp;&emsp;由</label>
                <textarea id="${item}_title" name="${item}Title" rows="3" required></textarea>
              </div>
              <div class="card_item">
                <label>說&emsp;&emsp;明</label>
                <textarea id="${item}_content" name="${item}Content" rows="6"></textarea>
              </div>
              <div class="card_item">
                <label>決議事項</label>
                <textarea id="${item}_resolution" name="${item}Resolution" rows="6"></textarea>
              </div>
              <div class="card_item">
                <label>執行情況</label>
                <textarea id="${item}_implementation" name="${item}Implementation" rows="6"></textarea>
              </div>
            </div>
        `).hide().appendTo('#discuss_container').fadeIn(500);
        /* INFO: Darkmode */
        if (changeMode == 'dark') {
            localStorage.setItem("theme", "light");
            $('#' + item).css({
                "background-color": "#1b1b1b",
                "color": "#fff",
                "border": "1px solid rgba(255,255,255,.125)"
            });
        } else {
            localStorage.setItem("theme", "dark");
            $('#' + item).css({
                "background-color": "",
                "color": "",
                "border": "1px solid rgba(0,0,0,.125)"
            });
        }
        $('html, body').animate({
            scrollTop: $('#' + item).offset().top - 100
        }, 300);

        $('#delete_' + item + '_btn').click(() => {
            $('#' + item).fadeOut(500, () => $('#' + item).remove());
        });
    });

    /* INFO: 動態新增刪除附件 */
    let attachmentNum = 0;
    $('#add_attachment_btn').click(() => {
        attachmentNum += 1;
        let item = 'attachment' + attachmentNum;
        $(`
            <li id="${item}">
              <div class="d-flex align-items-center mb-2">
                <input  type="file" id="${item}_input" name="${item}Input" class="form-control">
                <span id="delete_${item}_btn" class="material-icons delete_attachment_btn">delete</span>
              </div>
            </li>
        `).hide().appendTo('#attachment_container').fadeIn(500);

        $('#delete_' + item + '_btn').click(() => {
            $('#' + item).fadeOut(500, () => $('#' + item).remove());
        });
    });

    $('#save_btn').click(() => {
        for (let i in form.childNodes) {
            if (i % 2 == 1) {
                let read = form.childNodes[i].childNodes[7].childNodes[0];
                let write = form.childNodes[i].childNodes[9].childNodes[0];
                read.removeAttribute('disabled');
                write.removeAttribute('disabled');
            }
        }
    });

});
