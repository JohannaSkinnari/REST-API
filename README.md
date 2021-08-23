# REST-API

## Beskrivning av projektet
Jag använde bok som resurs.
Projektet består av en Public mapp som innehåller klient sidans kod med html, css, javascript och bild.
Det finns bara en html sida som via javascript rendertar ut lista på böckerna, en bok eller ett formulär för att ändra på en bok.
sidan har också en from för att skapa och spara en bok.
Server delen består av server.js, book.router.js och book.controller.js.  
Det finns även en bookDB.json fil som är istället för en databas.
Det finns 5 endpoints. 
GET för att få alla böcker.
GET för att få en specifik bok.
POST för att lägga in en skapad bok.
PUT för att ändra på en bok
DELETE för att ta bort en bok.
Det finns även en fil server.rest för att kunna nå endpointen från REST Client.

## Uppfyllda krav
Alla.

## Hur projektet körs.
Starta klientsidan med Live Server.
Starta servern med komandot *npm start* i teminalen.
Kan välja att testa endpointsen genom webbsidan eller via server.rest.
