import React from 'react';
import './Header.css'
import Center from '../center/Center';
import {Link, useLocation} from 'react-router-dom';


/*
export default class Header extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return <>
            
        </>
    }

}*/

const paths = {
    '/': 'Etusivu',
    '/gallery': 'Galleria',
    '/faq': 'UKK'
};

const noHeaderPages = [
    /^\/bikes\/\d*\/.*$/i
]

export default function Header() {
    const { pathname } = useLocation();
    const noHeader = noHeaderPages.some(r => r.test(pathname));

    return noHeader ? null : (
        <Center>
            <header>    
                <div className="logoContainer">
                    <Link to="/">
                        <img alt="QR-pyörä" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        {Object.keys(paths).map(path => (
                            <Link to={path} key={path}>
                                <li className={path === pathname ? 'selected' : null}>
                                    {paths[path]}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </header>
        </Center>
    );
}