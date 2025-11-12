import { StepperFormHorizontalPropsType } from "../../../../../../Type/Vyapara/Admin/StepperFormHorizontalPropsType";


const stepperHorizontalData = [
  {
    step: '1',
    title: 'Personal & Business Details',
  },
  {
    step: '2',
    title: 'Materials, Payments & Schedule',
  },
//   {
//     step: '3',
//     title: 'Shifts & Shifts Type',
//   },
//   {
//     step: '4',
//     title: 'Invoice Settings',
//   },
];

const StepperFormHorizontal: React.FC<StepperFormHorizontalPropsType> = ({
  level,
}) => {
  return (
    <div className="stepper-horizontal">
      {stepperHorizontalData.map((data, index) => (
        <div
          key={index}
          className={`stepper-${data.step} stepper step ${
            level > index + 1 ? 'done active ' : 'editing'
          }`}
        >
          <div className="step-circle">
            <span>{index + 1}</span>
          </div>
          <div className="step-title">{data.title}</div>
          <div className="step-bar-left" />
          <div className="step-bar-right" />
        </div>
      ))}
    </div>
  );
};

export default StepperFormHorizontal;
