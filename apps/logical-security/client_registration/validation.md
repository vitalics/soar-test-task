---
name: missing required validation for "email", "password", "phone" fields
severity: high
likelihood: high
impacted: all users
visibility: all users
risk score: 9
---

# Description

When we call `/client_registration` endpoint with any fields we check fields only by empty criteria

# Steps to reproduce

1. Call `POST <baseURL>/client_registration`

# Why this is an issue?

Validation is an essential for apps, since we can pass any evil string and perform SQL injection.
E.g. (`''+SUBSTRING(@@version,1,10)`).
That means following SQL query will execute:

```sql
INSERT INTO users (
fullName,
userName,
email,
password,
phone,
privillage) VALUES('qwe', 'qwe', 'qwe', 'qwe',''+SUBSTRING(@@version,1,10), 2);
```
