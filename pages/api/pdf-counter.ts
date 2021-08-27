import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { projectId, userId } = req.body
    try {
        const results = await query(
            `
            INSERT INTO generated_pdf (project_id,user_id)
            VALUES (${projectId},${userId})
      `,)
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
