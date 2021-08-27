import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    const { name, client_name } = req.body
    console.log(req.body, "request body")
    try {
        if (!name || !client_name) {
            return res
                .status(400)
                .json({ message: '`name` and `client_name` are both required' })
        }

        const results = await query(
            `
      INSERT INTO user (name, client_name)
      VALUES (?, ?)
      `,
            [filter.clean(name), filter.clean(client_name)]
        )

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
