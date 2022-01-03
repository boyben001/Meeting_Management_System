window.onload = function() {

    let editBtn = document.getElementById('edit_btn');
    let saveBtn = document.getElementById('save_btn');

    editBtn.disabled = false; //編輯按鈕初始化為可以按
    saveBtn.disabled = true; //儲存按鈕初始化為不能按
    editBtn.addEventListener('click', edit);

    function edit(e) {
        let input = getInput(); //取用該頁面資料
        for (let i in input) {
            input[i].disabled = false;
        }
        editBtn.disabled = true;
        saveBtn.disabled = false;
    }

    function getInput() { //透過Json格式回傳該頁面所有欄位
        let identity = document.getElementById('identity').textContent.substring(4);

        let basicInput = [
            document.getElementById('account'),
            document.getElementById('password'),
            document.getElementById('name'),
            document.getElementById('gender_male'),
            document.getElementById('gender_female'),
            document.getElementById('email'),
            document.getElementById('tel')
        ];

        if (identity == '系上老師') {
            basicInput.push(document.getElementById('department_teacher_job'));
            return basicInput;
        } else if (identity == '學生代表') {
            basicInput.push(document.getElementById('student_id'));
            basicInput.push(document.getElementById('student_system'));
            basicInput.push(document.getElementById('student_class'));
            return basicInput;
        } else if (identity == '系助理') {
            basicInput.push(document.getElementById('assistant_tel'));
            return basicInput;
        } else if (identity == '校外老師') {
            basicInput.push(document.getElementById('outside_teacher_school'));
            basicInput.push(document.getElementById('outside_teacher_department'));
            basicInput.push(document.getElementById('outside_teacher_title'));
            basicInput.push(document.getElementById('outside_teacher_tel'));
            basicInput.push(document.getElementById('outside_teacher_addr'));
            basicInput.push(document.getElementById('outside_teacher_bank'));
            return basicInput;
        } else if (identity == '業界專家') {
            basicInput.push(document.getElementById('expert_company'));
            basicInput.push(document.getElementById('expert_title'));
            basicInput.push(document.getElementById('expert_tel'));
            basicInput.push(document.getElementById('expert_addr'));
            basicInput.push(document.getElementById('expert_bank'));
            return basicInput;
        }
    }
}
