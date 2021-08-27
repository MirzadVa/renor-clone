import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  try {
    const { scoreClass, subcategoryID } = req.query;
    const results = await query(`
    SELECT well_score${scoreClass}, breeam_score${scoreClass}
    FROM subcategory
    WHERE id = ${subcategoryID};
  `)
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
