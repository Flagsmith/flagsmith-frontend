module.exports = ({NPM_NODE_CLIENT,URL_CLIENT}) => {
    return `// Package Manager
PM> Install-Package BulletTrain -Version 1.0.0

// .NET CLI
dotnet add package BulletTrain --version 1.0.0

// Paket CLI
paket add BulletTrain --version 1.0.0
`
}
