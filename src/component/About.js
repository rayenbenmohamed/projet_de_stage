import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
    return ( 
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4">About Us</h1>
                        <p className="lead mb-4">
                        Bienvenue dans notre monde créatif dédié à l'iPhone ! Chez A&B, notre passion commune nous pousse à explorer et à partager l'univers fascinant de ces bijoux technologiques. Chaque iPhone est bien plus qu'un simple appareil électronique ; c'est une œuvre d'art sophistiquée qui allie ingénierie de pointe et design élégant. Rejoignez-nous dans cette exploration, découvrez les fonctionnalités innovantes, plongez dans l'esthétique raffinée et laissez-vous séduire par la magie de l'iPhone. Explorez, expérimentez et faites de chaque moment une expérience exceptionnelle avec votre fidèle compagnon électronique.
                        </p>
                        <NavLink to="/contact" className="btn btn-outline-primary px-3">Contact Us</NavLink>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src="/img/phone.jpg" alt="About Us" height="400px" width="400px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About