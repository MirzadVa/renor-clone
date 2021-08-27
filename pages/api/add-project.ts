import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { 
        Bedrijf, 
        Email, 
        Gebouwnaam,
        Klant,
        Naam,
        Nummer, 
        Plaats,
        Postcode,
        Projectnaam,
        Projectnummer,
        Straatnaam,
        Telefoonnummer,
     } = req.body.formData
     const { steps, userId, imageUrl } = req.body
     //const { userId } = req.query
    try {
        const results = await query(`
            INSERT INTO project(
                bedrijf, 
                email, 
                gebouwnaam,
                klant,
                naam,
                nummer,
                plaats,
                postcode,
                projectnaam, 
                projectnummer,
                straatnaam,
                telefoonnummer,
                user_id,
                locked,
                imageURL,
                category)
            VALUES (
                "${Bedrijf}",
                "${Email}",
                "${Gebouwnaam}",
                "${Klant}",
                "${Naam}",
                "${Nummer}",
                "${Plaats}",
                "${Postcode}",
                "${Projectnaam}",
                "${Projectnummer}",
                "${Straatnaam}",
                "${Telefoonnummer}",
                ${userId},
                ${false},
                "${imageUrl}",
                "${escape(JSON.stringify(steps))}");
      `,)
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
