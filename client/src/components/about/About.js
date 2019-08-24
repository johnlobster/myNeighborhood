import React from 'react';
import { Card } from 'react-bootstrap';
import './style.sass';
import eddson from '../../images/eddson2.jpg';
import diego from '../../images/diego.jpg';
import john from '../../images/john.jpg';
import rob from '../../images/rob.jpg';



function About() {
    return (
          

        <div style={{ display: 'flex', flexDirection:'column',  }}>
            <h1 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}> Our Team</h1>
            <div style={{ display: 'flex', textAlign: 'center', marginTop: '3rem', marginBottom: '3rem', width: '80%', margin: 'auto', fontSize: '0.8rem'}}>
                <p>Going into this project, we're a diverse group from different backgrounds.
                 Each of us had our own weakenesses, but they were outweighed by an individual's strength. The friendship we built, along with the app, was the best part about it.
                 Our last step on becoming a Full Stack developer is this project; we hope you enjoy the app as much as we did creating it.</p>
            </div>
        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'1rem' }}>
            <Card.Img variant="top" src={eddson} />
            <Card.Body>
                <Card.Title>Eddson Blanco</Card.Title>
                <Card.Text>
                I'm from Caracas, Venezuela and I immigrated to the US 2015. I consider myself a creative, driven and very social person.<p>In my spare time, you can catch me on the dance floor dancing Salsa, traveling or playing video games</p>  
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a   style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/Eddsonblanco"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        </Card>
        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'1rem' }}>
            <Card.Img variant="top" src={john} />
            <Card.Body>
                <Card.Title>John Webster</Card.Title>
                <Card.Text>
                    I am from England, but have lived in the US for over 20 years. I have mostly worked as an electronic engineer, specializing in semiconductors. The web is a whole brave new world for me.
                    
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a target="_blank" style={{ fontSize: '2rem', color: 'rgba(133, 183, 59, 1)', marginRight: '1rem' }} href="https://linkedin.com/in/john-webster-3444851/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/johnlobster"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        </Card>
        
        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'1rem' }}>
            <Card.Img variant="top" src={diego} />
            <Card.Body>
                <Card.Title>Diego Solorio</Card.Title>
                <Card.Text>
                It's insane when you always think of things you want to accomplish that it's hard to believe when you're actually doing it. For 10+ years I've always wanted to code and it only took me 6 months to finally see it through. Goes to show - you want something? Get it.
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://www.linkedin.com/in/diego-solorio-236374177/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/diesol49"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        </Card>

        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'4rem' }}>
            <Card.Img variant="top" src={rob} />
            <Card.Body>
                <Card.Title>Rob Ross</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://www.linkedin.com/in/thinksmartrob/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/Sidetrack-CA"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        
        </Card>
        
        </div>





    );
}

export default About;