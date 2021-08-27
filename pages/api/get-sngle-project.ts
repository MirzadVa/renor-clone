import {NextApiHandler} from 'next'
import {query} from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query
    try {
        const project = await query(`
        select *
        from project
        WHERE  id=${id}
    `)
    return res.json(project)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

export default handler
