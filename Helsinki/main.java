import java.util.Scanner;
import java.io.IOException;
import java.io.File;
import java.io.FileWriter;

class Eredmeny {

    int helyezes;
    int sportolok_szama;
    String sportag;
    String versenyszam;

}

public class main {
    public static void main(String[] args) throws IOException {
        
        File file = new File("Helsinki/helsinki.txt");
        Scanner scanner = new Scanner(file);
        Eredmeny[] eredmenyek = new Eredmeny[200];
        FileWriter writer = new FileWriter("./Helsinki/helsinki2.txt");

        int db = 0;

        while (scanner.hasNext()) {

            eredmenyek[db] = new Eredmeny();

            eredmenyek[db].helyezes = scanner.nextInt();
            eredmenyek[db].sportolok_szama = scanner.nextInt();
            eredmenyek[db].sportag = scanner.next();
            eredmenyek[db].versenyszam = scanner.next();

            db++;
        }

        int pontszerzesek = 0;

        int arany = 0;
        int ezust = 0;
        int bronz = 0;

        int pontok_osszege = 0;

        int db_uszas = 0;
        int db_torna = 0;

        int legtobb_sportolo = 0;
        int leg_helyezes = 0;
        String leg_sportag = "";
        String leg_versenyszam = "";

        for (int i = 0; i < db; i++) {

            if (eredmenyek[i].helyezes <= 6) {

                pontszerzesek++;

                if (eredmenyek[i].helyezes == 1) {pontok_osszege += 7;}
                if (eredmenyek[i].helyezes == 2) {pontok_osszege += 5;}
                if (eredmenyek[i].helyezes == 3) {pontok_osszege += 4;}
                if (eredmenyek[i].helyezes == 4) {pontok_osszege += 3;}
                if (eredmenyek[i].helyezes == 5) {pontok_osszege += 2;}
                if (eredmenyek[i].helyezes == 6) {pontok_osszege += 1;}

            }

            if (eredmenyek[i].helyezes == 3) {bronz++;}
            if (eredmenyek[i].helyezes == 2) {ezust++;}
            if (eredmenyek[i].helyezes == 1) {arany++;}

            if (eredmenyek[i].sportag.equals("uszas")) {

                if (eredmenyek[i].helyezes <= 3) {db_uszas++;}

            } else if (eredmenyek[i].sportag.equals("torna")) {

                if (eredmenyek[i].helyezes <= 3) {db_torna++;}

            }

            if (eredmenyek[i].sportag.equals("kajakkenu")) {

                int pont = 0;

                if (eredmenyek[i].helyezes == 1) {pont = 7;}
                if (eredmenyek[i].helyezes == 2) {pont = 5;}
                if (eredmenyek[i].helyezes == 3) {pont = 4;}
                if (eredmenyek[i].helyezes == 4) {pont = 3;}
                if (eredmenyek[i].helyezes == 5) {pont = 2;}
                if (eredmenyek[i].helyezes == 6) {pont = 1;}

                writer.write(String.valueOf(eredmenyek[i].helyezes));
                writer.write(" ");
                writer.write(String.valueOf(eredmenyek[i].sportolok_szama));
                writer.write(" ");
                writer.write(String.valueOf(pont));
                writer.write(" ");
                writer.write("kajak-kenu");
                writer.write(" ");
                writer.write(eredmenyek[i].versenyszam);
                writer.write("\n");

            }

            if (eredmenyek[i].sportolok_szama > legtobb_sportolo) {

                leg_helyezes = eredmenyek[i].helyezes;
                leg_sportag = eredmenyek[i].sportag;
                leg_versenyszam = eredmenyek[i].versenyszam;
                legtobb_sportolo = eredmenyek[i].sportolok_szama;

            }

        }

        String tornaVagyUszas;
        if (db_torna > db_uszas) {
            tornaVagyUszas = "Torna sportágban szereztek több érmet";
        } else if (db_uszas > db_torna) {
            tornaVagyUszas = "Úszás sportágban szereztek több érmet";
        } else {
            tornaVagyUszas = "Egyenlő volt az érmek száma";
        }

        System.out.println("3. feladat:\n" +
                "Pontszerző helyezések száma: " + pontszerzesek + "\n" +
                "4. feladat:\n" +
                "Arany: " + arany + "\n" +
                "Ezüst: " + ezust + "\n" +
                "Bronz: " + bronz + "\n" +
                "Összesen: " + (arany + ezust + bronz) + "\n" +
                "5. feladat:\n" +
                "Olimpiai pontok száma: " + pontok_osszege + "\n" +
                "6. feladat:\n" +
                tornaVagyUszas + "\n" +
                "8. feladat:\n" +
                "Helyezés: " + leg_helyezes + "\n" +
                "Sportág: " + leg_sportag + "\n" +
                "Versenyszám: " + leg_versenyszam + "\n" +
                "Sportolók száma: " + legtobb_sportolo);

//a kiiratas ai, mert mar lusta voltam. Nagyon csunyan csinaltam meg, nem vagyok ra büszke. 

        scanner.close();
        writer.close();

    }
}