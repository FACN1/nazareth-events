# Nazareth Events

An app for seeing events on in Nazareth.

### Outline
The site will have 2 basic users (and 2 separate branches):
1) Someone looking for events
    - home(/list) page displays a list of all events starting on today
    - a calendar view would allow the user to select the date from which the calendar view would start
    - clicking on an event shows a detail page for an event
  
2) Someone/some venue hosting an event
    - requires a login
    - a profile page, with ability to edit
    - a form to add a new event

### File Structure
```
database/
    db_connection.js
    db_build.js
    db_build.sql
public/
    css/
        style.css
src/
    server.js
    start.js
tests/
    test.js
views/
    layouts/
        main.hbs
    home.hbs
    organisations_login.hbs
```
