import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader";

export default ({ categories, loader, setLoading }) => {
  if (loader)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <table className="w-100">
      <thead>
        <tr>
          <th style={{ maxWidth: 200 }}>
            <p className="fonth">Deelaspect</p>
          </th>
          <th style={{ maxWidth: 100 }}>
            <p className="fonth" style={{ textAlign: "center" }}>
              Klasse
            </p>
          </th>
          <th
            style={{
              width: 115,
              textAlign: "center",
              paddingTop: "23px",
              paddingLeft: "30px",
            }}
          >
            <p className="fonth">Productiviteit effect</p>
          </th>
          <th
            style={{
              width: 115,
              textAlign: "center",
              paddingTop: "23px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <p className="fonth">Ziekteverzuim effect</p>
          </th>
          <th style={{ maxWidth: 550, width: 500, minWidth: 500 }}>
            <p className="fonth">Opmerking</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((val, index) => {
          const [data, setData] = useState({
            a: "",
            b: "",
            c: "",
          });
          const [prod, setProd] = useState({
            first: "",
            second: "",
            third: "",
          });
          // const [loading, setLoading] = useState(true);
          // const { baseData, isLoading, isError } = useCatgorySymbol(
          //   val?.absent_effect_a_result_symbol_id,
          //   val?.absent_effect_b_result_symbol_id,
          //   val?.absent_effect_c_result_symbol_id
          // );
          // console.log(baseData, "base data");
          // const {} = useCatgorySymbol(val.absent_effect_c_result_symbol_id);
          // const {} = useCatgorySymbol(val.absent_effect_b_result_symbol_id);
          // "absent_effect_a_result_symbol_id"
          // "absent_effect_c_result_symbol_id"
          // "absent_effect_b_result_symbol_id"
          useEffect(() => {
            async function getData() {
              const {
                data: { resultsA, resultsB, resultsC },
              } = await axios.get(
                `/api/get-subcategory-symbols?symbolA=${val.absent_effect_a_result_symbol_id}&symbolB=${val?.absent_effect_b_result_symbol_id}&symbolC=${val?.absent_effect_c_result_symbol_id}`
              );
              setData({
                a: resultsA[0].symbol,
                b: resultsB[0].symbol,
                c: resultsC[0].symbol,
              });

              const { data } = await axios.get(
                `/api/get-subcategory-symbols?symbolA=${val.productivity_effect_a_result_symbol_id}&symbolB=${val.productivity_effect_b_result_symbol_id}&symbolC=${val.productivity_effect_c_result_symbol_id}`
              );
              setProd({
                first: data.resultsA[0].symbol,
                second: data.resultsB[0].symbol,
                third: data.resultsC[0].symbol,
              });
              // setExplanation(response.data);
              setLoading(false);

              index === categories.length - 1 ? setLoading(false) : "";
              return null;
            }

            getData();
          }, []);

          return (
            <tr className="border-bottom " key={index}>
              <td>
                <p className="font-md">{val.name}</p>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <div className="first mt-4">
                    <span>A</span>
                  </div>
                  <div className="second mt-2">
                    <span>B</span>
                  </div>
                  <div className="third mt-2 mb-4">
                    <span>C</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <div>
                    <span className="font-sm">{prod.first}</span>
                  </div>
                  <div>
                    <span className="font-sm">{prod.second}</span>
                  </div>
                  <div>
                    <span className="font-sm">{prod.third}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column justify-content-around align-items-center">
                  <div>
                    <span className="font-sm">{data.a}</span>
                  </div>
                  <div>
                    <span className="font-sm">{data.b}</span>
                  </div>
                  <div>
                    <span className="font-sm">{data.c}</span>
                  </div>
                </div>
              </td>
              <td>
                <p style={{ fontSize: 12 }}>{val.note}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
      <style jsx>{`
        .header-text {
          color: #ed7105;
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
    </table>
  );
};
