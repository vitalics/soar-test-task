---
name: home page fetch all users
severity: high
likelihood: high
impacted: all users
visibility: internal teams
risk score: 9
---

# Description

When we call `/` endpoint - backend perform `select * from users` table.

# Steps to reproduce

1. Call `<baseURL>`

# Why this is an issue?

select will be slow for big amount of user count in DB.
That means we wait until all users will be selected from DB and only after that we return a response.
