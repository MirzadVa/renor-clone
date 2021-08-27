import mysql from "serverless-mysql"

const db = mysql({
    config: {
        host: '149.210.150.172',
        database:'wizard',
        user: 'wizz',
        password: 'k@Bcwkv8YD&Ct709'
    }
})

// db.connect()

// export const db = mysql({
//     config: {
//         host: process.env.MYSQL_HOST,
//         database: process.env.MYSQL_DATABASE,
//         user: process.env.MYSQL_USERNAME,
//         password: process.env.MYSQL_PASSWORD,
//     },
// })

export async function query(
    q: string,
    values: (string | number)[] | string | number = []
) {
    try {
        // console.log(q, values, "query goes here ====>")
        const results = await db.query(q, values)
        await db.end()
        // console.log(results, "results goes here ====>")
        return results
    } catch (e) {
        throw Error(e.message)
    }
}
