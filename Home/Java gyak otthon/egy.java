import java.util.Random;

public class egy {
    public static void main(String[] args) {

        Random random = new Random();
        
        int[] szamkod = new int[4];
        int[] temp_szamkod = new int[5];

        int temp;
        int[] lehetseges_szamok = {1,3,5,7,9};

        int[] elso_feltetel_szamai = {1,2,3,4};
        int elso_feltetel_szama;

        int[] masokik_feltetel_szamainak_sorrendje = {5,6,7,8};
        int[] masokik_feltetel_szamparai = {{5,7}};
        int[] masokik_feltetel_szamai;

        int[] harmadik_feltetel_szamainak_sorrendje = {1,3,5,7};
        int[] harmadik_feltetel_szamparai = { {1,3}, {1,5}, {1,7}, {3,5}, {3,7}, {5,7} };
        int[] harmadik_feltetel_szamai;
        
        for (int i = 0; elso_feltetel_szamai.length > i; i++) {

            elso_feltetel_szama = elso_feltetel_szamai[i];
            temp_szamkod[0] = elso_feltetel_szamai[i];

            for (int x = 0; masokik_feltetel_szamparai.length > x; i++) {

                masokik_feltetel_szamai = masokik_feltetel_szamparai[x];
                temp_szamkod[1] = masokik_feltetel_szamai[0];
                temp_szamkod[2] = masokik_feltetel_szamai[1];

                for (int y = 0; harmadik_feltetel_szamparai.length > y; y++) {

                    harmadik_feltetel_szamai = harmadik_feltetel_szamparai[y];
                    temp_szamkod[3] = harmadik_feltetel_szamai[0];
                    temp_szamkod[4] = harmadik_feltetel_szamai[1];

                    for (int z = 0; temp_szamkod.length > z; z++) {

                        int randomIndex = random.nextInt(temp_szamkod.length);

                        //random sorrendbe beilleszteni

                    }

                }

            }

        }

    }
}