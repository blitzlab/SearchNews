import React, { Component } from 'react';
import { Grid, Col, Row, Panel, Image } from 'react-bootstrap';

class About extends Component { 
    render() {
    const imgUrl = 'https://avatars0.githubusercontent.com/u/18278184?s=400&u=4a49fc98490a41c213a639350d3214c2ecd739ba&v=4';

    const bio = 'Hello! I am Adam. A Web Developer that focuses on Back-End Development. Experienced on PHP programming language, Javascript, HTML & CSS, SQL and Some Popular Frameworks Like Laravel, Lumen, NodeJs, Bootstrap, MaterializeCss, and Jquery.Hobbies Cycling, Games, Design and Programming.';

        return ( 
            <Grid>
                <Row>
                    <Panel header='About Me'>
                        <Col md={4}>
                            <Image src={imgUrl} circle style={{'width': '200px', 'height' : '200px'}} />
                        </Col>
                        <Col md={8}>
                            <div style={{'marginTop': '40px'}}>
                                <p>{bio}</p>
                            </div>
                        </Col>
                    </Panel>
                </Row>
            </Grid>
        )
    }
}

export default About;