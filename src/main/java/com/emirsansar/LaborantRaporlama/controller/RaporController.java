package com.emirsansar.LaborantRaporlama.controller;

import com.emirsansar.LaborantRaporlama.entity.Rapor;
import com.emirsansar.LaborantRaporlama.service.RaporService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/raporlar")
public class RaporController {

    private RaporService raporService;

    //Constructor Injection
    public RaporController(RaporService raporService) {
        this.raporService = raporService;
    }


    @GetMapping("/tum-raporlar")        // Tüm raporları getiren HTTP GET isteği için.
    public List<Rapor> getAllRapor() {
        return raporService.getAllRapor();
    }

    @PostMapping("/rapor-olusturma")        // Yeni bir rapor otuşturken, HTTP PUT isteği için.
    public Rapor createRapor(@RequestBody Rapor rapor) {
        return raporService.saveRapor(rapor);
    }

    @GetMapping("/{raporId}")       // Belirli bir getiren HTTP GET isteği için.
    public Rapor getRaporByRaporId(@PathVariable int raporId) {
        return raporService.getRaporById(raporId);
    }

    @PutMapping("/{raporId}")      // Var olan bir raporu güncelleyen HTTP PUT isteği için.
    public Rapor updateRapor(@PathVariable int raporId, @RequestBody Rapor updatedRapor) {
        return raporService.updateRapor(raporId, updatedRapor);
    }

    @DeleteMapping("/{raporId}")        // Belirli bir raporu silmek için HTTP DELETE isteği için.
    public void deleteRapor(@PathVariable int raporId) {
        raporService.deleteRapor(raporId);
    }

    @GetMapping("/ara/hastaKimlikNo/{hastaKimlikNo}")       // Hasta kimlik numarasına göre rapor arayan istek.
    public List<Rapor> getRaporByHastaKimlikNo(@PathVariable String hastaKimlikNo) {
        return raporService.getRaporByHastaKimlikNo(hastaKimlikNo);
    }

    @GetMapping("/ara/hastaAdiSoyadi/{hastaAdiSoyadi}")       // Hasta adı ve soyadına göre rapor arayan istek.
    public List<Rapor> getRaporByHastaAdiSoyadi(@PathVariable String hastaAdiSoyadi) {
        return raporService.getRaporByHastaAdSoyad(hastaAdiSoyadi);
    }

    @GetMapping("/ara/doktorAdiSoyadi/{doktorAdiSoyadi}")      // Doktor adı ve soyadına göre rapor arayan istek.
    public List<Rapor> getRaporByDoktorAdiSoyadi(@PathVariable String doktorAdiSoyadi) {
        return raporService.getRaporByDoktorAdSoyad(doktorAdiSoyadi);
    }

}