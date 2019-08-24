import React from 'react';
import './style.sass';
import { Card } from 'react-bootstrap';
 
function Pets() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <h1 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}>Pets in the neighborhood</h1>
            <div style={{ display: 'flex', textAlign: 'center', marginTop: '3rem', marginBottom: '3rem', width: '80%', margin: 'auto', fontSize: '0.8rem'}}>
                <p>Have you seen me? Please contact my owner.</p>
            </div>
            <div className="petcard-wrapper" style={{ display: 'flex', flexWrap: 'wrap', marginBottom:"4rem"}}>
            <Card style={{ width: '10rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80" />
                <Card.Body>
                    <Card.Title>Spunky</Card.Title>
                    <Card.Text style={{fontSize:'0.7rem'}}>
                        Owner: Diego
                        Phone: (530)555-5555
                        Caution: Very dangerous
                </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '10rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80" />
                <Card.Body>
                    <Card.Title>Coscu</Card.Title>
                    <Card.Text style={{fontSize:'0.7rem'}}>
                        Owner: Jo
                        Phone: (530)555-5555
                        Caution: Very dangerous
                </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '10rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1506755855567-92ff770e8d00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80" />
                <Card.Body>
                    <Card.Title>Scrappy</Card.Title>
                    <Card.Text style={{fontSize:'0.7rem'}}>
                        Owner: Eddson
                        Phone: (530)555-5555
                        Caution: Very dangerous
                </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '10rem', margin: 'auto', marginBottom: '1rem' }}>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1562362336-65efec5a264a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80" />
                <Card.Body>
                    <Card.Title>Bill</Card.Title>
                    <Card.Text style={{fontSize:'0.7rem'}}>
                        Owner: Shane
                        Phone: (530)555-5555
                        Caution: Very dangerous
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
            
           

        </div>





    );
}
export default Pets;