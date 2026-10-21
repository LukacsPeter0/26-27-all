class Auto {

    String nev;
    double teljesitmeny;
    int loero;

}

public class ketto {
    public static void main(String[] args) {
        
        Auto ferrari = new Auto(); //nem ertrem hogy miert kutyat kellene letrehozni, amikor it csak auto van. Ezt elirtad, vagy valamit szarul ertelmeztem?
        ferrari.nev = "Ferrari F50";
        ferrari.teljesitmeny = 382.0;
        ferrari.loero = 520;

        System.out.println(ferrari.nev + " teljesítménye: " + ferrari.teljesitmeny + " KW");
        System.out.println(ferrari.nev + " lóereje: " + ferrari.loero + " LE");

        //Nem vagom hogy milyen gyartasi szamnak kell utana nezni... Meg hogy azt nem kell kiiratni, de meg kell adni. Szoval nem adtam meg

    }
}
