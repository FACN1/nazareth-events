# Nazareth Events

An app for seeing events on in Nazareth.
The initial [prototype](http://nav-events.herokuapp.com/nav)

### Outline
The site will have 2 basic users (and 2 separate branches):
1) Someone looking for events
    - home(/list) page displays a list of all events starting on today
    - a calendar view would allow the user to select the date from which the calendar view would start
    - clicking on an event shows a detail page for an event
    - clicking on a venue would show the profile page for a venue
  
2) Someone/some venue hosting an event
    - requires a login
    - a profile page, with ability to edit
    - a 'my events' page
    - a form to add a new event (ability to add recurring events is important)

### Stretch extensions
- lots more venues (e.g. restaurants, those without events) would have a profile page
- profile pages could have multiple pictures
- users would choose between calendar of events and list of venues
- map view of venues/events

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
