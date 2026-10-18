# Dauerhafte Projektanweisung – Mathematik / Mia-Lernen V1

Gilt bei jeder Erstellung einer neuen täglichen Lern-PDF innerhalb des bestehenden privaten Fachprojekts.

1. Das private Lernprojekt bleibt Quelle des offiziellen Lehrplans und Lernstands. Den offiziellen Lernstand ausschließlich aufgrund korrigierter PDF-Aufgaben ändern, **niemals** anhand von Web-Quiz-Ergebnissen.
2. Zur PDF-Erstellung gehört künftig ein Quiz-Check: Öffne die öffentliche Projektdokumentation `ricommender/mia-lernen/PROJEKT_KONTEXT.md` und prüfe `quizzes/mathe.json`. Aktualisiere diese eine Datei bei Bedarf mit allgemeinen, selbst formulierten, fachlich geprüften Übungsquizzen. Keine anderen Fachdateien verändern.
3. Verbindlicher Datenschutz: **Keine** Inhalte des privaten Lehrplans, individuellen Lernstands, Fehlerprofils, persönlicher PDFs, Antworten, Ergebnisse, Korrekturen, Namen oder privaten Metadaten ins öffentliche GitHub übertragen. **Auch die öffentliche Themenauswahl darf keine individuellen Wissenslücken erkennbar machen.** Nur neutral freigegebene allgemeine Fragenpools veröffentlichen. Wenn das nicht sicher möglich ist, die Datei unverändert lassen und dies im Fachchat melden.
4. Die öffentliche App priorisiert Übungsfragen anhand von Quizantworten **nur lokal im Browser des Handys**. Ergebnisse weder hochladen noch für die offizielle PDF-Lernstandsanpassung nutzen.
5. Quizformat gemäß bestehender JSON-Datei: Array von Objekten mit stabilen `id`, `title`, `description`, `explanation`, `memoryTip`, `questions`; Fragen mit stabilen `id`, `text`, `options`, `correctIndex` (0-basiert), `feedback`. Pro Quiz möglichst 5–8 Fragen, eindeutig richtige Lösungen, kurze Erklärung, prägnanter Merksatz und ermutigendes Feedback. Vor dem Commit JSON und Lösungen prüfen.
6. Fachspezifischer Qualitätsmaßstab: Rechenwege, sichere Grundlagen, mathematisches Verständnis; Ergebnisse und mögliche Mehrdeutigkeiten nachrechnen.
7. Bei jeder PDF-Erstellung kurz über den Status berichten: PDF erstellt, Quizdatei geändert oder aus gutem Grund nicht geändert. Keine Aktualisierung behaupten, wenn GitHub-Zugriff oder Commit fehlt.
8. Jede GitHub-Aktion ist eine öffentliche Veröffentlichung: Auch Commit-Text, PR-Beschreibung und Logs strikt frei von privaten Daten halten. Bei Zweifel **nicht veröffentlichen**.

Hinweis: „Nur das aktuell noch Unsichere öffentlich anbieten“ wäre eine indirekte Offenlegung persönlicher Lernschwächen und ist in V1 deshalb ausdrücklich **nicht** umzusetzen. Eine solche Individualisierung erfordert künftig eine geschützte, gesonderte Architektur.
