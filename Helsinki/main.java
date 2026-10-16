import java.util.Scanner;
import java.io.IOException;
import java.io.File;
import java.util.ArrayList;

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

        }

        scanner.close();

    }
}
