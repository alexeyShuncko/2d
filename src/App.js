import { useEffect, useState } from 'react';
import './App.css';

function App() {


  const [arr, setArr] = useState([])


  let x = 200 
  let y = 40
  let angle = 0

  const speed = 2 // время перемещения и поворота в секундах
  const ANG = 30 * Math.PI/180 // угол поворота
  let x1 = 540
  let y1 = 20

  function square(ctx, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 100, 120);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }





  function moveTo(x, x1, y, y1, speed) {

    const start = new Date()

    let dx = (x1 - x) / speed / 60
    let dy = (y1 - y) / speed / 60
    function draw(timestamp) {

      const end = new Date()
      let diff = end - start
     
      setArr([...arr,{time: diff, coords: [Math.round(x), Math.round(y)] }])


      const canvas = document.getElementById('elSquare')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      x += dx;
      y += dy;
      square(ctx, x, y)
      if (Math.round(x) <= x1) {
        requestAnimationFrame(draw)
      }
    }
    requestAnimationFrame(draw)
  }


  function turnTo(x, y, speed, angle) {

    const start = new Date()
    let dAngle = ANG/speed / 60

    function turn() {

      const end = new Date()
      let diff = end - start
      setArr([...arr,{time: diff, coords: [angle.toFixed(2)] }])
      
       const canvas = document.getElementById('elSquare')
       const ctx = canvas.getContext('2d')
     
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      angle += dAngle
      ctx.rotate(dAngle);
      square(ctx, x, y)
    
       if (angle.toFixed(2) <= ANG.toFixed(2)) {
         requestAnimationFrame(turn)
       }
       else {
        ctx.rotate(-ANG);
       }
    }
    requestAnimationFrame(turn)
  }





  useEffect(() => {
    const canvas = document.getElementById('elSquare')
    const ctx = canvas.getContext('2d')
    square(ctx, x, y)
  }, [])


  return (
    <div className="App" style={{ display: 'flex' }}>

      <canvas id='elSquare' width={800} height={400}>

      </canvas>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button onClick={() => moveTo(x, x1, y, y1, speed)}>Переместить</button>
        <button onClick={()=> turnTo(x,y, speed, angle)}>Повернуть</button>
      </div>

      <ul>
        Массивы значений, для промежутка времени.
        {
          arr.map((a, i) => (
            <li key={i}> Время:{a.time}, 
            {
            a.coords.length > 1 
            ? <span>координаты[{a.coords[0]},{a.coords[1]}]</span>
            : <span>угол поворота:[{a.coords[0]}]</span>
            }
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
