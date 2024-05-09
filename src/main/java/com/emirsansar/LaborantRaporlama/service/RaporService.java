package com.emirsansar.LaborantRaporlama.service;

import com.emirsansar.LaborantRaporlama.entity.Rapor;
import com.emirsansar.LaborantRaporlama.repository.RaporRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RaporService {

    RaporRepository raporRepository;

    public RaporService(RaporRepository raporRepository) {
        this.raporRepository = raporRepository;
    }


    public List<Rapor> getAllRapor() {      // Tüm raporları getirir.
        return raporRepository.findAll();
    }

    public Rapor saveRapor(Rapor rapor) {       // Yeni raporu kaydeder.
        return raporRepository.save(rapor);
    }

    public Rapor getRaporById(int raporId) {      // Belirli bir rapur ID'ye göre getirir.
        return raporRepository.findById(raporId).orElse(null);
    }

    public Rapor updateRapor(int raporId, Rapor updatedRapor) {      // Belirli bir raporu günceller.
        Optional<Rapor> rapor = raporRepository.findById(raporId);

        if (rapor.isPresent()) {       // Eğer veritabanında rapor bulunduysa, yeni bilgilerle güncellenir.
            Rapor foundRapor = rapor.get();
            foundRapor.setTaniBasligi(updatedRapor.getTaniBasligi());
            foundRapor.setTaniDetaylari(updatedRapor.getTaniDetaylari());

            return raporRepository.save(foundRapor);
        } else {
            return null;
        }
    }

    public void deleteRapor(int raporId) {      // Belirli bir raporu siler.
        raporRepository.deleteById(raporId);
    }


    public List<Rapor> getRaporByHastaKimlikNo(String hastaKimlikNo) {     // Hastanın kimlik no'ya göre raporları getirir.'
        return raporRepository.findByHastaKimlikNo(hastaKimlikNo);
    }

    public List<Rapor> getRaporByHastaAdSoyad(String hastaAdSoyad) {       //Hasta ad soyad'a göre raporları getirir.
        return raporRepository.findByHastaAdiSoyadi(hastaAdSoyad);
    }

    public List<Rapor> getRaporByDoktorAdSoyad(String doktorAdSoyad) {     // Doktor ad soyad'a göre raporları getirir.
        return raporRepository.findByDoktorAdiSoyadi(doktorAdSoyad);
    }

}