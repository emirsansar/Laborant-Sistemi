document.getElementById("girisFormu").addEventListener("submit", function(event) {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engeller

    formuKontrolEt();
});


// Form onayını kontrol eder ve gerekli işlemleri gerçekleştirir.
function formuKontrolEt() {

    var hastaneKimlikNo = document.getElementById("hastaneKimlikNo").value;
    var sifre = document.getElementById("doktorSifre").value;

    // Hastane kimlik numarasının 7 haneli olup olmadığını kontrol eder.
    if (hastaneKimlikNo.length !== 7){
        alert("Hastane Kimlik Numarası 7 haneli olmalıdır.");
        return;
    }

    laborantKontrolVeGiris(hastaneKimlikNo, sifre);
}

// Başarılı giriş yapılmasını kontrol eder.
function laborantKontrolVeGiris(hastaneKimlikNo, sifre) {
    laborantGetir(hastaneKimlikNo)
        .then(function(laborant) {
            if (!laborant) {
                alert("Hastane kimlik numarası geçersiz!");
            } else if (laborant.sifre === sifre) {
                sessionDepolamaAyarla(laborant.id, laborant.ad, laborant.soyad, hastaneKimlikNo);
                basariliGiris();
            } else {
                alert("Şifre yanlış!");
            }
        })
        .catch(function(error) {
            alert("Laborant bilgileri çekilirken bir hata oluştu.");
        });
}

// Laborantı sunucudan getirir.
function laborantGetir(hastaneKimlikNo) {
    return fetch('http://localhost:8080/laborantlar/' + hastaneKimlikNo)
        .then(response => {
            return response.json();
        })
        .then(laborant => laborant)
        .catch(error => {
            throw error;
        });
}

// Başarılı giriş yapıldığında gerekli işlemler yapılır.
function basariliGiris() {
    alert("Giriş başarılı!");
    window.location.href = "../rapor/ana_sayfa.html";
}

// SessionStorage'da değerleri depolar.
function sessionDepolamaAyarla(id, ad, soyad, kimlikNo){
    sessionStorage.setItem("laborantId", id);
    sessionStorage.setItem("laborantAdi", ad);
    sessionStorage.setItem("laborantSoyadi", soyad);
    sessionStorage.setItem("laborantHastaneKimlikNo", kimlikNo);
}

// Forma girilen hastane kimlik numarasının maksimum uzunluğunu kontrol eder.
function hastaneKimlikNoUzunlugunuKisitla(input) {
    if (input.value.length > 7) {
        input.value = input.value.slice(0, 7);
    }
}