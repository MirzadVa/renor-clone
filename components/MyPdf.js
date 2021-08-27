import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import Page1 from "./pdf/Page1";
import Page2 from "./pdf/Page2";
import Page3 from "./pdf/Page3";
import Page4 from "./pdf/Page4";
import Page5 from "./pdf/Page5";
import Page6 from "./pdf/Page6";
// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 35,
    // // paddingBottom: 35,
    // paddingHorizontal: 35,
  },
  // section: {
  //   margin: 10,
  //   padding: 10,
  //   // flexGrow: 1,
  // },
  footerLogo: { height: "50px", width: "200px" },
  heading: {
    color: "#272c63", //dark blue
    fontSize: 25,
    marginBottom: "20px",
    fontWeight: 700,
    fontFamily: "OpenSans",
  },
  headingText: {
    color: "#272c63",
    fontSize: 11,
  },
  footerSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "600px",
    bottom: 20,
    paddingLeft: "35px",
    paddingRight: "35px",
    backgroundColor: "white",
  },
  pn: {
    color: "#272c63",

    fontSize: 10,
    // backgroundColor: "red",
    // height: "20px",
  },
  f1: {
    textAlign: "right",
    color: "#ed7105",
    fontSize: 8,
  },
  f2: {
    color: "#009ee2",
    textAlign: "right",
    fontSize: 10,
  },
  f3: {
    color: "#272c63",
    textAlign: "right",
    fontSize: 8,
  },
  rightFooter: {
    width: "150px",
    // backgroundColor: "yellow",
  },
  leftFooter: {
    width: "200px",
    // backgroundColor: "red",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "150px",
    justifyContent: "flex-end",
  },
});

Font.register({
  family: "OpenSans",
  fonts: [
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      // "https://fonts.googleapis.com/css2?family=Open+Sans:wght@600",
      fontWeight: 600,
    },
    {
      src:
        "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      // "https://fonts.googleapis.com/css2?family=Open+Sans:wght@600",
      fontWeight: 700,
    },
  ],
});
Font.register({
  family: "M_One",
  fonts: [
    {
      src: "/mplus-1m-medium.ttf",
      fontWeight: 500,
    },
    {
      src: "/mplus-1m-bold.ttf",
      fontWeight: 700,
    },
  ],
});
//MPLUS1p-Medium.ttf

const MyPdf = (props) => {
  const { categoriesData, formData, files, today } = props;
  ///category, subCategories > klass,title
  const sumaryData = (data) => {
    return data.map((d) => ({
      category: d.categoryType,
      subCategories: d.subCategories.map((subCat) => ({
        klass: subCat.ans,
        title: subCat.name,
      })),
    }));
  };

  const resultData = (data) => {
    return data.map((d) => ({
      category: d.categoryType,
      subCategories: d.subCategories.map((subCat) => ({
        klass: subCat.ans,
        title: subCat.name,
        info: subCat.info,
        exp: subCat.exp,
      })),
    }));
  };

  const dummyData = [
    {
      categoryId: 2,
      categoryType: "Klimaat",
      subCategories: [
        {
          info: [
            {
              text_a:
                "De operatieve temperatuur in de leefzone  (combinatie van de luchttemperatuur en stralingstemperatuur) bedraagt in het stookseizoen minimaal <b>21 °C.</b>",
            },
            {
              text_a: "<",
            },
            {
              text_a: "<",
            },
            {
              text_a:
                "Daar waar sprake is van open kantoorruimten met meer dan 10 werkplekken is handmatige naregeling mogelijk mbv een microklimatiseringssysteem (denk bv aan een verwarmde stoel, een verwarmingsmatje of stralingspaneel onder het bureau of een in het bureaublad geintegreerd verwarmingssysteem).",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Wintercomfort ",
        },
        {
          info: [
            {
              text_a:
                "Buiten het stookseizoen, is de operatieve temperatuur binnen maximaal <b>25°C</b>.",
            },
            {
              text_a:
                "Aanwezige componenten voor koeling  zijn op vertrekniveau handmatig na te regelen met een bandbreedte van minimaal 2 C rond een standaardsetpoint van 24,5 C. Met de bedienunit is de temperatuur met voldoende 'snelheid' te beinvloeden: temperatuureffect minimaal 1 C per half uur na verstelling.",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Zomercomfort actieve koeling",
        },
        {
          info: [
            {
              text_a: "<",
            },
            {
              text_a:
                "Er is voorzien in aanvullende mogelijkheden voor <b>indirecte handmatige naregeling</b> van de temperatuur in de zomer (los van via het gebruik van de te openen ramen); denk aan buitenzonwering die handmatig ingesteld/ overruled kan worden en/of aan voorzieningen waarmee plaatselijk, tijdelijk een verhoging van de luchtsnelheid is te realiseren (bv. tafelventilatoren of plafondventilatoren).",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Zomercomfort passieve koeling",
        },
        {
          info: [
            {
              text_a: "<",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Tocht",
        },
        {
          info: [
            {
              text_a: "<",
            },
            {
              text_a: "<",
            },
            {
              text_a: "<",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Lokale behaaglijkheid (overig)",
        },
      ],
    },
    {
      categoryId: 4,
      categoryType: "Geluid",
      subCategories: [
        {
          info: [
            {
              text_a:
                "De karakteristieke geluidswering van de gevel (GA;k) is gelijk aan het verschil tussen de geluidbelasting op de gevel en <b>30 dB. </b>De  geluidwering bedraagt minimaal 20 dB.",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Geluidwering van de gevel ",
        },
        {
          info: [
            {
              text_a:
                "De luchtgeluidisolatie (DnT;A) tussen verblijfsruimten ruimten onderling bedraagt ten minste<b> 45 dB.</b>",
            },
            {
              text_a: "<",
            },
            {
              text_a: "<",
            },
            {
              text_a: "<<",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Isolatie wanden en vloeren",
        },
        {
          info: [
            {
              text_a:
                "Het geluidniveau in kantoorruimten en overlegruimten t.g.v. installaties (LI;A) is maximaal 30 dB.",
            },
            {
              text_a: "<",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Installatiegeluid\n",
        },
        {
          info: [
            {
              text_a:
                "Selecteer printers, copiers, koffieautomaten en andere geluidproducerende apparatuur op een laag (geluid)bronvermogen en plaats eea zoveel mogelijk buiten werkruimten / zones waar geconcentreerd gewerkt wordt. ",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Apparatuur",
        },
      ],
    },
    {
      categoryId: 3,
      categoryType: "Licht",
      subCategories: [
        {
          info: [
            {
              text_c:
                "De daglichtfactor DT in de ruimten is minimaal 1,5% in meer dan 50% van de verblijfsruimte (of het deel van de ruimte waar de werkplekken opgesteld staan). ",
            },
            {
              text_c:
                "De lichttoetredingsfactor (LTA-waarde (τv of LT)) van de beglazing bedraagt minimaal <b>0,50. </b>",
            },
            {
              text_c:
                "Qua uitzicht wordt aan minimaal één van de volgende drie voorwaarden voldaan: zicht op i. groen of water, ii. de hemelkoepel, iii. verder weg gelegen objecten / de horizon. ",
            },
            {
              text_c: null,
            },
          ],
          ans: "C",
          exp: "text_c",
          name: "Daglicht & uitzicht",
        },
        {
          info: [
            {
              text_c:
                "Er is voorzien in instelbare helderheidswering waarmee de luminantieverhoudingen ('contrasten') in het gezichtsveld zijn te beperken (bv. bij laagstaande zon) tot <b>1:30:100 </b>(luminantie taak : directe omgeving : periferie).",
            },
            {
              text_c:
                "De kans op verblinding bij daglicht (DGP) is <0,45 conform NEN-EN 17037.",
            },
          ],
          ans: "C",
          exp: "text_c",
          name: "Helderheidswering\n",
        },
        {
          info: [
            {
              text_c:
                "De horizontale verlichtingsterkte van de kunstverlichting is minimaal<b> 500 lux</b> op het werkblad en voldoet aan de eisen vermeld in NEN 12464-1.",
            },
            {
              text_c: null,
            },
            {
              text_c:
                "De UGRL (waarde voor de beperking van de 'verblindingshinder'  tgv zijdelings uitstralende verlichtingsarmaturen) bedraagt maximaal <b>19.</b>",
            },
            {
              text_c:
                "De kleurweergaveindex (Ra) van de verlichting is minimaal <b>80.</b>",
            },
            {
              text_c:
                "LED verlichting heeft een flickerfrequentie van minimaal <b>100Hz </b>met een met een flickerpercentage<b> <8%</b> conform IEEE standard 1789 of (alternatief) heeft een flikkerwaarde PstLM ≤ 1,0 conform de bepalingen in NEMA 77-2017 en een stroboscopisch effect: SVM ≤ 1,6 conform de bepalingen in NEMA 77-2017.",
            },
          ],
          ans: "C",
          exp: "text_c",
          name: "Kunstlicht\n",
        },
      ],
    },
    {
      categoryId: 1,
      categoryType: "Lucht",
      subCategories: [
        {
          info: [
            {
              text_b:
                "Per stramien van 3,60 m is voorzien in minimaal 1 te openen deel.",
            },
            {
              text_b:
                "De afmetingen van het te openen deel zijn dusdanig dat een spuiventilatiecapaciteit van minimaal 100 l/s gegarandeerd is (bepaald conform NEN 1087).",
            },
            {
              text_b:
                "Het te openen deel is voorzien van een uitzetmechanisme waarmee deze in elk geval in één stand is te fixeren.",
            },
            {
              text_b:
                "In het geval te openen delen niet mogelijk zijn en is voorzien in een zogenaamde 'boostknop' waarmee het mechanische ventilatiesysteem (al dan niet tijdelijk) in een hoogstand te zetten is (met verse luchttoevoer die minimaal 2x hoger is dan standaard) dan kan dat gezien worden als een alternatieve (kwalitatief iets mindere) klasse B oplossing.",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Spuiventilatie",
        },
        {
          info: [
            {
              text_b:
                "De CO₂-concentratie in verblijfsruimten (in de ademzone) ligt tijdens gebruikstijd op maximaal + 450 ppm boven de buitenluchtconcentratie.",
            },
            {
              text_b:
                "Uitgaande van een normaal, gemiddeld metabolisme voor kantoorwerk (1,2 a 1,4 met) en een CO2 productie van maximaal 0,005 L/s per persoon geldt dat aan de klasse B eis voldaan kan worden als er 40 m³/h per persoon aan verse lucht toegevoerd wordt.",
            },
            {
              text_b:
                "De genoemde verse luchttoevoer per persoon kan omgerekend worden naar benodigde verse luchttoevoer per m²: ga in een klasse B gebouw in kantoorruimten uit van minimaal 5 m³/h/m² (uitgaande van minimaal 8 m²  vloeroppervlak p.p. op kamerniveau);  in een bijeenkomstruimte is dit minimaal 13 m³/h/m² (uitgaande van minimaal 3 m² p.p. op kamerniveau). ",
            },
            {
              text_b: null,
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "CO₂ concentratie & Luchtverversing\n",
        },
        {
          info: [
            {
              text_b: "<",
            },
            {
              text_b: null,
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Luchtvochtigheid",
        },
        {
          info: [
            {
              text_b: "<",
            },
            {
              text_b: "<",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Schimmels & bacteriën",
        },
        {
          info: [
            {
              text_b:
                "De formaldehyde (HCOH) concentratie bedraagt maximaal 30 microgram/m³. ",
            },
            {
              text_b:
                "De totale vluchtige organische stoffen oftewel TVOC-concentratie bedraagt maximaal 500 microgram/m³. ",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Vluchtige Organische Stoffen",
        },
        {
          info: [
            {
              text_b: "<",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Verbrandingsgassen",
        },
        {
          info: [
            {
              text_b:
                "De uurgemiddelde PM 2,5 (fijnstof) concentratie is maximaal 15 microgram/m³. ",
            },
            {
              text_b:
                "Aanvullende eis ten aanzien van de fijnstof penetratie via de gevel en het ventilatiesysteem (filtersectie): de PM2,5 (fijnstof) concentratie binnen bedraagt maximaal 0,5 de momentane buitenconcentratie  (uurgemiddelde indoor/outdoor ratio = 0,5) ",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Fijnstof",
        },
        {
          info: [
            {
              text_b:
                "De stofdepositie in luchtkanalen en in andere componenten & appendages die deel uitmaken van een eventueel aanwezig mechanisch ventilatiesysteem is dusdanig dat voldaan wordt aan de reinheidseisen uit het LUKA handboek, specifiek luchtreinheidsklasse M (midden). Beoordeling van de reinheid van kanalen vindt plaats op basis van een visuele beoordeling (NVRL Keur Reinheid luchtbehandeling- en ventilatiesystemen).",
            },
            {
              text_b:
                "Luchttoevoerkanalen en luchtbehandelingskasten moet zo rein mogelijk worden gehouden tijdens de uitvoeringsfase. Zorg o.a. dat luchtkanalen afgedopt aangeleverd worden. ",
            },
            {
              text_b:
                "Verder dienen de luchtbehandelingskasten, luchtkanalen en andere ventilatiesysteem-componenten uitgevoerd en onderhouden te worden in lijn met de bepalingen uit het VLA bestek Onderhoud en Beheer Luchtbehandelingssystemen Kantoor. ",
            },
            {
              text_b:
                "Eventueel aanwezige centrale recirculatiekleppen en warmtewielen staan zo afgesteld dat recirculatie op gebouwniveau oftewel het opnieuw inbrengen van verontreinigde retourlucht tijdens gebruikstijd zo goed als uitgesloten is (met maximaal 5% kortsluiting van retourlucht). ",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Hygiene ventilatiesysteem",
        },
        {
          info: [
            {
              text_b: "<",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Tabaksrook",
        },
        {
          info: [
            {
              text_b:
                "In het gebouw zijn geen asbesthoudende materialen aanwezig.",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Asbest",
        },
        {
          info: [
            {
              text_b: "<",
            },
          ],
          ans: "B",
          exp: "text_b",
          name: "Legionella",
        },
      ],
    },
    {
      categoryId: 5,
      categoryType: "Kwaliteit",
      subCategories: [
        {
          info: [
            {
              text_a:
                "De gemiddelde nagalmtijd (T30) in de ingerichte ruimten bedraagt maximaal <b>0,5 s.</b>",
            },
            {
              text_a:
                "Open kantoorvloeren zijn zo ingericht en afgewerkt dat de geluidsverzwakking in de ruimte bij afstands-verdubbeling (DL2,S in dB) minimaal <b>6 dB</b> bedraagt. ",
            },
          ],
          ans: "A",
          exp: "text_a",
          name: "Ruimte-akoestiek",
        },
      ],
    },
  ];
  return (
    <Document>
      <Page style={styles.page}>
       <Page1 withImage={true} data={formData} files={files} today={today} />
        <Page2
          format={{
            heading: styles.heading,
            headingText: styles.headingText,
          }}
        />
         <Page3
          format={{
            heading: styles.heading,
            headingText: styles.headingText,
          }}
          data={sumaryData(categoriesData)}
        /> 
        <Page4
          format={{
            heading: styles.heading,
            headingText: styles.headingText,
          }}
          data={resultData(categoriesData)}
        />
        <Page5
          format={{
            heading: styles.heading,
            headingText: styles.headingText,
          }}
          data={sumaryData(categoriesData)}
        />
        <Page6 />
        <View
          style={styles.footerSection}
          fixed
          render={({ pageNumber, totalPages }) =>
            pageNumber !== 1 &&
            pageNumber !== totalPages && (
              <View style={styles.footerSection}>
                <View style={styles.leftFooter}>
                  {/* <Image src={"/images/logo.png"} style={styles.footerLogo} /> */}
                </View>

                <View style={styles.rightFooter} fixed>
                  {/* <Text
                    style={styles.pn}
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber} / ${totalPages} pages`
                    }
                    fixed
                  /> */}
                  <View style={styles.flexRow}>
                    <Text style={styles.pn}>{pageNumber}</Text>
                    <Text style={styles.pn}>/</Text>
                    <Text style={styles.pn}>{totalPages}</Text>
                  </View>

                  <Text style={styles.f1}>Programma van Eisen op maat</Text>
                  <Text style={styles.f2}>Renovatie Kantoor TVVL</Text>
                  <Text style={styles.f3}>20-03-2021</Text>
                </View>
              </View>
            )
          }
        />
        {/* <Footer /> */}
      </Page>
    </Document>
  );
};

export default MyPdf;
