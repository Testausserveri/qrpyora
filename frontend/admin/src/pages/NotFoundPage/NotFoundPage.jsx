import Center from "../../components/common/center/Center";
import horseImage from '../../assets/horse.png';
import './NotFoundPage.css';
export default function NotFoundPage() {
    return (
        <Center>
            <div className="notFoundBlock">
                <h2>Nyt ei kyllä löytyny</h2>
                <img src={horseImage} alt="Horse riding a QR-bike" />
            </div>
        </Center>
    )
}