import {Line} from "react-chartjs-2";
import {defaults} from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Precipitation = () => {
    const revenueData = [
        {
            "label": "Jan",
            "revenue": 64854,
            "cost": 32652
        },
        {
            "label": "Feb",
            "revenue": 54628,
            "cost": 42393
        },
        {
            "label": "Mar",
            "revenue": 117238,
            "cost": 50262
        },
        {
            "label": "Apr",
            "revenue": 82830,
            "cost": 64731
        },
        {
            "label": "May",
            "revenue": 91208,
            "cost": 41893
        },
        {
            "label": "Jun",
            "revenue": 103609,
            "cost": 83809
        },
        {
            "label": "Jul",
            "revenue": 90974,
            "cost": 44772
        },
        {
            "label": "Aug",
            "revenue": 82919,
            "cost": 37590
        },
        {
            "label": "Sep",
            "revenue": 62407,
            "cost": 43349
        },
        {
            "label": "Oct",
            "revenue": 82528,
            "cost": 45324
        },
        {
            "label": "Nov",
            "revenue": 56979,
            "cost": 47978
        },
        {
            "label": "Dec",
            "revenue": 87436,
            "cost": 39175
        }
    ];



    return (
       <div className={"h-[30%] bg-main-white-color p-[20px] rounded-[10px]"}>
           <Line
               data={{
                   labels: revenueData.map((data) => data.label),
                   datasets: [
                       {
                           label: "Revenue",
                           data: revenueData.map((data) => data.revenue),
                           backgroundColor: "#064FF0",
                           borderColor: "#064FF0",
                       },
                       {
                           label: "Cost",
                           data: revenueData.map((data) => data.cost),
                           backgroundColor: "#FF3030",
                           borderColor: "#FF3030",
                       },
                   ],
               }}
               options={{
                   elements: {
                       line: {
                           tension: 0.5,
                       },
                   },
                   plugins: {
                       title: {
                           text: "Monthly Revenue & Cost",
                       },
                   },
               }}
           />
       </div>
    );
};

export default Precipitation;