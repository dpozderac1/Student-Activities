function addZadatakValidacija(){
    var poruka=document.getElementById('poruka');
    var inputElement=document.getElementById('nazivZadatka');
    var v=new Validacija(poruka).naziv(inputElement);
    if (neIspisuj[4] == true) {
        console.log("Tacno je");
        return true;
    }
    else {
        console.log("Netacno je");
        return false;
    }
}