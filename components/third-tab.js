import React, { useState, useEffect } from "react";
import axios from "axios";
import TabTable from "./tab-table";

function ThirdTab() {
  const [value, setValue] = useState();
  const [id, setID] = useState("1");
  const [loader, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getApiData() {
      setLoading(true);
      const response = await axios.get(
        `/api/get-subcategories-via-category?id=${id}`
      );
      const data = await response.data;
      setLoading(false);
      setCategories(data);

      return null;
    }

    getApiData();
  }, [id]);

  const handleChange = (value) => {
    setCategories([]);
    setValue(value);
    setID(value);
  };

  return (
    <div>
      <h4 className="header-text">
        Relatie Binnenmilieu-eis met productiviteit & ziekteverzuim
      </h4>
      <p style={{ paddingRight: 80 }}>
      In onderstaande tabel is weergegeven welke effect het kiezen voor klasse B of A niveau heeft op de productiviteit en het ziekteverzuim van de kantoor- werkers. Het klasse C effect is hierbij op 0 gesteld (= referentieniveau). Indien sprake is van een beperkt positief effect dan is dit aangegeven met ‘+’’; is sprake van een meer significant positief effect dan is dit aangegeven met ‘++’.
      </p>
      <p style={{ paddingRight: 80 }}>
      In de laatste kolom is hier en daar verwezen naar een referentiedocument waarin meer kwalitatief ingegaan wordt op de effecten. Bedoeld wordt daar het document ‘Kentallen binnenmilieu & productiviteit’ dat door BBA Binnenmilieu in 2015 in opdracht van Platform 31 / Kantoor vol Energie is opgesteld.
      </p>
      <p style={{ paddingRight: 80 }}>
      Daar waar gewerkt wordt met een plusteken dat tussen haakjes staat (‘(+)’) geldt dat sprake is van een inschatting door de auteurs van dit document (expert judgement insteek) en dus niet van een wetenschappelijk bewezen effect.
      </p>
      <div className="d-flex my-5 align-items-center">
        <div>
          <h4 className={"category-result-title"}>
            Bekijk de resultaten per thema
          </h4>
        </div>
        <select
          className="ml-5 custom-selects  px-2 select-options-1"
          value={value}
          onChange={(e) => handleChange(+e.target.value)}
        >
          <option className="select-options-1 " value="1">
            {" "}
            1 Lucht
          </option>
          <option className="select-options-1" value="2">
            {" "}
            2 Klimaat
          </option>
          <option className="select-options-1" value="3">
            {" "}
            3 Licht
          </option>
          <option className="select-options-1" value="4">
            {" "}
            4 Geluid
          </option>
          {/* <option className='select-options-1' value='5'>
            {" "}
            5 Kwaletiet
          </option> */}
        </select>
      </div>
      <div style={{ height: 500, width: "100%", overflowY: "auto" }}>
        <TabTable
          categories={categories}
          loader={loader}
          setLoading={setLoading}
        />
      </div>
      <style jsx>{`
        .header-text {
          color: purple;
          font-weight: bolder;
        }
        .custom-selects{
          width: 230px;
          background-color: #F0F0F0;
          color: #272C63;
          font-size: 24px;
          font-weight: bolder;
          padding: 10px !important;
          border: 0px;
          border: 0px;
        }
        .custom-selects:focus{
          border: 0px;
        }
        .custom-selects:active{
          border: 0px;
        }
        .custom-selects:hover{
          border: 0px;
        }
        .select-options-1{
          color: #272C63;
          font-size: 22px;
          font-weight: 600;
          padding: 10px !important;
          border: 0px;
        }
        .select-options-1:after{
          content: "1"
          color: #ffffff;
          background-color: #272C63;
          height: 20px;
          width: 20px;
          display: inline-block;
        }
        .select-options:focus .custom-selects{
          border: 0px;
        }
        .category-result-title{
          color: #272C63;
          font-weight: bold;
        }
        .first{
          background-color: #00A651;
          width: 20px;
          height: 20px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .second{
          background-color: #8CC63F;
          width: 20px;
          height: 20px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .third{
          background-color: #FFD500;
          width: 20px;
          height: 20px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .fonth{
          font-size: 14px;
          color: #4FBDE9;
          font-weight: 600;
        }
        .font-sm{
          font-size: 13px;
        }
        .font-md{
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}

export default ThirdTab;
