import React from "react";
import { Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 35,
    // backgroundColor: "pink",
    height: "770px",
  },
  card: { width: "250px", marginTop: "40px" },
  card2: {
    width: "250px",
    marginTop: "23px",
  },
  title: {
    color: "white",
    backgroundColor: "#272c63",
    fontSize: 10,
    // height: "18px",
    padding: "2px",
    paddingLeft: "5px",
    fontWeight: 600,
    fontFamily: "OpenSans",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
    paddingBottom: "10px",
    borderBottom: "1px solid grey",
  },
  itemLabel: {
    color: "#272c63",
    fontSize: 8,
    fontWeight: 600,
    fontFamily: "OpenSans",
  },
  // dark green A #008001 , yellow c #fed500
  klassA: {
    backgroundColor: "#008001", //darkgreen
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
  },
  klassB: {
    backgroundColor: "#8CC63F", //lightgreen
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
  },
  klassC: {
    backgroundColor: "#fed500", //lightgreen
    color: "white",
    fontSize: 7,
    width: "90px",
    padding: "3px",
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Card = (props) => {
  const { subCategories, category } = props.data;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{category}</Text>
      {subCategories.map((subCat) => (
        <Item data={subCat} />
      ))}
    </View>
  );
};

const Item = (props) => {
  const { title, klass } = props.data;
  return (
    <View style={styles.item}>
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
  );
};

const Page3 = (props) => {
  const { format, data } = props;
  // console.log(data);
  const Lucht = data.filter((d) => d.category == "Lucht");
  const Kwaliteit = data.filter((d) => d.category == "Kwaliteit");
  const Klimaat = data.filter((d) => d.category == "Klimaat");
  const Licht = data.filter((d) => d.category == "Licht");
  const Geluid = data.filter((d) => d.category == "Geluid");
  return (
    <View style={styles.body} break={true}>
      <Text style={format.heading}>2. Samenvatting</Text>
      <Text style={format.headingText}>
        Op deze pagina vindt u een overzicht van alle eisen voor uw gebouw.
        Iedere eis is voorzien van een ambitieniveau: Klasse A, B of C. In het
        navolgende hoofdstuk vindt u voor iedere eis een beschrijving van de
        specifieke prestatie-eisen behorend bij het gekozen ambitieniveau.
      </Text>
      <View style={styles.columns}>
        <View>
          <Card data={Lucht[0]} />
          <Card data={Kwaliteit[0]} />
        </View>

        <View>
          <Card data={Klimaat[0]} />
          <Card data={Licht[0]} />
          <Card data={Geluid[0]} />
        </View>
      </View>
    </View>
  );
};

export default Page3;
