import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './style.sass';



function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <h1 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}> Our Team</h1>
            <div style={{ display: 'flex', textAlign: 'center', marginTop: '3rem', marginBottom: '3rem', width: '80%', margin: 'auto', fontSize: '0.8rem'}}>
                <p>We are a diverse group of students from UC Davis with different backgrounds going into this project.
                 We all had weakenesses, but they were outweighed by individual strengths. The friends we made from this was a surprise and the best part about this app.
                 This is our final project towards our goal of becoming a Full Stack developer; we hope you enjoy the app as much as we did creating it.</p>
            </div>
            <Card style={{ width: '20rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=280&q=80" />
                <Card.Body>
                    <Card.Title>Eddson Blanco</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                </Card.Text>
                    <div style={{ display: 'flex', }}>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i class="fab fa-linkedin"></i> </a>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://github.com/Eddsonblanco"><i class="fab fa-github-square"></i></a>
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ width: '20rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=280&q=80" />
                <Card.Body>
                    <Card.Title>Eddson Blanco</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                </Card.Text>
                    <div style={{ display: 'flex', }}>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i class="fab fa-linkedin"></i> </a>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://github.com/Eddsonblanco"><i class="fab fa-github-square"></i></a>
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ width: '20rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=280&q=80" />
                <Card.Body>
                    <Card.Title>Eddson Blanco</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                </Card.Text>
                    <div style={{ display: 'flex', }}>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i class="fab fa-linkedin"></i> </a>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://github.com/Eddsonblanco"><i class="fab fa-github-square"></i></a>
                    </div>
                </Card.Body>
            </Card>
            <Card style={{ width: '20rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1559548331-f9cb98001426?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=280&q=80" />
                <Card.Body>
                    <Card.Title>Eddson Blanco</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                </Card.Text>
                    <div style={{ display: 'flex', }}>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i class="fab fa-linkedin"></i> </a>
                        <a style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://github.com/Eddsonblanco"><i class="fab fa-github-square"></i></a>
                    </div>
                </Card.Body>
            </Card>

        </div>





    );
}

export default About;