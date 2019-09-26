# Inlämingsuppgift

**För godkänt:** 
- [x] Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
- [x] Låt användaren bestämma hur många frågor som ska visas.
    - Insamligen av data börjar på rad 140 i main.js
- [x] Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
  - Klassen finns i Quiz.js filen
- [x] Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. (Hur kan vi lösa det?)
  - Klassen finns i Question.js filen
- [x] Lämna in projektet som ett git-repo.
  - Har två brancher, en "Development" och en "master"

**För Väl Godkänt:**
- [x] VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
  - Arrays är egentligen object. Eftersom DOM-objektet innehåller en array som jag loopar igenom direkt så hoppas jag att det uppfyller kravet. (Ta bort kommenteren på rad 59 i filen Quiz.js för att se innehållet av DOMForm).
- [x] VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
  - Rad 108 i Quiz.js filen gör det möjligt att visa en fråga i taget.
- [x] VG: Responsiv design
  - Är inte mycket, men den är responsiv! 😄 Formen på sidan ändras beroende på storleken på skärmen samt texten anpassas till storleken av skärmen med hjälp av em.

## Vad du behöver visa för att uppfylla kraven:

**För Godkänd ska den studerande kunna:**
- Utifrån en given problemställning kunna välja och skapa olika typer av relevanta porogrammeringslösningar i JavaScript
- Använda versionhantering i problemlösningsprocessen.
- Självständigt programmera enklare applikationer med hjälp av objektorientering.
- Felsöka och testa kod
- Manipulera DOM med hjälp av JavaScript

**För väl Godkänd ska den stunderande kunna:**
- Studenten behöver påvisa fördjupade kunskaper och färdigheter i JavaScript, exempelvis objektorientering och funktionsorientering.
- Studenten ska självständigt skapa mer avancerade HTML-sidor som använder sig av JavaScript.