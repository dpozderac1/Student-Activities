function validacijaPojedinacni(){
    var poruka=document.getElementById('poruka');
    var ime=document.getElementById('ime');
    var godina=document.getElementsByName('godina')[0];
    var index=document.getElementById('index');
    var v=new Validacija(poruka);
    v.ime(ime);
    v.godina(godina);
    v.index(index);
    return false;
}

function validacijaMasovni(){
    var poruka=document.getElementById('poruka1');
    var godina=document.getElementsByName('godina')[1];
    var v=new Validacija(poruka);
    v.godina(godina);
    return false;
}