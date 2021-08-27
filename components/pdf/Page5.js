import React from "react";
import { Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";
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
    fontWeight: "600",
    fontFamily: "OpenSans",
  },

  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "3px",
    marginBottom: "15px",
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
  notes: {
    backgroundColor: "#E9F0F5",
    height: "70px",
    width: "350px",
  },
});

const Page5 = (props) => {
  const { format, data } = props;

  const Lucht = data.filter((d) => d.category == "Lucht");
  const Kwaliteit = data.filter((d) => d.category == "Kwaliteit");
  const Klimaat = data.filter((d) => d.category == "Klimaat");
  const Licht = data.filter((d) => d.category == "Licht");
  const Geluid = data.filter((d) => d.category == "Geluid");

  console.log("LUCT", Lucht)

  const dummyLutch = [
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
  ];
  const dummyKlimaat = [
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
    {
      label: "CO2 concentratie & Luchtverversing",
      klass: "KLASSE B -GOED",
    },
  ];
  return (
    <View style={styles.body} break>
      <Text style={format.heading}>5. Opmerkingen</Text>
      <Text style={format.headingText}>
        Op deze pagina kunt u eventuele opmerkingen, aanwijzingen of afwijkingen
        beschrijven, die specifiek voor uw project van toepassing zijn.
      </Text>
      <Card New={false} data={Lucht[0]} breakPoint={7} />
      <Card New={false} data={Klimaat[0]} breakPoint={4} />
      <Card New={false} data={Licht[0]} breakPoint={4} />
      <Card New={false} data={Geluid[0]} breakPoint={3} />
      <Card New={false} data={Kwaliteit[0]} breakPoint={4} />
    </View>
  );
};

export default Page5;

const Card = (props) => {
  const { title, items, New, breakPoint } = props;
  const { subCategories, category } = props.data;
  console.log('DATA, DATA', props.data)
  return (
    <View break={New} style={styles.card}>
      <Text style={styles.title}>{category}</Text>
      {subCategories.map((subCat, i) => (
        <Item i={i} data={subCat} breakPoint={breakPoint} />
      ))}
    </View>
  );
};

const Item = (props) => {
  const { title, klass } = props.data;
  const { i, breakPoint } = props;

  return (
    <View
      break={i == breakPoint || i == breakPoint + 1 ? true : false}
      style={styles.item}
    >
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
      <View style={styles.notes}></View>
    </View>
  );
};
//break={i == breakPoint ? true : false}
