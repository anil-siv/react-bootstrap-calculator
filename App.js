class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="display"
        className="card-header"
        style={{
          height: "80px",
          display: "flex",
          width: "100%",
          backgroundColor: "black",
          fontFamily: "Orbitron",
          overflow: "hidden"
        }}
      >
        {this.props.display}
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="buttons card-body">
        <button
          onClick={this.props.handleClick}
          id="add"
          value="+"
          className="btn btn-info"
        >
          +
        </button>
        <button
          onClick={this.props.handleClick}
          id="subtract"
          value="-"
          className="btn btn-info"
        >
          -
        </button>
        <button
          onClick={this.props.handleClick}
          id="multiply"
          value="*"
          className="btn btn-info"
        >
          x
        </button>
        <button
          onClick={this.props.handleClick}
          id="divide"
          value="/"
          className="btn btn-info"
        >
          /
        </button>

        <button
          onClick={this.props.handleClick}
          id="one"
          value="1"
          className="btn btn-default waves-effect"
        >
          1
        </button>
        <button
          onClick={this.props.handleClick}
          id="two"
          value="2"
          className="btn btn-default waves-effect"
        >
          2
        </button>
        <button
          onClick={this.props.handleClick}
          id="three"
          value="3"
          className="btn btn-default waves-effect"
        >
          3
        </button>

        <button
          onClick={this.props.handleClick}
          id="four"
          value="4"
          className="btn btn-default waves-effect"
        >
          4
        </button>
        <button
          onClick={this.props.handleClick}
          id="five"
          value="5"
          className="btn btn-default waves-effect"
        >
          5
        </button>
        <button
          onClick={this.props.handleClick}
          id="six"
          value="6"
          className="btn btn-default waves-effect"
        >
          6
        </button>

        <button
          onClick={this.props.handleClick}
          id="seven"
          value="7"
          className="btn btn-default waves-effect"
        >
          7
        </button>
        <button
          onClick={this.props.handleClick}
          id="eight"
          value="8"
          className="btn btn-default waves-effect"
        >
          8
        </button>
        <button
          onClick={this.props.handleClick}
          id="nine"
          value="9"
          className="btn btn-default waves-effect"
        >
          9
        </button>

        <button
          onClick={this.props.handleClick}
          id="zero"
          value="0"
          className="btn btn-default waves-effect"
        >
          0
        </button>
        <button
          onClick={this.props.handleClick}
          id="decimal"
          value="."
          className="btn btn-dark waves-effect"
        >
          .
        </button>
        <button
          onClick={this.props.handleClear}
          id="clear"
          className="btn btn-danger waves-effect"
        >
          AC
        </button>

        <button
          onClick={this.props.handleCompute}
          className="btn btn-success"
          id="equals"
        >
          =
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      computation: "",
      justComputed: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCompute = this.handleCompute.bind(this);
  }

  handleDisp(val) {
  //if the current state is zero or the equals key has just been pressed - replace display with whatever user types in - also prevents 0x display
    if (this.state.display == 0 || this.state.justComputed) {
      this.setState((state) => {
        return {
          display: val,
          justComputed: false
        };
      });
      //if a decimal already exists and the user tries to enter another one, do not proceed
    } else if (
      (val == "." && !this.state.display.includes(".")) ||
      val != "."
    ) {
    // append display value with entered value
      this.setState((state) => {
        return {
          display: state.display + val,
          justComputed: false
        };
      });
    }
  }

//grab current expression value and append clicked val - helper function passed to onClick event handler
  handleComp(val) {
    this.setState((state) => {
      return {
        computation: state.computation + val
      };
    });
  }

//helper function to display expression result and clear computation history to allow user to act on returned value
  handleEquals(tot) {
    this.setState({
      display: tot,
      computation: tot,
      justComputed: true
    });
  }

  handleClick(e) {
    let val = e.target.value;
    this.handleComp(val);
    this.handleDisp(val);
  }

  handleClear() {
    this.setState({
      display: 0,
      computation: ""
    });
  }

//looks for erroneous operator inputs and replaces them with last entered operator 
  handleCompute() {
    let formula = this.state.computation;
    formula = formula.replace("-/", "/");
    formula = formula.replace("-+", "+");
    formula = formula.replace("-*", "*");
    formula = formula.replace("+/", "/");
    formula = formula.replace("++", "+");
    formula = formula.replace("+*", "*");
    formula = formula.replace("//", "/");
    formula = formula.replace("/+", "+");
    formula = formula.replace("/*", "*");
    formula = formula.replace("*/", "/");
    formula = formula.replace("**", "*");
    formula = formula.replace("*+", "+");
    
    let calc = math.round(math.evaluate(formula),6);

    this.handleEquals(calc);
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{ minHeight: "125vh", backgroundColor: "#BFFCC6" }}
      >
        <div
          className="card"
          style={{
            width: 500,
            maxWidth: "90vw",
            margin: "0 auto",
            position: "relative",
            top: "15vh",
            textAlign: "center"
          }}
        >
          <Display display={this.state.display} />
          <Calculator
            handleClick={this.handleClick}
            handleClear={this.handleClear}
            handleCompute={this.handleCompute}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
