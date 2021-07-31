import React from "react";
import Center from "../../components/common/center/Center";

import { qas } from './qas';

import './Faq.css';

function Qa({data}) {
    return (
        <div className="faqBlock">
            <h3>{data.q}</h3>
            {data.a}
        </div>
    );
}

export default function Faq({ bikes }) {
    return <>
        <Center>
            <h2>Usein kysytyt kysymykset</h2>
        </Center>
        <Center wider>
            <div className="faqContainer">
                {qas.map(qa => <Qa data={qa} />)}
            </div>
        </Center>
    </>
}