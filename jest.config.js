module.exports =  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ["./src"],
    setupFilesAfterEnv: ['./src/test/setup.ts']
}