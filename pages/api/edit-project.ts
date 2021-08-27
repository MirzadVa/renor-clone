import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
import getProjectId from 'helpers/getProjectId'

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
        Telefoonnummer
     } = req.body.formData
     const { steps, projectId, themas, imageUrl } = req.body
    try {
        const results = await query(`
        update project 
            set
            bedrijf='${Bedrijf}',
            email='${Email}',
            gebouwnaam='${Gebouwnaam}',
            klant="${Klant}",
            naam="${Naam}",
            nummer='${Nummer}',
            plaats='${Plaats}',
            postcode='${Postcode}',
            projectnaam="${Projectnaam}",
            projectnummer='${Projectnummer}',
            straatnaam='${Straatnaam}',
            telefoonnummer='${Telefoonnummer}',
            imageURL='${imageUrl}',
            category='${escape(JSON.stringify(steps))}',
            themas='${escape(JSON.stringify(themas))}'
            where 
            id=${projectId}
      `,)
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler