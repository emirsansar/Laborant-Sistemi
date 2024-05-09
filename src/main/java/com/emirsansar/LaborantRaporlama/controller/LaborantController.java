package com.emirsansar.LaborantRaporlama.controller;

import com.emirsansar.LaborantRaporlama.entity.Laborant;
import com.emirsansar.LaborantRaporlama.service.LaborantService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/laborantlar")
public class LaborantController {

    LaborantService laborantService;

    //Constructor Injection
    public LaborantController(LaborantService laborantService) {
        this.laborantService = laborantService;
    }


    @GetMapping     // Tüm laborantları getiren HTTP GET isteği için.
    public List<Laborant> getAllLaborant() {
        return laborantService.getAllLaborant();
    }

    @PutMapping("/laborantKayıt")   // Yeni bir laborant otuşturken, HTTP PUT isteği için.
    public Laborant createLaborant(@RequestBody Laborant laborant) {
        return laborantService.saveLaborant(laborant);
    }

    @GetMapping("/{hastaneKimlikNo}")   // Belirli bir hastaneKimlikNo'ya sahip laborantı getiren HTTP GET isteği için.
    public Laborant getLaborantByHastaneKimlikNo(@PathVariable String hastaneKimlikNo) {
        return laborantService.getLaborantByHastaneKimlikNo(hastaneKimlikNo);
    }

}