package org.example.helsinki_test;

import javafx.collections.ObservableListBase;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.Scene;
import javafx.scene.*;

import java.io.InputStream;
import java.util.Scanner;
import java.io.IOException;
import java.io.File;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

public class HelloController {

    InputStream file = getClass().getResourceAsStream("/helsinki.txt");
    private String sor;

    ObservableList<Eredmenyek> eredmenyek = FXCollections.observableArrayList();

    @FXML
    private void initialize() {

        try {

            Scanner scanner = new Scanner(file);

            while (scanner.hasNextLine()) {

                String[] sor = scanner.nextLine().split(" ");

                int sorInt0 = Integer.parseInt(sor[0]);
                int sorInt1 = Integer.parseInt(sor[1]);

                Eredmenyek eredmeny = new Eredmenyek(sorInt0, sorInt1, sor[2], sor[3]);

                eredmenyek.add(eredmeny);

            }

        } catch (Exception e) { //ezt azert irtam hogy ha problema van, azt "elkapja", es kezeli
            System.out.println("Valami problema tortent");
        }

    }

    @FXML
    private TableView<Eredmenyek> eredmenyekTable;

    @FXML
    private TableColumn<Eredmenyek, Integer> helyezes;

    @FXML
    private TableColumn<Eredmenyek, Integer> sportolok_szama;

    @FXML
    private TableColumn<Eredmenyek, String> sportag;

    @FXML
    private TableColumn<Eredmenyek, String> versenyszam;

}
