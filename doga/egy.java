import java.util.Scanner;

public class egy {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        System.out.print("nev: ");
        String nev = scanner.nextLine();

        System.out.println("neved: " + nev);

        scanner.close();

    }

}