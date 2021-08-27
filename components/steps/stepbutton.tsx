import { Button } from "react-bootstrap"
import React, { useContext } from "react"
import { WizardContext } from "../../pages/wizard"

function StepButton(props) {
  const { nextStep, stepsDone, setStepsDone, editProject } = useContext(WizardContext)

  const doneStep = () => {
    const stepsCopy = {...stepsDone}
    stepsCopy[props.doneStep] = true
    setStepsDone({...stepsCopy})
  }

  return (
    <div className='mt-4'>
      {/* // <div className="mt-4"> */}
      <Button onClick={(step) => {
        doneStep()
        nextStep()
        editProject()
        }} variant={"primary"} className='button mt-5 py-2 btnclass' block>
        {props.title}
      </Button>
    </div>
  )
}

export default StepButton
