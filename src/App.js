import { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Move from './components/Move';
import { Box, Stack } from '@mui/material';

function App() {

  const [arr, setArr] = useState([])
  const [speed, setSpeed] = useState(2) // время перемещения и поворота в секундах
  const [ANG, setANG] = useState(30) // угол поворота
  const [NewX, setNewX] = useState(540)
  const [NewY, setNewY] = useState(100)

  let x = 200
  let y = 60
  let angle = 0


  // Прямоугольник
  function square(ctx, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 100, 120);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }


  ///////// Набор функций согласно тестовому заданию

  // Перемещение прямоугольника
  function moveTo(NewX, NewY, speed) {

    const start = new Date()

    let dx = (NewX - x) / speed / 60
    let dy = (NewY - y) / speed / 60

    function draw() {

      const end = new Date()
      let diff = end - start

      setArr([...arr, { time: diff, coords: [Math.round(x), Math.round(y)] }])

      const canvas = document.getElementById('elSquare')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      x += dx
      y += dy;
      square(ctx, x, y)

      if (NewX < 200 ? (Math.round(x) >= NewX) : (Math.round(x) <= NewX)) {
        requestAnimationFrame(draw)
      }
    }
    requestAnimationFrame(draw)
  }

  // Поворот прямоугольника 
  function turnTo(speed, angle) {

    const start = new Date()
    let dAngle = (ANG * Math.PI / 180) / speed / 60

    function turn() {
      angle += dAngle
      const end = new Date()
      let diff = end - start
      setArr([...arr, { time: diff, coords: [Math.round(angle / (Math.PI / 180))] }])

      const canvas = document.getElementById('elSquare')
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, canvas.width, canvas.height);
     
      ctx.rotate(dAngle);
      square(ctx, x, y)
      

      if (angle < ANG * Math.PI / 180) {
        requestAnimationFrame(turn)
      }
     
      else {
        ctx.rotate(-(ANG * Math.PI / 180));
      }
    }
    requestAnimationFrame(turn)
  }

  // Ускорение и торможение прямоугольника
  function animate({ timing, draw, duration, flag }) {

    let start = performance.now()
    const st = new Date()

    let boost = 2 * (NewX - x) / Math.pow(speed, 2)
    let boostY = 2 * (NewY - y) / Math.pow(speed, 2)

    requestAnimationFrame(function animate(time) {

      let timeFraction = (time - start) / duration
      if (timeFraction > 1) timeFraction = 1
      if (timeFraction < 0) timeFraction = 0

      let progress = timing(timeFraction)

      if (flag === 'УСКОРЕНИЕ') {
        let dx = (boost * Math.pow(speed * progress, 2)) / 2
        let dy = (boostY * Math.pow(speed * progress, 2)) / 2
        x = dx + 200
        y = dy + 60
      }

      else if (flag === 'ТОРМОЖЕНИЕ') {
        let dx = (boost * Math.pow(speed * (1 - progress), 2)) / 2
        let dy = (boostY * Math.pow(speed * (1 - progress), 2)) / 2
        x = NewX - dx
        y = NewY - dy
      }
      draw(progress, st)

      if (timeFraction < 1) {
        requestAnimationFrame(animate)
      }

    });
  }

  //////////////


  // Функция отрисовки прямоугольника при торможении, ускорении
  function draw(progress, start) {
    const canvas = document.getElementById('elSquare')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const end = new Date()
    let diff = end - start

    setArr([...arr, { time: diff, coords: [Math.round(x), Math.round(y)] }])
    square(ctx, x, y)
  }
  // Функция анимации (линейная)
  function timing(timeFraction) {
    return timeFraction
  }


  useEffect(() => {
    const canvas = document.getElementById('elSquare')
    const ctx = canvas.getContext('2d')
    square(ctx, x, y)
  }, [])


  return (
    <div className="App" >

      <div>
        <div className='title'>Поле canvas размером 400px на 700px.</div>
        <div className='title'>Координаты левого угла прямоугольника x: 200px, y: 60px.</div>
        <canvas id='elSquare' width={700} height={400}>Канвас не работает ....</canvas>
      </div>


      <Box>
        <Stack spacing={1} direction="column" style={{ flex: 1 }}>
          <Button variant="contained" onClick={() => moveTo(NewX, NewY, speed)}>Переместить</Button >

          <Button variant="contained" onClick={() => turnTo(speed, angle)}>Повернуть</Button >
          <Button variant="contained"
            onClick={(e) => animate({ timing, draw, duration: speed * 1000, flag: e.target.innerText })}>
            Ускорение</Button >
          <Button variant="contained"
            onClick={(e) => animate({ timing, draw, duration: speed * 1000, flag: e.target.innerText })}>
            Торможение</Button >
        </Stack>
        <Move
          speed={speed}
          setSpeed={setSpeed}
          NewX={NewX}
          setNewX={setNewX}
          NewY={NewY}
          setNewY={setNewY}
          ANG={ANG}
          setANG={setANG}
        />
      </Box>


      <ul>
        <div className="nameList">Массивы значений, </div>
        <div className="nameList">для промежутка времени.</div>
        {
          arr.map((a, i) => (
            <li key={i}> Время: {a.time} мс, {
              a.coords.length > 1
                ? <span>координаты [{a.coords[0]}, {a.coords[1]}]</span>
                : <span>угол поворота [{a.coords[0]}°]</span>
            }
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
