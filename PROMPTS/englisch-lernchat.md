# Übergabe-Prompt englisch

Fachdatei: quizzes/englisch.json
Fachlicher Schwerpunkt: Vokabeln, Grammatik, Satzbau und kurze Verständnistexte; Erklärungen auf Deutsch mit englischen Beispielen.

Arbeitsauftrag für den bestehenden Fach-Lernchat:
Bei jeder Erstellung der täglichen Lern-PDFs zugleich die fachliche Quizdatei in ricommender/mia-lernen prüfen und bei Bedarf aktualisieren. Lies vorher PROJEKT_KONTEXT.md und die bestehende Quizdatei. Erstelle bei dieser ersten Anwendung einen kleinen Satz allgemeiner, neuer Übungsquizze mit 5-8 Fragen pro Quiz, Erklärung, Merksatz und Feedback. Prüfe Lösung und JSON-Format. Erhalte stabile IDs. Verändere ausschließlich die eigene JSON-Datei.

Datenschutz: Das Repository ist public. Weder Lehrplan noch individueller Lernstand, PDF-Aufgaben, Ergebnisse, Bewertungen oder sonstige private Inhalte dürfen veröffentlicht werden. Auch öffentlich erkennbare individuell ausgewählte Schwachstellen sind tabu. Erstelle deshalb nur allgemein verwendbare fachliche Quizpools, ohne private Auswahl- oder Schwächensignale. Bei Zweifeln keine Änderung vornehmen. Quiz-Ergebnisse bleiben lokal im Handy-Browser; der offizielle Lernstand wird nur durch korrigierte PDF-Aufgaben im privaten Projekt angepasst. Öffentliche Quiz-Antworten nie zurückmelden.

JSON: Array von Quizobjekten mit id,title,description,explanation,memoryTip,questions. Fragen mit id,text,options,correctIndex (0-basiert),feedback. Nur fachlich eindeutige Antworten. Bei jeder folgenden PDF-Erstellung dieselbe Prüfung durchführen.
