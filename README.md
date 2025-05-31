# BlockchainVotingSystem Zielsetzung
Ein sicheres, datenschutzkonformes und nachvollziehbares Online-Wahlsystem für Parlamentswahlen (Bundestag, Landtag etc), das:
- nur registrierten Wählern die Stimmabgabe ermöglicht,
- die Anonymität der Stimme garantiert,
- wesentliche Wahlvorgänge revisionssicher dokumentiert (Blockchain),
- die Stimmen automatisiert nach Wahlschluss auszählt und dem Wahlleiter meldet,
- den Anforderungen des Bundeswahlgesetzes entspricht.

## Anforderungen

### Authentifizierung und Anonymität
Für eine demokratische Wahl muss gewährleistet werden, dass nur berechtigte Wählerinnen ihre Stimme abgeben können und dass jeder Berechtigte die gleiche Anzahl von Stimmen hat. Gleichzeitig muss die Anonymität der abgegebenen Stimmen gewahrt bleiben. 

Zu den Anforderungen im Hinblick auf die Integrität einer Online-Wahl gehört, dass das Wahlergebnis abschließend überprüft werden muss. Diese Anforderung wird End-To-End Verifiability (E2E-V) genannt.

Die Ziele einer Verifizierung einer Wahl lauten: 
- Auswahl wie vorgesehen;
- registriert wie gewählt und
- gezählt wie registriert.” 

Das bedeutet, dass überprüfbar sein muss:
1. Wurde der beabsichtigte Kandidat gewählt? Wenn beispielsweise die Kandidaten auf den Listen vertauscht würden, könnte ein Wähler unbeabsichtigt die falsche Wahl treffen.
2. Wurde die Stimme so übermittelt und gespeichert, wie gewählt? Durch Manipulationen bei der Übermittlung oder Speicherung können bei einem Online-Wahlsystem Stimmen verloren gehen, oder doppelt gespeichert werden.
3. wurde die Stimme auch so gewertet wie gespeichert?

### Geheimhaltung und Mechanismus gegen Erpressungen
Ein Online-Wahlsystem muss eine geheime Wahl garantieren. Da eine Online-Wahl unter „unkontrollierten“ Bedingungen stattfindet (nicht im Wahllokal sondern zuhause auf unsicheren Endgeräten), muss außerdem sichergestellt werden, dass kein massenhafter Stimmenkauf, Erpressung etc. technisch ermöglicht wird, ohne dass dies entdeckt wird. Das bedeutet, dass das System beispielsweise nicht offenbaren darf, wie ein bestimmter Wähler gewählt hat. Eine Umsetzung dieser Anforderung bedarf letztendlich eines Identitäts-Managements, das jedoch getrennt werden muss von der Stimmenabgabe (wie die Wahlkabine in einem Wahllokal bei einer konventionellen Wahl)

Das Problem der potentiellen Erpressbarkeit erweitert die Anforderung der bloßen Geheimhaltung: Die Gefahr, dass Stimmen gekauft oder erpresst werden, lässt sich nur verhindern, wenn eine Wählerin nicht die Möglichkeit hat, zu beweisen, wie sie gewählt
hat. Wäre sie dazu in der Lage, könnte ein Erpresser diesen Beleg fordern und sie wäre erpressbar. Eine Anforderung, die deswegen an elektronische Wahlsysteme gestellt wird, wird in der Literatur als „Coercion resistance“ - zu Deutsch etwa „Widerstandsfähigkeit gegen Erpressung“ bezeichnet. Ein möglicher Erpresser darf außerdem auch ohne Kooperation der Wählerin keine Möglichkeit haben, eine Verbindung zwischen der Wählerin und ihrer Wahlentscheidung herstellen können dürfen. Um die Anforderungen betreffs der Geheimhaltung und Widerstandsfähigkeit zu erfüllen, ist es notwendig, die Wahlentscheidungen bei der Übertragung in die Blockchain so zu verschlüsseln, dass ein Erpresser keine Möglichkeit hat, vom Opfer oder dem Computer des Opfers einen Schlüssel zur Entschlüsselung der Daten zu bekommen, um Kenntnis über die tatsächliche Wahlentscheidung der Wählerin zu erlangen – sei es mit oder ohne Kooperation der Wählerin.


## Entwicklung von Prototypen

Für das BVS werden verschiedene Applikationen benötigt, die jeweils die Funktionalitäten für die jeweiligen Rollen bei einer Wahl abdecken. Als erstes wird ein Web3-basiertes Frontend entwickelt, mit der die Funktionalitäten für die Rolle Wähler/-in getestet werden kann. Als Basis dient dabei eine Node.js (Javascript) Laufzeit-Umgebung mit React-Frontend und als Blockchain-Backend "Quorum", auf Basis von Ethereum. das dApps (Verteilte Anwendungen) und SmartContracts unterstützt.
Dazu werden ein Registrierungsservice mit Verbindung zum Melderegister/Wahlamt und ein Wahlleiter (bzw. Wahlkommission) benötigt.

Abbildung 1: Sequenzdiagramm BVS Wahl

![UML Sequenzdiagramm BVS](./images/WahlSequenz.png)
