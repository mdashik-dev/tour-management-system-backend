import dotenv from "dotenv";

dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUNDS: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string,
    EXPRESS_SESSION_SECRET: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUNDS", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", "EXPRESS_SESSION_SECRET"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || "10",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "1h",
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "30d",
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string
    }
}

export const envVars = loadEnvVariables()