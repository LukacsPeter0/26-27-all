import java.util.Scanner;

public class ot {
    
    public static void main(String[] args) {
        
        Scanner scanner = new Scanner(System.in);
        System.out.print("a: ");
        int a = scanner.nextInt();

        System.out.print("b: ");
        int b = scanner.nextInt();

        System.out.println("osszeadva: " + (a+b));

        scanner.close();

    }

}
