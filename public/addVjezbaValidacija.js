function validacijaPostojeca(){
    var poruka=document.getElementById('poruka');
    var godina=document.getElementById('godina');
    var v=new Validacija(poruka);
    v.godina(godina);
    return false;
}

function validacijaNova(){
    var poruka=document.getElementById('poruka1');
    var naziv=document.getElementsByName('naziv')[0];
    var godina=document.getElementById('godina1');
    var v=new Validacija(poruka);
    v.naziv(naziv);
    v.godina(godina);
    return false;
}