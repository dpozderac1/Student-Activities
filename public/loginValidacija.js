function loginValidacija(){
    var poruka=document.getElementById('poruka');
    var mojDiv1=document.getElementById('username');
    var mojDiv2=document.getElementById('password');    
    var v=new Validacija(poruka);
    v.ime(mojDiv1);
    v.password(mojDiv2);
    return false;
}