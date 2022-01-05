window.onload = function() {
    let form = document.getElementById('authority');
    for (let i in form.childNodes) {
        if (i % 2 == 1) {
            let partYes = form.childNodes[i].childNodes[11].childNodes[1];
            let partNo = form.childNodes[i].childNodes[11].childNodes[7];
            let partList = form.childNodes[i].childNodes[11].childNodes[5];
            partYes.addEventListener('click', func => {
                if (partList.hasAttribute('disabled'))
                    partList.removeAttribute('disabled');
            })
            partNo.addEventListener('click', func => {
                partList.setAttribute('disabled', '');
            })
        }
    }

}
