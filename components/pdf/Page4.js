import { Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 35,
  },
  card: { marginTop: "10px" },
  title: {
    color: "white",
    backgroundColor: "#272c63",
    fontSize: 15,
    // height: "30px",
    padding: "4px",
    paddingLeft: "10px",
    marginBottom: "15px",
    fontWeight: 600,
    fontFamily: "OpenSans",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "7px",
    paddingBottom: "15px",
    borderBottom: "1px solid grey",
  },

  itemLabel: {
    color: "#272c63",
    fontSize: 8,
    fontWeight: 600,
    fontFamily: "OpenSans",
  },
  klass: {
    backgroundColor: "#8CC63F", //green
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
    marginTop: "5px",
  },
  klassA: {
    backgroundColor: "#008001", //darkgreen
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
    marginTop: "5px",
  },
  klassB: {
    backgroundColor: "#8CC63F", //lightgreen
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
    marginTop: "5px",
  },
  klassC: {
    backgroundColor: "#fed500", //lightgreen
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
    marginTop: "5px",
  },
  point: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
    alignItems: "flex-start",
  },
  pointText: {
    fontSize: 8,
    width: "350px",
  },
  pointImage: {
    height: "4px",
    width: "4px",
    marginRight: "5px",
    marginTop: "2px",
  },
});
const Page4 = (props) => {
  const { format, data } = props;
  const Lucht = data.filter((d) => d.category == "Lucht");
  const Kwaliteit = data.filter((d) => d.category == "Kwaliteit");
  const Klimaat = data.filter((d) => d.category == "Klimaat");
  const Licht = data.filter((d) => d.category == "Licht");
  const Geluid = data.filter((d) => d.category == "Geluid");

  return (
    <>
      <View style={styles.body} break>
        <Text style={format.heading}>3. Resultaten</Text>
        <Text style={format.headingText}>
          In dit hoofdstuk vindt u voor iedere eis een concrete beschrijving van
          de bijbehorende prestatie-eisen. Bij het interpreteren van de eisen is
          het belangrijk de aanwijzingen in acht te nemen als beschreven in
          ‘hoofdstuk 1.5: Waar en wanneer van de eisen’. De eisen zijn
          onderverdeeld naar de vier thema’s: lucht, klimaat, licht en geluid.
        </Text>
        <Card New={false} data={Lucht[0]} />
        <Card New={true} data={Klimaat[0]} />
        <Card New={true} data={Licht[0]} />
        <Card New={true} data={Geluid[0]} />
      </View>

      {/* New Page with same layout */}
      <View style={styles.body} break>
        <Text style={format.heading}>4. Kwaliteitsborging</Text>
        <Text style={format.headingText}>
          Bij nieuwbouwprojecten en bij ingrijpende renovaties heeft het de
          voorkeur om niet alleen de gewenste binnenmilieu-prestaties vast te
          leggen maar ook de verificatieprocedures. Het laatste verwijst naar de
          wijze waarop de prestaties geverifieerd worden bij oplevering en
          eventueel ook gedurende de gebruiksfase. Soms kan dat middels
          inspecties dan wel simulaties of controle-berekeningen, soms zijn
          (duur) metingen nodig (al dan niet gebruikmakend van
          binnenmilieu-sensornetwerken) en in bepaalde gevallen kan men ook
          middels enquêtes (systematisch verzamelde feedback van eindgebruikers)
          bepalen of de bedoelde kwaliteit daadwerkelijk gehaald wordt. In dit
          hoofdstuk vindt u een beschrijving van de prestatie-eisen voor
          kwaliteitsborging, behorend bij het gekozen ambitieprofiel voor uw
          gebouw.
        </Text>
        <Card New={false} data={Kwaliteit[0]} />
      </View>
    </>
  );
};

export default Page4;

const Card = (props) => {
  const { New } = props;
  const { subCategories, category } = props.data;
  return (
    <View break={New} style={styles.card}>
      <Text style={styles.title}>{category}</Text>
      {subCategories.map((subCat, i) => (
        <Item i={i + 1} data={subCat} />
      ))}
    </View>
  );
};

const Item = (props) => {
  const { title, klass, info, exp } = props.data;

  return (
    <View break={props.i == 6 ? true : false} style={styles.item}>
      <View>
        <Text style={styles.itemLabel}>{title}</Text>
        <Text
          style={
            klass == "A"
              ? styles.klassA
              : klass == "B"
              ? styles.klassB
              : klass == "C"
              ? styles.klassC
              : null
          }
        >
          {" "}
          KLASSE {klass} - {klass == "A" ? 'Zeer goed' : klass == "B" ? 'Goed' : klass == "C" ? 'Voldoende' : null}
        </Text>
      </View>
      <View>
        {info.map(inf => {
          if(inf[exp]){
            return (
              <Point>{checkExp(inf, exp)}</Point>
            )
          }
        })}
        {/* {info.map((inf) => inf[exp] && <Point>{checkExp(inf, exp)}</Point>)} */}
      </View>
    </View>
  );
};

const Point = (props) => {
  const { children } = props;
  const reg = new RegExp(`<b>|</b>`, `gi`);
  return (
    <View style={styles.point}>
      <Image src={"/images/darkBlueCircle.png"} style={styles.pointImage} />
      <Text style={styles.pointText}>{children.replace(reg, "")}</Text>
    </View>
  );
};

const checkExp = (inf, exp) => {
  if (inf[exp] == "<i>Gelijk aan klasse A</i>") {
    return inf["text_a"];
  } else if (inf[exp] == "<i>Gelijk aan klasse B</i>") {
    return inf["text_b"];
  } else if (inf[exp] == "<i>Gelijk aan klasse C</i>") {
    return inf["text_c"];
  } else {
    return inf[exp];
  }
};
