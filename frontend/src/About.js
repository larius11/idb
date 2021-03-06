import React from 'react'
import {Row, Col, Panel, Button, Modal, Well} from 'react-bootstrap'
import axios from 'axios';

/* Inline styles for the various components */

var imageStyles = {
    width: '400px',
    height: '350px'
}

var linkStyles = {
    color: 'white'
}

var textStyles = {
    color: 'black'
}

var textStylesGray = {
    color: 'gray'
}
    
export default class About extends React.Component {

constructor(props) {
    super(props);

    /*Binding for the Modals */
    this.handleShowRicardo = this.handleShowRicardo.bind(this);
    this.handleCloseRicardo = this.handleCloseRicardo.bind(this);
    this.handleShowRoshan = this.handleShowRoshan.bind(this);
    this.handleCloseRoshan = this.handleCloseRoshan.bind(this);
    this.handleShowZara = this.handleShowZara.bind(this);
    this.handleCloseZara = this.handleCloseZara.bind(this);
    this.handleShowRamon = this.handleShowRamon.bind(this);
    this.handleCloseRamon = this.handleCloseRamon.bind(this);
    this.handleShowKrishna = this.handleShowKrishna.bind(this);
    this.handleCloseKrishna = this.handleCloseKrishna.bind(this);

    this.state = {
        showRicardo: false,
        showRoshan: false,
        showZara: false,
        showRamon: false,
        showKrishna: false,
        ricardoCommits: 0,
        roshanCommits: 0,
        zaraCommits: 0,
        ramonCommits: 0,
        krishnaCommits: 0,
        totalCommits: 0,
        ricardoIssues: 0,
        roshanIssues: 0,
        zaraIssues: 0,
        ramonIssues: 0,
        krishnaIssues: 0
    }
}

componentDidMount() {
    this.callAPI()
}

/*Modal handling methods for each person in the group */
handleCloseRicardo() {
    this.setState({ showRicardo: false });
}

handleShowRicardo() {
    this.setState({ showRicardo: true });
}

handleCloseRoshan() {
    this.setState({ showRoshan: false });
}

handleShowRoshan() {
    this.setState({ showRoshan: true });
}

handleCloseZara() {
    this.setState({ showZara: false });
}

handleShowZara() {
    this.setState({ showZara: true });
}

handleCloseRamon() {
    this.setState({ showRamon: false });
}

handleShowRamon() {
    this.setState({ showRamon: true });
}

handleCloseKrishna() {
    this.setState({ showKrishna: false });
}

handleShowKrishna() {
    this.setState({ showKrishna: true });
}

/*Calls the API and gets the data for the about page */

callAPI() {
    let url = "https://api.github.com/repos/roshan-dongre/idb/stats/contributors"

    let self = this
    axios.get(url)
        .then((res) => {
            // Set state with result
            self.setState({ krishnaCommits: res.data[0].total,
                            ramonCommits: res.data[1].total,
                            ricardoCommits: res.data[2].total,
                            zaraCommits: res.data[3].total,
                            roshanCommits: res.data[4].total,
                            totalCommits: res.data[0].total + res.data[1].total +res.data[2].total +res.data[3].total +res.data[4].total
            });
        })
        .catch((error) => {
            console.log(error)
        });

    let url_issues = "https://api.github.com/repos/roshan-dongre/idb/issues?&state=all"
    axios.get(url_issues)
        .then((res) => {
            var krishna = 0
            var ramon = 0
            var ricardo = 0
            var zara = 0
            var roshan = 0

            for (var i = 0; i<res.data.length; i++) {
                if (res.data[i].user.login == "zaralouis")
                    zara += 1
                if (res.data[i].user.login == "larius11")
                    ricardo += 1
                if (res.data[i].user.login == "roshan-dongre")
                    roshan += 1
                if (res.data[i].user.login == "rp27537")
                    ramon += 1
                if (res.data[i].user.login == "ramdeepk2")
                    krishna += 1               
            }

            self.setState({ krishnaIssues: krishna,
                            ramonIssues: ramon,
                            ricardoIssues: ricardo,
                            zaraIssues: zara,
                            roshanIssues: roshan,
                            totalIssues: krishna + ramon + ricardo + zara + roshan
            });
            
        })
        .catch((error) => {
            console.log(error)
        });
}

/*Renders everything that shows all the information on the about page */

render () {
    return (
        <div>
            <header className="text-white bg-first">
              <div className="container text-center">
                <h1>The Slackers About Page</h1>
                <p className="lead"></p>
              </div>
            </header>
            <div className = "bg-second" >
                <div className = "container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-center">
                            <h1 className="title">The Team</h1>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className = "bg-third">
                <div className= "container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://larius11.github.io/cs373-blog/assets/headshot.jpg" alt="Ricardo Pic" data-toggle="modal" data-target="#ricardoModal" style = {imageStyles}/>
                                <h2>Ricardo Riveron</h2>
                                <Button bsStyle="primary" bsSize="large" onClick={this.handleShowRicardo}>
                                Learn about Ricardo!
                                </Button>
                            </div>
                        </div>
                        <Modal show={this.state.showRicardo} onHide={this.handleCloseRicardo} style = {textStyles}>
                          <Modal.Header closeButton>
                            <Modal.Title>Ricardo Riveron</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h4>Biography</h4>
                            <p>
                              4th year CS student currently working full-time at H-E-B. I love to play music, watch netflix, and play videogames when I'm not too busy doing work.
                            </p>
                            <hr />
                            <h4>Responsibilities and Commit Info</h4>
                            <p>Responsibilities: Set up the database and a large part of the backend.</p>
                            <p>Number of commits: {this.state.ricardoCommits}</p>
                            <p>Number of issues: {this.state.ricardoIssues}</p>
                            <p>Number of unit tests: 8</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseRicardo}>Close</Button>
                          </Modal.Footer>
                        </Modal>
                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://avatars3.githubusercontent.com/u/14967965?s=460&v=4" alt="Roshan Pic" data-toggle="modal" data-target="#roshanModal" style = {imageStyles}/>
                                <h2>Roshan Dongre</h2>
                                <Button bsStyle="success" bsSize="large" onClick={this.handleShowRoshan}>
                                Learn about Roshan!
                                </Button>
                            </div>
                        </div>
                        <Modal show={this.state.showRoshan} onHide={this.handleCloseRoshan} style = {textStyles}>
                          <Modal.Header closeButton>
                            <Modal.Title>Roshan Dongre</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h4>Biography</h4>
                            <p>
                              Senior pursuing a double major in Computer Science and Finance. Interested in trading and sports analytics. I enjoy playing tennis, working out, and playing poker.
                            </p>
                            <hr />
                            <h4>Responsibilities and Commit Info</h4>
                            <p>Responsibilities: Large part of front-end development including filtering, searching, and styling of all pages. AWS/Namecheap.</p>
                            <p>Number of commits: {this.state.roshanCommits}</p>
                            <p>Number of issues: {this.state.roshanIssues}</p>
                            <p>Number of unit tests: 0</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseRoshan}>Close</Button>
                          </Modal.Footer>
                        </Modal>
                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://zaralouis.files.wordpress.com/2018/01/headshot1.jpg?w=2048&h=1814" alt="Zara Pic" data-toggle="modal" data-target="#zaraModal" style = {imageStyles}/>
                                <h2>Zara Louis</h2>
                                <Button bsStyle="danger" bsSize="large" onClick={this.handleShowZara}>
                                Learn about Zara!
                                </Button>
                            </div>
                        </div>
                        <Modal show={this.state.showZara} onHide={this.handleCloseZara} style = {textStyles}>
                          <Modal.Header closeButton>
                            <Modal.Title>Zara Louis</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h4>Biography</h4>
                            <p>
                              I am a third year CS student from Plano, Texas. I enjoy working out and reading in my spare time.
                            </p>
                            <hr />
                            <h4>Responsibilities and Commit Info</h4>
                            <p>Responsibilities: Focused on designing the front end for the website, including search, maps, and overlays.</p>
                            <p>Number of commits: {this.state.zaraCommits}</p>
                            <p>Number of issues: {this.state.zaraIssues}</p>
                            <p>Number of unit tests: 10</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseZara}>Close</Button>
                          </Modal.Footer>
                        </Modal>
                    </div> 
                </div>      
            </div>
            <div className = "bg-first">
                <div className= "container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://rp27537cs373sp18.files.wordpress.com/2018/01/why.png" alt="Ramon Pic" data-toggle="modal" data-target="#ramonModal" style = {imageStyles}/>
                                <h2>Ramon Perez</h2>
                                <Button bsStyle="warning" bsSize="large" onClick={this.handleShowRamon}>
                                Learn about Ramon!
                                </Button>
                            </div>
                        </div>
                        <Modal show={this.state.showRamon} onHide={this.handleCloseRamon} style = {textStyles}>
                          <Modal.Header closeButton>
                            <Modal.Title>Ramon Perez</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h4>Biography</h4>
                            <p>
                              CS student hailing from New Braunfels, Texas. This is my third year as part of UTCS, and I'm in the Software Engineering and Artificial Intelligence classes this semester. I enjoy video games, running, and playing with my cats.
                            </p>
                            <hr />
                            <h4>Responsibilities and Commit Info</h4>
                            <p>Responsibilities: Data Management: scraping, aggregating, and data modeling. Also worked on testing.</p>
                            <p>Number of commits: {this.state.ramonCommits}</p>
                            <p>Number of issues: {this.state.ramonIssues}</p>
                            <p>Number of unit tests: 15</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseRamon}>Close</Button>
                          </Modal.Footer>
                        </Modal>      

                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://ramdeepk2.github.io/ramdeepk2.github.io/cs373/headshot.JPG" alt="Krishna Pic" data-toggle="modal" data-target="#krishnaModal" style = {imageStyles}/>
                                <h2>Krishna Ramdeep</h2>
                                <Button bsStyle="info" bsSize="large" onClick={this.handleShowKrishna}>
                                Learn about Krishna!
                                </Button>
                            </div>
                        </div>
                        <Modal show={this.state.showKrishna} onHide={this.handleCloseKrishna} style = {textStyles}>
                          <Modal.Header closeButton>
                            <Modal.Title>Krishna Ramdeep</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h4>Biography</h4>
                            <p>
                              CS senior taking Computer Vision, Programming for Performance, Software Engineering, and Randomized Algorithms. I like to work out, hike, and read in my free time (which I don't get too much of).
                            </p>
                            <hr />
                            <h4>Responsibilities and Commit Info</h4>
                            <p>Responsibilities: API Documentation, Most of Testing Code, Technical Report, Travis CI</p>
                            <p>Number of commits: {this.state.krishnaCommits}</p>
                            <p>Number of issues: {this.state.krishnaIssues}</p>
                            <p>Number of unit tests: 62</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleCloseKrishna}>Close</Button>
                          </Modal.Footer>
                        </Modal>  
                    </div>
                </div>
            </div>
            <div className="bg-second">
                <div className = "container" >
                    <div className="row">
                        <div className="col-md-3 container data-thumbnail">
                            <div className="text-center">
                                <h1><u>Stats</u></h1>
                                <ul>
                                    <li className="text-left"><h4><strong>total no. of commits: {this.state.totalCommits}</strong></h4></li>
                                    <li className="text-left"><h4><strong>total no. of issues:</strong> 47</h4></li>
                                    <li className="text-left"><h4><strong>total no. of unit tests:</strong> 95</h4></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 container data-thumbnail">
                            <div className="text-center">
                                <h1><u>Tools</u></h1>
                                <ul>
                                    <li className="text-left"><h4>Slack</h4></li>
                                    <li className="text-left"><h4>Flask</h4></li>
                                    <li className="text-left"><h4>React</h4></li>
                                    <li className="text-left"><h4>Postman</h4></li>
                                    <li className="text-left"><h4>Travis CI</h4></li>
                                    <li className="text-left"><h4>Fuse.js</h4></li>
                                    <li className="text-left"><h4>React-Highlighter</h4></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 container data-thumbnail">
                            <div className="text-center">
                                <h1><u>Tools</u></h1>
                                <ul>
                                    <li className="text-left"><h4>Mocha</h4></li>
                                    <li className="text-left"><h4>Selenium</h4></li>
                                    <li className="text-left"><h4>SQLAlchemy</h4></li>
                                    <li className="text-left"><h4>MySQL</h4></li>
                                    <li className="text-left"><h4>React-Select</h4></li>
                                    <li className="text-left"><h4>React-Input-Range</h4></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 container data-thumbnail">
                            <div className="text-center">
                                <h1><u>Data</u></h1>
                                <p><strong>FBI Crime Stats API:</strong> Provided crime stats through GET Requests</p>
                                <p><strong>FBI Most Wanted API:</strong> Provided information on most wanted criminals</p>
                                <p><strong>Google Maps API:</strong> Provided maps for the model pages</p>
                                <p><strong>Geocode API:</strong> Provided pictures and latitude/longitude</p>
                            </div>
                        </div>
                        <div className="col-md-2 container data-thumbnail">
                            <div className="text-center">
                                <h1><u>Technical</u></h1>
                                <a href="https://roshan-dongre.gitbooks.io/api/" style = {linkStyles}><h4><u>API Documentation</u></h4></a>
                                <a href="https://roshan-dongre.gitbooks.io/report/" style = {linkStyles}><h4><u>Technical Report</u></h4></a>
                                <a href="https://github.com/roshan-dongre/idb" style = {linkStyles}><h4><u>GitHub Repository</u></h4></a>
                                <a href="https://travis-ci.org/roshan-dongre/idb" style = {linkStyles}><h4><u>Travis CI Log</u></h4></a>
                                <a href="http://ontherun.me/visualization" style = {linkStyles}><h4><u>Visualization</u></h4></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-last">
                <div className= "container">
                    <div className="row bg-s">
                        <div className="col-md-12 container data-thumbnail">
                            <div className="text-left" style= {textStylesGray}>
                                <Well>
                                <ul>
                                    <li className="text-left"><h4><strong>Description: </strong>On The Run is a website that allows people to draw interesting connections between the FBI Most Wanted Page and information
                                    on different types of crimes as well as information on the states in which these crimes were committed</h4></li>
                                    <li className="text-left"><h4><strong>Purpose: </strong>To provide information linking criminals, their crimes, and the states they committed crimes in</h4></li>
                                    <li className="text-left"><h4><strong>Intended Users: </strong> Anyone interested in learning about crime/criminals</h4></li>
                                    <li className="text-left"><h4><strong>Explanation: </strong> This integration of disparate data allows people to not only see specfic information about each criminal, but also a macro look at crime in the states in which they committed their crimes</h4></li>
                                    <li className="text-left"><h4><strong>Scraping: </strong> We used the requests module to scrape the two FBI apis, and used React to request from the Geocode/Maps API's</h4></li>
                                    <li className="text-left"><h4><strong>Tools: </strong> We used Slack to communicate, Flask handles the API data requests and acts as an interface that communicates with the front-end, React for the 
                                    dynamic front-end, Postman for the API testing, Travis CI for the build logs, Mocha for the front-end tests, Selenium for the acceptance tests, and unnitest for the backend tests. SQLAlchemy
                                    and MySQL are used for the database and GitHub is used to store our code. Fuse.js was used for the searching and was done on the front-end. React-Select and React-Input-Range were 
                                    used for the front-end filters that are shown on the grid pages. React-Highlighter was used for highlighting. </h4></li>
                                </ul>
                                </Well>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

}
