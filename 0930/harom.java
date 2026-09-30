import java.util.Scanner;

public class harom {
    
    public static void main(String[] args) {
        
        Scanner scanner = new Scanner(System.in);

        System.out.print("szam1: ");
        int szam1 = scanner.nextInt();

        System.out.print("szam2: ");
        int szam2 = scanner.nextInt();

        int osszeg = szam1 + szam2;
        int kivonas = szam1 - szam2;
        double osztas = szam1 / szam2;
        double maradekos = szam1 % szam2;
        int szorzas = szam1 * szam2;

        System.out.println("osszeg: " + osszeg + ", kivonas: " + kivonas + ", osztas: " + osztas + ", maradek: " + maradekos + ", szorzas" + szorzas);

        scanner.close();

    }

}
