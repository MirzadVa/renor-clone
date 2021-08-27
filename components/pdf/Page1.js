import React from "react";

import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    // height: "841.5px",
    height: "770px",
    // backgroundColor: "yellow",
    // paddingTop: 35,
    paddingHorizontal: 35,
  },
  header: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 30,
  },
  title1: {
    fontSize: 22,
    color: "#272c63",
    // fontWeight: 700,
    fontFamily: "OpenSans",
    fontWeight: 700,
  },

  title2: {
    marginTop: "35px",
    fontSize: 25,
    color: "#009ee2",
    fontWeight: 700,
    fontFamily: "OpenSans",
  },
  description1: {
    fontSize: 17,
    color: "#ed7105",
    fontWeight: 600,
    fontFamily: "OpenSans",
  },
  label: {
    color: "#ed7105",
    fontSize: 8,
  },
  text: {
    color: "#272c63",
    fontSize: 12,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: "8px",
  },
  cell: {
    width: "130px",
  },
  subtitle: {
    color: "#272c63",
    fontSize: 12,
    marginTop: "15px",
  },
  image: {
    width: "231px",
    height: "153px",
    marginTop: "15px",
    marginRight: "20px",
  },
  bottomImages: {
    width: "252px",
    height: "40px",
    marginLeft: "35px",
    marginBottom: "10px",
  },

  flex: {
    display: "flex",
    flexDirection: "row",
  },
  LinedCircle: {
    position: "absolute",
    bottom: "-150px",
    right: "-210px",
    width: "500px",
    height: "500px",
  },
  pageFooter: {
    backgroundColor: "#272c63",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    // position: "fixed",
    // bottom: 0,
    width: "100vw",
    // right: "35px",
  },
  h_40: {
    height: "40px"
  },
});

const Page1 = (props) => {
  const { withImage, files, today } = props;
  const { Projectnaam, Projectnummer } = props.data;
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Image src={"/images/logo.png"} style={styles.h_40} />
      </View>
      <Image style={styles.LinedCircle} src={"/images/linedCircle.png"} />
      <Text style={styles.title1}>PvE op maat</Text>

      <Text style={styles.description1}>
        Programma van Eisen Gezonde kantoren
      </Text>
      <Text style={styles.title2}>{Projectnaam}</Text>
      <Text style={{ color: "#272c63", fontSize: 12 }}>{Projectnummer}</Text>
      <View style={styles.flex}>
        {files !== "" && files && <Image src={files} style={styles.image} />}
        <Table data={props.data} />
      </View>

      <View style={{ marginTop: "50px" }}>
        <Text style={styles.label}>Rapportagedatum</Text>
        <Text style={styles.text}>{today}</Text>
      </View>
      <View style={{ position: "absolute", bottom: "-36.5px" }}>
        <Image src={"/images/logos.png"} style={styles.bottomImages} />
        <View style={styles.pageFooter}>
          <Text style={{ color: "white", fontSize: 11, fontWeight: 300 }}>
            www.pvegezondekantoren.nl
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Page1;

const Table = (props) => {
  const {
    Klant,
    Gebouwnaam,
    Straatnaam,
    Nummer,
    Postcode,
    Plaats,
    Naam,
    Bedrijf,
    Email,
    Telefoonnummer,
  } = props.data;
  return (
    <View>
      <Text style={styles.subtitle}>Object</Text>

      <View style={styles.tableRow}>
        <View style={styles.cell}>
          <Text style={styles.label}>Klant</Text>
          <Text style={styles.text}>{Klant ? Klant : "-"}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Gebouwnaam</Text>
          <Text style={styles.text}>{Gebouwnaam ? Gebouwnaam : "-"}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.cell}>
          <Text style={styles.label}>Straatnaam</Text>
          <Text style={styles.text}>{Straatnaam ? Straatnaam : "-"}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Nummer</Text>
          <Text style={styles.text}>{Nummer ? Nummer : "-"}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.cell}>
          <Text style={styles.label}>Postcode</Text>
          <Text style={styles.text}>{Postcode ? Postcode : "-"}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Plaats</Text>
          <Text style={styles.text}>{Plaats ? Plaats : "-"}</Text>
        </View>
      </View>

      {/*  */}
      <Text style={styles.subtitle}>Opgesteld door</Text>

      <View style={styles.tableRow}>
        <View style={styles.cell}>
          <Text style={styles.label}>Naam</Text>
          <Text style={styles.text}>{Naam ? Naam : "-"}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Bedrijf</Text>
          <Text style={styles.text}>{Bedrijf ? Bedrijf : "-"}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.cell}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.text}>{Email ? Email : "-"}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>Telefoonnummer</Text>
          <Text style={styles.text}>
            {Telefoonnummer ? Telefoonnummer : "-"}
          </Text>
        </View>
      </View>
    </View>
  );
};
