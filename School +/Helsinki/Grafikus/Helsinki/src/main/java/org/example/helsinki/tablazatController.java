package org.example.helsinki;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import java.util.Scanner;
import java.io.IOException;
import java.io.InputStream;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

public class tablazatController {

    @FXML
    public void initialize() {

        InputStream file = getClass().getResourceAsStream("/helsinki.txt");

        if (file != null) {
            Scanner scanner = new Scanner(file);

            int db = 0;

            while (scanner.hasNextLine()) {

                String[] sor = scanner.nextLine().split(" ");

                int sorInt = Integer.parseInt(sor[0]);
                int sorInt2 = Integer.parseInt(sor[1]);
                Eredmeny eredmeny = new Eredmeny(sorInt, sorInt2, sor[2], sor[3]);

                db++;

            }

        } else { System.out.println("Nem talaltam a filet"); return; }

    }

    @FXML private TableView<Eredmeny> eredmenyTabla;
    @FXML private TableColumn<Eredmeny, Integer> helyezes;
    @FXML private TableColumn<Eredmeny, Integer> sportolok_szama;
    @FXML private TableColumn<Eredmeny, String> sportag;
    @FXML private TableColumn<Eredmeny, String> versenyszam;

    private final ObservableList<Eredmeny> eredmeny = FXCollections.observableArrayList();
}
