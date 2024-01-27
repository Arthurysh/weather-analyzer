import {Doughnut} from "react-chartjs-2";

const Wind = () => {
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
        <div className={"bg-main-white-color rounded-[10px] w-[40%] p-[10px]"}>
            <Doughnut
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
                            borderColor: [
                                "rgba(43, 63, 229, 0.8)",
                                "rgba(250, 192, 19, 0.8)",
                                "rgba(253, 135, 135, 0.8)",
                            ],
                        },
                    ],
                }}
                options={{
                    plugins: {
                        title: {
                            text: "Revenue Sources",
                        },
                    },
                }}
            />
        </div>
    );
};

export default Wind;