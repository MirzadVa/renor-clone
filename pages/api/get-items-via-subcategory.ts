import { NextApiHandler } from "next"
import { query } from "../../lib/db"

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  // console.log(id, "in handle ==>")
  try {
    if (!id) {
      return res.status(400).json({ message: "`id` required" })
    }
    if (typeof parseInt(id.toString()) !== "number") {
      return res.status(400).json({ message: "`id` must be a number" })
    }
    const results = await query(
      `
      SELECT *
      FROM item
      WHERE subcategory_id = ?
    `,
      id
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
