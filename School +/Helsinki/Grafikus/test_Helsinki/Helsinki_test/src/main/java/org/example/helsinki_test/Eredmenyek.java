package org.example.helsinki_test;

public class Eredmenyek {

    private int helyezes;
    private int sportolok_szama;
    private String sportag;
    private String versenyszam;

    public Eredmenyek(int helyezes, int sportolok_szama, String sportag, String versenyszam) {

        this.helyezes = helyezes;
        this.sportolok_szama = sportolok_szama;
        this.sportag = sportag;
        this.versenyszam = versenyszam;

    }

    public int getHelyezes() {
        return helyezes;
    }

    public int getSportolok_szama() {
        return sportolok_szama;
    }

    public String getSportag() {
        return sportag;
    }

    public String getVersenyszam() {
        return versenyszam;
    }

}