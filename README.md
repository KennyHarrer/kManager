# kManager

This app is
- Not meant to scale.
- Probably not secure.
- Open source so you can make it secure.
- Free.

## Goal

Make a small, one way encrypted password storage solution so I can stop storing my passwords in plain text documents.

I want this project to:
- store passwords, credit cards, and other personal information for auto filling
- auto fill info on ios when prompted 
- auto fill info on chrome when prompted
- do the aforementioned securely (to the best of my knowlege)
- generate passwords
- generate temp emails (either using public services ex. temp-mail.us, or with private servers ex. ${generatedRandomly}@your.domain)

## Design

I am using nodejs's native crypto library and crypto-js to encrypt the master key, authenticate the master key using challenge-response authentication (upon sign up the plain text master key is never sent to the server again), and ecrypt passwords and other information.