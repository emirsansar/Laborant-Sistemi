package com.emirsansar.LaborantRaporlama.repository;

import com.emirsansar.LaborantRaporlama.entity.Rapor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RaporRepository extends JpaRepository<Rapor, Integer> {

    List<Rapor> findByHastaKimlikNo(String hastaKimlikNo);

    List<Rapor> findByHastaAdiSoyadi(String hastaAdSoyad);

    List<Rapor> findByDoktorAdiSoyadi(String doktorAdSoyad);

}