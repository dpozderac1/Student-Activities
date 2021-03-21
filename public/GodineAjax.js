var GodineAjax = (function () {
    var konstruktor = function (divSadrzaj) {
        var ajax = new XMLHttpRequest();
        
        ajax.onreadystatechange = function () {

            if (ajax.readyState == 4 && ajax.status == 200) {
                var vraceniSadrzaj = ajax.responseText;
                var objekat = JSON.parse(vraceniSadrzaj);
                for (var i = 0; i < objekat.length; i++) {
                    divSadrzaj.innerHTML += `<div class="godina">
                    <p>`+ objekat[i].nazivGod + `</p>                    
                    <br>
                    <br>
                    <span class="bold">Broj vježbi: </span>
                    <span>`+ objekat[i].nazivRepVje + `</span>
                    <br>
                    <br>
                    <span class="bold">Broj spirala: </span>
                    <span>`+ objekat[i].nazivRepSpi + `</span>
                    </div>`;
                }
            }

        }

        ajax.open("GET", "http://localhost:8080/godine", true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send();
        return {
            osvjezi: function () {
                divSadrzaj.innerHTML = "";
                var ajax = new XMLHttpRequest();
                
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        
                        var vraceniSadrzaj = ajax.responseText;
                        var objekat = JSON.parse(vraceniSadrzaj);
                        for (var j = 0; j < objekat.length; j++) {
                            divSadrzaj.innerHTML += `<div class="godina">
                    <p>`+ objekat[j].nazivGod + `</p>                    
                    <br>
                    <br>
                    <span class="bold">Broj vježbi: </span>
                    <span>`+ objekat[j].nazivRepVje + `</span>
                    <br>
                    <br>
                    <span class="bold">Broj spirala: </span>
                    <span>`+ objekat[j].nazivRepSpi + `</span>
                    </div>`;
                        }
                    }

                }
                ajax.open("GET", "http://localhost:8080/godine", true);
                ajax.setRequestHeader('Content-Type','application/json');
                ajax.send();
            }
        }
    }
    return konstruktor;
}());