function poveziVjezbaAjax() {
    //console.log("Pozvano povezivanje");
    poveziVj = new iscitavanjeGodinaAjax(document.getElementById('godina'));
    poveziVj1 = new iscitavanjeGodinaAjax(document.getElementById('godina1'));
    iscitajVj = new iscitavanjeVjezbeAjax(document.getElementById('vjezbe'));
    iscitajVjZadatak = new iscitavanjeVjezbeAjax(document.getElementById('poveziZadatakVjezbe'));

    var prvi = new iscitavanjeZadatkaAjax(document.getElementById('poveziZadatakZadatak'), 1);

    sVjezbe = document.getElementById('poveziZadatakVjezbe');
    sVjezbe.addEventListener("change", function () {
        var e = document.getElementById("poveziZadatakVjezbe");
        var strUser = e.options[e.selectedIndex].value;
        zadatak = new iscitavanjeZadatkaAjax(document.getElementById('poveziZadatakZadatak'), strUser);
    });
}

function pozoviPost() {
    console.log("Ovo je element sZadatak");
    var sVjezbe = document.getElementById('poveziZadatakVjezbe');
    var sZadatak = document.getElementById('poveziZadatakZadatak');
    console.log(sZadatak.options[sZadatak.selectedIndex]);
    console.log(sVjezbe.options[sZadatak.selectedIndex]);
    var objekat = [];
    if (sZadatak.options[sZadatak.selectedIndex] == undefined || sVjezbe.options[sZadatak.selectedIndex] == undefined) {
        objekat = { sVjezbe: undefined, idVj: undefined, sZadatak: undefined };
    }
    else {
        var sljedeci = sVjezbe.selectedIndex + 1;
        objekat = { sVjezbe: sVjezbe.options[sVjezbe.selectedIndex].value, idVj: sljedeci, sZadatak: sZadatak.options[sZadatak.selectedIndex].value };
    }

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
        }
    }
    ajax.open('POST', 'http://localhost:8080/vjezba/' + sljedeci + '/zadatak', true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify(objekat));
}