export default function justify(text) {
    //suppression des simple retour chariot et transformation des doubles retour chariot en simple
    text = text.replace(/(\r\n\r\n|\n\n|\r\r)/gm, "[carReturn$]");
    text = text.replace(/(\r\n|\n|\r)/gm, "");
    text = text.replace("[carReturn$]", "\n");

    var temporaryResult = ""
    var result = ""
    var x = 0
    var lastSpace
    var spaceCount = 0
    var spaceNeededNumber = 0
    var spaceAddedNumber = 0
    var spe = 0
    var indexSection = 0

    while (x < text.length) {

        //Si la section de 80 char se fini par un espace alors ajout de cette section tel quelle dans le resultat final
        if (text[x + 80] == " ") {
            for (indexSection = 0; indexSection < 80; indexSection++) {
                // Si retour chariot présent dans la secion alors ajout du debut de la section jusqu'au retour chariot  dans le resultat finalt 
                //puis traitement du reste de la section dans la prochaine boucle
                if (text[x + indexSection] == "\n" || text[x + indexSection] == "\r" || text[x + indexSection] == "\r\n") {
                    spe = indexSection
                    result += text.slice(x, x + spe)
                    x += spe
                }
            }
            if (spe == 0) {
                result += text.slice(x, x + 80) + "\n"
                x += 81
            }

        } else if (x > text.length - 80) {
            // si la section actuelle est de moin de 80 char ( donc fin du texte ) alors ajout de cette section tel quelle dans le resultat final
            result += text.slice(x, text.length)
            x += 81
        } else {
            // si la section ne finit pas par un espace 
            for (indexSection = 0; indexSection < 80; indexSection++) {
                //recherche et enrengistrement des espaces interne a la section
                if (text[x + indexSection] == " ") {
                    lastSpace = indexSection
                    spaceCount++

                }
                //recherche de retour chariot dans la section
                if (text[x + indexSection] == "\n" || text[x + indexSection] == "\r" || text[x + indexSection] == "\r\n") {
                    spe = indexSection

                }
            }

            //si retour chariot non présent dans la section alors calcul du nombre du nombre d'espace a doublé ( " " => "  ")
            if (spe == 0) {

                spaceNeededNumber = 80 - lastSpace

                while (spaceAddedNumber < spaceNeededNumber) {

                    for (indexSection = 0; indexSection <= lastSpace; indexSection++) {
                        if (text[x + indexSection] == " "
                            && spaceAddedNumber < spaceNeededNumber) {

                            temporaryResult += text[x + indexSection] + " "
                            spaceAddedNumber++

                        } else {
                            temporaryResult += text[x + indexSection]
                        }
                    }
                }

                result += temporaryResult.slice(0, 80) + "\n"
                x += 81 - spaceNeededNumber
            }
            // Si retour chariot présent dans la secion alors ajout du debut de la section jusqu'au retour chariot  dans le resultat finalt 
            //puis traitement du reste de la section dans la prochaine boucle
            else {
                result += text.slice(x, x + spe)
                x += spe
            }

            spe = 0
            lastSpace = 0
            spaceCount = 0
            temporaryResult = ""
            spaceAddedNumber = 0
            spaceNeededNumber = 0
        }

    }
    /*console.log(" result = ")
    console.log(result)*/
    return result

}