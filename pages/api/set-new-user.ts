import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
const { 
        email,
        token
     } = req.body
    try {
        const results = await query(`
        INSERT INTO wizard.user (email, token) VALUES ("${email}", "${token}")`)
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
