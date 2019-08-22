import React from 'react';
import { Card } from 'react-bootstrap';
import './style.sass';
import eddson from '../../images/eddson2.jpg';
import diego from '../../images/cat.jpg';
import john from '../../images/john.jpg';



function About() {
    return (
        <div style={{ display: 'flex', flexDirection:'column',  }}>
            <h1 style={{textAlign:'center', marginTop:'3rem', marginBottom:'3rem'}}> Our Team</h1>
        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'1rem' }}>
            <Card.Img variant="top" src={eddson} />
            <Card.Body>
                <Card.Title>Eddson Blanco</Card.Title>
                <Card.Text>
                I'm from Caracas, Venezuela and I immigrated to the US 4 years ago. I consider myself a creative, driven and very social person.<p>In my spare time, you can catch me on the dance floor dancing Salsa, traveling or playing video games</p>  
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/Eddsonblanco"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        </Card>
        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'1rem' }}>
            <Card.Img variant="top" src={john} />
            <Card.Body>
                <Card.Title>John Lobster</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://linkedin.com/in/eddson-blanco-94a919168/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/Eddsonblanco"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        </Card>
        
        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'1rem' }}>
            <Card.Img variant="top" src={diego} />
            <Card.Body>
                <Card.Title>Diego Solorio</Card.Title>
                <Card.Text>
                After years of doubt, I finally took a shot at coding. It's been a tremendous struggle and journey, but I wouldn't change it one bit.
                </Card.Text>
                <div style={{display:'flex',  }}>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://www.linkedin.com/in/diego-solorio-236374177/"><i className="fab fa-linkedin"></i> </a>
                <a target="_blank" style={{fontSize:'2rem',color:'rgba(133, 183, 59, 1)', marginRight:'1rem'  }} href="https://github.com/diesol49"><i className="fab fa-github-square"></i></a>
                </div>
            </Card.Body>
        </Card>

        <Card  style={{ width: '20rem', margin:'auto',marginBottom:'2rem' }}>
            <Card.Img variant="top" src="https://files.slack.com/files-pri/TEMR3PG85-FMCJFLBQR/039x.jpg" />
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