drop database `meeting_system_sql`;
create database `meeting_system_sql`;
use `meeting_system_sql`;

create table `使用者`(
    `使用者編號` int primary key  auto_increment,
    `帳號` varchar(30),
    `密碼` varchar(30),
    `姓名` varchar(30),
    `性別` int, /* 1: 男, 2: 女 */
    `電話號碼` varchar(20),
    `e-mail` varchar(50),
    `身分` varchar(20),
    `管理者` boolean
);

create table `學生代表`(
    `使用者編號` int primary key,
    foreign key (`使用者編號`) references `使用者`(`使用者編號`) on delete cascade,
    `學號` varchar(10),
    `學制` varchar(10),
    `班級` varchar(10)
);

create table `系助理`(
    `使用者編號` int primary key,
    foreign key (`使用者編號`) references `使用者`(`使用者編號`) on delete cascade,
    `辦公室電話` varchar(20)
);

create table `系上老師`(
    `使用者編號` int primary key,
    foreign key (`使用者編號`) references `使用者`(`使用者編號`) on delete cascade,
    `職級` varchar(20)
);

create table `校外老師`(
    `使用者編號` int primary key,
    foreign key (`使用者編號`) references `使用者`(`使用者編號`) on delete cascade,
    `任職學校` varchar(30),
    `系所` varchar(30),
    `職稱` varchar(20),
    `辦公室電話` varchar(20),
    `聯絡地址` varchar(100),
    `銀行帳號`varchar(30)
);

create table `業界專家`(
    `使用者編號` int primary key,
    foreign key (`使用者編號`) references `使用者`(`使用者編號`) on delete cascade,
    `任職公司` varchar(30),
    `職稱` varchar(20),
    `辦公室電話` varchar(20),
    `聯絡地址` varchar(100),
    `銀行帳號` varchar(30)
);

create table `會議`(
    `會議編號` int primary key auto_increment,
    `會議名稱` varchar(200),
    `開會地點` varchar(30),
    `開會時間` varchar(100),
    `主席致詞` varchar(5000),
    `報告內容` varchar(5000)
);

create table `討論事項`(
    `討論事項編號` int primary key auto_increment,
    `會議編號` int,
    foreign key (`會議編號`) references `會議`(`會議編號`) on delete cascade,
    `案由` varchar(500),
    `說明` varchar(5000),
	`決議事項` varchar(5000),
    `執行情況` varchar(5000)
);

create table `附件`(
    `附件編號` int primary key auto_increment,
    `會議編號` int,
    foreign key (`會議編號`) references `會議`(`會議編號`) on delete cascade,
    `附件檔案` varchar(500)
);

create table `參與`(
    `會議編號` int,
    foreign key (`會議編號`) references `會議`(`會議編號`) on delete cascade,
    `使用者編號` int,
    foreign key (`使用者編號`) references `使用者`(`使用者編號`) on delete cascade,
    primary key (`會議編號`, `使用者編號`),
    `角色` int,  /* 0: 沒參加, 1: 主席, 2: 書記, 3: 出席人員 */
    `閱讀權限` boolean,
    `編輯權限` boolean
);

insert into 使用者 values(1, 'dannynfs', '0700', '陳泓銘', '1', '0900000001', 'a1085511@mail.nuk.edu.tw', '學生代表', false);
insert into 使用者 values(2, 'PR', '0602', '林子閎', '1', '0900000002', 'a1085516@mail.nuk.edu.tw', '業界專家', true);
insert into 使用者 values(3, 'boyben', '0111', '陳鼎元', '1', '0900000003', 'a1085507@mail.nuk.edu.tw', '校外老師', true);
insert into 使用者 values(4, 'TA', '0628', '林鈺修', '1', '0900000004', 'a1085524@mail.nuk.edu.tw', '系上老師', true);
insert into 使用者 values(5, 'SJ', '0000', '陳淑真', '2', '0900000005', 'csie@mail.nuk.edu.tw', '系助理', false);

insert into 學生代表 values('1', 'a1085511', '日間部', '3');
insert into 業界專家 values('2', '鼎元洗屁股公司', '月薪20萬馬桶大隊長', '071234567', '高雄市彌陀區鹽港一路41巷', '123456-654321');
insert into 校外老師 values('3', '國立台灣大學', '資訊工程學系', '模範碩士生', '0212345678', '高雄市彌陀區鹽港一路41巷', '654321-123456');
insert into 系上老師 values('4', '特聘教授張保榮的助教');
insert into 系助理 values('5', '075919518');

insert into 會議 values(NULL, '第一個會議', '工院200教室', '2022-01-23T22:00', '主席沒有要致詞', '沒什麼內容好報告的');
insert into 討論事項 values(NULL, 1, '馬桶大隊長加薪事宜', '將馬桶大隊長的月薪從20萬調薪至30萬', '無條件通過', '下個月就調薪');
insert into 參與 values(1, 1, 3, true, false);
insert into 參與 values(1, 2, 1, true, true);
insert into 參與 values(1, 3, 2, true, true);
insert into 參與 values(1, 4, 3, true, false);
insert into 參與 values(1, 5, 3, true, false);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';