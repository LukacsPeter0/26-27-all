import java.io.FileReader;
import java.io.IOException;

public class main {
    public static void main(String[] args) throws IOException {
        
        FileReader file_Reader = new FileReader("./helsinki.txt");

        int szam;
        szam = file_Reader.read();

        file_Reader.close();

        System.out.println(szam);

    }
}
