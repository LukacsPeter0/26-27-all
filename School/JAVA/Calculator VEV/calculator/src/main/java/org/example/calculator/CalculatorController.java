package org.example.calculator;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.TextField;

public class CalculatorController {

    private Double storeValue = null;
    private String pendingOp = null;
    private boolean startNewNumber = true;

    @ FXML private TextField display;

    @FXML
    private void initialize() {

        if (display != null) display.setText("0");

    }

    @FXML
    private void inDigit(ActionEvent e) {

        String t = ((Button) e.getSource()).getText();

        if (startNewNumber) {

            display.setText(t.equals(".") ? "0." : t);
            startNewNumber = false;
            return;

        }

        if (t.equals(".") && display.getText().contains(".")) return;

        if (display.getText().equals("0") && !t.equals(".")) {

            display.setText(t);

        } else {

            display.setText(display.getText() + t);

        }

    }

}