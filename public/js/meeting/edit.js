window.onload = function() {
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
                if (!write.hasAttribute('disabled')) {
                    read.removeAttribute('disabled', '');
                }
            });
        }
    }
}
