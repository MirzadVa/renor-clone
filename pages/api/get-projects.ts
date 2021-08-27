import {NextApiHandler} from 'next'
import {query} from '../../lib/db'
import Enumerable from "linq";

const handler: NextApiHandler = async (req, res) => {
    const { 
        userId,
     } = req.query
    try {
        const categories = await query(`
        select *
        from project
        WHERE  user_id=${userId}
    `)
    return res.json(categories)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

export default handler
