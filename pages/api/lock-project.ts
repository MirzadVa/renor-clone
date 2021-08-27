import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
     const { projectId, locked } = req.body
    try {
        const results = await query(`
        update project 
            set
            locked=${locked}
            where 
            id=${projectId}
      `,)
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler