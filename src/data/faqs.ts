export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  pages?: string[]; // Empty array means show on all pages
}

export const faqs: FaqEntry[] = [
  {
    id: "general-pricing",
    question: "Wie viel kostet es, eine Partybox in Stuttgart zu mieten?",
    answer: "Unsere Partyboxen (z.B. JBL Partybox) sind bereits ab 80€ pro Boxenpaar und Tag verfügbar. Eine einzelne Box kostet 50€ pro Tag.",
    pages: ["jbl-partybox-300-320", "index", "vermietung", "veranstaltungspaket-stuttgart"]
  },
  {
    id: "pa-anlage-50-personen",
    question: "Welche PA-Anlage eignet sich für 50 Personen?",
    answer: "Für Veranstaltungen mit 50-80 Personen empfehle ich unsere JBL Partyboxen oder das LD Maui 28 G3 Komplettset. Beide sind Plug & Play und in 5 Minuten aufgebaut.",
    pages: ["ld-maui-28g3", "index", "djpaket-fildern", "veranstaltungspaket-stuttgart"]
  },
  {
    id: "zahlungsmethoden",
    question: "Wie funktioniert die Bezahlung?",
    answer: "Die Bezahlung erfolgt bei Abholung. Ich biete Barzahlung und PayPal an!",
    pages: ["index", "vermietung"]
  },
  {
    id: "abholort",
    question: "Wo kann ich die Technik abholen?",
    answer: "Die Technik kann direkt in Leinfelden-Echterdingen (Magellanstraße 4) abgeholt werden. Ich erkläre dir ausführlich den Aufbau und gebe dir eine Einweisung.",
    pages: ["index", "vermietung"]
  },
  {
    id: "lichtanlage-preis",
    question: "Was kostet eine Party-Lichtanlage?",
    answer: "Eine vollständige Partylichtanlage mit verschiedenen Effekten ist bereits ab 50€ pro Tag verfügbar. Inklusive persönlicher Beratung und Einweisung.",
    pages: ["index", "vermietung", "partylicht-moving-head"]
  },
  {
    id: "nebelmaschine-pakete",
    question: "Bietest du auch Pakete mit Nebelmaschine?",
    answer: "Ja, ich biete die Partylichtanlagen auch zusammen mit einer Nebelmaschine an. Das Komplettpaket gibt es ab 60€ pro Tag.",
    pages: ["index", "vermietung", "led-bossfx-nebelmaschine"]
  },
  {
    id: "vorkenntnisse",
    question: "Brauche ich Vorkenntnisse, um die Anlage zu bedienen?",
    answer: "Nein, ich biete eine umfassende Einweisung an. Die Technik ist für jeden Benutzer einfach zu bedienen. Und das ist der Unterschied zu Versandverleihern: bei mir siehst und testest du die Technik vorher. Du bekommst kein 'Überraschungspaket', sondern weißt genau, was dich erwartet.",
    pages: ["index", "vermietung"]
  },
  {
    id: "transport-fahrzeug",
    question: "Reicht ein normales Auto für den Transport oder brauche ich einen Kombi/Transporter?",
    answer: "Die einzelnen Komponenten sind gut in einem Kombi oder Kleinwagen mit umklappbarer Rückbank zu transportieren. Für größere Pakete oder mehrere Boxen empfehle ich einen Kombi oder Transporter. Ich berate dich gerne, welche Fahrzeuge geeignet sind.",
    pages: ["index", "vermietung", "ld-maui-28g3", "djpaket-fildern", "partypaket-stuttgart"]
  },
  {
    id: "vs-versand-vorlauf",
    question: "Wie kurzfristig kann ich Technik mieten?",
    answer: "Bei mir reichen oft 1-3 Tage Vorlauf. Viele Versandverleiher benötigen Wochen oder einen Monat Vorlauf, weil erst die Zahlung eingehen muss, dann der Versand mit Puffer geplant wird und nach der Party die Rücksendung abgewartet wird. Bei mir: Anfrage stellen, Termin bestätigen, abholen, feiern – so einfach ist das.",
    pages: ["index", "vermietung", "jbl-partybox-300-320", "djpaket-fildern", "veranstaltungspaket-stuttgart", "partypaket-stuttgart", "partylicht-moving-head", "led-bossfx-nebelmaschine", "ld-maui-28g3", "kls-laser-bar"]
  },
  {
    id: "vs-versand-lieferrisiko",
    question: "Was passiert, wenn die Technik zu spät ankommt?",
    answer: "Bei mir passiert das nicht – du holst die Technik persönlich ab und nimmst sie sofort mit. Anders als bei Versandverleihern gibt es kein Risiko, dass der Paketdienst zu spät kommt, die Lieferung beschädigt ist oder deine Party ohne Technik starten muss. Du siehst die Geräte vor Ort, testest sie und fährst los – deine Party ist sicher.",
    pages: ["index", "vermietung"]
  },
  {
    id: "vs-versand-beratung",
    question: "Bekomme ich Hilfe beim Aufbau der Technik?",
    answer: "Ja auf jeden Fall! Bei der Abholung erkläre ich dir ausführlich den Aufbau und die Bedienung. Du kannst die Geräte vorher in Funktion sehen und alle Fragen stellen. Das ist der große Vorteil gegenüber Versandverleihern – dort bekommst du nur einen Karton zugeschickt und musst dich alleine durchkämpfen.",
    pages: ["index", "vermietung"]
  },
  {
    id: "kurzfristig-notfall",
    question: "Was tun, wenn die Party schon in 3 Tagen ist?",
    answer: "Ja, ich reagiere auch kurzfristig! Anfragen bis zu 2 Tagen vor der Veranstaltung sind meist noch möglich. Am besten rufst du mich direkt an unter 0171/1467491 für schnelle Abstimmung. Ich habe oft noch freie Geräte verfügbar.",
    pages: ["index", "vermietung", "partypaket-stuttgart", "kls-laser-bar", "led-bossfx-nebelmaschine", "djpaket-fildern", "ld-maui-28g3", "partylicht-moving-head", "veranstaltungspaket-stuttgart", "jbl-partybox-300-320"]
  },
  // JBL Partybox specific FAQs
  {
    id: "jbl-akkulaufzeit",
    question: "Wie lange hält der Akku der JBL Partybox?",
    answer: "Die JBL Partybox 300 und 320 bieten bis zu 18 Stunden Akkulaufzeit. Die tatsächliche Laufzeit hängt von der Lautstärke und der Nutzung der Lichteffekte ab. Bei voller Lautstärke mit Light Show sind es ca. 6-8 Stunden.",
    pages: ["jbl-partybox-300-320"]
  },
  {
    id: "jbl-verbindung",
    question: "Kann ich zwei Partyboxen miteinander verbinden?",
    answer: "Ja! Im Paket ist ein Verbindungskabel (5M) fürdie Verbindung der zwei Boxen enthalten. Das ist perfekt für größere Räume oder wenn du mehr Power brauchst.",
    pages: ["jbl-partybox-300-320"]
  },
  {
    id: "jbl-musikwiedergabe",
    question: "Wie spiele ich Musik auf den Partyboxen ab?",
    answer: "Du hast mehrere Möglichkeiten: Bluetooth (von Smartphone/Tablet), USB-Stick, 3,5mm Klinke (AUX) oder sogar ein Mikrofon/Gitarre direkt anschließen. Bei Bedarf lege ich ein passendes Kabel für den Anschluss eines Laptops bei.",
    pages: ["jbl-partybox-300-320"]
  },
  {
    id: "jbl-wasserdicht",
    question: "Sind die Boxen wasserdicht?",
    answer: "Die JBL Partybox 320 ist nach IPX4 spritzwassergeschützt und kann daher auch im Freien bei leichtem Regen genutzt werden. Die Partybox 300 ist nicht wasserdicht und sollte vor Nässe geschützt werden.",
    pages: ["jbl-partybox-300-320"]
  },
  {
    id: "jbl-lieferumfang",
    question: "Wie groß ist der Lieferumfang?",
    answer: "Im Mietpaket enthalten sind: 1x JBL Partybox 300, 1x JBL Partybox 320, 2x Stromkabel und 1x Verbindungskabel (5m) für die Kopplung der 2 Boxen. Bei Bedarf lege ich noch ein Verbindungskabel für die Zuspielung von Musik über einen Laptop bei. Alles was du für den Start brauchst!",
    pages: ["jbl-partybox-300-320"]
  },
  // DJ-Paket Fildern specific FAQs
  {
    id: "dj-paket-inhalt",
    question: "Was ist im DJ-Paket Fildern alles enthalten?",
    answer: "Das DJ-Paket enthält: 2x LD Maui 28 G3 Säulensystem, Stairville LED BossFX-2 Pro, Stairville AF-150 Nebelmaschine, 18 Prisma 10 Gobo LED Moving Head, Showlight LED Stage Bar, Mikrofon inkl. XLR-Kabel, 2x LED PAR Strahler sowie alle Stromkabel, XLR-Kabel und Anschlusskabel.",
    pages: ["djpaket-fildern"]
  },
  {
    id: "dj-paket-aufbauzeit",
    question: "Wie lange dauert der Aufbau des DJ-Pakets?",
    answer: "Für das komplette DJ-Paket solltest du ca. 45-60 Minuten einplanen. Ich erkläre dir bei der Abholung ausführlich den Aufbau. Die LD Maui Anlage ist in 5 Minuten aufgebaut, für Licht und Nebel kommen ca. 30-40 Minuten hinzu.",
    pages: ["djpaket-fildern"]
  },
  {
    id: "dj-paket-abholung",
    question: "Kann ich das Paket selbst abholen?",
    answer: "Ja, du kannst das Paket selbst in Leinfelden-Echterdingen abholen. Ich erkläre dir ausführlich den Aufbau und die Bedienung. Alternativ biete ich auch Lieferung und Aufbau vor Ort an (gegen Aufpreis).",
    pages: ["djpaket-fildern"]
  },
  {
    id: "dj-paket-events",
    question: "Für welche Art von Events eignet sich das DJ-Paket?",
    answer: "Das DJ-Paket Fildern eignet sich ideal für: Hochzeiten (bis 150 Gäste), Firmenfeiern, Vereinsfeiern, DJ-Gigs, größere Gartenfeste und Partys. Es bietet professionellen Sound und eine beeindruckende Lichtshow. Das DJ-Paket ist perfekt, wenn du selbst als DJ auftrittst oder der DJ seinen eigenen DJ-Mixer mitbringt und eine professionelle Sound- und Lichtanlage benötigt.",
    pages: ["djpaket-fildern"]
  },
  {
    id: "dj-paket-unterschied",
    question: "Unterscheidet sich das DJ-Paket vom Veranstaltungspaket?",
    answer: "Ja, das DJ-Paket enthält die LD Maui 28 G3 als Soundanlage (professionelles Säulensystem mit Yamahha Mischpult-Option), während das Veranstaltungspaket mehr Licht-Komponenten (Laser Bar, mehr PAR Strahler) enthält. Das DJ-Paket ist ideal, wenn du selbst als DJ auftrittst oder der DJ seinen eigenen DJ-Mixer mitbringt.",
    pages: ["djpaket-fildern"]
  },
  // Veranstaltungspaket specific FAQs
  {
    id: "veranstaltung-paket-unterschied",
    question: "Was unterscheidet das Veranstaltungspaket vom DJ-Paket?",
    answer: "Das Veranstaltungspaket enthält: 2x LD Maui 28 G3, Yamaha MG6 Mischpult, Eurolite KLS Laser Bar, AF-150 Nebelmaschine, 2x LED Spot Moving Head, Mikrofon und 4x LED PAR Strahler. Das DJ-Paket enthält stattdessen die LED BossFX Pro und einen Moving Head. Das Veranstaltungspaket hat mehr Licht-Komponenten.",
    pages: ["veranstaltungspaket-stuttgart"]
  },
  {
    id: "veranstaltung-paket-groesse",
    question: "Wie groß darf die Veranstaltung sein?",
    answer: "Das Veranstaltungspaket eignet sich für Veranstaltungen mit bis zu 150 Personen. Die LD Maui 28 G3 liefert mit 2060W genug Leistung auch für größere Räume. Die Lichtanlage mit Laser, Moving Heads und PAR Strahlern sorgt für eine beeindruckende Show.",
    pages: ["veranstaltungspaket-stuttgart"]
  },
  {
    id: "veranstaltung-paket-ohne-dj",
    question: "Kann ich die Technik auch ohne DJ nutzen?",
    answer: "Ja, das Paket kannst du auch ohne DJ nutzen. Das Yamaha Mischpult ermöglicht dir den Anschluss mehrerer Audioquellen (Laptop, Mikrofon, etc.). Die Lichtanlage läuft im Sound-zu-Licht-Modus automatisch oder kann per DMX gesteuert werden.",
    pages: ["veranstaltungspaket-stuttgart"]
  },
  {
    id: "veranstaltung-paket-yamaha",
    question: "Ist das Yamaha Mischpult im Paket enthalten?",
    answer: "Ja, das Yamaha MG6 6-Kanal Mischpult ist im Veranstaltungspaket enthalten. Es ermöglicht dir die flexible Steuerung verschiedener Audioquellen und bietet die Möglichkeit, Mikrofone und Musikquellen separat zu mischen.",
    pages: ["veranstaltungspaket-stuttgart"]
  },
  {
    id: "veranstaltung-paket-lieferung",
    question: "Wie funktioniert die Lieferung und Abholung?",
    answer: "Du kannst die Technik selbst in Leinfelden-Echterdingen abholen oder wir liefern sie gegen Aufpreis direkt zu deinem Veranstaltungsort. Bei der Abholung geben wir dir eine ausführliche Einweisung in Aufbau und Bedienung.",
    pages: ["veranstaltungspaket-stuttgart"]
  },
  // Partypaket Stuttgart specific FAQs
  {
    id: "partypaket-personenzahl",
    question: "Wie viele Personen passen zum Partypaket?",
    answer: "Das Partypaket eignet sich perfekt für Veranstaltungen mit 50-80 Personen. Die JBL Partyboxen liefern kraftvollen Sound auch für kleinere Räume. Die kompakte Lichtanlage mit Laser und Nebel sorgt für eine tolle Party-Atmosphäre.",
    pages: ["partypaket-stuttgart"]
  },
  {
    id: "partypaket-geraete",
    question: "Welche Geräte sind im Partypaket enthalten?",
    answer: "Im Partypaket enthalten sind: 2x JBL Partybox 300, Eurolite KLS Laser Bar FX, Nebelmaschine, Mikrofon inkl. Kabel, 4x LED PAR Strahler sowie alle notwendigen Strom- und Anschlusskabel.",
    pages: ["partypaket-stuttgart"]
  },
  {
    id: "partypaket-transport",
    question: "Wie schwer ist der Transport?",
    answer: "Die JBL Partyboxen wiegen jeweils ca. 15-16 kg und haben integrierte Tragegriffe. Die Laser Bar und Nebelmaschine sind ebenfalls kompakt und einfach zu transportieren. Das gesamte Paket passt in einen Kombi oder Kleinwagen mit umklappbarer Rückbank.",
    pages: ["partypaket-stuttgart"]
  },
  {
    id: "partypaket-garten",
    question: "Kann ich das Paket auch im Garten nutzen?",
    answer: "Ja, das Partypaket kann auch im Außenbereich genutzt werden. Die JBL Partyboxen sind zwar nicht wasserdicht, aber bei trockenem Wetter problemlos im Garten einsetzbar. Achte darauf, dass die Elektronik vor Regen geschützt wird.",
    pages: ["partypaket-stuttgart"]
  },
  {
    id: "partypaket-aufbauzeit",
    question: "Wie lange dauert der Aufbau?",
    answer: "Das Partypaket ist innerhalb von 30-45 Minuten vollständig aufgebaut. Die JBL Partyboxen sind in wenigen Minuten einsatzbereit (einfach anschließen und per Bluetooth verbinden). Die Laser Bar wird auf das mitgelieferten Stativ montiert. Die Nebelmaschine benötigt ca. 5 Minuten zum Aufheizen und kommt mit einem vollen Tank Nebelfluid.",
    pages: ["partypaket-stuttgart"]
  },
  // Partylicht Moving Head specific FAQs
  {
    id: "moving-head-dmx",
    question: "Brauche ich DMX-Kenntnisse, um die Lichtanlage zu bedienen?",
    answer: "Nein, du brauchst nicht zwingend DMX-Kenntnisse! Die Lichtanlage kann im Sound-zu-Licht-Modus betrieben werden, sodass sie automatisch auf die Musik reagiert. Optional kannst du aber auch den DMX-Controller nutzen für eigene Programme.",
    pages: ["partylicht-moving-head"]
  },
  {
    id: "moving-head-aufbauzeit",
    question: "Wie lange dauert der Aufbau der Lichtanlage?",
    answer: "Der Aufbau dauert in der Regel 15-20 Minuten. Das T-Bar Stativ wird einfach aufgebaut, die Geräte montiert und angeschlossen. Ich erkläre dir bei der Abholung ausführlich, wie alles funktioniert.",
    pages: ["partylicht-moving-head"]
  },
  {
    id: "moving-head-ohne-nebel",
    question: "Kann ich die Lichter auch ohne Nebelmaschine nutzen?",
    answer: "Ja, die Lichter funktionieren auch ohne Nebelmaschine. Allerdings kommen die Effekte viel besser zur Geltung, wenn Nebel eingesetzt wird. Eine Nebelmaschine kann optional dazgemietet werden.",
    pages: ["partylicht-moving-head"]
  },
  {
    id: "moving-head-effekte",
    question: "Welche Effekte bietet der Moving Head?",
    answer: "Der 18 Prisma LED Spot verfügt über 10 verschiedene Gobo-Muster (Schablonen), ein 18-fach Prisma für spektakuläre Lichteffekte und RGBW-Farbmischung. Er kann sich horizontal und vertikal bewegen für dynamische Shows.",
    pages: ["partylicht-moving-head"]
  },
  {
    id: "moving-head-hoehens",
    question: "Wie hoch sollte das Stativ montiert werden?",
    answer: "Das T-Bar Stativ ist flexibel von 100 cm bis 180 cm höhenverstellbar. Für beste Ergebnisse empfehle ich eine Höhe von ca. 150-180 cm, sodass die Lichter über die Köpfe der Gäste leuchten können.",
    pages: ["partylicht-moving-head"]
  },
  // LED BossFX Nebelmaschine specific FAQs
  {
    id: "nebelmaschine-fluid",
    question: "Ist Nebelfluid im Mietpreis enthalten?",
    answer: "Ja, 1 Tankfüllung (ca. 1 Liter) Nebelfluid ist im Mietpreis inbegriffen. Das reicht für einen typischen Partyabend von ca. 4-6 Stunden. Falls du mehr benötigst, kannst du zusätzliches Fluid erhalten.",
    pages: ["led-bossfx-nebelmaschine"]
  },
  {
    id: "nebelmaschine-dauer",
    question: "Wie lange hält der Nebel an?",
    answer: "Die AF-150 Nebelmaschine mit 800W Leistung erzeugt ca. 110 m³ Nebel pro Minute. Der Nebel verfliegt je nach Raumgröße und Belüftung nach etwa 30-60 Sekunden. Du kannst die Intensität über die Fernbedienung oder DMX steuern.",
    pages: ["led-bossfx-nebelmaschine"]
  },
  {
    id: "nebelmaschine-gesundheit",
    question: "Ist die Nutzung von Nebel gesundheitlich unbedenklich?",
    answer: "Ja, wir verwenden nur hochwertiges, speziell für Veranstaltungen entwickeltes Nebelfluid. Es ist gesundheitlich unbedenklich und hinterlässt keine Rückstände. Es sollte jedoch bei sehr empfindlichen Personen mit Atemwegserkrankungen vorsichtig eingesetzt werden.",
    pages: ["led-bossfx-nebelmaschine"]
  },
  {
    id: "nebelmaschine-steuerung",
    question: "Welche Steuerungsmöglichkeiten gibt es?",
    answer: "Die LED BossFX-2 Pro kann per Sound-zu-Licht (automatisch auf Musik reagierend), über die mitgelieferte Fernbedienung oder per DMX gesteuert werden. Die Nebelmaschine wird per Fernbedienung oder DMX gesteuert.",
    pages: ["led-bossfx-nebelmaschine"]
  },
  {
    id: "nebelmaschine-ohne-nebel",
    question: "Kann ich das Set auch ohne Nebelmaschine mieten?",
    answer: "Ja, die LED BossFX-2 Pro kann auch einzeln ohne Nebelmaschine gemietet werden. Allerdings kommen die Lichteffekte, besonders die Derby-Beams und Strobe-Effekte, viel besser zur Geltung, wenn Nebel eingesetzt wird.",
    pages: ["led-bossfx-nebelmaschine"]
  },
  // KLS Laser Bar specific FAQs
  {
    id: "laser-bar-schutzbeauftragter",
    question: "Brauche ich einen Laserschutzbeauftragten für die Laser Bar?",
    answer: "Nein, bei der Eurolite KLS Laser Bar handelt es sich um einen Laser der Klasse 2M. Dies bedeutet, dass kein Laserschutzbeauftragter erforderlich ist. Du solltest jedoch darauf achten, nicht direkt in den Laserstrahl zu blicken.",
    pages: ["kls-laser-bar"]
  },
  {
    id: "laser-bar-sicherheit",
    question: "Wie sicher ist der Laser im Partybetrieb?",
    answer: "Der Laser der KLS Bar FX ist ein RG-Laser (Rot-Grün) der Klasse 2M. Er ist sicher für den Partygebrauch und Augensicherheit ist gewährleistet, solange man nicht absichtlich direkt in den Strahl schaut. Die Nutzung ist auch ohne spezielle Genehmigung erlaubt.",
    pages: ["kls-laser-bar"]
  },
  {
    id: "laser-bar-effekte",
    question: "Welche Effekte bietet die Laser Bar?",
    answer: "Die Eurolite KLS Laser Bar FX vereint 4 Effekte in einem: 2 Derby-Beams mit drehenden Mustern, 2 LED-Spots für Flächeneffekte, 4 weiße Strobe-LEDs für Blitzlichter und einen Laser für spektakuläre Strahleneffekte.",
    pages: ["kls-laser-bar"]
  },
  {
    id: "laser-bar-ohne-nebel",
    question: "Kann ich die Laser Bar auch ohne Nebelmaschine nutzen?",
    answer: "Ja, die Laser Bar funktioniert auch ohne Nebelmaschine. Allerdings kommen die Laserstrahlen und Effekte viel besser zur Geltung, wenn leichter Nebel die Luft vernebelt. Die 1200W Nebelmaschine kann optional dazugemietet werden.",
    pages: ["kls-laser-bar"]
  },
  {
    id: "laser-bar-steuerung",
    question: "Wie wird die Laser Bar gesteuert?",
    answer: "Die Steuerung erfolgt wahlweise per Sound-zu-Licht (automatisch auf Musik reagierend), über die mitgelieferte Fernbedienung oder per DMX. Der Sound-zu-Licht-Modus ist perfekt für Einsteiger geeignet.",
    pages: ["kls-laser-bar"]
  },
  // LD Maui 28 G3 specific FAQs
  {
    id: "ld-maui-personen",
    question: "Wie viele Personen können mit der LD Maui 28 G3 beschallt werden?",
    answer: "Die LD Maui 28 G3 eignet sich perfekt für Veranstaltungen mit bis zu 150 Personen. Mit 2060W Peak-Leistung und 127 dB Schalldruck liefert sie kraftvollen Sound auch für größere Räume.",
    pages: ["ld-maui-28g3"]
  },
  {
    id: "ld-maui-anschluss",
    question: "Wie schließe ich die Anlage an?",
    answer: "Die LD Maui 28 G3 ist ein echtes Plug-and-Play-System. Schließe einfach die beiden Säulen an den Subwoofer an, verbinde die Stromkabel und los geht's. Du kannst per Bluetooth, USB, AUX oder XLR Musik zuspielen.",
    pages: ["ld-maui-28g3"]
  },
  {
    id: "ld-maui-outdoor",
    question: "Kann ich die Anlage auch im Freien nutzen?",
    answer: "Ja, die LD Maui 28 G3 kann auch im Außenbereich eingesetzt werden. Achte jedoch darauf, dass die Elektronik vor Regen und direkter Nässe geschützt wird. Bei Unsicherheit berate ich dich gerne persönlich.",
    pages: ["ld-maui-28g3"]
  },
  {
    id: "ld-maui-kabel",
    question: "Brauche ich zusätzliche Kabel oder Adapter?",
    answer: "Im Mietpreis inbegriffen sind alle notwendigen Kabel: 2x Stromkabel und 2x XLR-Kabel (5m). Achte darauf, dass dein Mischpult XLR-Ausgänge hat oder miete das Yamaha Mischpult dazu.",
    pages: ["ld-maui-28g3"]
  },
  {
    id: "ld-maui-transport",
    question: "Wie schwer ist der Transport?",
    answer: "Das Gesamtsystem wiegt ca. 35 kg. Die einzelnen Komponenten sind gut in einem Kombi oder Kleinwagen mit umklappbarer Rückbank zu transportieren. Für den Aufbau solltest du ca. 15-20 Minuten einplanen.",
    pages: ["ld-maui-28g3"]
  },
  {
    id: "dj-booking",
    question: "Ich benötige nicht nur Sound und Licht, sondern einen DJ.",
    answer: "Kein Problem! Neben der Vermietung bin ich selbst als DJ Hulk unterwegs. Ich lege House, Tech House, Deep House und elektronische Musik auf – perfekt für deine Veranstaltung. Schau vorbei auf meiner DJ-Seite: holger-kampffmeyer.de/djhulk-electronic-music",
    pages: ["index"]
  },
  // === City-specific FAQs: Böblingen ===
  {
    id: "böblingen-anfahrt",
    question: "Wie komme ich von Böblingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Böblingen aus erreichst du mich in ca. 20 Minuten über die A8 Richtung Stuttgart, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4 in 70771 Leinfelden-Echterdingen – direkt an A8 / B27 gelegen. Parkplätze sind direkt vor der Tür vorhanden.",
    pages: ["böblingen"]
  },
  {
    id: "böblingen-mietbar",
    question: "Kann ich als Kunde aus Böblingen bei euch Technik mieten?",
    answer: "Ja, auf jeden Fall! Viele meiner Kunden kommen aus Böblingen und Umgebung. Die Abholung ist in Leinfelden-Echterdingen – von Böblingen aus nur ca. 20 km über die A8. Du kannst die Technik vor Ort testen, bekommst eine Einweisung und nimmst sie direkt mit.",
    pages: ["böblingen"]
  },
  {
    id: "böblingen-lieferung",
    question: "Lieferst du auch nach Böblingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Böblingen und Umgebung. Frag einfach bei deiner Buchungsanfrage an – ich mach dir ein faires Angebot.",
    pages: ["böblingen"]
  },
  {
    id: "böblingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Böblingen?",
    answer: "Das hängt von der Gästezahl ab: Für Feiern bis 50 Personen empfehle ich das Partypaket mit JBL Partyboxen. Für 50-150 Gäste das DJ-Paket oder Veranstaltungspaket mit dem LD Maui 28 G3 Säulensystem und professioneller Lichttechnik. Ich berate dich gern persönlich!",
    pages: ["böblingen"]
  },
  {
    id: "böblingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Böblingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt nur ca. 20 km von Böblingen entfernt – eine Fahrtzeit von etwa 20 Minuten über die A8. Viele Kunden aus Böblingen kommen bequem vorbei, holen die Technik ab und sind am selben Abend wieder zuhause.",
    pages: ["böblingen"]
  },
  // === City-specific FAQs: Esslingen ===
  {
    id: "esslingen-anfahrt",
    question: "Wie komme ich von Esslingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Esslingen am Neckar aus erreichst du mich in ca. 20 Minuten über die A8 Richtung Stuttgart, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4 in 70771 Leinfelden-Echterdingen – direkt an der A8 gelegen.",
    pages: ["esslingen"]
  },
  {
    id: "esslingen-mietbar",
    question: "Kann ich als Kunde aus Esslingen bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Esslingen ist nur ca. 20 km entfernt, viele meiner Kunden kommen von dort. Du holst die Technik in Leinfelden-Echterdingen ab, bekommst eine ausführliche Einweisung und kannst direkt loslegen.",
    pages: ["esslingen"]
  },
  {
    id: "esslingen-lieferung",
    question: "Lieferst du auch nach Esslingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Esslingen am Neckar und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["esslingen"]
  },
  {
    id: "esslingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Esslingen?",
    answer: "Für eine Feier in Esslingen kommt es auf die Gästezahl an: Bis 50 Personen reicht das Partypaket mit JBL Partyboxen. Für größere Events bis 150 Gäste empfehle ich das DJ-Paket oder Veranstaltungspaket mit LD Maui 28 G3, Lichteffekten und Nebelmaschine.",
    pages: ["esslingen"]
  },
  {
    id: "esslingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Esslingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt nur ca. 20 km von Esslingen am Neckar entfernt – eine Fahrtzeit von etwa 20 Minuten über die A8.",
    pages: ["esslingen"]
  },
  // === City-specific FAQs: Filderstadt ===
  {
    id: "filderstadt-anfahrt",
    question: "Wie komme ich von Filderstadt zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Filderstadt aus bist du in nur 5-10 Minuten bei mir! Fahre über die L1209 Richtung Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4 – praktisch um die Ecke für alle aus Filderstadt.",
    pages: ["filderstadt"]
  },
  {
    id: "filderstadt-mietbar",
    question: "Kann ich als Kunde aus Filderstadt bei euch Technik mieten?",
    answer: "Ja, natürlich! Filderstadt ist quasi nebenan – nur ca. 5 km entfernt. Du kannst die Technik bequem abholen, vor Ort testen und am gleichen Tag wieder zurückbringen.",
    pages: ["filderstadt"]
  },
  {
    id: "filderstadt-lieferung",
    question: "Lieferst du auch nach Filderstadt?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine geringe Lieferpauschale auch nach Filderstadt. Da die Entfernung sehr kurz ist, fällt die Liefergebühr entsprechend niedrig aus. Frag einfach bei deiner Anfrage an!",
    pages: ["filderstadt"]
  },
  {
    id: "filderstadt-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Filderstadt?",
    answer: "Für Feiern in Filderstadt empfehle ich je nach Gästezahl: Das Partypaket (bis 50 Pers.) mit JBL Partyboxen oder das DJ-Paket (bis 150 Pers.) mit professionellem Sound und Licht. Als Nachbar bist du bei mir in 5 Minuten – schau einfach vorbei!",
    pages: ["filderstadt"]
  },
  {
    id: "filderstadt-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Filderstadt entfernt?",
    answer: "Leinfelden-Echterdingen und Filderstadt liegen direkt nebeneinander – die Entfernung beträgt nur ca. 5 km. Eine Fahrtzeit von etwa 5-10 Minuten.",
    pages: ["filderstadt"]
  },
  // === City-specific FAQs: Kirchheim unter Teck ===
  {
    id: "kirchheim-anfahrt",
    question: "Wie komme ich von Kirchheim unter Teck zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Kirchheim unter Teck aus erreichst du mich in ca. 25 Minuten über die A8 Richtung Stuttgart, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4, direkt an der A8 gelegen.",
    pages: ["kirchheim-unter-teck"]
  },
  {
    id: "kirchheim-mietbar",
    question: "Kann ich als Kunde aus Kirchheim unter Teck bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Kirchheim unter Teck ist nur ca. 30 km entfernt. Du holst die Technik in Leinfelden-Echterdingen ab und bekommst eine ausführliche Einweisung vor Ort.",
    pages: ["kirchheim-unter-teck"]
  },
  {
    id: "kirchheim-lieferung",
    question: "Lieferst du auch nach Kirchheim unter Teck?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Kirchheim unter Teck und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["kirchheim-unter-teck"]
  },
  {
    id: "kirchheim-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Kirchheim unter Teck?",
    answer: "Das hängt von deiner Gästezahl ab: Für bis zu 50 Gäste reicht das Partypaket mit JBL Partyboxen. Für größere Feiern bis 150 Personen empfehle ich das DJ-Paket oder das Veranstaltungspaket mit professioneller Licht- und Soundtechnik.",
    pages: ["kirchheim-unter-teck"]
  },
  {
    id: "kirchheim-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Kirchheim unter Teck entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 30 km von Kirchheim unter Teck entfernt – eine Fahrtzeit von etwa 25 Minuten über die A8.",
    pages: ["kirchheim-unter-teck"]
  },
  // === City-specific FAQs: Kornwestheim ===
  {
    id: "kornwestheim-anfahrt",
    question: "Wie komme ich von Kornwestheim zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Kornwestheim aus erreichst du mich in ca. 20 Minuten über die A81 Richtung Stuttgart, dann A8 Richtung Karlsruhe, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4, 70771 Leinfelden-Echterdingen.",
    pages: ["kornwestheim"]
  },
  {
    id: "kornwestheim-mietbar",
    question: "Kann ich als Kunde aus Kornwestheim bei euch Technik mieten?",
    answer: "Ja, auf jeden Fall! Kornwestheim ist nur ca. 20 km entfernt. Viele Kunden aus dem gesamten Großraum Stuttgart mieten bei mir – du bist herzlich willkommen!",
    pages: ["kornwestheim"]
  },
  {
    id: "kornwestheim-lieferung",
    question: "Lieferst du auch nach Kornwestheim?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Kornwestheim und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["kornwestheim"]
  },
  {
    id: "kornwestheim-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Kornwestheim?",
    answer: "Für Feiern in Kornwestheim empfehle ich: Das Partypaket für kleinere Feiern bis 50 Personen, das DJ-Paket oder Veranstaltungspaket für Events bis 150 Personen. Ich berate dich gern persönlich!",
    pages: ["kornwestheim"]
  },
  {
    id: "kornwestheim-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Kornwestheim entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 20 km von Kornwestheim entfernt – eine Fahrtzeit von etwa 20 Minuten über die A81 und A8.",
    pages: ["kornwestheim"]
  },
  // === City-specific FAQs: Leinfelden-Echterdingen ===
  {
    id: "leinfelden-abholung",
    question: "Wo genau kann ich die Technik in Leinfelden-Echterdingen abholen?",
    answer: "Mein Standort ist die Magellanstraße 4 in 70771 Leinfelden-Echterdingen, direkt im Gewerbegebiet. Die Lage ist verkehrsgünstig an der A8 (Ausfahrt Leinfelden-Echterdingen) und B27. Parkplätze sind direkt vor dem Gebäude vorhanden.",
    pages: ["leinfelden-echterdingen"]
  },
  {
    id: "leinfelden-testen",
    question: "Kann ich die Technik vor der Abholung in Leinfelden-Echterdingen testen?",
    answer: "Ja, auf jeden Fall! Du kannst die Geräte vor Ort in Funktion sehen und ausprobieren. Ich zeige dir den Aufbau und beantworte alle Fragen. Das ist der große Vorteil gegenüber Versandverleihern.",
    pages: ["leinfelden-echterdingen"]
  },
  {
    id: "leinfelden-lieferung",
    question: "Lieferst du auch innerhalb von Leinfelden-Echterdingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine geringe Lieferpauschale auch innerhalb von Leinfelden-Echterdingen. Da du direkt vor Ort wohnst, kannst du die Technik aber auch einfach selbst abholen.",
    pages: ["leinfelden-echterdingen"]
  },
  {
    id: "leinfelden-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Leinfelden-Echterdingen?",
    answer: "Als lokaler Kunde hast du die freie Auswahl: Für kleinere Feiern bis 50 Personen das Partypaket, für mittlere Events bis 150 Personen das DJ-Paket oder Veranstaltungspaket. Du kannst dir die Technik vor Ort anschauen und dann entscheiden!",
    pages: ["leinfelden-echterdingen"]
  },
  {
    id: "leinfelden-parken",
    question: "Gibt es Parkmöglichkeiten an der Magellanstraße 4?",
    answer: "Ja, es gibt ausreichend kostenlose Parkplätze direkt vor dem Gebäude in der Magellanstraße 4. Du kannst also bequem mit dem Auto vorfahren und die Technik einladen.",
    pages: ["leinfelden-echterdingen"]
  },
  // === City-specific FAQs: Leonberg ===
  {
    id: "leonberg-anfahrt",
    question: "Wie komme ich von Leonberg zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Leonberg aus erreichst du mich in ca. 20-25 Minuten über die A8 Richtung Stuttgart/München, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4, direkt an der A8 gelegen.",
    pages: ["leonberg"]
  },
  {
    id: "leonberg-mietbar",
    question: "Kann ich als Kunde aus Leonberg bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Leonberg ist nur ca. 25 km entfernt und über die A8 gut angebunden. Du holst die Technik in Leinfelden-Echterdingen ab und bekommst eine ausführliche Einweisung.",
    pages: ["leonberg"]
  },
  {
    id: "leonberg-lieferung",
    question: "Lieferst du auch nach Leonberg?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Leonberg und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["leonberg"]
  },
  {
    id: "leonberg-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Leonberg?",
    answer: "Das kommt auf deine Gästezahl an: Für bis zu 50 Gäste reicht das Partypaket mit JBL Partyboxen. Für größere Events bis 150 Personen empfehle ich das DJ-Paket oder das Veranstaltungspaket mit voller Sound- und Lichtausstattung.",
    pages: ["leonberg"]
  },
  {
    id: "leonberg-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Leonberg entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 25 km von Leonberg entfernt – eine Fahrtzeit von etwa 20-25 Minuten über die A8.",
    pages: ["leonberg"]
  },
  // === City-specific FAQs: Ludwigsburg ===
  {
    id: "ludwigsburg-anfahrt",
    question: "Wie komme ich von Ludwigsburg zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Ludwigsburg aus erreichst du mich in ca. 25 Minuten über die A81 Richtung Stuttgart, dann A8 Richtung Karlsruhe, Ausfahrt Leinfelden-Echterdingen. Die Magellanstraße 4 liegt direkt an der Ausfahrt.",
    pages: ["ludwigsburg"]
  },
  {
    id: "ludwigsburg-mietbar",
    question: "Kann ich als Kunde aus Ludwigsburg bei euch Technik mieten?",
    answer: "Ja, auf jeden Fall! Ludwigsburg ist ca. 25 km entfernt und über die A81 gut angebunden. Viele Kunden aus dem Landkreis Ludwigsburg mieten bei mir.",
    pages: ["ludwigsburg"]
  },
  {
    id: "ludwigsburg-lieferung",
    question: "Lieferst du auch nach Ludwigsburg?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Ludwigsburg und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["ludwigsburg"]
  },
  {
    id: "ludwigsburg-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Ludwigsburg?",
    answer: "Für Feiern in Ludwigsburg empfehle ich: Das Partypaket mit JBL Partyboxen für kleinere Events bis 50 Personen. Für größere Feiern und Hochzeiten bis 150 Gäste das DJ-Paket oder das Veranstaltungspaket.",
    pages: ["ludwigsburg"]
  },
  {
    id: "ludwigsburg-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Ludwigsburg entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 25 km von Ludwigsburg entfernt – eine Fahrtzeit von etwa 25 Minuten über die A81 und A8.",
    pages: ["ludwigsburg"]
  },
  // === City-specific FAQs: Nürtingen ===
  {
    id: "nürtingen-anfahrt",
    question: "Wie komme ich von Nürtingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Nürtingen aus erreichst du mich in ca. 25 Minuten über die A8 Richtung Stuttgart, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4, direkt an der A8 gelegen.",
    pages: ["nürtingen"]
  },
  {
    id: "nürtingen-mietbar",
    question: "Kann ich als Kunde aus Nürtingen bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Nürtingen ist nur ca. 25 km entfernt. Du holst die Technik in Leinfelden-Echterdingen ab und bekommst eine ausführliche Einweisung vor Ort.",
    pages: ["nürtingen"]
  },
  {
    id: "nürtingen-lieferung",
    question: "Lieferst du auch nach Nürtingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Nürtingen und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["nürtingen"]
  },
  {
    id: "nürtingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Nürtingen?",
    answer: "Das kommt auf deine Gästezahl an: Für bis zu 50 Gäste reicht das Partypaket. Für größere Feiern bis 150 Personen empfehle ich das DJ-Paket oder das Veranstaltungspaket mit professioneller Licht- und Soundtechnik.",
    pages: ["nürtingen"]
  },
  {
    id: "nürtingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Nürtingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 25 km von Nürtingen entfernt – eine Fahrtzeit von etwa 25 Minuten über die A8.",
    pages: ["nürtingen"]
  },
  // === City-specific FAQs: Ostfildern ===
  {
    id: "ostfildern-anfahrt",
    question: "Wie komme ich von Ostfildern zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Ostfildern aus erreichst du mich in ca. 15 Minuten über die B27 Richtung Tübingen/Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4 – für dich als Nachbar sehr schnell erreichbar.",
    pages: ["ostfildern"]
  },
  {
    id: "ostfildern-mietbar",
    question: "Kann ich als Kunde aus Ostfildern bei euch Technik mieten?",
    answer: "Ja, natürlich! Ostfildern ist nur ca. 15 km entfernt. Du kannst die Technik bequem abholen, vor Ort testen und direkt mitnehmen.",
    pages: ["ostfildern"]
  },
  {
    id: "ostfildern-lieferung",
    question: "Lieferst du auch nach Ostfildern?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Ostfildern und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["ostfildern"]
  },
  {
    id: "ostfildern-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Ostfildern?",
    answer: "Für Feiern in Ostfildern empfehle ich: Das Partypaket mit JBL Partyboxen für kleinere Events bis 50 Personen. Für größere Feiern bis 150 Gäste das DJ-Paket mit professionellem Sound und Lichteffekten.",
    pages: ["ostfildern"]
  },
  {
    id: "ostfildern-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Ostfildern entfernt?",
    answer: "Leinfelden-Echterdingen liegt nur ca. 15 km von Ostfildern entfernt – eine Fahrtzeit von etwa 15 Minuten über die B27.",
    pages: ["ostfildern"]
  },
  // === City-specific FAQs: Reutlingen ===
  {
    id: "reutlingen-anfahrt",
    question: "Wie komme ich von Reutlingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Reutlingen aus erreichst du mich in ca. 30 Minuten über die A8 Richtung Stuttgart, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4, direkt an der A8 gelegen.",
    pages: ["reutlingen"]
  },
  {
    id: "reutlingen-mietbar",
    question: "Kann ich als Kunde aus Reutlingen bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Reutlingen ist ca. 40 km entfernt. Über die A8 bist du in 30 Minuten bei mir. Viele Kunden aus der Region Reutlingen mieten bei mir und nehmen die Technik bequem mit.",
    pages: ["reutlingen"]
  },
  {
    id: "reutlingen-lieferung",
    question: "Lieferst du auch nach Reutlingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Reutlingen und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["reutlingen"]
  },
  {
    id: "reutlingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Reutlingen?",
    answer: "Für Feiern in Reutlingen empfehle ich je nach Größe: Das Partypaket (bis 50 Pers.) oder das DJ-Paket (bis 150 Pers.). Für Hochzeiten und größere Events ist das Veranstaltungspaket mit Mischpult, Laser und Moving Heads ideal.",
    pages: ["reutlingen"]
  },
  {
    id: "reutlingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Reutlingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 40 km von Reutlingen entfernt – eine Fahrtzeit von etwa 30 Minuten über die A8.",
    pages: ["reutlingen"]
  },
  // === City-specific FAQs: Sindelfingen ===
  {
    id: "sindelfingen-anfahrt",
    question: "Wie komme ich von Sindelfingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Sindelfingen aus erreichst du mich in ca. 20 Minuten über die A8 Richtung Stuttgart/München, Ausfahrt Leinfelden-Echterdingen. Die Magellanstraße 4 liegt direkt an der Ausfahrt.",
    pages: ["sindelfingen"]
  },
  {
    id: "sindelfingen-mietbar",
    question: "Kann ich als Kunde aus Sindelfingen bei euch Technik mieten?",
    answer: "Ja, auf jeden Fall! Sindelfingen ist nur ca. 20 km entfernt und über die A8 sehr gut angebunden. Viele Kunden aus Sindelfingen und Böblingen mieten bei mir.",
    pages: ["sindelfingen"]
  },
  {
    id: "sindelfingen-lieferung",
    question: "Lieferst du auch nach Sindelfingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Sindelfingen und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["sindelfingen"]
  },
  {
    id: "sindelfingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Sindelfingen?",
    answer: "Für Feiern in Sindelfingen empfehle ich: Das Partypaket mit JBL Partyboxen für kleinere Events bis 50 Personen. Für größere Veranstaltungen bis 150 Gäste das DJ-Paket oder das Veranstaltungspaket.",
    pages: ["sindelfingen"]
  },
  {
    id: "sindelfingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Sindelfingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 20 km von Sindelfingen entfernt – eine Fahrtzeit von etwa 20 Minuten über die A8.",
    pages: ["sindelfingen"]
  },
  // === City-specific FAQs: Stuttgart ===
  {
    id: "stuttgart-anfahrt",
    question: "Wie komme ich von Stuttgart zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Stuttgart aus erreichst du mich in ca. 15 Minuten über die A8 Richtung Karlsruhe, Ausfahrt Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4 – direkt an A8 / B27 gelegen und sehr gut aus der Stuttgarter Innenstadt erreichbar.",
    pages: ["stuttgart"]
  },
  {
    id: "stuttgart-mietbar",
    question: "Kann ich als Stuttgarter bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Stuttgart ist nur 15 km entfernt. Viele meiner Kunden kommen aus Stuttgart – du holst die Technik in Leinfelden-Echterdingen ab, bekommst eine Einweisung und nimmst sie direkt mit.",
    pages: ["stuttgart"]
  },
  {
    id: "stuttgart-lieferung",
    question: "Lieferst du auch nach Stuttgart?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Stuttgart und in die Stuttgarter Innenstadt. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["stuttgart"]
  },
  {
    id: "stuttgart-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Stuttgart?",
    answer: "Für Feiern in Stuttgart empfehle ich je nach Location: Das Partypaket mit JBL Partyboxen für kleinere Events bis 50 Personen. Für anspruchsvolle Events und Hochzeiten bis 150 Gäste das DJ-Paket oder das Veranstaltungspaket mit professionellem Sound.",
    pages: ["stuttgart"]
  },
  {
    id: "stuttgart-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Stuttgart entfernt?",
    answer: "Leinfelden-Echterdingen liegt nur ca. 15 km von Stuttgart entfernt – eine Fahrtzeit von etwa 15-20 Minuten über die A8. Vom Stuttgarter Hauptbahnhof aus erreichst du mich mit dem Auto in ca. 15 Minuten.",
    pages: ["stuttgart"]
  },
  // === City-specific FAQs: Tübingen ===
  {
    id: "tübingen-anfahrt",
    question: "Wie komme ich von Tübingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Tübingen aus erreichst du mich in ca. 30 Minuten über die B27 Richtung Stuttgart/Leinfelden-Echterdingen. Mein Standort ist die Magellanstraße 4, direkt an der B27 / A8 gelegen.",
    pages: ["tübingen"]
  },
  {
    id: "tübingen-mietbar",
    question: "Kann ich als Kunde aus Tübingen bei euch Technik mieten?",
    answer: "Ja, sehr gerne! Tübingen ist ca. 30 km entfernt. Viele Kunden aus Tübingen und dem Landkreis mieten bei mir. Du holst die Technik ab und nimmst sie direkt mit.",
    pages: ["tübingen"]
  },
  {
    id: "tübingen-lieferung",
    question: "Lieferst du auch nach Tübingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Tübingen und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["tübingen"]
  },
  {
    id: "tübingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Tübingen?",
    answer: "Für Feiern in Tübingen empfehle ich: Das Partypaket mit JBL Partyboxen für kleinere Events (WG-Partys, Geburtstage) bis 50 Personen. Für Hochzeiten und größere Feiern bis 150 Gäste das DJ-Paket oder das Veranstaltungspaket.",
    pages: ["tübingen"]
  },
  {
    id: "tübingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Tübingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 30 km von Tübingen entfernt – eine Fahrtzeit von etwa 30 Minuten über die B27 oder A8.",
    pages: ["tübingen"]
  },
  // === City-specific FAQs: Waiblingen ===
  {
    id: "waiblingen-anfahrt",
    question: "Wie komme ich von Waiblingen zu euch nach Leinfelden-Echterdingen?",
    answer: "Von Waiblingen aus erreichst du mich in ca. 25 Minuten über die B14 Richtung Stuttgart, dann A8 Richtung Karlsruhe, Ausfahrt Leinfelden-Echterdingen. Die Magellanstraße 4 liegt direkt an der Ausfahrt.",
    pages: ["waiblingen"]
  },
  {
    id: "waiblingen-mietbar",
    question: "Kann ich als Kunde aus Waiblingen bei euch Technik mieten?",
    answer: "Ja, auf jeden Fall! Waiblingen ist ca. 25 km entfernt. Viele Kunden aus dem Rems-Murr-Kreis und Waiblingen mieten bei mir. Du holst die Technik ab und bekommst eine ausführliche Einweisung.",
    pages: ["waiblingen"]
  },
  {
    id: "waiblingen-lieferung",
    question: "Lieferst du auch nach Waiblingen?",
    answer: "Ja, auf Anfrage liefere ich die Technik gegen eine Lieferpauschale auch nach Waiblingen und Umgebung. Frag einfach bei deiner Buchungsanfrage an!",
    pages: ["waiblingen"]
  },
  {
    id: "waiblingen-empfehlung",
    question: "Welche Technik empfiehlst du für eine Feier in Waiblingen?",
    answer: "Für Feiern in Waiblingen empfehle ich: Das Partypaket mit JBL Partyboxen für kleinere Events bis 50 Personen. Für Hochzeiten und größere Feiern bis 150 Gäste das DJ-Paket oder das Veranstaltungspaket.",
    pages: ["waiblingen"]
  },
  {
    id: "waiblingen-entfernung",
    question: "Wie weit ist Leinfelden-Echterdingen von Waiblingen entfernt?",
    answer: "Leinfelden-Echterdingen liegt ca. 25 km von Waiblingen entfernt – eine Fahrtzeit von etwa 25 Minuten über die B14 und A8.",
    pages: ["waiblingen"]
  },
  // Akku-Party-Paket specific FAQs
  {
    id: "akku-paket-laufzeit",
    question: "Wie lange hält der Akku bei einer Party?",
    answer: "Das Akku-Party-Paket bietet 4-6 Stunden Partylaufzeit, abhängig von der Lautstärke und der Nutzung der Lichteffekte. Die JBL Partyboxen haben eigene Akkus mit bis zu 18h Laufzeit. Die LED BossFX Lichtanlage und PAR-Lichter werden über die Powerstation versorgt. Bei moderater Lautstärke und gedimmten Lichteffekten sind gut 6 Stunden drin.",
    pages: ["akku-party-paket"]
  },
  {
    id: "akku-paket-innen",
    question: "Kann ich das Paket auch drinnen nutzen?",
    answer: "Ja, natürlich! Das Akku-Party-Paket eignet sich auch für Innenräume – besonders praktisch, wenn keine Steckdose in der Nähe ist (z.B. in Garagen, Vereinsheimen, Kellerräumen oder auf Tanzflächen ohne Stromanschluss). Einfach aufbauen, einschalten und loslegen.",
    pages: ["akku-party-paket"]
  },
  {
    id: "akku-paket-wird-versorgt",
    question: "Welche Geräte werden über die Powerstation versorgt?",
    answer: "Die LED BossFX-2 Pro Lichtanlage wird über die EnginStar Powerstation mit Strom versorgt. Die 2x Akku LED PAR Lichter und die JBL Partyboxen laufen komplett eigenständig über ihre integrierten Akkus (JBL bis zu 18 Stunden). Die Powerstation (296Wh / 350W) hat genug Kapazität für einen ganzen Partyabend Lichttechnik.",
    pages: ["akku-party-paket"]
  }
];
