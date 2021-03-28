# BlockchainVotingSystem
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

## Authentifizierung und Anonymität
Für eine demokratische Wahl muss auch gewährleistet werden, dass nur berechtigte
Wählerinnen ihre Stimme abgeben können und dass jeder die gleiche Anzahl von
Stimmen hat. Gleichzeitig muss die Anonymität der abgegebenen Stimmen gewahrt
bleiben. Bei einem Peer-To-Peer-Netzwerk auf Basis des Bitcoin-Protokolls ist eine
Authentifizierung nicht vorgesehen, jeder kann Teilnehmer in dem Netzwerk werden
und alle Transaktionen beobachten. Die Eigenschaft des Netzwerks, über eine native Währung (Coins)
zu verfügen, kann für ein Online-Wahlsystem ausgenutzt werden, um den Wählern ihre Stimmen zuzuteilen.
Nur berechtigte Wähler bekommen Coins für die jeweilige Wahl.

## Geheimhaltung und Mechanismus gegen Erpressungen
Ein Online-Wahlsystem muss eine geheime Wahl garantieren. Da eine Online-Wahl
unter „unkontrollierten“ Bedingungen stattfindet (nicht im Wahllokal sondern zuhause
auf unsicheren Endgeräten), muss außerdem sichergestellt werden, dass kein
massenhafter Stimmenkauf, Erpressung etc. technisch ermöglicht wird, ohne dass dies
entdeckt wird. Das bedeutet, dass das System beispielsweise nicht offenbaren darf, wie
ein bestimmter Wähler gewählt hat.

Das Problem der potentiellen Erpressbarkeit erweitert die Anforderung der bloßen
Geheimhaltung: Die Gefahr, dass Stimmen gekauft oder erpresst werden, lässt sich nur
verhindern, wenn eine Wählerin nicht die Möglichkeit hat, zu beweisen, wie sie gewählt
hat. Wäre sie dazu in der Lage, könnte ein Erpresser diesen Beleg fordern und sie wäre
erpressbar. Eine Anforderung, die deswegen an elektronische Wahlsysteme gestellt
wird, wird in der Literatur als „Coercion resistance“ - zu Deutsch etwa
„Widerstandsfähigkeit gegen Erpressung“ bezeichnet. Ein möglicher Erpresser darf
außerdem auch ohne Kooperation der Wählerin keine Möglichkeit haben, eine
Verbindung zwischen der Wählerin und ihrer Wahlentscheidung herstellen können
dürfen. Um die Anforderungen betreffs der Geheimhaltung und Widerstandsfähigkeit zu
erfüllen, ist es notwendig, die Wahlentscheidungen bei der Übertragung in die
Blockchain so zu verschlüsseln, dass ein Erpresser keine Möglichkeit hat, vom Opfer
oder dem Computer des Opfers einen Schlüssel zur Entschlüsselung der Daten zu
bekommen, um Kenntnis über die tatsächliche Wahlentscheidung der Wählerin zu
erlangen – sei es mit oder ohne Kooperation der Wählerin.

## Blockchain-basierte Netzwerke zur Duchführung von Online-Wahlen

Bei konventionellen Kryptowährungen, wie zum Beispiel dem Bitcoin-Netzwerk, ist die Geheimhaltung der
Informationen und der Metadaten nicht vorgesehen. Jede Transaktion läßt sich zum Absender und Empfänger verfolgen.
