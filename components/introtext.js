import H2 from "./elements/h2"
import P from "./elements/p"
import { Accordion, AccordionContext, Button, Card, useAccordionToggle } from "react-bootstrap"
import { useBaseData } from "../lib/swr-hooks"
import { useContext } from "react"
import { FaChevronDown, FaChevronRight } from "react-icons/fa"
import Image from "next/image"

export default function IntroText() {
  return (
    <div className={"intro-text-wrapper"}>
      <div>
        <h1 className={"orange-text"}>Programma van Eisen</h1>
        <h1 className={"orange-text"}>Gezonde Kantoren 2021</h1>
        <div className={"text-wrapper"}>
          <p>
          Welkom bij de webapplicatie van PvE Gezonde Kantoren 2021: Pve op maat. PvE op maat is onderdeel van de publicatie PvE Gezonde Kantoren 2021, een gezamenlijke uitgave van het Platform Gezond Binnenklimaat.
          </p>
          <p>
          Deze webapplicatie biedt u de mogelijkheid om een maatwerk PvE op te stellen op basis van de eisen uit de publicatie. In dit PvE kiest u per deelaspect het gewenste ambitieniveau op basis van de behoefte en mogelijkheden voor uw gebouw. Zo ontstaat er een maatwerk PvE, specifiek gericht op uw gebouw.
          </p>
          <p>Log in met uw TVVL Connect account om direct naar de webapplicatie te gaan.</p>
        </div>
        <p>
          <b>Mede mogelijk gemaakt door:</b>
        </p>

        <div
          style={{
            marginBottom: "40pt",
          }}
        >
          <Image src={"/logos.png"} width='366' height='58' unoptimized={true} />
        </div>
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
  )
}
