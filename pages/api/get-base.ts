import {NextApiHandler} from 'next'
import {query} from '../../lib/db'
import Enumerable from "linq";

/**
 * Loads base data for frontend
 * Categories including their subcategories and relative info
 */
const handler: NextApiHandler = async (_, res) => {
    try {
        //todo: use join then map when final db is ready
        //load data from db
        const categories = await query(`
      SELECT * FROM category
    `)
        const subcategories = await query(`
      SELECT * FROM subcategory
    `)

        //map data to js object (use join later then map)
        let grouped = Enumerable.from(categories).toArray().map(function (category) {
            // @ts-ignore as object data exists in db
            category["subcategories"] = Enumerable.from(subcategories).where((element, index) => element.category_id = category.id).toArray();
            return category;
        })

        return res.json(grouped)
    } catch (e) {
        //return an error if invalid request
        res.status(500).json({message: e.message})
    }
}

export default handler
