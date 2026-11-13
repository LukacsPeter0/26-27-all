package org.example.helsinki;

public class HelsinkiEredmeny {
    private final int helyezes;
    private final int letszam;
    private final String sportag;
    private final String versenyszam;

    public HelsinkiEredmeny(
            int helyezes,
            int letszam,
            String sportag,
            String versenyszam
    ) {
        this.helyezes = helyezes;
        this.letszam = letszam;
        this.sportag = sportag;
        this.versenyszam = versenyszam;
    }

    public int getHelyezes() {
        return helyezes;
    }

    public int getLetszam() {
        return letszam;
    }

    public String getSportag() {
        return sportag;
    }

    public String getVersenyszam() {
        return versenyszam;
    }
}