"use client"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Card from "@/components/ui/card";


export default function Home() {
  const[cpm, setCpm] = useState(null);
  const[totalbudget, setTotalBudget] = useState(null);
  const[spentbudget, setSpentBudget] = useState(null);
  const[adbudget, setAdBudget] = useState(null);
  const[duration, setDuration] = useState(null);
  
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [date2, setDate2] = useState<Date | undefined>(undefined);


  const[expectedMessages, setExpectedMessages] = useState(0);

  const calculateDateDifference = (date1, date2) => {
    if (!date1 || !date2) return "Select two dates";

    const diff = Math.abs(date2.getTime() - date1.getTime()); // Absolute difference
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    // const minutes = Math.floor((diff / (1000 * 60)) % 60);
    // const seconds = Math.floor((diff / 1000) % 60);
    // return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    return `${days}`;

  }
  const copyToClipboard = (text) =>{
    navigator.clipboard.writeText(text);
    toast("Days copied to clipboard", {
      icon: "🌞",
    });
      // .then(() => {
        
      //   // Optionally add feedback (e.g., change icon, show tooltip)
      //   console.log('Copied to clipboard!');
      // })
      // .catch(err => {
      //   console.error('Failed to copy: ', err);
      // });
  }
  
  
  
  const calculateMessages = () => {
    if (cpm > 0 ) {
      const newAdBudget = totalbudget - spentbudget;
      setAdBudget(newAdBudget);
      setExpectedMessages(Math.floor((newAdBudget / cpm) / duration));
    }
    else {
      setExpectedMessages(0);
      setAdBudget(0);
    
    }
  }
  
  return (
    <div>
      <div>
        <h1 className="flex flex-col justify-center items-center m-4 gap-5 text-3xl font-bold ">Facebook Ad Message Calculator</h1>

          <div className="m-4 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col items-center">
              <label> Select Your Start Date </label>
              <Calendar
                  mode="single"
                  selected={date1}
                  onSelect={setDate1}
                  className="rounded-md border"
              />
            </div>
            <div className="flex flex-col items-center">
              <label> Select Your End Date </label>
              <Calendar
                  mode="single"
                  selected={date2}
                  onSelect={setDate2}
                  className="rounded-md border"
              />
            </div>
          </div>
          <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
          <div className="flex flex-row items-center justify-center">

              {/* <p><span className="inline-block bg-red-400/30 rounded-md px-2">Your Selected Dates are: {date1 ? date1.toString() : 'None'},  {date2 ? date2.toString() : 'None'}</span></p> */}
              <span className="inline-block bg-red-400/30 rounded-md px-2">
              Days Difference: {date1 && date2 ? calculateDateDifference(date1, date2) : 'Select two dates'} days
              </span>
              <button className="ml-2 cursor-pointer bg-black text-white rounded-xl p-2" onClick={() => {
                const newDuration = calculateDateDifference(date1, date2);
                setDuration(newDuration);
              }}>
                  Copy To Total Duration
                </button>
              
          </div>
      </div>

      <div className="flex flex-row justify-center items-center m-4 gap-5">
        <Card>
        <label>Cost Per Message</label>
        <Input type="number" value={cpm} placeholder="Cost Per Message" onChange={(e)=> setCpm(parseFloat(e.target.value))} />
        </Card>
        <Card>
        <label>Total Budget</label>
        <Input type="number" value={totalbudget} placeholder="Total Budget" onChange={(e)=> setTotalBudget(parseFloat(e.target.value))}/>
        </Card>
        <Card>
        <label>Spent Budget</label>
        <Input type="number" value={spentbudget} placeholder="Spent Budget" onChange={(e)=> setSpentBudget(parseFloat(e.target.value))} />
        </Card>
        <Card>
        <label>Total Duration</label>
        <Input type="number" value={duration} placeholder="Duration In Days" onChange={(e)=> setDuration(parseFloat(e.target.value))}/>
        </Card>
        
      </div>
      <div className="flex flex-col justify-center items-center m-4 gap-5">
        <button onClick={calculateMessages}  className="bg-blue-500 text-white p-2 rounded">
            Calculate
          </button>
          <p>Expected Messages : {expectedMessages} messages per day </p>
      </div>
    </div>
  );
}


