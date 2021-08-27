import React from "react";
import { Text, View, StyleSheet, Image, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    // height: "841.5px",
    height: "770px",

    // paddingTop: 35,
    paddingHorizontal: 35,
  },
  image: {
    position: "absolute",
    top: "-150px",
    right: "-210px",
    width: "500px",
    height: "500px",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    marginLeft: "35px",
    marginBottom: "20px",
  },
  title: {
    color: "#ed7105", // orange
    marginBottom: "10px",
    fontSize: 10,
  },
  text: {
    fontSize: 8,
  },
  mainText: {
    marginBottom: "10px",
    fontSize: 8,
  },
  link: {
    color: "#009ee2", //light blue
  },
  disclaimer: {
    width: "280px",
    position: "absolute",
    marginLeft: "35px",
    bottom: 200,
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
  h_30: {
    height: "30px",
  },
  logo: { width: "119px", height: "30px" },
});
const Page6 = () => {
  return (
    <View style={styles.body} break>
      {/* <Image style={styles.image} src={"/images/linedCircle.png"} /> */}
      <View style={styles.disclaimer}>
        <Text style={styles.title}>Disclaimer</Text>
        <Text style={styles.mainText}>
          Dit Programma van Eisen is een ontwikkeling van Platform
          Binnenklimaattechniek. De inhoud van dit PvE is samengesteld op basis
          van de publicatie PvE Gezonde Kantoren 2021. Mocht u onjuistheden
          tegenkomen in tekstpassages of waarden kunt u contact opnemen via{" "}
          <Link style={styles.link}>pvegezondekantoren@tvvl.nl.</Link> Platform
          Binnenklimaattechniek en haar auteurs kunnen niet aansprakelijk worden
          gesteld voor eventuele onjuistheden.
        </Text>
        <Text style={styles.text}>
          Meer informatie over de publicatie en PvE op maat vindt u op
        </Text>
        <Text style={styles.text}>
          <Link style={styles.link}>www.pvegezondekantoren.nl</Link>.
        </Text>
      </View>
      <View style={{ position: "absolute", bottom: "-36.5px" }}>
        <View style={styles.flex}>
          <Image src={"/images/logo.png"} style={styles.logo} />
          <Image src={"/images/logos.png"} style={styles.h_30} />
        </View>
        <View style={styles.pageFooter}>
          <Text style={{ color: "white" }}>www.pvegezondekantoren.nl</Text>
        </View>
      </View>
    </View>
  );
};

export default Page6;
