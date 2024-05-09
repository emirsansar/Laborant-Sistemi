package com.emirsansar.LaborantRaporlama.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "laborant")
@Data
@Setter
@Getter
public class Laborant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String ad;
    private String soyad;
    private String hastaneKimlikNo;
    private String sifre;

}