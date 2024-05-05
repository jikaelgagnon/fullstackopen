const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>total of {sum} exercises</p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
<>
  {parts.map(part => <Part key={part.id} part={part}/>)}
</>
)
}


const Course = ({course}) => {
  return(
  <div>
  <Header course={course.name}/>
  <Content parts={course.parts}/>
  <Total sum={(course.parts).reduce((acc, part) => acc + part.exercises, 0)}/>
  </div>

)
}

export default Course