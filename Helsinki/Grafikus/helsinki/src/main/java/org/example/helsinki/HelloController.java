package org.example.helsinki;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class HelloController {

    @FXML
    private Label eredmenyLabel;

    @FXML
    protected void fel3() {
        eredmenyLabel.setText("Pontszerzo helyezesek szama: 64");
    }

    @FXML
    private void fel4() {
        eredmenyLabel.setText("Arany: 16 \n Ezust: 10 \n Bronz: 16 \n Osszesen: 42");
    }

    @FXML
    private void fel5() {
        eredmenyLabel.setText("Olimpiai pontok szama: 269");
    }

    @FXML
    private void fel6() {
        eredmenyLabel.setText("Torna sportagban szereztek a legtobb ermet");
    }

    @FXML
    private void fel7() {
        eredmenyLabel.setText("Nyitsd meg a helsinki2.txt-t");
    }

    @FXML
    private void fel8() {
        eredmenyLabel.setText("Helyezes: 1 \nSportag: labdarugas \nVersenyszam: ferfi_csapat \nSportolok szama: 15");
    }
}
