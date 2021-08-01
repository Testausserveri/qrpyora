import aImage from '../../assets/faq/1.png'
import bImage from '../../assets/faq/2.png'
import cImage from '../../assets/faq/3.png'
import PhotoGrid from '../../components/photoGrid/PhotoGrid'

// Questions and Answers
export const qas = [
    {
        q: 'Ketkä ovat tämän takana?',
        a: <p>
            Turret ovat kaiken takana. Paitsi tämän. Tämän takana ovat pari Lappeenrannan reaali- ja porvarikoulun opiskelijaa.
        </p>
    },
    {
        q: 'Miksi teitte QR-pyörän?',
        a: <>
            <p>
                Nykyhetkenä tämä on eräänlainen katutaideteos. Aiemmin QR-pyörässä ei ollut muuta kuin QR-koodit ilman mitään kehotuksia, ja silloin testasimme, että miten ohikulkijat suhtautuvat tähän hämärään kokonaisuuteen.
            </p>
            <p>
                Alunperin ajatuksemme oli juuri tämä - miten ohikulkijat suhtautuvat tähän ihmeelliseen polkupyörään, ja millaisia kuvia he ottaisivat siihen.
            </p>
        </>
    },
    {
        q: 'Saanko pyynnöstä kuvani pois QR-pyörän kuvakokoelmasta?',
        a: <p>
            Tietysti! Laita meille viestiä Telegramin puolella tai sähköpostitse, niin poistamme pyytämäsi kuvan.
        </p>
    },
    {
        q: 'Onko QR-pyörälle kohdistunut ilkivaltaa?',
        a: <div id="ilkivaltaAnswer">
            <p>
                Pyrimme valikoimaan QR-pyörälle mahdollisimman turvalliset sijainnit. Valitettavasti kuitenkin QR-pyörä on aiemmin joutunut ilkivallan kohteeksi esimerkiksi Valtakadulla myöhäisenä baari-iltana. 
            </p>
            <p>
                Olemme miettineet erilaisia suojaus- ja valvontamenetelmiä QR-pyörälle, sekä ottaneet niitä käyttöön.
            </p>
            <PhotoGrid photos={[{
                image: cImage,
                video: '/ilkivalta.mp4'
            }]} columns={1} fullUrl />
        </div>
    },
    {
        q: 'Miten projekti on rahoitettu? Ettehän te kai tee tätä ilmaiseksi?',
        a: <p>
            Toistaiseksi projektin rahoitus on täysin ja ainoastaan tullut tekijöiden omasta pussista. Projektiin ei siis ole ulkoista rahoitusta, emmekä myy kävijöiden dataa tai näytä mainoksia kävijöillemme.
        </p>
    },
    {
        q: 'Miten teitte QR-pyörän?',
        a: <>
            <p>
                Polkupyörä+Vaneria+Maalia = QR-pyörä ✨tadaa✨
            </p>
            <p>
                QR-pyörän rakentaminen alkoi polkupyörästä. Löysimme netistä myynnissä olevan polkupyörän, jonka myyntihinnan onnistuimme tinkimään viiteen euroon. Haimme tämän sinisen, 28-tuumaisen, 7-vaihteisen, Shimano Nexus napavaihteistolla varustetun, kymmenisen vuotta käytössä olleen, Crescent Rissa naisten polkupyörän Pikisaaresta. Viisi euroa lyötiin käteen ja polkupyörä oli meidän.
            </p>
            <p>
                Seuraavat pari päivää polkupyörä ei nähnyt päivänvaloa. Sahasimme vanerilevyt kahdeksi neliönmuotoiseksi levyksi, ja maalasimme niihin QR-koodit. QR-koodit osoittivat tätä tarkoitusta varten juuri rekisteröityyn verkkotunnukseen, jotta voisimme tarpeen tullen vaihtaa sen sisältöä dynaamisesti. Kehitimme high-tech ratkaisun vaneerilevyjen kiinnittämiseen Crescent-parkaan ja QR-pyörä näki ensimmäistä kertaa päivänvalonsa.
            </p>
            <p>
                Odotimme myöhään yöhön päästäksemme siirtämään QR-pyörän sen ensimmäiseen sijaintiin. Hauska juttu ensimmäiseltä ajomatkalta: luultavasti Hobbitti-liikkeen omistaja ajoi autolla vierestä autolla ja huudahti hidastaen autoansa keskellä tietä “kenenkä Bitcoin-lompakko tuohon on merkitty :D”!
            </p>
            <PhotoGrid photos={[aImage, bImage]} columns={2} fullUrl />
        </>
    }
];