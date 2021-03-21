var ZadaciAjax = (function () {
    var konstruktor = function (callbackFn) {
        var upucenZahtjev = false;        
        return {
            dajXML: function () {

                
                if (!upucenZahtjev) {
                    var ajax = new XMLHttpRequest();
                    upucenZahtjev = true;
                    ajax.onreadystatechange = function () {

                        if (ajax.readyState == 4 && ajax.status == 200) {
                            var vraceniSadrzaj = ajax.responseText;
                            callbackFn(vraceniSadrzaj);
                            upucenZahtjev = false;
                        }
                    }
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/xml');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                else {
                    var obj = { greska: "Već ste uputili zahtjev" };
                    callbackFn(JSON.stringify(obj));
                }
            },
            dajCSV: function () {                
                if (!upucenZahtjev) {
                    var ajax = new XMLHttpRequest();
                    upucenZahtjev = true;
                    ajax.onreadystatechange = function () {

                        if (ajax.readyState == 4 && ajax.status == 200) {
                            var vraceniSadrzaj = ajax.responseText;
                            callbackFn(vraceniSadrzaj);
                            upucenZahtjev = false;
                        }

                    }
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/csv');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                else {
                    var obj = { greska: "Već ste uputili zahtjev" };
                    callbackFn(JSON.stringify(obj));
                }
            },
            dajJSON: function () {
                if (!upucenZahtjev) {
                    var ajax = new XMLHttpRequest();
                    upucenZahtjev = true;
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState == 4 && ajax.status == 200) {
                            var vraceniSadrzaj = ajax.responseText;
                            callbackFn(vraceniSadrzaj);
                            upucenZahtjev = false;
                        }

                    }
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/json');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                else {
                    var obj = { greska: "Već ste uputili zahtjev" };
                    callbackFn(JSON.stringify(obj));
                }
            }
        }
    }
    return konstruktor;
}());