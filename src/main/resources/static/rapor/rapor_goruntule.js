// Sisteme laborantın giriş yapıp yapmadığını kontrol eder.
function girisKontrolu() {
    if (!sessionStorage.getItem('laborantHastaneKimlikNo')) {
        // Giriş yapılmadıysa giriş yapma sayfasına yönlendirir.
        alert("Öncelikle giriş yapmalısınız!");
        window.location.href = "../auth/giris.html";
    } else {
        raporDetaylariniYukle()    // Giriş yapıldıysa rapor detaylarını yükler.
    }
}

girisKontrolu();

// URL'den rapor ID'sini alır ve ilgili raporun detaylarını getirir.
function raporDetaylariniYukle() {
    var urlParams = new URLSearchParams(window.location.search);
    var raporId = urlParams.get('raporId');

    fetch('http://localhost:8080/raporlar/' + raporId)
        .then(response => {
            return response.json();
        })
        .then(rapor => {
            // Rapor detaylarını göstermek için fonksiyonu çağırır.
            raporDetaylariniGoster(rapor);
        })
        .catch(error => {
            console.error('Rapor detayları alınırken bir hata oluştu:', error);
        });
}

//Rapor verilerini form'da gösterir.
function raporDetaylariniGoster(rapor) {
    document.getElementById('raporId').value = rapor.raporId;
    document.getElementById('raporTarihi').value = rapor.raporTarihi;
    document.getElementById('doktorAdiSoyadi').value = rapor.laborant.ad + " " + rapor.laborant.soyad;
    document.getElementById('hastaAdiSoyadi').value = rapor.hastaAdiSoyadi;
    document.getElementById('hastaKimlikNo').value = rapor.hastaKimlikNo;
    document.getElementById('taniBasligi').value = rapor.taniBasligi;
    document.getElementById('taniDetaylari').value = rapor.taniDetaylari;
}

// Raporu günceller.
function raporDuzenle() {
    var raporId = document.getElementById('raporId').value;

    var taniBasligi = document.getElementById('taniBasligi').value;
    var taniDetaylari = document.getElementById('taniDetaylari').value;

    var rapor = {
        id: raporId,
        taniBasligi: taniBasligi,
        taniDetaylari: taniDetaylari
    };

    fetch('http://localhost:8080/raporlar/' + raporId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rapor)
    })
        .then(response => {
            alert("Rapor başarıyla güncellendi!");
        })
        .catch(error => {
            alert('Rapor güncellenirken bir hata oluştu.');
            console.log(error);
        });
}

// Raporu siler.
function raporSil() {
    var raporId = document.getElementById('raporId').value;

    var onay = confirm("Bu raporu silmek istediğinizden emin misiniz?");
    if (onay) {
        fetch('http://localhost:8080/raporlar/' + raporId, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert("Rapor başarıyla silindi!");
                window.location.href = "tum_raporlar.html";
            })
            .catch(error => {
                alert('Rapor silinirken bir hata oluştu.');
                console.log(error);
            });
    }
}