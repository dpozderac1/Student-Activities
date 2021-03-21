function ucitajGodine() {
    var iscitavanje = new iscitavanjeGodinaAjax(document.getElementById("godina"));
}


secretJe = "";
keyJe = "";
bbucket = "";
function dodavanjeStudenata() {
    var objekatGodina = document.getElementById("godina");
    var key = document.getElementById("key");
    var secret = document.getElementById("secret");
    var dugmeDodaj = document.getElementById("dodaj");
    vratiNiz = [];
    function ispisi(greska, x) { if (greska == null) { console.log("Lista studenata: \n" + JSON.stringify(x)); dugmeDodaj.disabled = false; vratiNiz = x; } }

    if (!(secretJe == secret.value && keyJe == key.value && secretJe != "" && keyJe != "")) {
        secretJe = secret.value;
        keyJe = key.value;
        bbucket = new BitBucket(key.value, secret.value);
    }

    var dataGodina = objekatGodina.options[objekatGodina.selectedIndex].value;
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var vraceniSadrzaj = ajax.responseText;
            var objekat = JSON.parse(vraceniSadrzaj);
            bbucket.ucitaj(objekat[0].nazivRepVje, objekat[0].nazivRepSpi, ispisi);
        }
    }
    ajax.open("GET", "http://localhost:8080/dajDatuGodinu?godina=" + dataGodina, true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send();
    return false;
}


function novaFunkcija() {
    var sGodine = document.getElementById("godina");
    var godine = sGodine.options[sGodine.selectedIndex].value;
    var novi = new studentiAjax(godine, vratiNiz);
    return false;
}