import Center from "../center/Center";
import './Footer.css';
import testausserveriLogo from '../../../assets/testausserveri.svg';
export default function Footer() {
    return (
        <>
            <Center wider>
                <hr />
            </Center>
            <Center>
                <footer>
                    <div>
                        <a href="https://testausserveri.fi">
                            <img src={testausserveriLogo} 
                                className="testausserveriLogo"
                                alt="Testausserveri" />
                        </a>
                    </div>
                    <div>
                        <ul className="attributions">
                            <li>QR-pyörän kuvat: <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.fi">CC0 1.0</a></li>
                            <li>Karttadata: <a href="https://openstreetmap.org">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a></li>
                            <li>Karttagrafiikka: <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. </li>
                        </ul>
                    </div>
                </footer>
                
            </Center>
        </>
    );
}