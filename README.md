# Employee Management System

> **⚠️ Archived demo repo.** This project is a basic demo/learning project and is no longer maintained. It is archived and kept here for reference only — expect no updates, fixes, or support.

A simple full-stack employee management application with a .NET Web API backend and an Angular frontend.

## Tech Stack

**Backend — `EMSAPI`**
- .NET 5 Web API
- Entity Framework Core (SQL Server + In-Memory providers)
- Swagger / Swashbuckle for API docs
- Basic login and employee CRUD controllers

**Backend Tests — `EMSAPI.test`**
- Unit tests for the API controllers

**Frontend — `EmployeeApp`**
- Angular 13
- Bootstrap 5
- Angular DataTables
- Login and employee dashboard views

## Project Structure

```
EmployeeManagement/
├── EMSAPI/           # .NET Web API (controllers, models, migrations)
├── EMSAPI.test/      # Unit tests for the API
├── EmployeeApp/       # Angular frontend
└── EMSAPI.sln         # Visual Studio solution file
```

## Notes

This was built as a demo project to practice a basic CRUD flow (login + employee management) across a .NET backend and an Angular frontend. It is not production-ready and is not actively developed.
