import React from "react";
import Center from "../../components/common/center/Center";

import { qas } from './qas';

import './Faq.css';
import { slug } from "./utils";

function Qa({data}) {
    return (
        <div className="faqBlock" id={slug(data.q)}>
            <h3>{data.q}</h3>
            {data.a}
        </div>
    );
}

export default function Faq({ bikes }) {
    return <>
        <Center>
            <h2>Usein kysytyt kysymykset</h2>
            <p>
                Tälle sivulle olemme koonneet usein kysyttyjä kysymyksiä ja vastauksia niihin. Joitakin kysymyksiä ei oikeasti ole kukaan ikinä kysynytkään, mutta ne saattavat kuitenkin kiinnostaa sinua.
            </p>
            <ul>
                {qas.map(({q}) => (
                    <li><a href={`#${slug(q)}`}>{q}</a></li>
                ))}
            </ul>
            <p>
                Kysy ihmeessä lisää vaikka <a href="https://discord.testausserveri.fi" target="_blank" rel="noreferrer">Discordissa</a>, etenkin jos et löytänyt vastausta kysymykseesi tältä sivulta.
            </p>
        </Center>
        <Center wider>
            <div className="faqContainer">
                {qas.map(qa => <Qa data={qa} />)}
            </div>
        </Center>
    </>
}