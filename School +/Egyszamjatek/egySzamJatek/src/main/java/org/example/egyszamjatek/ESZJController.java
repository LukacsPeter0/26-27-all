package org.example.egyszamjatek;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;
import java.io.IOException;
import java.io.InputStream;
import javafx.scene.control.*;
import java.io.FileWriter;

public class ESZJController {

    @FXML
    private TextField fel7;

    private void szamolas() throws IOException {

        InputStream file = getClass().getResourceAsStream("/helsinki.txt");
        ObservableList<String[]>adatok = FXCollections.observableArrayList();
        Scanner scanner = new Scanner(file);

        //tovabbi deklaralasok

        int jatekosok_szama = 0;
        int fordulok_szama = 0;
        boolean tippeltE = false;
        int legnagyobb_tipp = 1;
        int vizsgalando_fordulo = Integer.parseInt(fel7.getText());
        int legkisebb_tipp = 101;

        if (file != null) {

            //workspace

            while (scanner.hasNextLine()) {

                //3. fel kiszamolasa

                jatekosok_szama += 1;

                String[] sor = scanner.nextLine().trim().split(" ");
                adatok.add(sor);

                //4. fel kiszamolasa szokozok segitsegevel

                String sorSTR = sor.toString();

                for (int i = 0; sorSTR.length() > i; i++) {

                    if (sorSTR.charAt(i) == ' ') {
                        fordulok_szama += 1;
                    }

                }

                //5.fel kiszamolasa

                if (Integer.parseInt(sor[0]) == 1) {

                    tippeltE = true;

                }

                //6. fel kiszamolasa

                for (int i = 0; i < (sor.length - 1); i++) {

                    if (Integer.parseInt(sor[i]) > legnagyobb_tipp) {

                        legnagyobb_tipp = Integer.parseInt(sor[i]);

                    }

                }

            }

            //7. fel ellenorzese | majd kell egy kiiras ami 1 - fordulok_szama-ig keri a vizsgalando_fordulo-t

            if (vizsgalando_fordulo > fordulok_szama || vizsgalando_fordulo < 1) {
                vizsgalando_fordulo = 1;
            }

            //mar nagyon faradt vagyok

            //8. fel kiszamolasa

            List<Integer> vizsgalando_fordulo_tippjei = new ArrayList<>();

            for (int jatekos = 0; jatekos < adatok.size(); jatekos++) {

                vizsgalando_fordulo_tippjei.add(Integer.parseInt(adatok.get(jatekos)[vizsgalando_fordulo]));

            }

            for (int i = 0; i < vizsgalando_fordulo_tippjei.toArray().length; i++) {

                if (vizsgalando_fordulo_tippjei.get(i) < legkisebb_tipp && Collections.frequency(vizsgalando_fordulo_tippjei, legkisebb_tipp) == 1) {

                    legkisebb_tipp = vizsgalando_fordulo_tippjei.get(i);

                }

            }

            if (legkisebb_tipp == 101) {

                //Nem volt nyertes tipp
                //Az osszes tovabbi feladatot itt kell kezelni ahol nincs nyertes

                String nyerte_neve = "nem volt nyertes";

            } else {

                //hogy mehessunk ugyan azzal a listaval es valtozoval, ne zavarjon be a 101

                int nyertes_indexe = vizsgalando_fordulo_tippjei.indexOf(legkisebb_tipp);

                String nyertes_neve = adatok.get(nyertes_indexe)[-1];

                FileWriter writer = new FileWriter("nyertes.txt");

                writer.write("fordulo: " + vizsgalando_fordulo + "\n" + "tipp: " + legkisebb_tipp + "\n" + "nev: " + nyertes_neve);

            }

        } else {System.out.println("Nem talaltuk a filet / ures a file"); return;}

    }

}