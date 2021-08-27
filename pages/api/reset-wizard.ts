import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
import getProjectId from 'helpers/getProjectId'

const handler: NextApiHandler = async (req, res) => {
    const { projectId } = req.body
    try {
        const results = await query(`
        update project 
            set
            bedrijf="",
            email="",
            gebouwnaam="",
            nummer="",
            plaats="",
            postcode="",
            straatnaam="",
            telefoonnummer="",
            imageURL="",
            category="",
            themas=""
            where 
            id=${projectId}
      `,)
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler