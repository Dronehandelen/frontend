import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from 'reactstrap';
import appConfig from '../../../config/app.js';
import Helmet from '../../../components/Helmet.jsx';
import { Link } from 'react-router-dom';

const OrderTerms = () => {
    return (
        <Container>
            <Helmet title="Salgsbetingelser" />
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/customer-support">Kundeservice</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Prismatch</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <h1>Salgsbetingelser</h1>
                    <h2>1. Generelt</h2>
                    <p>
                        Salgsbetingelsene gjelder for salg av varer og tjenester
                        på {appConfig.appNameDomain} til forbrukere.
                    </p>
                    <p>
                        <strong>Selger er:</strong> {appConfig.appName} (
                        {appConfig.owner.name}).
                    </p>
                    <p>
                        <strong>Kjøper er:</strong> Den person som er oppgitt
                        som kjøper i bestillingen, og blir i det følgende
                        benevnt du, deg (og tilsvarende benyttes betegnelser som
                        din eller ditt).
                    </p>
                    <p>
                        {appConfig.appNameDomain}: Selve
                        nettbutikken/plattformen som er knyttet til domenet{' '}
                        {appConfig.appNameDomain}.
                    </p>
                    <p>
                        På {appConfig.appNameDomain} kan du kjøpe varer og
                        tjenester direkte av {appConfig.appName}. For å utføre
                        kjøp på {appConfig.appNameDomain} må du akseptere
                        vilkårene i denne avtalen, og følge disse i sin helhet.
                    </p>
                    <p>
                        Salgsbetingelsene vil sammen med din bestilling og
                        bestillingsbekreftelse, utgjøre et samlet avtalegrunnlag
                        for kjøpet.
                    </p>
                    <p>
                        Er du under 18 år, kan du bare handle, hvis du har eget
                        bankkort (debetkort) som kan brukes til det. Du kan ikke
                        benytte de andre betalingsmåtene som gjelder. Du kan
                        også få en foresatt til å gjøre handelen for deg.
                    </p>
                    <p>Vi leverer kun til Fastlands-Norge og Svalbard.</p>
                    <p>
                        {appConfig.appNameDomain} vil ta betalt for varer med
                        mva.
                    </p>
                    <p>
                        Alle varer levert av {appConfig.appNameDomain} kan
                        brukes i Norge.
                    </p>
                    <p>
                        Forbrukerkjøp er blant annet regulert av
                        forbrukerkjøpsloven, angrerettloven,
                        markedsføringsloven, personopplysningsloven,
                        e-handelsloven og kredittkjøpsloven. Du finner disse
                        lovene på{' '}
                        <a
                            href="https://lovdata.no/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://lovdata.no/
                        </a>
                        .
                    </p>
                    <p>
                        Dersom du kontakter {appConfig.appNameDomain} via e-post
                        lagres din e-post henvendelse og kontaktinformasjon hos
                        oss, kontakter du {appConfig.appNameDomain} via telefon
                        lagres ditt telefonnummer hos oss. Denne informasjonen
                        er nødvendig for å kunne gjennomføre din henvendelse og
                        for å kunne kontakte deg hvis det skulle være behov for
                        oppfølging.
                    </p>
                    <p>
                        Når du logger inn på {appConfig.appNameDomain} vil du på
                        den brukte enheten bli værende innlogget i opptil 365
                        dager
                    </p>
                    <h2>2. Bestillings- og avtaleprosess</h2>
                    <p>
                        Din bestilling er bindende når bestillingen er
                        registrert hos oss. Vi er samtidig bundet av din
                        bestilling hvis denne ikke avviker fra det som er
                        tilbudt av oss i vår nettbutikk, vår markedsføring eller
                        på annen måte. Du har likevel rett til å gå fra kjøpet i
                        henhold til lov om angrerett, se nærmere avtalens pkt.
                        6.
                    </p>
                    <p>
                        {appConfig.appNameDomain} er bundet av den prisen som er
                        opplyst til deg ved utsjekk fra kassen, se også punkt 3
                        nedenfor.
                    </p>
                    <p>
                        Ved avvik på vårt lager eller hvis en vare er utsolgt
                        kan din bestilling, eller deler av den bli kansellert.
                        Ved en slik situasjon vi du få melding om dette,
                        eventuelt sammen med informasjon om hva vi kan tilby i
                        stedet.
                    </p>
                    <p>
                        {appConfig.appNameDomain} vil sende en ordrebekreftelse
                        når bestillingen er foretatt. Selger må deretter gi deg
                        beskjed, hvis noe er utsolgt. Dine kvitteringer fra
                        Selger vil bli levert til deg ved at de blir lastet opp
                        på «Min Side/Ordreoversikt», på den antatte
                        leveringsdatoen, uavhengig av hvilken betalingsmåte som
                        er valgt.
                    </p>
                    <h2>3. Priser</h2>
                    <p>
                        Alle priser er inkludert merverdiavgift. Totalkostnaden
                        for kjøpet vil fremkomme før fullføring av en bestilling
                        og inkludere alle utgifter forbundet med kjøpet som
                        utgifter til porto, frakt, emballasje m.m.
                    </p>
                    <p>
                        Ved kjøp av varer fra {appConfig.appNameDomain} ved
                        leveranser til steder der det ikke skal betales
                        merverdiavgift, vil prisene likevel være inklusive mva,
                        som evt. må refunderes i etterkant.
                    </p>
                    <p>
                        Prisene er i stadig forandring og vi tar forbehold om
                        prisendringer frem til gjennomføringen av hvert enkelt
                        kjøp, som følge av endrede priser fra våre leverandører
                        eller valutaendringer.
                    </p>
                    <h2>4. Betaling</h2>
                    <p>
                        Kjøpesummen kan gjøres opp gjennom bank- eller
                        kredittkort.
                    </p>
                    <p>
                        Kjøpesummen bli reservert på kortet ved bestilling. Det
                        vil si ved fullføring av checkout. Kortet blir belastet
                        samme dag som bestilling blir foretatt. Uavhentede og
                        ikke-betalte pakker vil bli belastet et gebyr på kr 250
                        + frakt tur/retur av gjeldende ordre, for å dekke våre
                        utlegg.
                    </p>
                    <p>
                        Ved manglende betaling vil kravet, etter forutgående
                        varsel, bli sendt til inkasso.
                    </p>
                    <h2>5. Levering</h2>
                    <p>
                        Alle generelle leveringstider som er oppgitt på
                        {appConfig.appNameDomain} må anses som veiledende. Når
                        leveringstid er oppgitt i antall dager, menes hverdager,
                        og befrakters tid kommer alltid i tillegg. Selger
                        forbeholder seg retten til å endre oppgitt generell
                        leveringstid uten nærmere varsel.
                    </p>
                    <p>
                        Dersom det har forekommet skrive- eller trykkfeil av
                        vesentlig størrelse fra {appConfig.appNameDomain} i
                        annonser o.l. og/eller i generelle presentasjoner i,
                        nettbutikken som er større enn 15% av normal
                        utsalgspris, kan {appConfig.appNameDomain}
                        ensidig slette eller avvise ordre. Slike feil må
                        imidlertid korrigeres i løpet av rimelig tid etter at
                        feilen er oppdaget.
                    </p>
                    <p>
                        Dersom leveringen av produktene blir forsinket, vil
                        {appConfig.appName} gi deg informasjon så fort vi har
                        kunnskap om det, sammen med informasjon om og eventuelt
                        når levering kan skje, eller om produktet(ene) er
                        utsolgt.
                    </p>
                    <p>
                        Dersom leveringen blir forsinket har du rett til å heve
                        kjøpet. Ved heving av kjøp grunnet forsinket levering,
                        vil vi tilbakebetale kjøpesummen innen 14 dager.
                        Tilbakebetalingen av kjøpesummen skjer ved samme
                        betalingsmiddel som du benyttet ved bestilling.
                    </p>
                    <p>
                        Levering av produktene skjer på den måte, på det sted og
                        på eller innen det tidspunkt som er avtalt (se punkt 1
                        og 2 ovenfor). {appConfig.appName} har ansvar for
                        produktene inntil de overtas av deg, det vil si når du
                        har fått produktene i din besittelse.
                    </p>
                    <p>
                        Etter at du har mottatt produktene bør du så snart du
                        har anledning til det, undersøke om leveransen er i
                        samsvar med sendingsbekreftelsen. Undersøk om produktene
                        er blitt skadet under transporten, eller om produktene
                        ellers har feil eller mangler. Hvis det under transport
                        har oppstått skade på sendingen, eller det du har
                        mottatt ikke stemmer overens med det du har bestilt, så
                        vær snill å kontakte oss så raskt som mulig. Ta vare på
                        emballasje og produkt til saken er ferdig behandlet og
                        du har fått tilbakemelding fra oss.
                    </p>
                    <p>
                        Eventuelle prisendringer som skjer etter
                        bestillingstidspunkt, får ikke tilbakevirkende kraft.
                    </p>
                    <p>
                        Bruksanvisning vil følge med eller være tilgjengelig på
                        produsentens hjemmeside.
                    </p>
                    <h2>6. Angrerett</h2>
                    <p>
                        Angrerettloven gir deg rett til å angre ditt kjøp.
                        Angreretten gjelder for varer og for enkelte tjenester
                        (se unntak i siste avsnitt). Angreretten forutsetter at
                        du senest innen 14 dager etter at du mottar leveransen
                        gir Selgeren av leveransen melding om dette
                        (angrefrist).
                    </p>
                    <p>
                        Ta kontakt og informer om at du ønsker å benytte
                        angreretten. Vi kan kontaktes på chat.
                    </p>
                    <p>
                        For at angreretten skal kunne gjøres gjeldende, må
                        produktet være tilbakelevert til Selger av produktet i
                        tilnærmet samme mengde og stand som du mottok den.
                        Dersom du bruker eller undersøker varen(e) på en måte
                        som går utover hva som er nødvendig for å fastslå varens
                        art, egenskaper og funksjon og dette medfører at varen
                        reduseres i verdi, kan Selgeren trekke fra et beløp
                        tilsvarende verdireduksjonen i kjøpesummen som skal
                        tilbakebetales.
                    </p>
                    <p>
                        Alle produkter skal leveres tilbake til Selgeren innen
                        rimelig tid ved bruk av angreretten. Kjøperen har
                        risikoen for transporten av varen tilbake til Selgeren.
                    </p>
                    <p>
                        Selgeren er forpliktet til å betale tilbake til deg det
                        du har betalt, inkludert porto for forsendelsen,
                        ekspedisjonsgebyr, tollavgifter, oppkravsgebyr, etc.
                        Dette gjelder kun når hele kjøpet returneres. Hvis du
                        uttrykkelig har valgt en spesiell frakt utover hva som
                        er nødvendig for å frakte varen, skal dette betales av
                        deg.
                    </p>
                    <p>
                        Kjøperen skal selv betale for frakt tilbake til Selgeren
                        når angrerett benyttes.
                    </p>
                    <p>
                        Tilbakebetaling skal finne sted innen 14 dager etter at
                        Selger har mottatt angremeldingen, men likevel ikke før
                        2 dager etter at Selgeren har mottatt returen fra deg,
                        eller dokumentasjon fra deg for at du har sendt returen
                        tilbake til Selger. Produktet sendes tilbake til
                        Selgeren i originalemballasjen, sammen med utfylt
                        angrerettskjema. Returen skal gjøres til Selger i
                        samsvar med gjeldnede vilkår.
                    </p>
                    <p>
                        Tilbakebetalingen av kjøpesummen skjer ved samme
                        betalingsmiddel som du benyttet ved bestilling, om ikke
                        annet er avtalt eller det finnes hinder for
                        tilbakebetaling ved benyttet betalingsmetode.
                    </p>
                    <p>
                        Nærmere opplysninger om hvordan du benytter deg av
                        angreretten, fremgår av angrerettskjemaet.
                    </p>
                    <p>Angreretten gjelder ikke for følgende typer varer:</p>
                    <p>
                        Angreretten gjelder ikke ved kjøp av produkter i
                        elektronisk format (lyd- eller bildeopptak,
                        datamaskinprogram, wordfiler, pdf-filer ol.) idet du har
                        mottatt den elektroniske forsendelsen med filen på din
                        server eller lisenskode/-informasjon er gjort
                        tilgjengelig.
                    </p>
                    <p>
                        Angreretten gjelder heller ikke når det for øvrig følger
                        av loven. Vennligst les våre mer detaljerte opplysninger
                        om angrefristen som ligger i en egen link på våre sider.
                    </p>
                    <h2>7. Forsinkelse av leveransen</h2>
                    <p>
                        Dersom Selgeren ikke leverer varen, eller leverer den
                        for sent i henhold til avtalen, og dette ikke skyldes
                        deg eller forhold på din side, kan du i henhold til
                        reglene i forbrukerkjøpsloven kapittel 5 etter
                        omstendighetene holde kjøpesummen tilbake, kreve
                        oppfyllelse, heve avtalen eller kreve erstatning fra
                        Selger.
                    </p>
                    <p>
                        Ved forsinkelse må krav rettes til Selgeren innen
                        rimelig tid.
                    </p>
                    <h2>8 Reklamasjon og garanti</h2>
                    <p>
                        Hvis det oppdages en feil eller mangel, må du innen
                        rimelig tid etter at du oppdaget, eller burde oppdaget
                        den, gi Selger melding om at du vil påberope deg
                        mangelen (reklamasjon). Fristen for å reklamere er
                        allikevel ikke kortere enn to måneder fra det tidspunkt
                        da du oppdaget mangelen. Reklamasjon må uansett senest
                        skje to år etter at du overtok varen. Dersom varen eller
                        deler av den ved vanlig bruk er ment å vare vesentlig
                        lengre, er den seneste fristen for å reklamere fem år.
                        Hvis du ikke reklamerer i tide, tapes retten til å gjøre
                        mangelen gjeldende.
                    </p>
                    <p>
                        Melding om feil og mangler ved produktene kan
                        overbringes Selgeren muntlig eller skriftlig. Av
                        bevishensyn anbefaler vi at reklamasjonen sendes Selgere
                        skriftlig, primært ved å ta kontakt med Selger på
                        e-post.
                    </p>
                    <p>
                        Du vil få en bekreftelse på mottak av
                        reklamasjonshenvendelsen, som vil komme på mail til den
                        mailadressen du har registrert inne på kontosiden "Min
                        side". I bekreftelsen vil det også bli informert om det
                        kreves spesielle vilkår/håndtering fra kjøpers side ifm.
                        retursending av varen. (f.eks. antistatisk beskyttelse
                        eller retur direkte til produsent).
                    </p>
                    <p>
                        Dersom det foreligger en mangel ved varen og dette ikke
                        skyldes deg eller forhold på din side, og du har
                        reklamert innen de nevnte fristene kan du i henhold til
                        reglene i forbrukerkjøpsloven kapittel 6:
                    </p>
                    <ul>
                        <li>
                            holde hele eller deler av kjøpesummen tilbake (hvis
                            den ikke allerede er betalt)
                        </li>
                        <li>
                            under visse forutsetninger velge mellom retting
                            eller omlevering
                        </li>
                        <li>under visse forutsetninger kreve prisavslag</li>
                        <li>under visse forutsetninger kreve erstatning</li>
                        <li>
                            kreve heving, dersom mangelen ikke er uvesentlig
                            (det er normalt en forutsetning for heving at varen
                            returneres i samme stand og mengde, jf.
                            forbrukerkjøpsloven § 51)
                        </li>
                    </ul>
                    <p>
                        Dersom det ikke foreligger en mangel, kan Selger bare
                        kreve betaling for undersøkelser som har vært nødvendige
                        for å avgjøre om det foreligger en mangel, og betaling
                        for reparasjon av varen, dersom vi har gjort deg
                        uttrykkelig oppmerksom på at du selv må dekke slike
                        kostnader, Forbrukerkjøpsloven § 30.
                    </p>
                    <p>
                        Hvis du på eget initiativ iverksetter tiltak for å
                        utbedre mangelen ut over det som måtte være avtalt med
                        Selgeren, betaler Selgeren ikke disse utgiftene.
                    </p>
                    <p>
                        Selgeren forbeholder seg retten til å avvise en
                        reklamasjon om det viser seg at varen ikke har noen
                        mangel etter gjeldende forbrukerlovgivning.
                    </p>
                    <p>
                        Selger kan reparere en vare 2 ganger for samme feil. Ved
                        samme feil 3 ganger kan kjøper kreve penger tilbake.
                        Beløpet vil tilbakebetales innen 14 dager.
                    </p>
                    <p>
                        Selgeren står for returfrakt for godkjente
                        reklamasjoner.
                    </p>
                    <p>
                        Hvis Selgerens retting eller omlevering vil medføre at
                        du, ved normal postgang/forsendelsestid blir avskåret
                        fra å bruke varen i mer enn ti dager, har du under visse
                        forutsetninger rett til å kreve å få stilt en
                        erstatningsgjenstand til rådighet for Selgerens regning.
                    </p>
                    <p>
                        Hvis du sender inn ditt produkt til en av{' '}
                        {appConfig.appNameDomain} sine servicepartnere, eller{' '}
                        {appConfig.appNameDomain} sender ditt produkt videre til
                        servicepartner, kan servicepartner ta kontakt med deg
                        som kunde direkte.
                    </p>
                    <p>
                        Dersom du ber oss slette din kundekonto, slettes også
                        all kjøpshistorikk. Det er viktig at du tar vare på
                        kvitteringer for dine kjøp i forbindelse med eventuell
                        fremtidig reklamasjon. Uten kvittering kan ikke
                        garanti/reklamasjon benyttes. Dersom det etter sletting
                        av kundekonto skulle oppstå behov for retur av vare til
                        oss i forbindelse med reklamasjon, må det opprettes en
                        ny kundekonto for at vi skal ha mulighet til å håndtere
                        reklamasjonen.
                    </p>
                    <h2>9. Betaling med kort</h2>
                    <p>
                        Vi forplikter oss i utgangspunktet ikke til å oppbevare
                        kortnummer utover det som er nødvendig for å sikre
                        effektiv håndtering av eventuelle problemer med
                        belastning, oppheving av reservasjon og kreditering.
                    </p>
                    <p>
                        For å gjøre det enklere å handle hos oss neste gang kan
                        du, ved betaling i kassa, selv velge å lagre
                        kortinformasjonen din sikkert hos oss. Det er viktig at
                        du logger deg ut av kundekontoen din når du har
                        avsluttet handelen. Du er selv ansvarlig for ikke å dele
                        brukernavn og passord med andre. For å utføre betalingen
                        videreformidler vi dine opplysninger til vår
                        betalingsleverandør Stripe. De oppbevarer informasjonen
                        på en sikker og forsvarlig måte.
                    </p>
                    <h2>10. Retningslinjer for personvern</h2>
                    <p>
                        Ved å akseptere våre salgsbetingelser gir du også ditt
                        samtykke til å oppbevare og behandle dine
                        personopplysninger.
                    </p>
                    <p>
                        Ved å akseptere våre salgsbetingelser aksepterer du også
                        vår personvernerklæring.
                    </p>
                    <p>
                        Vennligst les våre retningslinjer for personvern som
                        ligger i en link nederst på våre sider.
                    </p>
                    <p>
                        Dersom du velger å skrive en produkt- eller
                        partneromtale(review) vil omtalen og navnet du velger å
                        bruke bli gjort synlig for andre kunder.
                    </p>
                    <h2>11 Personalisering og profilering</h2>
                    <p>
                        Ved å akseptere salgsbetingelsene og bli en kunde hos
                        {appConfig.appName} godtar du at vi personaliserer
                        innholdet på web-siden basert på dine bevegelser og
                        historikk, samt at dataene brukes til å legge deg inn i
                        en interesse gruppe, slik at du mottar relevant
                        markedsføring på eksterne web sider.
                    </p>
                    <p>
                        Dette gjør vi ved hjelp av eksterne og interne
                        informasjonskapsler og systemer, blant annet ved å
                        analysere info om hvordan du benytter nettstedet, hvilke
                        produkter du ser på, hva du har kjøpt og hva du er
                        interessert i.
                    </p>
                    <h2>12. Salgspant</h2>
                    <p>
                        {appConfig.appNameDomain} har, med mindre noe annet er
                        avtalt, salgspant i de leverte produkter som sikkerhet
                        for kjøpesummen, inkludert renter og omkostninger,
                        inntil disse er betalt i sin helhet, jfr. pantelovens §
                        3-14 flg.
                    </p>
                    <h2>13. Kundens plikter</h2>
                    <p>
                        Den som er registrert som kunde hos{' '}
                        {appConfig.appNameDomain}, er ansvarlig for betaling av
                        de ytelser {appConfig.appNameDomain} leverer i henhold
                        til nærværende vilkår. Ansvaret omfatter også andres
                        bruk av kundens tilgang, herunder uvedkommendes bruk, så
                        fremt det ikke kan påvises at uvedkommendes bruk er
                        muliggjort gjennom uaktsomhet fra{' '}
                        {appConfig.appNameDomain} sin side. Du som kunde er også
                        ansvarlig for å sikre at opplysninger som er oppgitt på
                        din konto er korrekte. Disse opplysningene kan
                        administreres på «min side».
                    </p>
                    <h2>14. Ekstraordinære forhold</h2>
                    <p>
                        Selger er kun ansvarlig for verditap for varen, dersom
                        det er påvist feil eller mangler. Dette gjelder likevel
                        ikke hvis vi godtgjør at mangelen skyldes forhold
                        utenfor vår kontroll, og som vi ikke med rimelighet
                        kunne forventes å unngå eller overvinne følgene av.
                    </p>
                    <p>
                        Selger er ikke ansvarlig for indirekte tap som følge av
                        mangler med mindre tapet er voldt ved grov uaktsomhet
                        eller forsett fra Selgers side.
                    </p>
                    <p>
                        Ved forbrukerkjøp kan ikke vilkårene være dårligere enn
                        vilkårene i loven, jfr. Lov om forbrukerkjøp av
                        2002-06-21 nr. 34.
                    </p>
                    <h2>15. Endring i vilkårene</h2>
                    <p>
                        Vi forbeholder oss retten til å endre nærværende vilkår,
                        herunder som følge av endringer i lovgivningen.
                    </p>
                    <h2>16. Force majeure</h2>
                    <p>
                        Er vi forhindret fra å levere eller foreta pliktig
                        omlevering, eller blir en slik leveringsplikt urimelig
                        tyngende som følge av arbeidskonflikt eller enhver annen
                        omstendighet når partene ikke kan råde over den, så som
                        ved brann, krig, mobilisering eller uforutsette militære
                        innkallelser av tilsvarende omfang, rekvisisjon, beslag,
                        valuta- restriksjoner, opprør og oppløp, knapphet på
                        transportmidler, alminnelig vareknapphet, innskrenkning
                        i tilførselen av drivstoff, samt mangler ved eller
                        forsinkelser av leveranser fra underleverandører eller
                        produsenter som følge av slike omstendigheter som
                        omhandles i dette punkt, er Selgere fritatt for alt
                        annet ansvar enn i reklamasjonstilfeller og kreditere
                        den til den mangelfulle vares tilhørende kjøpesum.
                    </p>
                    <h2>17. Tvister og lovvalg</h2>
                    <p>
                        Tvister i anledning betingelsene og tilhørende
                        bestemmelser, samt tvister som ellers angår handel på
                        {appConfig.appNameDomain} følger norsk rett og hører inn
                        under de ordinære tvisteløsningsorganer og domstoler,
                        med Salten tingrett som verneting ved eventuell
                        behandling for tingrett.
                    </p>
                    <p>
                        Dersom du ønsker å klage over en vare eller tjeneste
                        kjøpt hos oss, kan du inngi klage til forbrukerrådet
                        eller via EUs nettplattform for tvisteløsning
                        (ODR-portalen). Forbrukerrådet er et statlig
                        forvaltningsorgan som veileder forbrukere og megler i
                        tvist mellom forbruker og næringsdrivende.
                    </p>
                    <div>Forbrukerrådet</div>
                    <div>Fred Olsens gate 1</div>
                    <div>0152 Oslo</div>
                    <p>https://www.forbrukerradet.no/</p>
                    <p>
                        ODR-portalen er en nettbasert klageportal levert av
                        EU-kommisjonen og gir tilgang til tvisteløsningsverktøy.
                        Det er særlig relevant hvis du er forbruker bosatt i et
                        annet EU-land.
                    </p>
                    <p>
                        https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=NO
                    </p>
                    <p>
                        <strong>Copyright</strong>
                    </p>
                    <p>
                        Alt innhold på disse nettsidene er{' '}
                        {appConfig.owner.name}
                        sin eiendom, og er beskyttet etter bl.a. opphavsretts-,
                        markedsførings- og varemerkelovgivningen. Dette
                        innebærer at varemerker, firmanavn, produktnavn,
                        informasjon om produkter, herunder bl.a. omtale av
                        produktene og vekt, bilder/grafikk, design og layout og
                        annet innhold på disse nettsidene under enhver
                        omstendighet ikke kan lastes ned, kopieres eller
                        benyttes på annen måte uten at dette er eksplisitt
                        tillatt etter ufravikelig lovgivning eller etter
                        uttrykkelig skriftlig forhåndssamtykke fra{' '}
                        {appConfig.appName}.
                    </p>
                    <p>Sist oppdatert 27.04.20</p>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderTerms;
