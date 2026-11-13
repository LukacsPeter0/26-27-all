package org.example.helsinki;

import javafx.collections.FXCollections;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class HelloController {

    @FXML
    private TableView<HelsinkiEredmeny> eredmenyTable;

    @FXML
    private TableColumn<HelsinkiEredmeny, Integer> helyezesColumn;

    @FXML
    private TableColumn<HelsinkiEredmeny, Integer> letszamColumn;

    @FXML
    private TableColumn<HelsinkiEredmeny, String> sportagColumn;

    @FXML
    private TableColumn<HelsinkiEredmeny, String> versenyszamColumn;

    @FXML
    private Label statusLabel;

    @FXML
    private void initialize() {
        helyezesColumn.setCellValueFactory(
                new PropertyValueFactory<>("helyezes")
        );

        letszamColumn.setCellValueFactory(
                new PropertyValueFactory<>("letszam")
        );

        sportagColumn.setCellValueFactory(
                new PropertyValueFactory<>("sportag")
        );

        versenyszamColumn.setCellValueFactory(
                new PropertyValueFactory<>("versenyszam")
        );

        betoltAdatok();
    }

    private void betoltAdatok() {
        List<HelsinkiEredmeny> eredmenyek = new ArrayList<>();

        InputStream adatfolyam =
                getClass().getResourceAsStream("/helsinki.txt");

        if (adatfolyam == null) {
            statusLabel.setText(
                    "Nem találom a helsinki.txt fájlt a resources mappában."
            );
            return;
        }

        try (
                BufferedReader olvaso = new BufferedReader(
                        new InputStreamReader(adatfolyam, StandardCharsets.UTF_8)
                )
        ) {
            String sor;
            int sorszam = 0;

            while ((sor = olvaso.readLine()) != null) {
                sorszam++;

                if (sor.isBlank()) {
                    continue;
                }

                String[] mezok = sor.trim().split("\\s+");

                if (mezok.length != 4) {
                    throw new IOException(
                            "A(z) " + sorszam + ". sorban nem 4 adat szerepel."
                    );
                }

                int helyezes = Integer.parseInt(mezok[0]);
                int letszam = Integer.parseInt(mezok[1]);
                String sportag = mezok[2];
                String versenyszam = mezok[3];

                HelsinkiEredmeny eredmeny = new HelsinkiEredmeny(
                        helyezes,
                        letszam,
                        sportag,
                        versenyszam
                );

                eredmenyek.add(eredmeny);
            }

            eredmenyTable.setItems(
                    FXCollections.observableArrayList(eredmenyek)
            );

            statusLabel.setText(
                    "Betöltve: " + eredmenyek.size() + " eredmény."
            );

        } catch (IOException | NumberFormatException hiba) {
            statusLabel.setText(
                    "Hiba az adatfájl olvasásakor: " + hiba.getMessage()
            );
        }
    }

    @FXML
    private void mutatOsszesRekordot() {
        int darab = eredmenyTable.getItems().size();

        statusLabel.setText(
                "A táblázatban " + darab + " eredmény szerepel."
        );
    }
}
