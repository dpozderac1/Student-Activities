var iscitavanjeGodinaAjax = (function () {
    var konstruktor = function (divSadrzaj) {
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                console.log("U ajaxu");
                var vraceniSadrzaj = ajax.responseText;
                var objekat = JSON.parse(vraceniSadrzaj);
                for (var i = 0; i < objekat.length; i++) {
                    //divSadrzaj.options[divSadrzaj.options.length] = new Option(objekat[i].nazivGod, objekat[i].nazivGod);
                    var opt = document.createElement('option');
                    opt.value = objekat[i].id;
                    opt.text = objekat[i].nazivGod;
                    console.log("U iscitavanjeGodinaAjax sam "+objekat[i].id);
                    console.log("U iscitavanjeGodinaAjax sam "+objekat[i].nazivGod);
                    divSadrzaj.appendChild(opt);
                }
            }
        }
        ajax.open("GET", "http://localhost:8080/procitajGodine", true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    }
    return konstruktor;
}());