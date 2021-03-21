var studentiAjax = (function () {
    var konstruktor = function (idGodine,poslaniStudenti) {
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == XMLHttpRequest.DONE) {
                alert(JSON.parse(ajax.responseText).message);
            }
        }
        var objekat={godina:idGodine,studenti:JSON.stringify(poslaniStudenti)};
        ajax.open("POST", "http://localhost:8080/student", true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(objekat));
    }
    return konstruktor;
}());