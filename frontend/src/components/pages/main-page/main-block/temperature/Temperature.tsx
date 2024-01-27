import {Bar} from "react-chartjs-2";

const Temperature = () => {
    const sourceData = [
        {
            "label": "Ads",
            "value": 32
        },
        {
            "label": "Subscriptions",
            "value": 45
        },
        {
            "label": "Sponsorships",
            "value": 23
        }
    ]

    return (
        <div className={"h-full w-[60%] bg-main-white-color rounded-[10px] p-[10px]"}>
            <Bar
                data={{
                    labels: sourceData.map((data) => data.label),
                    datasets: [
                        {
                            label: "Count",
                            data: sourceData.map((data) => data.value),
                            backgroundColor: [
                                "rgba(43, 63, 229, 0.8)",
                                "rgba(250, 192, 19, 0.8)",
                                "rgba(253, 135, 135, 0.8)",
                            ],
                            borderRadius: 5,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        title: {
                            text: "Revenue Source",
                        },
                    },
                }}
            />
        </div>
    );
};

export default Temperature;