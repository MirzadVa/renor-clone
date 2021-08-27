import H2 from "./elements/h2";
import P from "./elements/p";
import { Accordion, AccordionContext, Button, Card, useAccordionToggle } from "react-bootstrap";
import { useBaseData } from "../lib/swr-hooks";
import { useContext } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

export default function IntroPve() {
  return (
    <div className={"intro-text-wrapper"}>
      <div>
        <h1 className={"orange-text"}>Programma van Eisen</h1>
        <h1 className={"orange-text"}>Gezonde Kantoren 2021</h1>
        <div className={"text-wrapper"}>
          <h2 className={"blue-text mt-5"}>
            Welkom bij de webapplicatie
            <br />
            PvE Gezonde Kantoren op maat.
          </h2>

          <p className='mt-4'>Het startpunt om een programma van eisen op te stellen voor het binnenmilieu, specifiek voor uw gebouw.</p>
          <p>
            {" "}
            Vanaf deze pagina kunt u direct aan de slag gaan met het maken van een nieuw PvE, dit doet u via de knop Maak een nieuw PvE. Heeft u al eerdere PvE’s gemaakt? 
            Dan kunt u deze hiernaast terugvinden onder Mijn PvE’s. Hier kunt u het PvE inzien, bewerken en downloaden als volledig PDF bestand.
          </p>
        </div>
        {/* <p>
          <b>Uitleg:</b>
        </p>

        <div
          style={{
            marginBottom: "40pt",
          }}>
          <Image src={"/logos.png"} width='366' height='58' unoptimized={true} />
        </div> */}

        <h3 className={"text-padding font-weight-bold"} style={{ color: "#272C63" }}>
          Uitleg
        </h3>
      </div>

      <style jsx>{`
        p {
          font-family: "PT Sans";
          font-size: 16px;
        }

        .text-wrapper {
          margin-top: 20pt;
          margin-bottom: 20pt;
        }
      `}</style>
    </div>
  );
}
