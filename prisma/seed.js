const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt')
const dbClient = require("../src/utils/dbClient");

const prisma = new PrismaClient

async function seed() {
    const user = await createUser(
        'testuser@test.com',
        'Password1!',
        'user1',
        'USER',
        'Jack'
    )

    const admin = await createUser(
        'testadmin@test.com',
        'Password1!',
        'admin1',
        'ADMIN',
        'Nance'
    )
    process.exit(0)
}

async function createUser(
    email,
    password,
    username,
    role = 'USER',
    firstName,
) {
    const user = await dbClient.user.create({
        data: {
            email,
            passwordHash: await bcrypt.hash(password, 8),
            username,
            role,
            profile: {
                create: {
                    name: firstName
                }
            }
        },
        include: {
            profile: true
        }
    })

    console.log(user)
    return user
}

seed().catch(async (e) => {
    console.log(e)
    await dbClient.$disconnect()
    process.exit(1)
})

module.exports = seed