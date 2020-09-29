function Team(props) {
    let shotPercentageDiv
  
    if (props.stats.shots) {
      const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      )
    }
  
    return (
      <div className="Team">
        <h2>{props.name}</h2>
  
        <div className="identity">
          <img src={props.logo} alt={props.name} />
        </div>
  
        <div>
          <strong>Shots:</strong> {props.stats.shots}
        </div>
  
        <div>
          <strong>Score:</strong> {props.stats.score}
        </div>
  
        {shotPercentageDiv}
  
        <button onClick={props.shotHandler}>Shoot!</button>
      </div>
    )
  }

  function ScoreBoard(props) {
    return (
      <div className="ScoreBoard">
        <div className="teamStats">
          <h3>AWAY</h3>
          <h3>{props.visitingTeamStats.score}</h3>
        </div>
  
        <h3>SCOREBOARD</h3>
  
        <div className="teamStats">
          <h3>HOME</h3>
          <h3>{props.homeTeamStats.score}</h3>
        </div>
      </div>
    )
  }
  
  class League extends React.Component {
    constructor(props) {
        super(props)
  
        this.state = {
            resetCounter: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
  
            awayTeamStats: {
                shots: 0,
                score: 0
            }
  
        }
  
        this.shotSound = new Audio("./assets/audio/soccer.mp3")
        this.scoreSound = new Audio("./assets/audio/Ball+Hit+Cheer.mp3")
  
    }
  
    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()
  
  
        if (Math.random() > 0.5) {
            score += 1
            this.scoreSound.play()
        }
  
        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
  
        }))
  
    }
  
    resetGame = () => {
        this.setState((state, props) => ({
            resetCounter: state.resetCounter + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            awayTeamStats: {
                shots: 0,
                score: 0
            }
        }))
    }
  
  
  
  
    render() {
        return (
            <div className="League">
  
                <ScoreBoard
                    awayTeamStats={this.state.awayTeamStats}
                    homeTeamStats={this.state.homeTeamStats}
  
                />
                <h1>Welcome to {this.props.venue}</h1>
                <div className="stats">
                    <Team
                        name={this.props.awayTeam.name}
                        logo={this.props.awayTeam.logoSrc}
                        stats={this.state.awayTeamStats}
                        shotHandler={() => this.shoot('away')}
  
                    />
  
                    <div className="versus">
                        <h1>VS</h1>
                        <div>
                            <strong>Resets:</strong> {this.state.resetCounter}
                            <button onClick={this.resetGame}>Reset Game</button>
                        </div>
                    </div>
  
                    <Team
                        name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')}
                    />
  
                </div>

                </div>
        )};
    }

    function App(props) {
        const barcelona = {
          name: 'Barcelona',
          logoSrc: './assets/images/barcelona.jpg'
        }
        const realmadrid = {
            name: 'Realmadrid',
            logoSrc: './assets/images/realmadrid.jpg'
          }
        
          const liverpool = {
            name: 'Liverpool',
            logoSrc: './assets/images/liverpool.jpg'
          }
        
          const juventus = {
            name: 'Juventus',
            logoSrc: './assets/images/Juventus.jpg'
          }
        
        return (
          <div className="App">
            <Game
              venue="Laliga"
              homeTeam={barcelona}
              AwayTeam={realmadrid}
            />
            <Game
              venue="Champions League"
              homeTeam={liverpool}
              AwayTeam={juventus}
            />
          </div>
        )
      }
      
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      )
  