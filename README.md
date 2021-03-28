# BlockainVotingSystem
Eine der Anforderungen in Bezug auf die Integrität einer Online-Wahl ist, dass zum
Schluss das Wahlergebnis überprüfbar sein muss. Die notwendige Geheimhaltung bei
einer Wahl macht es jedoch schwer, ein Verfahren zu entwickeln, welches einerseits
einfach für Wählerinnen und Wahlbeobachter zu handhaben ist und andererseits
gewährleistet, dass einzelne Stimmen und das Wahlergebnis insgesamt überprüfbar
sind. Diese Anforderung wird in der Fachliteratur als End-To-End Verifiability,
abgekürzt E2E-V bezeichnet.

End-To-End Verifiability wird in der englischen
Fachliteratur auf eine kurze Formel gebracht:
The verification objectives can be summarized with the catchphrase, “Cast as intended;
recorded as cast; and counted as recorded.” 
Das bedeutet, dass überprüfbar sein muss:
1. Wurde der beabsichtigte Kandidat gewählt. Wenn beispielsweise die Kandidaten
auf den Listen vertauscht würden, könnte ein Wähler unbeabsichtigt die falsche
Wahl treffen.
2. Wurde die Stimme so übermittelt und gespeichert, wie gewählt. Durch
Manipulationen bei der Übermittlung oder Speicherung können bei einem Online-
Wahlsystem Stimmen verloren gehen, oder doppelt gespeichert werden.
3. wurde die Stimme auch so gewertet wie gespeichert.
