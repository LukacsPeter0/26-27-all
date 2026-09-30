import java.util.Scanner;

public class ketto {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("kor: ");
        int kor = scanner.nextInt();

        System.out.print("magassag: ");
        int magassag = scanner.nextInt();

        System.out.print("suly: ");
        int suly = scanner.nextInt();

        System.out.print("szemszin: ");
        String szSzin = scanner.next();

        System.out.print("hajszin: ");
        String hajszin = scanner.next();

        System.out.println("kor: " + kor + ", magassag: " + magassag + ", suly: " + suly + ", szemszin: " + szSzin + ", hajszin: " + hajszin);

        scanner.close();
        
    }

}
