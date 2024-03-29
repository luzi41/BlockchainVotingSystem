# BlockchainVotingSystem

Zu den Anforderungen im Hinblick auf die Integrität einer Online-Wahl gehört, dass das Wahlergebnis abschließend überprüft werden muss. Die notwendige Vertraulichkeit einer politischen Wahl erschwert jedoch die Entwicklung eines Verfahrens, das einerseits für Wählerinnen und Wahlbeobachter einfach zu handhaben ist und andererseits die Überprüfung einzelner Stimmen und des Wahlergebnisses als Ganzes gewährleistet. Diese Anforderung wird End-To-End Verifiability (E2E-V) genannt.

Die Ziele einer Verifizierung einer Wahl lauten: “Auswahl wie vorgesehen;
registriert wie gewählt; und gezählt wie registriert.” 

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
und alle Transaktionen beobachten. 

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

## Blockchain-basierte Netzwerke zur Durchführung von Online-Wahlen

Bei konventionellen Kryptowährungen, wie zum Beispiel dem Bitcoin-Netzwerk, ist die Geheimhaltung der
Informationen und der Metadaten nicht vorgesehen. Jede Transaktion läßt sich bis zu den Addressen der Absenderinnen und Empfänger verfolgen. Lösungen dieses Dilemmas könnten z.B. Ringsignaturen oder sogenannte Zero Knowledge Proofs sein.
Techniken wie zum Beispiel Ring-Signaturen ermöglichen den Schutz der Privatssphäre, in dem sie die Adressen der Teilnehmerinnen einer Transaktion verschleiern. Zero Knowlegde Proofs können die Gültigkeit einer Identität beweisen ohne die Daten der Identifizierung offen zu legen.

### Untersuchung verschiedener Arten von Blockchain-Netzwerken auf ihre Eignung

Braucht ein blockchain-basiertes Voting System Smart Contracts? Ohne Smart Contracts können Wahlen nur in sehr einfacher Form abgebildet werden. Es braucht dann zumindest Blockchains mit Erlaubnissystem und Colored Coins bzw. Assets um Dinge wie Veröffenlichung der Wahlergebnisse erst nach der Stimmabgabe, Stimmabgabezeitraum, Authentifizierung, Ausschluss für mehrfaches Wählen etc. abzubilden. Eine Wahl mittels einfacher Blockchains könnte wohl auch kein Wahlgeheimnis schützen, dazu müssten Absender und Empfänger wie bei ZCash oder Monero verschleiert werden. Eine geeignete Blockchain müsste in der Lage sein gleichzeitig eine sichere Authentifizierung wie bei permissioned (erlaubnisbasierte) Blockchains zu ermöglichen sowie den Wähler zu verschleiern. Multichain (Multichain.com) ist eine erlaubnisbasierte Blockchain, die dazu in der Lage wäre, nur authentifizierte Accounts für Wahltransaktionen zuzulassen. Um das Wahlgeheimnis zu wahren, müssten die authentifizierten Wahlberechtigten einen anonymen Account bekommen, was ohne Smart Contract nur über einen zentralisierten Service möglich ist, in der zuerst den Wahlberechtigten ein sogenanntes "Token" übermittelt wird, mittels dessen sie sich einen Account generieren können, der auch die "Stimmen" in Form von nativen oder sogenannten Colored Coins (Fungible Assets) enthält.

## Entwicklung von Prototypen

Für das BVS werden verschiedene Applikationen benötigt, die jeweils die Funktionalitäten für die jeweiligen Rollen bei einer Wahl abdecken. Als erster Prototyp wird ein Web3-basiertes Frontend entwickelt, mit der die Funktionalitäten für die Rolle Wähler/-in getestet werden kann. Als Basis dient dabei eine Node.js (Javascript) Laufzeit-Umgebung und als Backend das Testnet von Avalanche, einem Blockchain-Projekt, das wie Ethereum dApps (Verteilte Anwendungen) und SmartContracts unterstützt.

## Installation der Wahl-Applikation für Wählerinnen

### Prerequitsites
- NodeJS >= 10.16 and npm >= 5.6 installed.
- Truffle, which can be installed globally with npm install -g truffle
- Metamask extension added to the browser.
