import java.util.Scanner;

public class egy {
    public static void main(String[] args) {
        
        Scanner scanner = new Scanner(System.in);

        System.out.print("szam1: ");
        int szam1 = scanner.nextInt();

        System.out.print("szam2: ");
        int szam2 = scanner.nextInt();

        int eredmeny = szam1 + szam2;
        System.out.println("Eredmeny: " + eredmeny);

        scanner.close();

    }
}