# Smart Leads Dashboard API

## Base URL

```txt
http://localhost:5000/api
```

---

# Authentication

## Register

POST `/auth/register`

### Body

```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

---

## Login

POST `/auth/login`

### Body

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

# Leads

## Get Leads

GET `/leads`

### Query Params

- page
- status
- source
- search
- sort

Example:

```txt
/leads?page=1&status=Qualified&source=Instagram&search=rahul&sort=latest
```

---

## Create Lead

POST `/leads`

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "status": "Qualified",
  "source": "Instagram"
}
```

---

## Update Lead

PUT `/leads/:id`

---

## Delete Lead

DELETE `/leads/:id`

Admin only.