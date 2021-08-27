import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body, "request body")
    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: '`email` and `password` are both required' })
        }

        const results = await query(
            'SELECT * from user where `name` = ? , `client_name` = ?',
            [filter.clean(email), filter.clean(password)]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
