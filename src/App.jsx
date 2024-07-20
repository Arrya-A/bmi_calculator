import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [bmi, setBmi] = useState(0)

  const [bmiCategory, setBmiCategory] = useState('')

  const [isHeight, setIsHeight] = useState(true)
  const [isWeight, setIsWeight] = useState(true)


  const validate = (e) => {
    const name = e.target.name
    const value = e.target.value
    // console.log(name,value);
    // console.log(!!value.match(/^[0-9]*$/));
    if (!!value.match(/^[0-9]*$/)) {
      if (name == 'height') {
        setHeight(value)
        setIsHeight(true)

      }
      else {
        setWeight(value)
        setIsWeight(true)

      }
    }
    else {
      if (name == 'height') {
        setHeight(value)
        setIsHeight(false)
      }
      else {
        setWeight(value)
        setIsWeight(false)
      }
    }
  }

  const handleReset = () => {
    setHeight(0)
    setWeight(0)
    setIsHeight(true)
    setIsWeight(true)
    setBmi(0)

  }

  const handleCalculate = (e) => {
    e.preventDefault()
    if (height == "" || weight == "") {
      alert("Please fill the form completely")

    }
    else {
      const roundedBmi = ((weight / (height ** 2)) * 10000).toFixed(2)
      setBmi(roundedBmi)

      if (roundedBmi < 18.5) {
        setBmiCategory('Under Weight');
      } else if (roundedBmi >= 18.5 && roundedBmi < 24.9) {
        setBmiCategory('Normal');
      }
      else if (roundedBmi >= 25 && roundedBmi < 29.9) {
        setBmiCategory('Over Weight');
      }
      else if (roundedBmi >= 30 && roundedBmi < 34.9) {
        setBmiCategory('Obese');
      }
      else{
        setBmiCategory('')
      }
    }
  }
  return (
    <>
      <div className="app-container" style={{
      backgroundImage: `url(${`https://s.yimg.com/ny/api/res/1.2/bd7dUOS.bphCskARFIxxbQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://s.yimg.com/os/creatr-uploaded-images/2020-12/5e4c2e70-3ed1-11eb-bd5f-189e96d3f420`})`, // Set the background image URL here
      height: '100vh',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-4">
            <h1 className='mt-5 '>BMI Calculator</h1>
            <p>Check your Body Mass Index</p>

            <div className='box p-5 rounded'>
              <form onSubmit={handleCalculate}>
                <div className="mb-3">
                  <TextField id="outlined-basic" label="Height(cm)" value={height || ""} variant="outlined" className='w-100' onChange={(e) => validate(e)} name='height' />
                  {!isHeight &&
                    <p className='text-danger'>*Invalid Input</p>
                  }
                </div>
                <div className="mb-3">
                  <TextField id="outlined-basic" label="Weight(kg)" value={weight || ""} variant="outlined" className='w-100' onChange={(e) => validate(e)} name='weight' />
                  {!isWeight &&
                    <p className='text-danger'>*Invalid Input</p>
                  }
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <Button variant="contained" color='success' style={{ width: '180px', padding: '15px' }} disabled={isHeight && isWeight ? false : true} type='sumbit'>Calculate</Button>
                  <Button variant="outlined" color='primary' style={{ width: '180px', padding: '15px' }} onClick={handleReset}>Reset</Button>
                </div>
              </form>
            </div>

            <div className="result_box rounded">
              <div className='mt-5 p-4 shadow d-flex flex-column align-items-center justify-content-center rounded'>
                <p className='fw-bold '>Your BMI Score </p>

                <h1 className='fw-bold'> {bmi}</h1>
                {bmiCategory && <h2 className={`fw-bold  ${bmiCategory === 'Under Weight' ? 'underweight' : (bmiCategory === 'Obese' ? 'obese' : (bmiCategory === 'Normal' ? 'normal' : (bmiCategory ==='Over Weight' ? 'overweight' : '')))}`}>{bmiCategory}</h2>}
              </div>
            </div>


          </div>



          <div className="col-md-1"></div>

          <div className="col-md-4">
            {/* <div style={{height:'100px' , backgroundColor:'orange'}} className='mt-5 d-flex flex-column align-items-center justify-content-center rounded'>
              <h4 className='fw-bold'>BMI</h4>
            </div> */}
          </div>

          <div className="col-md-1"></div>

        </div>


      </div>
    </>
  )
}

export default App