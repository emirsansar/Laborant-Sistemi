document.getElementById("kayitFormu").addEventListener("submit", function(event) {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller

    formuKontrolEt();
});

// Form onayını kontrol eder ve gerekli işlemleri gerçekleştirir.
function formuKontrolEt() {

    // Forma girilen bilgileri alır.
    var hastaneKimlikNo = document.getElementById("hastaneKimlikNo").value;
    var laborantIsmi = document.getElementById("laborantIsmi").value;
    var laborantSoyadi = document.getElementById("laborantSoyadi").value;
    var sifre = document.getElementById("laborantSifre").value;
    var sifreTekrar = document.getElementById("laborantSifreTekrar").value;

    // Hastane kimlik numarasının 7 haneli olup olmadığını kontrol eder.
    if (hastaneKimlikNo.length !== 7) {
        alert("Hastane kimlik numarası 7 haneli olmalıdır!");
        return;
    }

    if (sifre !== sifreTekrar) {
        alert("Şifreler eşleşmiyor!");
        return;
    }

    laborantKontrolEtVeKaydet(hastaneKimlikNo, laborantIsmi, laborantSoyadi, sifre);
}

// Laborantın var olup olmadığını kontrol eder ve kaydetme işlemi yapar.
function laborantKontrolEtVeKaydet(hastaneKimlikNo, isim, soyisim, sifre) {
    fetch('http://localhost:8080/laborantlar/' + hastaneKimlikNo)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(laborant => {
            if (!laborant) {
                laborantKaydet(hastaneKimlikNo, isim, soyisim, sifre);
            } else {
                alert("Bu hastane kimlik numarası ile kayıtlı bir laborant bulunmaktadır!");
            }
        })
        .catch(error => {
            alert("Bir hata oluştu.");
        });
}

// Yeni laborantı kaydeder.
function laborantKaydet(hastaneKimlikNo, isim, soyisim, sifre) {
    // Laborant nesnesini oluşturur.
    var laborant = {
        hastaneKimlikNo: hastaneKimlikNo,
        ad: isim,
        soyad: soyisim,
        sifre: sifre
    };

    fetch('http://localhost:8080/laborantlar/laborantKayıt', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(laborant)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("Laborant başarıyla kaydedildi!");
            window.location.href = "giris.html";
        })
        .catch(error => {
            alert("Laborant kaydedilirken bir hata oluştu.");
            console.error(error);
        });
}

// Forma girilen hastane kimlik numarasının maksimum uzunluğunu kontrol eder.
function hastaneKimlikNoUzunlugunuKisitla(input) {
    if (input.value.length > 7) {
        input.value = input.value.slice(0, 7);
    }
}