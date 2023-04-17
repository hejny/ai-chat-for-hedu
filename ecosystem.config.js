module.exports = {
    apps: [
        {
            name: 'ai-chat-for-hedu',
            exec_mode: 'cluster',
            instances: 1,
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 4466',
            env_local: {
                APP_ENV: 'local', // APP_ENV=local
            },
            env_development: {
                APP_ENV: 'dev', // APP_ENV=dev
            },
            env_production: {
                APP_ENV: 'prod', // APP_ENV=prod
            },
        },
    ],
};
