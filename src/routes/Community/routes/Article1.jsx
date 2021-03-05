import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../../../components/Helmet.jsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Article = styled.div`
    font-size: 1.214rem;
    line-height: 30px;

    p {
        margin: 0 0 1.714rem;
    }

    h1,
    h2,
    h3 {
        margin: 40px 0 22px;
    }
`;
const Article1 = () => {
    return (
        <>
            <Helmet title="Ny til FPV drone? Her er alt du trenger" />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Article>
                            <h1 style={{ fontSize: '2em' }}>
                                Ny til FPV drone? Her er alt du trenger
                            </h1>
                            <p>
                                Vi har lagget denne artikkelen for å hjelpe deg
                                med å navigere deg gjennom utfordringer du møter
                                som nybegynner i FPV verden. Det kan være litt
                                skremmende når du først starter, men belønningen
                                er stor. FPV er meget artig.
                            </p>
                            <h3>Hva er egentlig FPV?</h3>
                            <p>
                                FPV står for "first person view". Det betyr at
                                du ser det dronen ser. Oftest bruker man briller
                                slik at det føles som om man sitter inn i
                                dronen. Det finnes tre forskjellige form for FPV
                                drone: Freestyle, racing og foto. Alle er meget
                                artige.
                            </p>
                            <h2>Hva skal jeg gjøre først?</h2>
                            <p>
                                Du har bestemt deg for at FPV drone er for deg?
                                Er du litt usikker men vil allikevel gå videre
                                uten å bruke for mye penger? Uansett er det
                                første du bør gjøre å fly simulator med ekte
                                kontroller. Kontroller kan du få til under kr
                                2000,- og dermed blir ikke risikoen så stor.
                                Kontrolleren kan du bruke i mange år for den
                                funker både for nybegynnere og gode flygere.
                                Grunnen til a du bør begynne med simulator er at
                                i starten så har man ikke helt kontroll på
                                dronen. Da kræsjer man mye og når man bruker
                                simulator så slipper man å måte fikse på drone
                                hver gang.
                            </p>
                            <h3>Simulatorer</h3>
                            <p>
                                Det finnes flere simulatorer der ute, men her er
                                mine topp valg:
                            </p>
                            <ol>
                                <li>Velocidrone</li>
                                <li>Liftoff</li>
                                <li>FPV Air 2</li>
                            </ol>
                            <p>
                                Du kan egentlig beste selv hvilken du vil bruke
                                da alle er ganske bra simulatorer.
                            </p>
                            <h3>Radiosender</h3>
                            <p>
                                Radiosender sender komandoer som du gir den til
                                dronen. Det finnes ganske mye bra valg der ute
                                men{' '}
                                <Link to="/products/38">
                                    QX 7 kontroller fra frysky
                                </Link>{' '}
                                er et trygt valg. Den er klart mest brukt av
                                nykommere til hobbyen og funker meget bra til å
                                fly simulator.
                            </p>
                            <h2>Bygge første dronen</h2>
                            <p>
                                Når man skal anskaffe sin første dronen er ofte
                                et spørsmål om man skal bygge selv eller kjøpe
                                ferdigbygd. Selv om du har trent mye i
                                simulatoren vil du fortsatt kræsje dronen din,
                                og du vil mest sannsynlig måte fikse den. Hvis
                                du har bygd den så vet du hvordan delene funker
                                sammen og du vil derfor greie å fikse den.
                                Derfor anbefaler du at du bygger din første
                                drone fra bunnen av.
                            </p>
                            <p>
                                Nå må du velge delene som du skal kjøpe. Under
                                er delene du trenger og hva du bør se etter.
                            </p>
                            <h3>Ramme</h3>
                            <p>
                                Ramme er hvor du kommer til å montere alle
                                komponenter og det kommer også til å bestemme
                                ganske mye om hvordan dronen kommer til å se ut.
                                Det er mange rammer der ute men det er viktig å
                                velge noe som har god plass slik at det er
                                lettere å bygge den. Rammen bestemmer også hvor
                                store propeller du kan ha. Som første build er
                                det greit å begynne med 5 inch. Det er det de
                                aller fleste bruker, og du har derfor bra utvalg
                                av komponenter. Min anbefaling som din første
                                ramme er{' '}
                                <Link to="/products/2">TBS source ONE v3</Link>
                            </p>
                            <h3>Flight controller</h3>
                            <p>
                                Flight controller er hjernen til dronen.
                                Mesteparten av komponentene kobles til den og er
                                derfor den mest komplex delen på dronen. Jeg
                                kommer med en anbefaling til det etter å ha vært
                                gjennom neste komponent.
                            </p>
                            <h3>ESC</h3>
                            <p>
                                ESC tar imot kommando fra Flight controller og
                                sender det ut til motorene ved å bestemme hvor
                                fort de skal spinne. De finnes to typer ESC: De
                                vanlige og 4-in-1. 4-in-1 betyr at alle 4 ESC er
                                kombinert til en komponent, mens de vanlige er 1
                                ESC komponent per motor. Vi anbefaler å bruke en
                                4-in-1 esc fordi det er mindre arbeid å bruke
                                en, i tillegg til at de er bedre beskyttet inn i
                                rammen istenfor på armene med en vanlig ESC.
                            </p>
                            <p>
                                For nybegynnere er det ganske vanlig å kjøpe
                                såkalt "stacks" som betyr at du kjøper både en
                                4-in-1 ESC og en Flight controller i sammen
                                pakken. Ved å gjøre det er du sikker på at de to
                                er kompatibel med hverandre. Vi anbefaler{' '}
                                <Link to="/products/13">
                                    T-Motor F7 + F55A Pro Ⅱ 3-6s 4-in-1
                                </Link>{' '}
                                eller{' '}
                                <Link to="/products/135">
                                    Diatone Mamba F722S + F50PRO 50Ax4 3-6S
                                </Link>{' '}
                                om du vil ha noe rimeligere
                            </p>
                            <h3>Motor</h3>
                            <p>
                                De fleste motorer er såkalt "brushless" og
                                funker ved å bruke trefasestrøm til å drive
                                elektromagneter som snurrer motoren. Motorer har
                                to viktige egenskaper som du må se etter. La oss
                                ta et eksempel: 2207 - 1800kv motor. 22 står for
                                diameter og 07 står for høyde. Hvis du velger å
                                gå for 22.2v batteri (såkalt 6S) så vil maks RPM
                                være 22.2 * 1800 = 39960RPM. Av den grunn har
                                batterier som har lavere antall seller høyere
                                KV. Vi har ikke kommet til batterier enda vi
                                antar at du vil bygge drone som skal drives på
                                6S batteri. Ut i fra det anbefaler vi deg en
                                motor mellom 1600 og 1900kv som for eksempel{' '}
                                <Link to="/products/115">
                                    Xing-E 2207 Race Motor 1800kv
                                </Link>
                                .
                            </p>
                            <h3>Propeller</h3>
                            <p>
                                Propellene er koblet direkte til motoren. Det
                                finnes mange forskjellige typer og størrelse.
                                Det er tre viktige egenskaper du må se etter når
                                du kjøper propeller.
                            </p>
                            <ol>
                                <li>Størrelse: hvor lange bladene er</li>
                                <li>Antall blad</li>
                                <li>Pitch: Vinkelen som bladene har</li>
                            </ol>
                            <p>
                                Siden vi bygger for en 5 inch så trenger du 5
                                inch propeller. Pitch er veldig avhengig av folk
                                med 4,5 er en grei pitch til å begynne med.
                                Propeller koster ofter under 50,- og det er
                                derfor ikke så dyrt å utforske. Til slutt er det
                                antall blad og der er det nesten bare 3 blad som
                                gjelder. Ut ifra det anbefaler vi deg{' '}
                                <Link to="/products/78">
                                    HQ Durable Prop 5X4.5X3V1S Light Blue
                                    (2CW+2CCW)
                                </Link>
                            </p>
                            <h3>Radiomottaker</h3>
                            <p>
                                Radiomottaker er delen som vil da imot signaler
                                fra radiosender og sende det videre til flight
                                controller. Det er viktig at du velger en
                                mottaker som er kompatibel med sender. Hvis du
                                har følgt vår anbefaling på sender så er{' '}
                                <Link to="/products/40">
                                    FrSky RXSR S-Bus/CCPM
                                </Link>{' '}
                                et hypperlig valg.
                            </p>
                            <h3>Kamera</h3>
                            <p>
                                Kamera er øyene dine på dronen. Her finnes det
                                utrolig mye å velge mellom. En viktig huskeregel
                                er jo mer informasjon kamera må sender jo mer
                                sannsynlig er det at du får forsynkelser. Kamera
                                er også punktet hvor en stor debatt starter. DJI
                                har HD briller som bare funker med DJI, som er
                                dyr, men som gir HD bilde til brillene. Du kan
                                lese litt mer{' '}
                                <a
                                    href="https://blog.dronetrest.com/should-i-wait-before-buying-the-dji-digital-fpv-goggles-%F0%9F%A4%AF/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    her
                                </a>
                                . Uansett er analogt et trygt valg og det er
                                derfor vi anbefaler{' '}
                                <Link to="/products/50">
                                    RunCam Phoenix Oscar Edition
                                </Link>{' '}
                                til deg.
                            </p>
                            <h3>Videosender</h3>
                            <p>
                                Videosender er det som sender bilder fra dronen
                                til brillene dine. Video sender har en viktig
                                egenskap og det er styrke den kan sende signal
                                på. Det er viktig at du alltid har antenne
                                koblet til den når den er på. Grunnen er at
                                antenne avledder varme vekk fra videosender
                                siden de produserer mye varme. Vi anbefaler{' '}
                                <Link to="/products/1">
                                    TBS Unify Pro32 HV (MMCX)
                                </Link>{' '}
                                da den er både kraftig og robust.
                            </p>
                            <h3>Briller</h3>
                            <p>
                                Det finnes mange ulike typer briller som du kan
                                bruke. Fat shark har vært kongen i mange år og
                                er derfor et trygt valg. Nedsiden ved å velge de
                                er at det er dyre briller og at de krever at du
                                kjøper en videomotakker i tillegg. Briller er
                                ofte den dyreste tingen du kjøper men også den
                                du kommer til å ha lengst. Vi anbefaler{' '}
                                <Link to="/products/15">
                                    Fat Shark Dominator HDO2 FPV Briller
                                </Link>{' '}
                                med denne motakker{' '}
                                <Link to="/products/53">
                                    Immersion Rapidfire FatShark Modul
                                </Link>
                                . Her kan du finne billigere alternativer til
                                fat shark men vi har de desverre ikke enda på
                                lager.
                            </p>
                            <h3>Antenne</h3>
                            <p>
                                For å kunne kommunisere mellom videosender og
                                brillene trenger du minst 2 antenner. Det er
                                viktig at du velger antenner som er kompatibel
                                med videosender, videomottakker og med
                                hverandre. Det finnes flere typer antenner. De
                                vanligste er unidirectional og omnidirectional.
                                Unidirectional betyr at den kommunisere i en
                                spesifikk retning noe som gir lengre rekkevidde
                                akkuratt der og Omnidirectional betyr at den
                                kommunisere like bra i alle retninger men gir
                                dårligere rekkevidde. På dronen må du bruke en
                                omnidirectional antenne mens på brillene kan du
                                velge. Brillene har ofte noe som heter
                                diversity. Det vil si at du kan koble to
                                forskjellig antenne får å kobinere fordellene
                                fra begge. Antenner kan være polarisert på
                                forskjellige måter så om du velger en RHCP
                                antenne så må du bruke det på alle andre
                                antenner. Vi anbefaller derfor følgene oppsett:
                            </p>
                            <ul>
                                <li>
                                    På dronen:{' '}
                                    <Link to="/products/3">
                                        TBS Triumph Pro (MMCX 90°)
                                    </Link>
                                </li>
                                <li>
                                    Brillene:{' '}
                                    <Link to="/products/57">
                                        Foxeer Echo Patch 5.8G RHCP SMA White
                                        (Unidirectional)
                                    </Link>{' '}
                                    og{' '}
                                    <Link to="/products/54">
                                        Immersion Spironet V2 5.8GHz RHCP
                                        Headset Antenna (Omnidirectional)
                                    </Link>
                                </li>
                            </ul>
                            <h3>Batteri</h3>
                            <p>
                                Batteri har tre viktig egenskaper. Det er
                                kapasitet, antall seller og C-Rating. For
                                eksempel "6s 1300mAh -100C" er en 6 sellers
                                batteri med 1300mAh kapasitet og 100 c rating.
                                Det er viktig at du velger batteri som er
                                kompatibel med dronen din. Vi har sagt tidligere
                                i artikkelen at vi bygger for 6S og derfor må vi
                                anbefale det her. Kapasitet bestemmer hvor lenge
                                du kan fly. Jo større kapasitet jo lenger kan du
                                fly, men du får også mye dårligere
                                flyegenskaper. Her gjelder det å finne en bra
                                mellomting så fra 1000mAh til 1500mAh er et bra
                                valg. Til slutt har vi C-rating. Det sier noe om
                                hvor mye strøm batteri kan gi. Med 6S skal du
                                være trygg med 100C. Vi anbefaler at du kjøper{' '}
                                <Link to="/products/26">
                                    6s 1300mAh -100C - CNHL Black Series XT60
                                </Link>
                                .
                            </p>
                        </Article>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Article1;
