package Grafikus;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.Scanner;

class Eredmeny {

    int helyezes;
    int sportolok_szama;
    String sportag;
    String versenyszam;

}

public class GrafikusFelület extends JFrame {

    Eredmeny[] eredmenyek = new Eredmeny[200];
    int db = 0;

    public GrafikusFelület() throws IOException {

        setTitle("Helsinki 1952 - Olimpiai eredmények");
        setSize(750, 450);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Adatok beolvasása
        Scanner scanner = new Scanner(
            new File("Helsinki/helsinki.txt")
        );

        while (scanner.hasNext()) {
            eredmenyek[db] = new Eredmeny();

            eredmenyek[db].helyezes = scanner.nextInt();
            eredmenyek[db].sportolok_szama = scanner.nextInt();
            eredmenyek[db].sportag = scanner.next();
            eredmenyek[db].versenyszam = scanner.next();

            db++;
        }

        scanner.close();

        // Táblázat létrehozása
        String[] oszlopok = {
            "Helyezés", "Sportolók száma",
            "Sportág", "Versenyszám"
        };

        DefaultTableModel modell =
            new DefaultTableModel(oszlopok, 0);

        for (int i = 0; i < db; i++) {
            modell.addRow(new Object[] {
                eredmenyek[i].helyezes,
                eredmenyek[i].sportolok_szama,
                eredmenyek[i].sportag,
                eredmenyek[i].versenyszam
            });
        }

        JTable tabla = new JTable(modell);
        add(new JScrollPane(tabla), BorderLayout.CENTER);

        // Gombok
        JPanel gombPanel = new JPanel();

        JButton ermekGomb = new JButton("Éremstatisztika");
        JButton pontokGomb = new JButton("Olimpiai pontok");

        gombPanel.add(ermekGomb);
        gombPanel.add(pontokGomb);

        add(gombPanel, BorderLayout.SOUTH);

        // Éremstatisztika gomb működése
        ermekGomb.addActionListener(e -> {

            int arany = 0;
            int ezust = 0;
            int bronz = 0;

            for (int i = 0; i < db; i++) {
                if (eredmenyek[i].helyezes == 1) arany++;
                else if (eredmenyek[i].helyezes == 2) ezust++;
                else if (eredmenyek[i].helyezes == 3) bronz++;
            }

            JOptionPane.showMessageDialog(this,
                "Aranyérmek: " + arany +
                "\nEzüstérmek: " + ezust +
                "\nBronzérmek: " + bronz +
                "\nÖsszesen: " + (arany + ezust + bronz),
                "Éremstatisztika",
                JOptionPane.INFORMATION_MESSAGE);
        });

        // Olimpiai pontok gomb működése
        pontokGomb.addActionListener(e -> {

            int osszpont = 0;
            int[] pontok = {7, 5, 4, 3, 2, 1};

            for (int i = 0; i < db; i++) {
                int helyezes = eredmenyek[i].helyezes;

                if (helyezes >= 1 && helyezes <= 6) {
                    osszpont += pontok[helyezes - 1];
                }
            }

            JOptionPane.showMessageDialog(this,
                "Olimpiai pontok összege: " + osszpont,
                "Olimpiai pontok",
                JOptionPane.INFORMATION_MESSAGE);
        });

        setVisible(true);
    }

    public static void main(String[] args) throws IOException {
        SwingUtilities.invokeLater(() -> {
            try {
                new GrafikusFelület();
            } catch (IOException e) {
                JOptionPane.showMessageDialog(
                    null,
                    "Nem sikerült beolvasni a fájlt: " + e.getMessage()
                );
            }
        });
    }
}
