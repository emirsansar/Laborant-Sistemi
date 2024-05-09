package com.emirsansar.LaborantRaporlama.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "rapor")
@Data
@Setter
@Getter
public class Rapor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int raporId;

    private String hastaAdiSoyadi;
    private String hastaKimlikNo;
    private Date raporTarihi;
    private String doktorAdiSoyadi;
    private String taniBasligi;
    private String taniDetaylari;

    @ManyToOne
    @JoinColumn(name="laborantId", referencedColumnName = "id")     // Raporu oluşturan Laborant'ın hastaneKimlikNo'su.
    private Laborant laborant;

}