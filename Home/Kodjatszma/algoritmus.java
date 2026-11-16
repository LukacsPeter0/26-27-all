import java.util.Arrays;

class algoritmus {
    public static void main(String[] args) {
        
        int korlat = 99; //2jegyu kod
        int kod = 15;
        int[] feltetel1 = {1,2};

        String kodString = String.valueOf(kod);
        int[] kodTomb = new int[kodString.length()];

        for (int i = 0; i < kodString.length(); i++) {

            kodTomb[i] = Character.getNumericValue(kodString.charAt(i));

        }

    }
}