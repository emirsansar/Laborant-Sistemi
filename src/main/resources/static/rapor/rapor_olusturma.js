// Sisteme laborantın giriş yapıp yapmadığını kontrol eder.
function kontrolGirisYapildiMi() {
    if (!sessionStorage.getItem('laborantHastaneKimlikNo')) {   //Giriş yapılmadıysa giriş yapma sayfasına yönlendirir.
        alert("Öncelikle giriş yapmalısınız!");
        window.location.href = "../auth/giris.html";
    } else {
        laborantBilgileriniGetir();  // Kullanıcı giriş yapmışsa laborant bilgilerini getirir.
    }
}

kontrolGirisYapildiMi();

// Laborantın adını ve soyadını sayfaya getirir.
function laborantBilgileriniGetir() {
    var laborantAdSoyadLabel = document.getElementById("doktorAdiSoyadi");

    var laborantAdi = sessionStorage.getItem("laborantAdi");
    var laborantSoyadi = sessionStorage.getItem("laborantSoyadi");

    laborantAdSoyadLabel.value = laborantAdi + " " + laborantSoyadi;
}

// Form gönderildiğinde raporu oluşturur ve sunucuya gönderir.
function raporOlusturVeGonder() {
    var rapor = toplamRaporBilgileri();

    raporGonder(rapor)
        .then(response => response.json())
        .then(data => {
            alert('Rapor oluşturuldu!');
            console.log(data);
            window.location.href = "tum_raporlar.html";
        })
        .catch(error => {
            alert('Rapor oluşturulurken bir hata oluştu!');
            console.error('Error:', error);
        });
}

// Raporu sunucuya gönderir.
function raporGonder(rapor) {
    return fetch('http://localhost:8080/raporlar/rapor-olusturma', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rapor)
    });
}

// Formdaki rapor bilgilerini toplar.
function toplamRaporBilgileri() {
    var laborantId = sessionStorage.getItem('laborantId');

    var doktorAdiSoyadi = document.getElementById('doktorAdiSoyadi').value;
    var hastaAdiSoyadi = document.getElementById('hastaAdiSoyadi').value;
    var hastaKimlikNo = document.getElementById('hastaKimlikNo').value;
    var taniBasligi = document.getElementById('taniBasligi').value;
    var taniDetaylari = document.getElementById('taniDetaylari').value;

    var anlikTarih = new Date();    //Laborant, rapor oluştururken tarih girmesine gerek kalmaz.
    var yil = anlikTarih.getFullYear();
    var ay = (anlikTarih.getMonth() + 1).toString().padStart(2, '0');
    var gun = anlikTarih.getDate().toString().padStart(2, '0');
    var raporTarihi = yil + '-' + ay + '-' + gun;

    return {
        "hastaAdiSoyadi": hastaAdiSoyadi,
        "hastaKimlikNo": hastaKimlikNo,
        "doktorAdiSoyadi": doktorAdiSoyadi,
        "taniBasligi": taniBasligi,
        "taniDetaylari": taniDetaylari,
        "raporTarihi": raporTarihi,
        "laborant": {
            "id": laborantId
        }
    };
}