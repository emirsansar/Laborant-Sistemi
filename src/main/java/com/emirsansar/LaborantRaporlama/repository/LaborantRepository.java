package com.emirsansar.LaborantRaporlama.repository;

import com.emirsansar.LaborantRaporlama.entity.Laborant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaborantRepository extends JpaRepository<Laborant, Integer> {

    Laborant findByHastaneKimlikNo(String hastaneKimlikNo);

}