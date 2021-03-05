import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap';
import Helmet from '../../../components/Helmet.jsx';
import appConfig from '../../../config/app.js';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <Container>
            <Helmet title="Personvernerklæring" />
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/customer-support">Kundeservice</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Personvernerklæring
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <h1>Personvernerklæring</h1>
                    <p>
                        Denne personvernerklæringen forteller hvordan{' '}
                        {appConfig.owner.name} samler inn og behandler
                        personopplysninger.
                    </p>
                    <p>
                        {appConfig.owner.name}, ved administrerende direktør, er
                        behandlingsansvarlig for virksomhetens behandling av
                        personopplysninger. Den behandlingsansvarlige har det
                        øverste ansvaret for å sikre at all behandling og
                        håndtering av personopplysninger skjer i samsvar med
                        gjeldene lovgivning. Der det daglige ansvaret er
                        delegert, kommer dette frem under hvert enkelt punkt i
                        denne erklæringen. Delegeringen omfatter kun oppgavene
                        og ikke ansvaret.
                    </p>
                    <p>
                        Erklæringen inneholder informasjon om dine rettigheter
                        ved lagring av personopplysninger gjennom et
                        kundeforhold hos {appConfig.owner.name}, og generell
                        informasjon om hvordan vi behandler personopplysninger i
                        henhold til gjeldende personvernlovgivning.
                    </p>
                    <p>
                        {appConfig.owner.name} deler ikke personopplysninger med
                        andre, eller bruker opplysningene til annet formål enn
                        det som er angitt i denne personvernerklæringen.
                    </p>
                    <h2>Personopplysninger</h2>
                    <p>
                        For å gjennomføre et kjøp på {appConfig.owner.name}{' '}
                        trenger vi navn, adresse, mobilnummer og e-post. Dette
                        er nødvendig for å kunne sende din bestilling til riktig
                        leveringsadresse, holde deg oppdatert med
                        ordrebevegelsene samt kontakte deg dersom det skulle
                        være behov i henhold til dine ordre.
                    </p>
                    <p>
                        Vi er pålagt å oppbevare ordreinformasjon i forbindelse
                        med regnskapsføring, avgiftshåndtering og eventuell
                        garanti-/returhåndtering. Denne historikken slettes
                        etter ti år. Vi oppbevarer også IP-adressen som er
                        benyttet ved bestilling av sikkerhetshensyn.
                    </p>
                    <p>
                        For forskjellige formål kan vi trenge andre
                        personopplysninger. Hvilke personopplysninger og
                        formålet med disse er beskrevet her i
                        personvernerklæringen.
                    </p>
                    <h3>Sikring av personopplysninger</h3>
                    <p>
                        {appConfig.owner.name} har gode rutiner og omfattende
                        tiltak for å sikre at uvedkommende ikke får tilgang til
                        dine personopplysninger, og at behandlingen av data
                        skjer i samsvar med kravene i gjeldende lovgivning.
                    </p>
                    <p>
                        Du kan være trygg på at {appConfig.owner.name} lagrer
                        dine personopplysninger på en sikker måte.
                    </p>
                    <h2>Utlevering av varer</h2>
                    <p>
                        Vi samarbeider med Posten for transport av varer. Vi
                        utleverer personopplysninger som er nødvendig for at de
                        skal kunne levere varene til deg. Informasjonen som
                        deles med transportørene er navn, adresse, telefonnummer
                        og ønsket utleveringssted. Opplysningene slettes innen
                        36 måneder.
                    </p>
                    <h2>Betalingsløsninger</h2>
                    <p>
                        Av sikkerhetshensyn oppbevarer vi historikk som
                        inneholder IP-adressen vi mottar ordre fra.
                        Betalingsopplysninger hos {appConfig.owner.name} er:
                        IP-adresse, navn, adresse, e-post og mobiltelefonnummer.
                    </p>
                    <h3>Kortbetalinger</h3>
                    <p>
                        Kortnummer oppbevares ikke utover det som er nødvendig
                        for å sikre effektiv håndtering av eventuelle problemer
                        med belastning, oppheving av reservasjon og kreditering.
                        Det er ikke mulig for {appConfig.owner.name} å se hele
                        ditt kortnummer i noen av våre systemer etter
                        gjennomført kjøp.
                    </p>
                    <p>
                        Velger du kort som betalingsmetode vil
                        betalingsopplysninger og kortopplysninger bli delt med
                        vår betalingsleverandør for kort: Stripe. Betalings- og
                        kortopplysninger blir kun brukt til å utføre en
                        betaling.
                    </p>
                    <p>
                        For å gjøre det enda enklere når du handler, kan du i
                        kassen velge å lagre kortinformasjonen din sikkert. Vår
                        Betalingspartner, Stripe, vil da lagre kortet i sine
                        sikre systemer slik at du kan kjøpe gjennom dette. Vi
                        lagrer ikke kortinformasjonen din utover å referere til
                        det med en identifikator. Senere kjøp på det lagrede
                        kortet er enkle å utføre.
                    </p>
                    <p>
                        Informasjonen du oppgir ved nettbetaling vil kun være
                        knyttet til din kundekonto. Informasjonen er lagret i
                        henhold til gjeldende lover. Hensikten er at du skal
                        slippe å oppgi kortinformasjonen hver gang du foretar et
                        kjøp hos oss.
                    </p>
                    <h2>Informasjonskapsler (Cookies) og pixels</h2>
                    <p>
                        Informasjonskapsler er små tekstfiler som lagres på din
                        enhet når du laster ned en nettside. Disse brukes
                        vanligvis til å forbedre din brukeropplevelse og huske
                        hvem du er, slik at du forblir innlogget.
                    </p>
                    <p>
                        Formålet med informasjonskapsler er å gi nettbutikken
                        grunnleggende funksjonalitet som sesjonshåndtering,
                        analyse, personalisering og markedsføring.
                    </p>
                    <p>
                        Førsteparts informasjonskapsler er nødvendige for at
                        nettsiden skal fungere.
                    </p>
                    <p>
                        Disse informasjonskapslene er det ikke mulig å velge
                        bort, og vårt behandlingsgrunnlag for dette er av
                        berettiget interesse. (GDPR art. 6 f).
                    </p>
                    <p>
                        Tredjeparts informasjonskapsler blir brukt til analyser,
                        markedsføring og personalisering av nettsiden.
                    </p>
                    <p>
                        Vi sporer også deg gjennom dine innloggede økt gjennom
                        google.
                    </p>
                    <p>
                        Generell informasjon om bruk av informasjonskapslene og
                        behandlingsgrunnlag finner du under:
                    </p>
                    <h3>Førstepartscookies</h3>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Cookie</th>
                                <th>Formål</th>
                                <th>Hvilken informasjon lagres?</th>
                                <th>Hvem er databehandler?</th>
                                <th>Hvor lenge lagres informasjonen?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>jwt</td>
                                <td>Kjenne deg igjen</td>
                                <td>Konto ID</td>
                                <td>{appConfig.owner.name}</td>
                                <td>1 måned</td>
                            </tr>
                            <tr>
                                <td>checkout</td>
                                <td>Informasjon om din handlevogn</td>
                                <td>Informasjon om din handlevogn</td>
                                <td>{appConfig.owner.name}</td>
                                <td>1 time</td>
                            </tr>
                            <tr>
                                <td>_dronehandelenId</td>
                                <td>
                                    For å kunne se hvem du er selv om du er
                                    logget ut
                                </td>
                                <td>Bruker id</td>
                                <td>{appConfig.owner.name} og Google</td>
                                <td>2 år</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h3>Tredjepartscookies</h3>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Cookie</th>
                                <th>Formål</th>
                                <th>Hvilken informasjon lagres?</th>
                                <th>Hvem er databehandler?</th>
                                <th>Hvor lenge lagres informasjonen?</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>_ga</td>
                                <td>Forbedre nettstedet</td>
                                <td>
                                    Alt du gjør i nettbutikken, unntatt sensitiv
                                    informasjon som personnummer og
                                    kredittkortnummer
                                </td>
                                <td>Google Analytics</td>
                                <td>38 måneder</td>
                            </tr>
                            <tr>
                                <td>dc_gtm_*</td>
                                <td>
                                    Oversikt over referanser til sporingsscript.
                                </td>
                                <td>
                                    Referanse til hvilket oppsett av
                                    sporingsscript butikken bruker.
                                </td>
                                <td>Google Tag Manager</td>
                                <td />
                            </tr>
                            <tr>
                                <td>_fbp</td>
                                <td>
                                    Used by Facebook to track visits across
                                    websites.
                                </td>
                                <td />
                                <td>Facebook</td>
                                <td>3 months</td>
                            </tr>
                            <tr>
                                <td>_fbc</td>
                                <td>Marketing/Tracking</td>
                                <td>browsing device information</td>
                                <td>Facebook</td>
                                <td>2 år</td>
                            </tr>
                            <tr>
                                <td>__stripe_sid</td>
                                <td>Prevent fraud</td>
                                <td />
                                <td>Stripe</td>
                                <td>30 minutter</td>
                            </tr>
                            <tr>
                                <td>__stripe_mid</td>
                                <td>Prevent fraud</td>
                                <td />
                                <td>Stripe</td>
                                <td>1 år</td>
                            </tr>
                            <tr>
                                <td>crisp-client/*</td>
                                <td>For at chaten skal funke</td>
                                <td />
                                <td>Crisp</td>
                                <td>1 år</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h2>Nyhetsbrev og kommunikasjon</h2>
                    <p>
                        Vi tilbyr nyhetsbrev på epost og/eller SMS. Innholdet i
                        disse vil ofte være tilpasset deg, med relevant
                        informasjon og tilbud. Det er frivillig å motta disse
                        nyhetsbrevene, og du må eksplisitt gi ditt samtykke i
                        forbindelse med kampanje, registrering eller på «min
                        side».
                    </p>
                    <p>
                        Dersom din handel av noen anledning blir avbrutt, sender
                        vi deg en e-post der vi informerer om at vi spart på
                        handlevognen din. Dette gjør vi som en ekstra
                        kundeservice for å gjøre kjøpsopplevelsen hos oss så
                        smidig og enkel som mulig. Du kan takke nei til denne
                        service ved å klikke på linken nederst i e-posten.
                    </p>
                    <p>
                        Vi sender også ut bestillings- og sendingsdokumenter,
                        spørreundersøkelser og oppfølgnings e-post relatert til
                        gjennomførte kjøp hos oss
                    </p>
                    <h2>Endringer i erklæringen</h2>
                    <p>
                        Hvis vi gjør endringer i denne personvernerklæringen,
                        legger vi ut den reviderte versjonen her med en
                        oppdatert revisjonsdato. Vi oppfordrer deg til å se
                        igjennom erklæringen regelmessig. Dersom det blir utført
                        større endringer som vesentlig endrer vår
                        personvernpraksis kan vi også varsle deg på andre måter
                        som f.eks. via e-post, eller på selskapets nettside
                        eller sosiale medier.
                    </p>
                    <h2>Kontaktinformasjon</h2>
                    <p>
                        Har du spørsmål om personopplysninger eller ønsker du at
                        {appConfig.owner.name} skal rette, slette eller utlevere
                        dine opplysninger, så ta kontakt med oss på e-post{' '}
                        <a href={`mailto:${appConfig.supportEmail}`}>
                            {appConfig.supportEmail}
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default PrivacyPolicy;
