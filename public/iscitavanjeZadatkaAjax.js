var iscitavanjeZadatkaAjax = (function () {
    var konstruktor = function (divSadrzaj, trenutnaVjezba) {
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                // console.log("U ajaxu Zadatka sam");
                // console.log(trenutnaVjezba);
                var vraceniSadrzaj = ajax.responseText;
                var objekat = JSON.parse(vraceniSadrzaj);
                divSadrzaj.options.length=0;
                for (var i = 0; i < objekat.length; i++) {
                    //objekat[i].nazivGod;
                    //divSadrzaj.options[divSadrzaj.options.length] = new Option(objekat[i].id, objekat[i].naziv);
                    var opt = document.createElement('option');
                    opt.value = objekat[i].id;
                    opt.text = objekat[i].naziv;
                    divSadrzaj.appendChild(opt);
                }
            }
        }
        ajax.open("GET", "http://localhost:8080/procitajZadatak?vjezba=" + trenutnaVjezba, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();
    }
    return konstruktor;
}());