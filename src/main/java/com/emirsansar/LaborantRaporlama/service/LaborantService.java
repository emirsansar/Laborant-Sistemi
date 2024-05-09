package com.emirsansar.LaborantRaporlama.service;

import com.emirsansar.LaborantRaporlama.entity.Laborant;
import com.emirsansar.LaborantRaporlama.repository.LaborantRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LaborantService {

    LaborantRepository laborantRepository;

    LaborantService(LaborantRepository laborantRepository) {
        this.laborantRepository = laborantRepository;
    }


    public List<Laborant> getAllLaborant(){     // Tüm laborantları getirir.
        return laborantRepository.findAll();
    }

    public Laborant saveLaborant(Laborant laborant){    //Yeni laborant ekler.
        return laborantRepository.save(laborant);
    }

    public Laborant getLaborantById(int laborantId) {      // Belirli bir laborantı ID'ye göre getirir.
        return laborantRepository.findById(laborantId).orElse(null);
    }

    public Laborant updateLaborant(int laborantId, Laborant updatedLaborant) {      // Belirli bir laborantı günceller.
        Optional<Laborant> laborant = laborantRepository.findById(laborantId);

        if (laborant.isPresent()) {     // Eğer veritabanında laborant bulunduysa, yeni bilgilerle güncellenir.
            Laborant foundLaborant = laborant.get();
            foundLaborant.setAd(updatedLaborant.getAd());
            foundLaborant.setSoyad(updatedLaborant.getSoyad());
            foundLaborant.setHastaneKimlikNo(updatedLaborant.getHastaneKimlikNo());

            return laborantRepository.save(foundLaborant);
        } else {
            return null;
        }
    }

    public void deleteLaborant(int laborantId) {    // Belirli bir laborantı siler.
        laborantRepository.deleteById(laborantId);
    }

    public Laborant getLaborantByHastaneKimlikNo(String hastaneKimlikNo) {      // Hastane kimlik No'ya göre laborant getirir.
        return laborantRepository.findByHastaneKimlikNo(hastaneKimlikNo);
    }

}