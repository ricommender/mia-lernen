# Mia-Lernen – Projektgedächtnis & Entwicklungsleitlinien

Stand: 2026-10-18. Diese Datei ist bewusst **öffentlich lesbar** und enthält **keine persönlichen Lerninformationen**.

> **An künftige ChatGPT-Sitzungen und Entwickler:** Lies diese Datei sowie den aktuellen Quellcode, bevor du an `mia-lernen` arbeitest. Diese Dokumentation beschreibt Ursprung, Absichten und verbindliche Datenschutzregeln. Sie ist keine automatische Chat-Erinnerung: Bei einem späteren Chat das GitHub-Repository erneut öffnen und den tatsächlichen Code überprüfen.

## 1. Ursprung und Ziel
- Es existiert ein **separates privates GitHub-Lernprojekt**, das im regulären Lernablauf Lehrplan, individuellen Lernstand, tägliche PDF-Aufgaben und deren Korrektur verwaltet. Das öffentliche Repository hier ist **nicht** dessen Datenspeicher.
- Drei eigenständige Lernchats betreuen Mathematik, Englisch und Französisch.
- `mia-lernen` ist eine **öffentliche, mobilfreundliche Quiz-Web-App** als ergänzende, motivierende Übungsebene, nicht als Ersatz für das bestehende PDF-Lernsystem.
- Zielgruppe: etwa 14 Jahre. Die Oberfläche soll hochwertig, freundlich, nicht kindisch wirken.

## 2. Höchste Priorität: Datenschutz (nicht verhandelbar)
**NIEMALS veröffentlichen, committen, loggen, in Issues/PRs kopieren oder im Browsercode ausliefern:**
- den privaten Lehrplan oder dessen originale Inhalte/Dateien;
- den individuellen Lernstand, Kompetenzbewertungen, Fehlerprofile und Schwächen einer identifizierbaren Person;
- persönliche PDF-Aufgaben, eingereichte Lösungen, Korrekturen, Punktzahlen, Einzel- oder Tagesergebnisse;
- private Repository-Inhalte, Tokens, Zugangsdaten, personenbezogene Metadaten oder sonstige Rückschlüsse auf vertrauliche Lerninformationen.

**Auch die Auswahl und Priorisierung von veröffentlichten Themen kann indirekt Lerninformationen offenlegen.** Das ist ein ungelöster Zielkonflikt zwischen „öffentlich bereitgestellte, individuell zugeschnittene Quizze“ und vollständiger Vertraulichkeit. Deshalb dürfen Fachchats **nicht einfach aus privaten Schwächen eine erkennbare öffentliche Auswahl erzeugen**. Vor einem solchen Ausbau muss die Architektur so geändert werden, dass die **personalisierte Auswahl ausschließlich lokal oder in einem geschützten privaten Dienst** erfolgt. Die öffentliche Sammlung darf nur ausreichend allgemeine, nicht-individualisierende, fachliche Aufgaben enthalten.

- Keine privaten GitHub-Zugriffstokens im Clientcode, in öffentlichen GitHub Actions, Committexten oder Browser-Speicher.
- Public bedeutet: Repository, Historie und veröffentlichte Dateien sind für Dritte zugänglich. Ein späteres Löschen schützt bereits veröffentlichte Daten nicht zuverlässig.
- Bevor neue Integrationen aktiviert werden: Datenfluss prüfen und auf **fail closed** setzen – bei Zweifel nicht veröffentlichen.
- Falls versehentlich private Inhalte öffentlich werden: weitere Deployments/Verbreitung stoppen, Credentials ggf. widerrufen und einen Vorfall gesondert behandeln. Einfaches Löschen der Datei genügt nicht.

## 3. Aktuelle öffentliche Architektur (bei Änderungen neu prüfen)
- Repository: `ricommender/mia-lernen`, Branch `main`.
- Statisches Hosting über GitHub Pages: https://ricommender.github.io/mia-lernen/
- `index.html`: Startseite mit drei Fachkacheln.
- `mathe.html`, `englisch.html`, `franzoesisch.html`: Fachseiten.
- `style.css`: gemeinsames Erscheinungsbild.
- `quiz.js`: gemeinsame Quizfunktion und lokale Wiederholungslogik.
- `quizzes/mathe.json`, `quizzes/englisch.json`, `quizzes/franzoesisch.json`: neutrale, öffentlich sichtbare Beispielquizze.
- GitHub Pages veröffentlicht nach Änderung des entsprechenden Branchs, sofern Pages korrekt konfiguriert ist.
- Keine Anmeldung, kein Backend, keine serverseitige Speicherung von Quiz-Ergebnissen.

## 4. Quiz-Prinzip
- Fachlich passende, kurze Quizze, die den aktuellen Unterricht unterstützen und schwierige Grundlagen festigen sollen.
- Der ursprüngliche Wunsch lautet: **nur Aufgaben zu gerade geübten Themen oder nicht sicher beherrschten Inhalten**. Wegen der Datenschutzgrenze darf die individuelle Priorisierung aber **nicht** öffentlich sichtbar sein (siehe Abschnitt 2).
- Jedes Quiz enthält eine verständliche **Kurzerklärung** und einen einprägsamen, fachlich korrekten **Merksatz**.
- Jede Frage hat Antwortmöglichkeiten, eine korrekte Antwort und eine hilfreiche Erklärung nach der Antwort.
- Kein blindes Kopieren privater PDF-Aufgaben. Selbst formulierte, allgemeine Aufgabenvarianten verwenden.
- Ansprache: warm, respektvoll, viel konkretes Lob für Einsatz und Fortschritt. Fehler als Übungsanlass erklären, nicht beschämen.
- Quizinhalt fachlich prüfen, insbesondere richtige Lösung, Antwortindex, Erklärung, Eindeutigkeit und altersgerechtes Niveau.
- Neue Themen erst dann hinzufügen, wenn deren Freigabe ohne Rückschlüsse auf persönliche Lerninformationen möglich ist.

### Aktuelles JSON-Format (Bestandsformat)
```json
[
  {
    "title": "Allgemeines Übungsthema",
    "description": "Kurzes Quiz",
    "explanation": "Fachlich richtige, einfache Erklärung.",
    "memoryTip": "Kurzer Merksatz.",
    "questions": [
      {
        "text": "Eine neutrale Frage?",
        "options": ["Antwort A", "Antwort B", "Antwort C"],
        "correctIndex": 1,
        "feedback": "Warum Antwort B richtig ist."
      }
    ]
  }
]
```
Ein Quiz kann zusätzlich eine stabile `id` besitzen, eine Frage ebenfalls. **Stabile IDs sind bei künftigen Inhaltsänderungen wichtig**, damit lokaler Fortschritt nicht unbeabsichtigt verloren geht. Anpassungen am Schema immer mit `quiz.js` koordinieren.

## 5. Adaptive Übungslogik – gegenwärtiger Stand
- JavaScript speichert den Fortschritt mit `localStorage` **nur im Browser und auf dem Gerät** (Schlüsselpräfix `mia-lernen-local-v1:` je Fach). Kein Upload nach GitHub.
- Fragen werden per Anzahl aufeinanderfolgender richtiger Antworten (`streak`), Versuchen, Fehlversuchen und nächster Fälligkeit (`due`) priorisiert.
- Nach falscher Antwort: sofort wieder fällig (in einer folgenden Übungsrunde).
- Nach der ersten richtigen Antwort: weiterhin fällig; ab dem zweiten richtigen Versuch: 1 Tag Pause; danach 3 Tage; anschließend 7 Tage.
- Lernstand ist **nicht** geräteübergreifend synchron; Browserdatenlöschung oder privates Browserfenster kann ihn entfernen.
- Das ist ein einfacher heuristischer Wiederholungsmechanismus, keine belastbare Diagnose der tatsächlichen Fachkompetenz.
- Der Browserzustand darf nicht unkontrolliert in öffentliches GitHub, Analytics-Dienste oder externe Tracker übertragen werden.
- Nicht behaupten, dass der Lernstand des privaten PDF-Projekts bereits mit dem Quiz-Fortschritt synchronisiert ist.

## 6. Gestaltung
- Design-Wunsch: jugendlicher, stilvoller, vom britischen Luxury-Fashion-Look inspirierter **Beige-/Camel-/Rosé-Stil**, dezente Karomuster, großzügige Karten, elegante Serifenschriften, Smartphone-tauglich.
- **Keine offiziellen Burberry-Logos, Markenbehauptungen oder kopierten geschützten Grafiken.**
- Fokus auf klare Bedienung, Lesbarkeit, ausreichend Kontrast, große mobile Touch-Flächen.
- Motivierende, ehrliche Formulierungen statt Leistungsdruck oder bloßem Dauerlob.
- Ein erstelltes Mockup in der ursprünglichen Unterhaltung diente nur als Designreferenz; der tatsächliche HTML/CSS-Stand muss separat geprüft werden.

## 7. Zielintegration für die drei Fachchats (noch nicht umgesetzt)
Geplant: je ein eigenständiger Prompt für Mathe, Englisch und Französisch, der festlegt:
1. Im **privaten Kontext** aktuelle Aufgaben und Lernfortschritt auswerten.
2. Nur fachlich korrekte, anonymisierte Quiz-Kandidaten, Erklärungen und Merksätze erstellen.
3. **Datenschutzprüfung vor jeder Veröffentlichung**: auch indirekte Rückschlüsse aus Themenauswahl/Metadaten ausschließen.
4. In `mia-lernen` ausschließlich dem eigenen Bereich zugeordnete Quizdateien ändern und das JSON-Schema einhalten; keine fremden Fächer oder App-Code ändern.
5. Änderungen nach Möglichkeit per überprüfbarem Pull Request und automatischen Qualitätsprüfungen einreichen; dabei selbst keine privaten Informationen in PR-Text oder Logs übertragen.
6. Ein separates geschütztes Konzept für die persönliche Themenauswahl entwerfen, statt private Defizite öffentlich abzubilden.

**Status:** Fachchat-Prompts, geschützter Datenaustausch und automatisierte Datenschutz-/Schema-Checks sind noch ausstehend. Automatisierung nicht als bereits eingerichtet darstellen.

## 8. Sinnvolle nächste Ausbauschritte
- JSON-Schemavalidierung und fachliche Plausibilitätschecks vor Veröffentlichung.
- Stabile IDs für Quizze und Fragen; sanfte Migration des bestehenden lokalen Fortschritts.
- Fragenpool erweitern, statt nahezu identische Aufgaben dauernd zu wiederholen.
- Lernpfad-Visualisierung aus **ausschließlich lokalem** Fortschritt.
- Bessere mobile Darstellung, Barrierefreiheit, optional installierbare PWA.
- Falls später Synchronisierung auf mehreren Geräten oder Rückmeldung an das private Lernprojekt gewünscht ist: nur mit echter Authentifizierung, geschütztem Backend und durchdachter Datensparsamkeit; GitHub Pages allein genügt dafür nicht.

## 9. Arbeitsregeln für künftige Änderungen
1. Dieses Dokument **zuerst** und danach die tatsächlichen Dateien im Repository lesen.
2. Klären, ob eine geplante Funktion Vertrauliches auslesen, ableiten, senden oder öffentlich sichtbar machen könnte.
3. Keine privaten Lerninformationen zum Testen verwenden: neutrale, frei erfundene Beispielinhalte benutzen.
4. Bestehende Quizfunktionen und lokale Daten nicht ohne Not beschädigen; Änderungen verifizieren.
5. Beschreiben, was wirklich implementiert wurde und was noch offen ist.
6. Diese Datei bei relevanten Architektur- oder Produktentscheidungen mit aktualisieren – ohne geheime oder private Inhalte zu dokumentieren.


## 10. Beschluss: Version 1 abgeschlossen (2026-10-18)

- Die öffentliche Quiz-Web-App für Mathematik, Englisch und Französisch ist die erste Version.
- Der **offizielle Lernstand** wird ausschließlich im bestehenden **privaten** Lernprojekt auf Basis der korrigierten PDF-Aufgaben angepasst.
- Die Ergebnisse der Web-Quizze bleiben **ausschließlich auf dem jeweiligen Gerät im Browser**. Keine Übertragung an GitHub, Lernchats oder andere Dienste; keine automatische Gerätesynchronisierung.
- Die drei privaten Fachchats sollen die **öffentlichen fachlichen Quizpools parallel zu jeder Erstellung der Lern-PDFs prüfen und bei Bedarf pflegen**. Es gibt **keine direkte automatische Synchronisation** zwischen den Chats.
- Im Public-Repository dürfen nur frei formulierte, allgemeine Quizfragen, Lösungen, Erklärungen und Merksätze stehen. Kein persönlicher Lehrplan, keine PDF-Daten, kein Lernstand, keine individuellen Lernlücken oder Ergebnisse.
- Besonders beachten: Schon die konkrete Auswahl öffentlich sichtbarer Übungen kann indirekt persönliche Lernschwächen verraten. Daher keine personalisierten Themenlisten aus privaten Defiziten auf GitHub veröffentlichen. Die **lokale App** darf ausschließlich anhand ihrer lokalen Quizantworten Fragen priorisieren.
- Bei fehlender sicherer Veröffentlichungsmöglichkeit: bestehenden neutralen Quizpool beibehalten, nichts veröffentlichen und im privaten Chat die Einschränkung melden.
- Die drei aktuellen Fach-Quizdateien enthalten **neutrale Demo-Quizze**, noch keine bestätigten, aus dem privaten Lernprojekt freigegebenen Inhalte.
- Übergabe der drei Fachchats: jeder betreut ausschließlich `quizzes/mathe.json`, `quizzes/englisch.json` bzw. `quizzes/franzoesisch.json`, prüft zunächst öffentliche Projektdokumentation und JSON-Schema und behält nach Möglichkeit stabile Quiz-/Frage-IDs.
- Bei jeder PDF-Erstellung sollen zugleich sichere, fachlich korrekte Quiz-Inhalte mit kurzer Erklärung, prägnantem Merksatz und hilfreichem Feedback erwogen werden. Die Fortschrittsdaten der App bleiben vollständig unabhängig vom offiziellen PDF-Lernstand.
