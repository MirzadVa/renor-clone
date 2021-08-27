import React from "react";
import { Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    // height: "841.5px",
    // backgroundColor: "yellow",
    // paddingTop: 35,
    paddingHorizontal: 35,
  },
  // heading: {
  //   color: "#272c63", //dark blue
  //   fontSize: 25,
  //   marginBottom: "20px",
  // },
  // headingText: {
  //   color: "#272c63",
  //   fontSize: 10,
  // },
  subHeading: {
    color: "#ed7105", // orange
    marginBottom: "10px",
    fontWeight: 600,
    fontFamily: "OpenSans",
    fontSize: 12,
  },
  subHeadingText: {
    color: "#272c63",
    fontSize: 8,
    marginBottom: "10px",
  },
  link: {
    color: "#009ee2", //light blue
  },
  mt_20: {
    marginTop: "20px",
  },
  pointBold: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "7px",
    alignItems: "flex-start",
  },
  pointBoldText: {
    color: "#272c63",
    fontSize: 8,
    fontWeight: "extrabold",
    width: "500px",
  },
  image: {
    height: "7px",
    width: "7px",
    marginRight: "10px",
    marginLeft: "10px",
    marginTop: "1px",
  },
});

const Point = (props) => {
  const { children } = props;
  return (
    <View style={styles.pointBold}>
      <Image src={"/images/lightBlueCircle.png"} style={styles.image} />
      <Text style={styles.pointBoldText}>{children}</Text>
    </View>
  );
};

const Page2 = (props) => {
  return (
    <View style={styles.body} break>
      <Text style={props.format.heading}>1. Introductie</Text>
      <Text style={props.format.headingText}>
        Voor u ligt het PvE op maat, een Programma van Eisen op maat gemaakt
        voor uw gebouw. Het PvE is opgesteld op basis van de eisen uit de
        publicatie Programma van Eisen Gezonde Kantoren 2021, versie 1. Met
        behulp van de webapplicatie “PvE op maat”, zijn de eisen afgestemd op uw
        gebouw. Zie <Link style={styles.link}>www.pveopmaat.nl</Link> voor meer
        informatie.
      </Text>
      {/* First Subheading */}
      <View style={styles.mt_20}>
        <Text style={styles.subHeading}>1.1 Achtergrond</Text>
        <Text style={styles.subHeadingText}>
          Een goed binnenmilieu in kantoren is belangrijk om een comfortabele,
          prestatieverhogende en gezonde werkomgeving te creëren. Om dit te
          behalen en behouden is het noodzakelijk dat bij nieuwbouw en
          renovatieprojecten vooraf eisen worden geformuleerd ten aanzien van de
          binnenmilieukwaliteit. Ontwerpers, installateurs en aannemers dienen
          hun plannen vervolgens te baseren op deze uitgangspunten.
        </Text>
        <Text style={styles.subHeadingText}>
          Om u hierbij te ondersteunen hebben TVVL en Binnenklimaat Nederland de
          update ‘PvE Gezonde Kantoren 2021’ laten opstellen in samenwerking met
          andere leden van het Platform Gezond Binnenklimaat. Het document is
          een nieuwe versie (versie 2) ten opzichte van versie 1 van het PvE uit
          2018; opgesteld met dank aan de input van diverse marktpartijen en
          (branche)organisaties.
        </Text>
        <Text style={styles.subHeadingText}>
          Met de publicatie wordt een handreiking gegeven aan partijen die
          kantoren willen realiseren die niet alleen energiezuinig zijn maar
          vooral ook gezond, comfortabel en prestatieverhogend.
        </Text>
        <Text style={styles.subHeadingText}>
          Meer informatie over de publicatie en het document zelf vindt u op{" "}
          <Link style={styles.link}>www.pvegezondekantoren.nl</Link> .
        </Text>
      </View>
      {/* Second Subheading */}
      <View style={styles.mt_20}>
        <Text style={styles.subHeading}>1.2 Thema’s</Text>
        <Text style={styles.subHeadingText}>
          In het Programma van Eisen staan de volgende 4 binnenmilieu-thema’s
          centraal:
        </Text>
        <Point>Lucht (binnenluchtkwaliteit)</Point>
        <Point>Klimaat (thermisch binnenklimaat)</Point>
        <Point>Licht ({'&'} uitzicht)</Point>
        <Point>Geluid</Point>
        <Text style={styles.subHeadingText}>
          In dit PvE worden de aspecten energieprestatie en materiaalgebruik
          buiten beschouwing gelaten.Aanvullende eisen op deze aspecten zijn
          veelal wettelijk vastgelegd (energieprestatie) of dienen apart te
          worden vastgelegd bij de start van een project. Bij goed ontwerp
          hebben de eisen op deze twee aspecten slechts een beperkte invloed op
          het wel of niet kunnen halen van de kwaliteitsniveaus zoals vastgelegd
          in dit PvE.
        </Text>
      </View>
      {/* Thirst Subheading */}
      <View style={styles.mt_20}>
        <Text style={styles.subHeading}>1.3 Ambitieprofielen</Text>
        <Text style={styles.subHeadingText}>
          Voor ieder deelaspect geldt dat er met drie ambitieniveaus gewerkt
          wordt:
        </Text>
        <Point>Klasse C (voldoende)</Point>
        <Point>Klasse B (goed)</Point>
        <Point>Klasse A (zeer goed)</Point>
        <Text style={styles.subHeadingText}>
          Aan ieder ambitieniveau zijn eigen (prestatie)eisen gekoppeld. Klasse
          C is hierbij het basisniveau; vaak gebaseerd op geldende wet- en
          regelgeving,zoals vastgelegd in het Bouwbesluit 2012 (specifiek de
          nieuwbouw-eisen zoals die sinds 2012 gelden).
        </Text>
      </View>
      {/* Fourth Subheading */}
      <View style={styles.mt_20}>
        <Text style={styles.subHeading}>1.4 Kwaliteitsborging</Text>
        <Text style={styles.subHeadingText}>
          Het stellen van eisen biedt nog geen garantie dat de gestelde
          binnenmilieu prestaties na ingebruikname werkelijk behaald
          worden.Tijdens het ontwerptraject, bij oplevering en na ingebruikname
          zal periodiek (steekproefsgewijs) getoetst dienen te worden of aan de
          belangrijkste eisen voldaan wordt.
        </Text>
        <Text style={styles.subHeadingText}>
          In dit document is daarom ook een ambitieniveau voor de
          kwaliteitsborging vastgelegd (klasse A, B of C). Het gekozen niveau
          voor kwaliteitsborging kan afwijken van de het kwaliteitsniveau van de
          binnenmilieu-eisen; wanneer er bijvoorbeeld bij een monument gekozen
          wordt om de klasse C eisen te hanteren kunnen deze conform de klasse A
          eisen voor kwaliteitsborging gecontroleerd worden.
        </Text>
      </View>
      {/* Fifth Subheading */}
      <View style={styles.mt_20} break>
        <Text style={styles.subHeading}>1.5 Waar en wanneer van de eisen</Text>
        <Text style={styles.subHeadingText}>
          Bij de prestatie-eisen dient het volgende in acht te worden genomen:
        </Text>
        <Point>
          De eisen gelden enkel tijdens gebruikstijd: voor kantoren betekent dit
          in de regel op werkdagen tussen 8:00 en 18:00 uur (bij afwijkend
          gebruik dienen deze tijden aangepast te worden; per project zal dit
          vastgelegd moeten worden).
        </Point>
        <Point>
          Binnen de gebruikstijd dient voor ten minste 95% van de gebruikstijd
          aan de eis te worden voldaan.
        </Point>
        <Point>
          Daar waar variabele eisen geformuleerd worden geldt dat er vanuit
          gegaan mag worden dat er nooit in 100% van de ruimte gelijktijdig een
          maximum capaciteitsvraag is. De capaciteit van het systeem dient
          zodanig ontworpen te worden dat de aanwezige naregeling in maximaal
          25% van de ruimten op de maximale stand staat, waarbij de andere 75%
          van de ruimten op standaard niveau (conform standaard setpoint
          instelling) functioneert.
        </Point>
        <Point>
          De eisen gelden specifiek voor ruimten die gebruikt worden voor
          kantoorwerk of werkzaamheden vergelijkbaar met kantoorwerk. De eisen
          gelden daarbij alleen als de bewuste ruimte ook wordt gebruikt als
          bedoeld.
        </Point>
        <Point>
          Voor overige ruimten als gangen, atria’s, serre’s en dergelijke kan
          men minder strenge eisen aanhouden.Tenzij er sprake is van
          kantoorwerkplekken die geregeld langer dan 1 uur aansluitend gebruikt
          worden. In dit geval gelden de eisen zoals in dit PvE gepresenteerd.
        </Point>
        <Text style={styles.subHeadingText}>
          Meer informatie over het waar en wanneer van de eisen vindt u in de
          publicatie.
        </Text>
      </View>
    </View>
  );
};

export default Page2;
