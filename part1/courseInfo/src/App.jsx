const Hello = (props) => {
  return (
    <div>
      <p>Hello world{props.name}, you are {props.age} years old.</p>
      {/* It's not an actual error, but a warning caused by the ESLint tool. You can silence 
      the warning react/prop-types by adding to the file .eslintrc .cjs the next line */}
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)
  const name = ' Peter'
  const age = 10
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]
  const Couple = [ 'Chinmaya', 'Saheba']

  return (
    <div>
    <h1>Greetings</h1>,
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name=' Chinmaya' age={24}/>
      <Hello name=' Nishi' age={25}/>
      <Hello name=' Abhijeet'  age={25+2} />
      <Hello name={name} age={age} />
      <Footer />

     {/*  <p>{friends[0]}</p>
      <p>{friends[1]}</p> */}
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
      <p>{Couple}</p>

    </div>
  )
}

export default App
