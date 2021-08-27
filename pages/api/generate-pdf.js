// import { NextApiHandler } from 'next'
import { query } from "../../lib/db";

const handler = async (req, res) => {
  try {
    let { stepForm, categoryAns } = req.query;
    stepForm = JSON.parse(stepForm);
    let categoriesName = Object.keys(stepForm);
    let categoryDefAns = JSON.parse(categoryAns);

    // console.log("stepForm is , ", stepForm);

    // console.log("categories are, ", categoriesName);
    let subcategories = await query(
      `
    SELECT id,category_id,name
    FROM subcategory
    WHERE category_id IN (1,2,3,4,5);
  `
    );
    // let subcategories : any= await query(
    //     `
    //   SELECT id,category_id,name
    //   FROM subcategory
    //   WHERE category_id IN (1,2,3,4,5);
    // `
    // )
    subcategories = JSON.parse(JSON.stringify(subcategories));

    let explanations = await query(
      `
      SELECT *
      FROM explanation
      WHERE subcategory_id IN (${subcategories
        .map((subCat) => subCat.id)
        .join(",")})
    `
    );

    explanations = JSON.parse(JSON.stringify(explanations));

    let foramttedData = [];
    categoriesName.map((key, index) => {
      const id = index + 1;
      // console.log(key, index + 1);
      subcategories.filter((subCat) => subCat.category_id == id);
      foramttedData.push({
        categoryId: id,
        categoryType: key,
        subCategories: subcategories.filter(
          (subCat) => subCat.category_id == id
        ),
      });
    });

    foramttedData.map((cat) => {
      cat.subCategories.map((subCat) => {
        const res = stepForm[cat.categoryType].filter(
          (val) => val.subID === subCat.id
        );
        const exp = res[0]?.exp
          ? res[0]?.exp
          : getType(categoryDefAns[cat.categoryType]);
        const ans = res[0]?.ans
          ? res[0]?.ans
          : categoryDefAns[cat.categoryType];
        subCat.ans = ans;
        subCat.exp = exp;
      });
    });

    foramttedData.map((cat) => {
      console.log(cat.categoryType, cat.subCategories);
      let info = [];
      cat.subCategories.map((subCat) => {
        info = explanations.filter((ex) => ex.subcategory_id == subCat.id);
        subCat.info = info;
      });
      // cat.subCategories.push( info);
    });
    // console.log("explanations are, ", explanations);
    // console.log(foramttedData);
    foramttedData.map((data) => {
      console.log(data.categoryType);
      data.subCategories.map((d) => {
        console.log(d.name, d.info, d.ans, d.exp);
      });
    });
    // categories.map((cat)=>{

    //     const result = stepForm[cat].filter((val) => val.subID === subcategory.id)
    //     const exp = result[0]?.exp ? result[0]?.exp : getType(categoryDefAns[cat])
    //     const ans = result[0]?.ans ? result[0]?.ans : categoryDefAns[cat]
    // })

    // const res = stepForm[props.type].filter((val) => val.subID === subcategory.id)
    // const exp = res[0]?.exp ? res[0]?.exp : getType(categoryAns[props.type])
    // const ans = res[0]?.ans ? res[0]?.ans : categoryAns[props.type]
    return res.json(foramttedData);
  } catch (e) {
    console.log("error is, ", e);
  }
};

export default handler;
const getType = (val) => {
  switch (val) {
    case "A":
      return "text_a";
    case "B":
      return "text_b";
    case "C":
      return "text_c";
  }
};
