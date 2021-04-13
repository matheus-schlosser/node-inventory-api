import * as dotenv from "dotenv";

dotenv.config();

function withGlobals(config: any) {
    return {
        ...config,
        JWT_SECRET: process.env.JWT_SECRET
    }
}


const environments: any = {
    local: {
        DATABASE: {
            HOST: process.env.MYSQL_HOST,
            USERNAME: process.env.MYSQL_USERNAME,
            PASSWORD: process.env.MYSQL_PASSWORD,
            DATABASE: process.env.MYSQL_DATABASE,
            DIALECT: "mysql",
            PORT: "3306",
            DEBUG: (process.env.MYSQL_DEBUG === "true" || process.env.MYSQL_DEBUG === "TRUE") ? console.log : false,
        }
    },
    test: {
        DATABASE: {
            HOST: process.env.MYSQL_HOST,
            USERNAME: process.env.MYSQL_USERNAME,
            PASSWORD: process.env.MYSQL_PASSWORD,
            DATABASE: process.env.MYSQL_DATABASE,
            DIALECT: "mysql",
            PORT: "3306",
            DEBUG: (process.env.MYSQL_DEBUG === "true" || process.env.MYSQL_DEBUG === "TRUE") ? console.log : false,
        }
    }
};

const env = environments[process.env.NODE_ENV as string] as any;

if (!env) {
    throw new Error('Could not load as settings (environment.ts)')
}

export const environment = withGlobals(env);

export const environmentBy = (envName: string): any => {
    const envs: any = environments;
    const env = envs[envName];
    if (!env) {
        throw new Error('Could not load as settings (environment.ts)')
    }

    return withGlobals(env)
};

