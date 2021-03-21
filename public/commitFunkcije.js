var tabela;
//Napravi tabelu
function kreiraj(){
    var mojDiv=document.getElementById('glavni');
    var brojZadatka=document.getElementById('brojZadatka').value;
    tabela=new CommitTabela(mojDiv,brojZadatka);
    return false;
}

//Dodaj commit
function dodaj(){
    var brojReda=document.getElementById('brojReda1').value;
    var url=document.getElementById('url1').value;
    tabela.dodajCommit(parseInt(brojReda),url);
    return false;
}

//Edituj commit
function edituj(){
    var brojReda=document.getElementById('brojReda2').value;
    var brojCommita=document.getElementById('brojCommita2').value;
    var url=document.getElementById('url2').value;
    tabela.editujCommit(parseInt(brojReda),parseInt(brojCommita),url);    
    return false;
}

//Obrisi commit
function obrisi(){
    var brojReda=document.getElementById('brojReda3').value;
    var brojCommita=document.getElementById('brojCommita3').value;
    tabela.obrisiCommit(parseInt(brojReda),parseInt(brojCommita));
    return false;
}