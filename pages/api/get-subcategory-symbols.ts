import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { symbolC, symbolB, symbolA } = req.query
  try {
    if (!symbolC && !symbolB && !symbolA) {
      return res.status(400).json({ message: '`id` required' })
    }
    // if (typeof parseInt(id.toString()) !== 'number') {
    //   return res.status(400).json({ message: '`id` must be a number' })
    // }
    const resultsA = await query(
        `
      SELECT *
      FROM result_symbol
      WHERE id = ?
    `,
    symbolA
    )

    const resultsB = await query(
          `
        SELECT *
        FROM result_symbol
        WHERE id = ?
      `,
    symbolB
    )

    
    const resultsC = await query(
      `
        SELECT *
        FROM result_symbol
        WHERE id = ?
      `,
      symbolC
    )

    return res.json({resultsA, resultsB, resultsC})
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
