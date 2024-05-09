// Sisteme laborantın giriş yapıp yapmadığını kontrol eder.
function girisKontrolu() {
    if (!sessionStorage.getItem('laborantHastaneKimlikNo')) {
        // Giriş yapılmadıysa giriş yapma sayfasına yönlendirir.
        alert("Öncelikle giriş yapmalısınız!");
        window.location.href = "../auth/giris.html";
    } else {
        tumRaporlariGetir();
        // Giriş yapıldıysa raporlar getirilir.
    }
}

girisKontrolu();

// Tüm raporları database'den getirir ve ekranda listeler.
function tumRaporlariGetir(){
    fetch('http://localhost:8080/raporlar/tum-raporlar')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(raporlar => {
            raporlariListele(raporlar);
        })
        .catch(error => {
            alert("Raporlar çekilirken bir hata oluştu.");
        });
}

// Gelen rapor verilerini tabloya ekler.
function raporlariListele(raporlar) {
    var raporListesi = document.querySelector('#raporListesi tbody');
    raporListesi.innerHTML = ''; // Tabloyu temizle
    raporlar.forEach(rapor => {
        var raporURL = 'rapor_goruntule.html?raporId=' + rapor.raporId;
        var row = document.createElement('tr');

        var raporIdCell = document.createElement('td');
        var raporIdLink = document.createElement('a');
        raporIdLink.href = raporURL;
        raporIdLink.textContent = rapor.raporId;
        raporIdCell.appendChild(raporIdLink);
        row.appendChild(raporIdCell);

        var raporTarihiCell = document.createElement('td');
        raporTarihiCell.textContent = rapor.raporTarihi;
        row.appendChild(raporTarihiCell);

        var laborantAdSoyadCell = document.createElement('td');
        laborantAdSoyadCell.textContent = rapor.laborant.ad + ' ' + rapor.laborant.soyad;
        row.appendChild(laborantAdSoyadCell);

        var hastaAdiSoyadiCell = document.createElement('td');
        hastaAdiSoyadiCell.textContent = rapor.hastaAdiSoyadi;
        row.appendChild(hastaAdiSoyadiCell);

        var hastaKimlikNoCell = document.createElement('td');
        hastaKimlikNoCell.textContent = rapor.hastaKimlikNo;
        row.appendChild(hastaKimlikNoCell);

        raporListesi.appendChild(row);
    });
}

// Raporları tarihe göre sıralar.
function tariheGoreSirala(siralama) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("raporListesi");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[1].innerText;
            y = rows[i + 1].getElementsByTagName("td")[1].innerText;
            if (siralama === 'eskiye') {
                if (new Date(x) > new Date(y)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (siralama === 'yeniden') {
                if (new Date(x) < new Date(y)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

// Arama alanlarını temizler ve tüm raporları yeniden getirir/listeler.
function aramalariTemizle(){
    document.getElementById("hastaKimlikNoAra").value = "";
    document.getElementById("hastaAdSoyadAra").value = "";
    document.getElementById("doktorAdSoyadAra").value = "";

    tumRaporlariGetir();
}

// Belirli bir arama kriterine göre raporları database'den getirir/listeler.
function raporAra(aramaTipi, aramaDegeri) {
    fetch('http://localhost:8080/raporlar/ara/' + aramaTipi + '/' + aramaDegeri)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(raporlar => {
            var raporListesi = document.querySelector('#raporListesi tbody');
            raporListesi.innerHTML = ''; // Tabloyu temizle
            if (raporlar && raporlar.length > 0) {
                raporlariListele(raporlar); // Yeni raporları listele
            } else {
                alert("Aranan kritere göre bir rapor bulunamadı.");
            }
        })
        .catch(error => {
            alert("Rapor getirme sırasında bir hata oluştu.");
        });
}

function hastaKimlikNoIleRaporAra() {       // Hasta kimlik numarası ile rapor araması yapar
    var doktorAdiSoyadi = document.getElementById("hastaKimlikNoAra").value;

    if (!doktorAdiSoyadi){
        tumRaporlariGetir();
    } else {
        raporAra("hastaKimlikNo", doktorAdiSoyadi);
    }
}

function hastaAdiSoyadiIleRaporAra() {      // Hasta adı soyadı ile rapor araması yapar
    var hastaAdiSoyadi = document.getElementById("hastaAdSoyadAra").value;

    if (!hastaAdiSoyadi){
        tumRaporlariGetir();
    } else {
        raporAra("hastaAdiSoyadi", hastaAdiSoyadi);
    }
}

function doktorAdiSoyadiIleRaporAra() {     // Doktor adı soyadı ile rapor araması yapar
    var doktorAdiSoyadi = document.getElementById("doktorAdSoyadAra").value;

    if (!doktorAdiSoyadi){
        tumRaporlariGetir();
    } else {
        raporAra("doktorAdiSoyadi", doktorAdiSoyadi);
    }
}