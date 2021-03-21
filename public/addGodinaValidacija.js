function validacijaSide() {
    var poruka = document.getElementById('poruka');
    var godina = document.getElementById('nazivGodine');
    var vjezbe = document.getElementById('nazivRepozVjezbe');
    var spirale = document.getElementById('nazivRepozSpirale');
    var v = new Validacija(poruka);
    v.godina(godina);
    v.naziv(vjezbe);
    v.naziv(spirale);
    if (neIspisuj[1] == true && neIspisuj[4] == true) {
        return true;
    }
    else {
        return false;
    }
}