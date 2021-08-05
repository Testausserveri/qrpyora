import Center from "../center/Center";
import './Footer.css';
import testausserveriLogo from '../../../assets/testausserveri.svg';
import { MdFavorite } from "react-icons/md";
import { useLocation } from "react-router-dom";

const noFooterPages = [
    /^\/bikes\/\d*\/.*$/i
]

export default function Footer() {
    const { pathname } = useLocation();
    const noFooter = noFooterPages.some(r => r.test(pathname));

    return noFooter ? null : (
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
                            <li><span style={{color: 'red'}}><MdFavorite /></span> Tehneet: Mikael, Toni, Ruben</li>
                        </ul>
                    </div>
                </footer>
                
            </Center>
        </>
    );
}