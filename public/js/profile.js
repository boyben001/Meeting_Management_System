window.onload = function() {
    let editBtn = document.getElementById('edit_btn');
    let saveBtn = document.getElementById('save_btn');

    editBtn.disabled = false; //編輯按鈕初始化為可以按
    saveBtn.disabled = true; //儲存按鈕初始化為不能按
    editBtn.addEventListener('click', edit);
    saveBtn.addEventListener('click', save);

    function edit(e) {
        let data = getData(); //取用該頁面資料
        for (let i in data) {
            if ((i != 'number') && (i != 'identity')) //把欄位的disable拿掉
                data[i].disabled = false;
        }
        //        console.log(data['depAssTel'].value);
        editBtn.disabled = true;
        saveBtn.disabled = false;
    }

    function save(e) {
        let data = getData(); //取用該頁面資料
        for (let i in data) {
            if ((i != 'number') && (i != 'identity')) //把欄位的disable放上
                data[i].disabled = true;
        }
        //        console.log(data['depAssTel'].value);
        editBtn.disabled = false;
        saveBtn.disabled = true;
    }

    function getData() { //透過Json格式回傳該頁面所有欄位
        let number = document.getElementById('number').textContent.substring(7);
        let identity = document.getElementById('identity').textContent.substring(4);
        let accountInput = document.getElementById('account_input');
        let passwordInput = document.getElementById('password_input');
        let nameInput = document.getElementById('name_input');
        let gender = getGender(); //1為男性、2為女性
        let emailInput = document.getElementById('email_input');
        let telInput = document.getElementById('tel_input');
        if (identity == '系上老師') {
            let depTeaJob = document.getElementById('department_teacher_job_input');
            return ({
                number: number,
                identity: identity,
                accountInput: accountInput,
                passwordInput: passwordInput,
                nameInput: nameInput,
                emailInput: emailInput,
                telInput: telInput,
                depTeaJob: depTeaJob
            });
        } else if (identity == '學生代表') {
            let stuId = document.getElementById('student_id_input');
            let stuSys = document.getElementById('student_system_input');
            let stuClass = document.getElementById('student_class_input');
            return ({
                number: number,
                identity: identity,
                accountInput: accountInput,
                passwordInput: passwordInput,
                nameInput: nameInput,
                emailInput: emailInput,
                telInput: telInput,
                stuId: stuId,
                stuSys: stuSysm,
                stuClass: stuClass
            });
        } else if (identity == '系助理') {
            let depAssTel = document.getElementById('department_assistant_tel_input');
            return ({
                number: number,
                identity: identity,
                accountInput: accountInput,
                passwordInput: passwordInput,
                nameInput: nameInput,
                emailInput: emailInput,
                telInput: telInput,
                depAssTel: depAssTel
            });
        } else if (identity == '校外老師') {
            let outTeaSch = document.getElementById('outside_teacher_school_input');
            let outTeaDep = document.getElementById('outside_teacher_department_input');
            let outTeaTitle = document.getElementById('outside_teacher_title_input');
            let outTeaTel = document.getElementById('outside_teacher_tel_input');
            let outTeaAddr = document.getElementById('outside_teacher_addr_input');
            let outTeaBank = document.getElementById('outside_teacher_bank_input');
            return ({
                number: number,
                identity: identity,
                accountInput: accountInput,
                passwordInput: passwordInput,
                nameInput: nameInput,
                emailInput: emailInput,
                telInput: telInput,
                outTeaSch: outTeaSch,
                outTeaDep: outTeaDep,
                outTeaTitle: outTeaTitle,
                outTeaTel: outTeaTel,
                outTeaAddr: outTeaAddr,
                outTeaBank: outTeaBank
            });
        } else if (identity == '業界專家') {
            let indExpCom = document.getElementById('industry_expert_company_input');
            let indExpTitle = document.getElementById('industry_expert_title_input');
            let indExpTel = document.getElementById('industry_expert_tel_input');
            let indExpAddr = document.getElementById('industry_expert_addr_input');
            let indExpBank = document.getElementById('industry_expert_bank_input');
            return ({
                number: number,
                identity: identity,
                accountInput: accountInput,
                passwordInput: passwordInput,
                nameInput: nameInput,
                emailInput: emailInput,
                telInput: telInput,
                indExpCom: indExpCom,
                indExpTitle: indExpTitle,
                indExpTel: indExpTel,
                indExpAddr: indExpAddr,
                indExpBank: indExpBank
            });

        }

        function getGender() {
            if (document.getElementById('gender_input_male').checked == true) {
                return 1;
            } else {
                return 2;
            }
        }
    }
}
