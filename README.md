# Johannespassion BWV 245 – Übungsplayer

Übungs-Audio-Player für Chorsänger zum Erlernen der Choräle aus Johann Sebastian Bachs Johannespassion BWV 245 nach Stimmlage (S/A/T/B).

**🔗 Live-Version:** https://ledez-man.github.io/JohannespassionBWV245/

---

## Verwendung

### Mit Noten (Partitur vorhanden)

Wenn du die Noten ausgedruckt oder digital vorliegen hast:

1. Klick direkt auf die gewünschte Stimme (**S**, **A**, **T** oder **B**) unter der entsprechenden Choralnummer
2. Die Audiodatei deiner Stimme wird abgespielt

### Ohne Noten (Partitur-Ansicht)

Wenn du die Noten nicht zur Hand hast:

1. **Stimme vorauswählen:** Wähle oben auf der Seite deine Chorstimme in der Vorauswahl aus
2. **Autoplay aktivieren:** Stell sicher, dass die Autoplay-Option angehakt ist
3. **Choral starten:** Klick auf die **Nummer** des gewünschten Chorals (z. B. **7**, **9**, **17** usw.)
4. Die Partitur wird automatisch eingeblendet und nach kurzer Verzögerung hörst du deine Singstimme

---

## Technische Details

- **Keine Installation erforderlich:** Öffne einfach `index.html` im Browser
- **Choral-Nummern:** Verwendet die BG-Ausgabe (Bach-Gesellschaft), nicht die NBA (Neue Bach-Ausgabe)
- **Audiodateien:** M4A-Format für alle Stimmlagen
- **Texte:** Werden dynamisch aus `lyrics.js` geladen
- **Deployment:** GitHub Pages – kein Build-Prozess nötig

---

## Für Entwickler

**Audio-Dateien hinzufügen:**
- Dateiformat: `audio/nr{NUMMER}-{STIMME}.m4a`
- Beispiel: `audio/nr7-S.m4a`, `audio/nr9-A.m4a`

**Neuen Choral hinzufügen:**
1. M4A-Dateien für alle Stimmlagen in `audio/` ablegen
2. Tabellenzeile in `index.html` einfügen: `<tr data-nr="NUMMER">`
3. Chortext in `lyrics.js` ergänzen

---

## Lizenz

Dieses Projekt verwendet eine duale Lizenz – siehe [LICENSE](LICENSE) für den vollständigen Text.

| Inhalt                               | Lizenz                           |
|--------------------------------------|----------------------------------|
| Quellcode                            | MIT License                      |
| Audioaufnahmen (`audio/*.m4a`)       | CC BY-NC 4.0                     |
| Notenblätter (PDFs, extern verlinkt) | CC BY-NC 4.0 – Tobis Notenarchiv |
