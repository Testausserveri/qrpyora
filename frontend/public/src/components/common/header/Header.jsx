import React from 'react';
import './Header.css'
import logo from '../../../assets/logo.png';
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

export default function Header() {
    const { pathname } = useLocation();
    return (
        <Center>
            <header>    
                <div className="logoContainer">
                    <Link to="/">
                        <img src={logo} alt="QR-pyörä" />
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