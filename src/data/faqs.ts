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
    pages: ["index", "vermietung"]
  },
  {
    id: "pa-anlage-50-personen",
    question: "Welche PA-Anlage eignet sich für 50 Personen?",
    answer: "Für Veranstaltungen mit 50-80 Personen empfehle ich unsere JBL Partyboxen oder das LD Maui 28 G3 Komplettset. Beide sind Plug & Play und in 5 Minuten aufgebaut.",
    pages: ["index", "vermietung"]
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
    pages: ["index", "vermietung"]
  },
  {
    id: "nebelmaschine-pakete",
    question: "Bietest du auch Pakete mit Nebelmaschine?",
    answer: "Ja, ich biete die Partylichtanlagen auch zusammen mit einer Nebelmaschine an. Das Komplettpaket gibt es ab 60€ pro Tag.",
    pages: ["index", "vermietung"]
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
    pages: ["index", "vermietung"]
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
    answer: "Im Mietpaket enthalten sind: 1x JBL Partybox 300, 1x JBL Partybox 320, 2x Stromkabel und 1x Verbindungskabel (5m) für die Kopplung der 2 Boxen. Bei Bedarf lege ich noch ein Verbindungskabel für die Zuspielung von Musik über einen Laptops bei. Alles was du für den Start brauchst!",
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
    answer: "Das DJ-Paket Fildern eignet sich ideal für: Hochzeiten (bis 150 Gäste), Firmenfeiern, Vereinsfeiern, DJ-Gigs, größere Gartenfeste und Partys. Es bietet professionellen Sound und eine beeindruckende Lichtshow. DAs DJ-Paket ist perfekt, wenn du selbst als DJ auftrittst oder der DJ seinen eigenen DJ-Mixer mitbringt und eine professionelle Sound- und Lichtanlage benötigt.",
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
    answer: "Ja, das Partypaket kann auch im Außenbereich genutztzt werden. Die JBL Partyboxen sind zwar nicht wasserdicht, aber bei trockenem Wetter problemlos im Garten einsetzbar. Achte darauf, dass die Elektronik vor Regen geschützt wird.",
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
    answer: "Im Mietpreis inbegriffen sind alle notwendigen Kabel: 2x Stromkabel und 2x XLR-Kabel (5m). Achte darauf, dass Dein Mischpult XLR-Ausgänge hat oder miete das Yamaha Mischpult dazu.",
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
  }
];
