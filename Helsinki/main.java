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
        Eredmeny[] eredmeny = new Eredmeny[200];

        while (scanner.hasNext()) {

            helyezes = scanner.nextInt();
            sportolok_szama = scanner.nextInt();
            sportag = scanner.next();
            versenyszam = scanner.next();

        }

        scanner.close();

    }
}
