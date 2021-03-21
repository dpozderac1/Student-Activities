var CommitTabela = (function () {
    var tabela=document.createElement('table');;//lokalne variable idu ovdje

    var napravljena = false;
    var maxCommit=new Array();
    var konstruktor = function (divElement, brojZadataka) {

        if (napravljena) {
            tabela.innerHTML="";
            napravljena = false;
            maxCommit=new Array();
        }
        if (!napravljena) {
            for (var i = 0; i < parseInt(brojZadataka) + 1; i++) {

                var red = document.createElement('tr');

                for (var j = 0; j < 2; j++) {

                    var celija = document.createElement('td');
                    if (i == 0 && j == 0) {
                        celija.appendChild(document.createTextNode("Naziv zadataka"));
                    }
                    else if (i == 0 && j == 1) {
                        celija.appendChild(document.createTextNode("Commiti"));
                    }
                    else if (i != 0 && j == 0) {
                        celija.appendChild(document.createTextNode("Zadatak " + i));
                    }
                    else {
                        celija.appendChild(document.createTextNode(""));
                    }
                    red.appendChild(celija);
                }
                tabela.appendChild(red);
                maxCommit.push(0);
            }
            divElement.appendChild(tabela);
            napravljena=true;
        }
        return {
            dodajCommit: function (rbZadatka, url) {
                var rbZadatkaNovi = rbZadatka + 1;
                maxCommit[rbZadatkaNovi]+=1;
                var i = 0;
                for (i; i < tabela.rows.length; i++) {
                    var red = tabela.rows[i];
                    var zadnja = red.cells[red.cells.length - 1];

                    if (i == rbZadatkaNovi && zadnja.colSpan == 1 && zadnja.innerHTML == "") {
                        var x = red.cells[red.cells.length - 1];
                        var a = document.createElement('a');
                        var linkText = document.createTextNode(maxCommit[rbZadatkaNovi]);
                        a.appendChild(linkText);
                        a.href = url;
                        x.appendChild(a);
                        break;
                    }
                    else if (i == rbZadatkaNovi && zadnja.colSpan == 1 && zadnja.innerHTML != "") {
                        var najveci = red.cells.length;
                        var x = red.insertCell(red.cells.length);
                        var a = document.createElement('a');
                        var linkText = document.createTextNode(maxCommit[rbZadatkaNovi]);
                        a.appendChild(linkText);
                        a.href = url;
                        x.appendChild(a);
                        tabela.rows[0].cells[1].colSpan += 1;
                        var j = 1;
                        for (j; j < tabela.rows.length; j++) {
                            if (j != rbZadatkaNovi && tabela.rows[j].cells.length == najveci && tabela.rows[j].cells[tabela.rows[j].cells.length - 1].innerHTML != "") {
                                var y = tabela.rows[j].insertCell(tabela.rows[j].cells.length);
                            }
                            else if (j != rbZadatkaNovi && tabela.rows[j].cells[tabela.rows[j].cells.length - 1].innerHTML == "") {
                                tabela.rows[j].cells[tabela.rows[j].cells.length - 1].colSpan = tabela.rows[j].cells[tabela.rows[j].cells.length - 1].colSpan + 1;
                            }
                        }
                    }
                    else if (i == rbZadatkaNovi && zadnja.colSpan > 1) {
                        //var broj = red.cells.length - 1;
                        var x = red.insertCell(red.cells.length - 1);
                        nova = parseInt(zadnja.colSpan) - 1;
                        var a = document.createElement('a');
                        var linkText = document.createTextNode(maxCommit[rbZadatkaNovi]);
                        a.appendChild(linkText);
                        a.href = url;
                        x.appendChild(a);
                        zadnja.colSpan = nova;
                    }

                }
            },
            editujCommit: function (rbZadatka, rbCommita, url) {
                tabela.rows[rbZadatka + 1].cells[rbCommita + 1].getElementsByTagName('a')[0].href = url;
            },
            obrisiCommit: function (rbZadatka, rbCommita) {
                var i = 1;
                var najveci = 0;
                var jedina = true;
                rbCommita += 1;
                rbZadatka += 1;
                for (i; i < tabela.rows.length; i++) {
                    if (tabela.rows[i].cells.length > najveci && tabela.rows[i].cells[tabela.rows[i].cells.length - 1].innerHTML != "") {
                        najveci = tabela.rows[i].cells.length;
                    }
                }

                var brojac = 0;
                i = 1;
                for (i; i < tabela.rows.length; i++) {
                    if (tabela.rows[i].cells.length == najveci && tabela.rows[i].cells[tabela.rows[i].cells.length - 1].innerHTML != "") {
                        brojac += 1;
                    }
                }

                if (brojac > 1) {
                    jedina = false;
                }


                zadnji = tabela.rows[rbZadatka].cells[tabela.rows[rbZadatka].cells.length - 1];
                red = tabela.rows[rbZadatka];
                i = 0;
                var duzina = red.cells.length;
                if (duzina == 2) {
                    red.deleteCell(duzina - 1);
                    red.insertCell(duzina - 1);
                }
                else {
                    for (i; i < tabela.rows.length; i++) {
                        if (i == rbZadatka) {
                            red.deleteCell(rbCommita);
                        }
                        if (i == rbZadatka && !jedina) {
                            tabela.rows[i].insertCell(duzina - 1);
                        }
                        if (duzina == najveci) {
                            if (i != rbZadatka && jedina) {
                                if (tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan == 1) {
                                    tabela.rows[i].deleteCell(tabela.rows[i].cells.length - 1);
                                }
                                else if (tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan > 1) {
                                    tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan -= 1;
                                }
                            }
                        }
                        else {
                            if (i == rbZadatka) {
                                tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan += 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return konstruktor;
}());


    //Primjer koristenja:
    /*var mojDiv=document.getElementById(“mojDiv”);
    var tabela= new CommitTabela(mojDiv,4);
    tabela.dodajCommit(0,”www.etf.ba”);
    //U zadatku ne smijete koristiti nikakve hardkodirane vanjske
    elemente, niti bilo kakvu vanjsku variablu koju niste dobili kroz
    parametre konstruktora ili kroz parametre metoda*/